import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/rbac";
import { processOrderTransaction } from "@/lib/orderTransaction";

export async function POST(req: NextRequest) {
  try {
    // 1. Role-Based Access Control (Enforced on Server!)
    // Waiters and Cashiers and Admins can create orders, but only Cashier/Admin can settle
    const userSession = await requireRole(["CASHIER", "ADMIN", "SUPER_ADMIN", "WAITER"]);

    const body = await req.json();

    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: "Order must contain at least one item." },
        { status: 400 }
      );
    }

    // 2. Execute Atomic Transaction (Price calculation + Inventory + Double-entry accounting + Audit log)
    const order = await processOrderTransaction({
      tableId: body.tableId,
      type: body.type || "DINE_IN",
      waiterId: body.waiterId || (userSession.role === "WAITER" ? userSession.userId : undefined),
      cashierId: userSession.userId,
      branchId: userSession.branchId || undefined,
      paymentMethod: body.paymentMethod || "CASH",
      items: body.items,
    });

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        subtotal: order.subtotal,
        taxAmount: order.taxAmount,
        totalAmount: order.totalAmount,
        status: order.status,
        createdAt: order.createdAt,
      },
    });
  } catch (error: any) {
    console.error("Order Transaction Error:", error);
    if (error.name === "UnauthorizedError") {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    if (error.name === "ForbiddenError") {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    return NextResponse.json(
      { error: error.message || "Failed to process order transaction." },
      { status: 500 }
    );
  }
}
