import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  try {
    const { orderNumber } = await params;

    const order = await prisma.order.findUnique({
      where: { orderNumber },
      include: {
        orderItems: {
          include: {
            menuItem: true,
          },
        },
        payments: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        type: order.type,
        status: order.status,
        subtotal: order.subtotal,
        taxAmount: order.taxAmount,
        totalAmount: order.totalAmount,
        notes: order.notes,
        createdAt: order.createdAt,
        items: order.orderItems.map((item) => ({
          name: item.menuItem.name,
          nameSomali: item.menuItem.nameSomali,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          lineTotal: item.lineTotal,
        })),
        payment: order.payments[0] || null,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve order tracking information" },
      { status: 500 }
    );
  }
}
