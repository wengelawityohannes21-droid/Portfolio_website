import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";
import { toJsonArray } from "@/lib/utils";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const profile = await prisma.profile.findFirst({ orderBy: { createdAt: "asc" } });
  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }
  return NextResponse.json(profile);
}

export async function PUT(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = await req.json();
    const existing = await prisma.profile.findFirst({ orderBy: { createdAt: "asc" } });

    if (!existing) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const data = { ...body };
    if ("typingPhrases" in data) {
      data.typingPhrases = toJsonArray(data.typingPhrases);
    }

    delete data.id;
    delete data.createdAt;
    delete data.updatedAt;

    const profile = await prisma.profile.update({
      where: { id: existing.id },
      data,
    });

    return NextResponse.json(profile);
  } catch {
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
