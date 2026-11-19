import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        menuItems: {
          where: { available: true },
        },
      },
      orderBy: { code: "asc" },
    });

    return NextResponse.json({
      success: true,
      categories,
    });
  } catch (error: any) {
    console.error("Failed to fetch customer menu:", error);
    return NextResponse.json(
      { error: "Failed to load restaurant menu" },
      { status: 500 }
    );
  }
}
