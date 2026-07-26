import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import {
  getDelegate,
  getListInclude,
  getListOrderBy,
  isAdminResource,
  normalizeResourceBody,
  type AdminResource,
} from "@/lib/admin-resources";
import { prisma } from "@/lib/prisma";

type RouteContext = { params: Promise<{ resource: string }> };

export async function GET(_req: NextRequest, context: RouteContext) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { resource: slug } = await context.params;
  if (!isAdminResource(slug)) {
    return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  }

  const resource = slug as AdminResource;
  const delegate = getDelegate(prisma, resource);

  const items = await delegate.findMany({
    ...getListInclude(resource),
    orderBy: getListOrderBy(resource),
  });

  return NextResponse.json(items);
}

export async function POST(req: NextRequest, context: RouteContext) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { resource: slug } = await context.params;
  if (!isAdminResource(slug)) {
    return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  }

  const resource = slug as AdminResource;

  try {
    const body = await req.json();
    const data = normalizeResourceBody(resource, body);
    const delegate = getDelegate(prisma, resource);

    if (resource === "drafts") {
      const { section, itemId, payload } = body as {
        section: string;
        itemId?: string;
        payload: unknown;
      };

      const existing = await prisma.draft.findFirst({
        where: itemId ? { section, itemId } : { section, itemId: null },
      });

      const draftPayload = {
        section,
        itemId: itemId ?? null,
        payload: typeof payload === "string" ? payload : JSON.stringify(payload),
      };

      const draft = existing
        ? await prisma.draft.update({
            where: { id: existing.id },
            data: draftPayload,
          })
        : await prisma.draft.create({ data: draftPayload });

      return NextResponse.json(draft, { status: existing ? 200 : 201 });
    }

    if (resource === "skill-categories" && data.sortOrder === undefined) {
      const count = await delegate.count();
      data.sortOrder = count;
    } else if (data.sortOrder === undefined && resource !== "messages" && resource !== "media") {
      const count = await delegate.count();
      data.sortOrder = count;
    }

    const item = await delegate.create({ data });
    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create item" }, { status: 500 });
  }
}
