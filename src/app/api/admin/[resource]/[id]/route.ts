import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import {
  getDelegate,
  getListInclude,
  isAdminResource,
  normalizeResourceBody,
  type AdminResource,
} from "@/lib/admin-resources";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ resource: string; id: string }> };

export async function GET(_req: NextRequest, context: RouteContext) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { resource: slug, id } = await context.params;
  if (!isAdminResource(slug)) {
    return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  }

  const resource = slug as AdminResource;
  const delegate = getDelegate(prisma, resource);

  const item = await delegate.findUnique({
    where: { id },
    ...getListInclude(resource),
  });

  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(item);
}

export async function PUT(req: NextRequest, context: RouteContext) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { resource: slug, id } = await context.params;
  if (!isAdminResource(slug)) {
    return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  }

  const resource = slug as AdminResource;

  try {
    const body = await req.json();
    const data = normalizeResourceBody(resource, body);
    const delegate = getDelegate(prisma, resource);

    const item = await delegate.update({
      where: { id },
      data,
    });

    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: "Failed to update item" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { resource: slug, id } = await context.params;
  if (!isAdminResource(slug)) {
    return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  }

  const resource = slug as AdminResource;

  try {
    const body = await req.json();
    const delegate = getDelegate(prisma, resource);

    if (body.action === "publish") {
      const item = await delegate.update({
        where: { id },
        data: { published: !!body.published },
      });
      return NextResponse.json(item);
    }

    if (body.action === "read" && resource === "messages") {
      const item = await delegate.update({
        where: { id },
        data: { read: !!body.read },
      });
      return NextResponse.json(item);
    }

    if (body.action === "reorder") {
      const current = (await delegate.findUnique({ where: { id } })) as {
        sortOrder: number;
      } | null;
      if (!current) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }

      const direction = body.direction === "up" ? -1 : 1;
      const newOrder = Math.max(0, current.sortOrder + direction);

      const item = await delegate.update({
        where: { id },
        data: { sortOrder: newOrder },
      });
      return NextResponse.json(item);
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Failed to patch item" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, context: RouteContext) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { resource: slug, id } = await context.params;
  if (!isAdminResource(slug)) {
    return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  }

  const resource = slug as AdminResource;

  try {
    const delegate = getDelegate(prisma, resource);
    await delegate.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}
