import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerName, customerPhone, deliveryAddress, type, paymentMethod, items, notes } = body;

    if (!customerPhone || !customerName) {
      return NextResponse.json(
        { error: "Customer name and phone number are required." },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Order must contain at least one item." },
        { status: 400 }
      );
    }

    // Step 1: Look up real DB prices
    const itemIds = items.map((i: any) => i.menuItemId);
    const dbMenuItems = await prisma.menuItem.findMany({
      where: { id: { in: itemIds } },
    });

    const itemsMap = new Map(dbMenuItems.map((m) => [m.id, m]));

    let calculatedSubtotal = 0;
    const orderItemsData = items.map((i: any) => {
      const dbItem = itemsMap.get(i.menuItemId);
      if (!dbItem) throw new Error(`Invalid item ID: ${i.menuItemId}`);
      const price = Number(dbItem.price);
      const lineTotal = price * i.quantity;
      calculatedSubtotal += lineTotal;

      return {
        menuItemId: i.menuItemId,
        quantity: i.quantity,
        unitPrice: price,
        lineTotal,
        notes: i.notes || null,
      };
    });

    const deliveryFee = type === "DELIVERY" ? 2.0 : 0.0;
    const taxAmount = Number((calculatedSubtotal * 0.05).toFixed(2));
    const totalAmount = Number((calculatedSubtotal + taxAmount + deliveryFee).toFixed(2));

    const orderNumber = `WAL-${Date.now().toString().slice(-6)}`;

    // Step 2: Create Order in NeonDB
    const order = await prisma.$transaction(
      async (tx) => {
        const newOrder = await tx.order.create({
          data: {
            orderNumber,
            type: type || "DELIVERY",
            subtotal: calculatedSubtotal,
            taxAmount,
            totalAmount,
            status: "PENDING",
            notes: `Customer: ${customerName} (${customerPhone}). Address: ${deliveryAddress || "N/A"}. Note: ${notes || "None"}`,
            orderItems: {
              create: orderItemsData,
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

        // Record Payment
        await tx.payment.create({
          data: {
            orderId: newOrder.id,
            method: paymentMethod || "EVC_PLUS",
            amount: totalAmount,
            status: paymentMethod === "CASH" ? "PENDING_CASH" : "COMPLETED",
          },
        });

        return newOrder;
      },
      { timeout: 25000, maxWait: 15000 }
    );

    await logAudit({
      action: "CUSTOMER_MOBILE_ORDER_PLACED",
      entityType: "ORDER",
      entityId: order.id,
      details: {
        orderNumber,
        customerName,
        customerPhone,
        totalAmount,
        type,
      },
    });

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        type: order.type,
        status: order.status,
        subtotal: calculatedSubtotal,
        deliveryFee,
        taxAmount,
        totalAmount,
        itemsCount: orderItemsData.length,
        createdAt: order.createdAt,
      },
    });
  } catch (error: any) {
    console.error("Customer Order Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to place order." },
      { status: 500 }
    );
  }
}
