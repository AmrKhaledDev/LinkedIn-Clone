import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// =============================================================
export async function GET(req: NextRequest) {
  const searchText = req.nextUrl.searchParams.get("q")?.toLowerCase().trim();
  if (!searchText) return NextResponse.json([], { status: 200 });
  try {
    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: searchText,
          mode: "insensitive",
        },
      },
      take: 10,
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed Search try again later" },
      { status: 500 }
    );
  }
}
