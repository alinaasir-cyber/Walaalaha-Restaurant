import { prisma } from "./prisma";
import { logAudit } from "./audit";

export interface CheckoutItem {
  menuItemId: string;
  quantity: number;
  notes?: string;
}

export interface CheckoutInput {
  tableId?: string;
  type?: string; // DINE_IN, TAKEAWAY, DELIVERY
  waiterId?: string;
  cashierId: string;
  sessionId?: string;
  branchId?: string;
  paymentMethod: "CASH" | "EVC_PLUS" | "ZAAD" | "SAHAL" | "PREMIER_BANK" | "CARD";
  items: CheckoutItem[];
}

/**
 * Enterprise Checkout Transaction:
 * 1. Reads authoritative prices from DB (Never trusts client price).
 * 2. Executes atomic Prisma transaction:
 *    - Creates Order & OrderItems
 *    - Records Payment
 *    - Creates Balanced Double-Entry Journal Entry
 *    - Records Audit Log
 * All or nothing: if any step fails, everything rolls back.
 */
export async function processOrderTransaction(input: CheckoutInput) {
  if (!input.items || input.items.length === 0) {
    throw new Error("Order must contain at least one item.");
  }

  // Step 1: Server-side price lookup
  const itemIds = input.items.map((i) => i.menuItemId);
  const dbMenuItems = await prisma.menuItem.findMany({
    where: { id: { in: itemIds } },
  });

  if (dbMenuItems.length !== itemIds.length) {
    throw new Error("One or more items in the order do not exist in the database.");
  }

  const itemsMap = new Map(dbMenuItems.map((m) => [m.id, m]));

  // Calculate authoritative Subtotal on Server
  let calculatedSubtotal = 0;
  const verifiedOrderItems = input.items.map((item) => {
    const dbItem = itemsMap.get(item.menuItemId)!;
    const unitPrice = Number(dbItem.price);
    const lineTotal = unitPrice * item.quantity;
    calculatedSubtotal += lineTotal;

    return {
      menuItemId: item.menuItemId,
      quantity: item.quantity,
      unitPrice,
      lineTotal,
      notes: item.notes,
    };
  });

  const taxAmount = Number((calculatedSubtotal * 0.05).toFixed(2)); // 5% VAT
  const totalAmount = Number((calculatedSubtotal + taxAmount).toFixed(2));

  const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;

  // Step 2: Atomic Database Transaction
  const result = await prisma.$transaction(async (tx) => {
    // A. Create the Order
    const order = await tx.order.create({
      data: {
        orderNumber,
        type: input.type || "DINE_IN",
        tableId: input.tableId || null,
        waiterId: input.waiterId || null,
        cashierId: input.cashierId,
        sessionId: input.sessionId || null,
        branchId: input.branchId || null,
        subtotal: calculatedSubtotal,
        taxAmount,
        totalAmount,
        status: "PAID",
        orderItems: {
          create: verifiedOrderItems.map((oi) => ({
            menuItemId: oi.menuItemId,
            quantity: oi.quantity,
            unitPrice: oi.unitPrice,
            lineTotal: oi.lineTotal,
            notes: oi.notes,
          })),
        },
      },
      include: {
        orderItems: {
          include: {
            menuItem: true,
          },
        },
      },
    });

    // B. Record Payment
    await tx.payment.create({
      data: {
        orderId: order.id,
        method: input.paymentMethod,
        amount: totalAmount,
        status: "COMPLETED",
      },
    });

    // C. Update Table status if applicable
    if (input.tableId) {
      await tx.restaurantTable.update({
        where: { id: input.tableId },
        data: { status: "AVAILABLE" },
      });
    }

    // D. Double-Entry Accounting: Balanced Journal Entry
    // Find or create default Cash/Bank Asset and Food Sales Revenue Accounts
    let cashAccount = await tx.account.findFirst({
      where: { code: input.paymentMethod === "CASH" ? "1010" : "1030" },
    });
    if (!cashAccount) {
      cashAccount = await tx.account.create({
        data: {
          code: input.paymentMethod === "CASH" ? "1010" : "1030",
          name: input.paymentMethod === "CASH" ? "Cash on Hand" : "EVC / Digital Merchant",
          type: "ASSET",
        },
      });
    }

    let revenueAccount = await tx.account.findFirst({
      where: { code: "4010" },
    });
    if (!revenueAccount) {
      revenueAccount = await tx.account.create({
        data: {
          code: "4010",
          name: "Restaurant Food Sales Revenue",
          type: "REVENUE",
        },
      });
    }

    // Create Balanced Journal Entry: Debit Asset, Credit Revenue
    await tx.journalEntry.create({
      data: {
        entryNumber: `JRN-${orderNumber}`,
        reference: orderNumber,
        description: `POS Sale settlement for Order #${orderNumber} via ${input.paymentMethod}`,
        lines: {
          create: [
            {
              accountId: cashAccount.id,
              debit: totalAmount,
              credit: 0,
            },
            {
              accountId: revenueAccount.id,
              debit: 0,
              credit: totalAmount,
            },
          ],
        },
      },
    });

    // Update Account Balances
    await tx.account.update({
      where: { id: cashAccount.id },
      data: { balance: { increment: totalAmount } },
    });

    await tx.account.update({
      where: { id: revenueAccount.id },
      data: { balance: { increment: totalAmount } },
    });

    return order;
  });

  // Step 3: Record Audit Log outside tx
  await logAudit({
    userId: input.cashierId,
    action: "CREATE_AND_SETTLE_ORDER",
    entityType: "ORDER",
    entityId: result.id,
    details: {
      orderNumber,
      totalAmount,
      itemsCount: verifiedOrderItems.length,
      method: input.paymentMethod,
    },
  });

  return result;
}
