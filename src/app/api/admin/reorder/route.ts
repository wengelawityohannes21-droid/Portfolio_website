import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import {
  getDelegate,
  isAdminResource,
  type AdminResource,
} from "@/lib/admin-resources";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const { resource, orderedIds } = (await req.json()) as {
      resource: string;
      orderedIds: string[];
    };

    if (!isAdminResource(resource) || !Array.isArray(orderedIds)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const delegate = getDelegate(prisma, resource as AdminResource);

    await Promise.all(
      orderedIds.map((id, index) =>
        delegate.update({
          where: { id },
          data: { sortOrder: index },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to reorder" }, { status: 500 });
  }
}
