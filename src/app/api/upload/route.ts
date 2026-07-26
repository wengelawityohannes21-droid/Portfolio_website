import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function optimizeImage(buffer: Buffer) {
  try {
    const sharp = (await import("sharp")).default;
    const image = sharp(buffer);
    const metadata = await image.metadata();
    const optimized = await image
      .resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 85 })
      .toBuffer();

    return {
      buffer: new Uint8Array(optimized),
      width: metadata.width,
      height: metadata.height,
      mimeType: "image/webp" as const,
      extension: ".webp",
    };
  } catch {
    return null;
  }
}

function encodeStoragePath(value: string) {
  return value.split("/").map(encodeURIComponent).join("/");
}

async function uploadToSupabase(
  objectPath: string,
  data: Uint8Array,
  contentType: string
) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const bucket = process.env.SUPABASE_STORAGE_BUCKET || "portfolio-media";

  if (!supabaseUrl || !serviceKey) return null;

  const encodedBucket = encodeURIComponent(bucket);
  const encodedPath = encodeStoragePath(objectPath);
  const response = await fetch(
    `${supabaseUrl}/storage/v1/object/${encodedBucket}/${encodedPath}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${serviceKey}`,
        apikey: serviceKey,
        "Content-Type": contentType,
        "x-upsert": "false",
      },
      body: Buffer.from(data),
    }
  );

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Supabase upload failed (${response.status}): ${detail}`);
  }

  return `${supabaseUrl}/storage/v1/object/public/${encodedBucket}/${encodedPath}`;
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = req.nextUrl.searchParams.get("folder") || "general";
    const alt = (formData.get("alt") as string) || "";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const safeFolder = folder.replace(/[^a-zA-Z0-9-_]/g, "");

    const ext = path.extname(file.name) || "";
    const baseName = path
      .basename(file.name, ext)
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .slice(0, 60);
    const filename = `${baseName}-${Date.now()}${ext || ".bin"}`;

    const buffer = Buffer.from(await file.arrayBuffer());
    let width: number | undefined;
    let height: number | undefined;
    let finalBuffer: Uint8Array = buffer;
    let mimeType = file.type || "application/octet-stream";
    let finalFilename = filename;

    if (mimeType.startsWith("image/")) {
      const optimized = await optimizeImage(buffer);
      if (optimized) {
        finalBuffer = optimized.buffer;
        width = optimized.width;
        height = optimized.height;
        mimeType = optimized.mimeType;
        finalFilename = filename.replace(/\.[^.]+$/, "") + optimized.extension;
      }
    }

    const objectPath = `${safeFolder}/${finalFilename}`;
    let url = await uploadToSupabase(objectPath, finalBuffer, mimeType);

    if (!url) {
      if (process.env.VERCEL) {
        return NextResponse.json(
          {
            error:
              "Cloud media storage is not configured. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel.",
          },
          { status: 503 }
        );
      }

      const uploadsDir = path.join(process.cwd(), "public", "uploads", safeFolder);
      await mkdir(uploadsDir, { recursive: true });
      const finalPath = path.join(uploadsDir, finalFilename);
      await writeFile(finalPath, finalBuffer);
      url = `/uploads/${safeFolder}/${finalFilename}`;
    }

    const asset = await prisma.mediaAsset.create({
      data: {
        filename: finalFilename,
        originalName: file.name,
        mimeType,
        size: finalBuffer.length,
        url,
        alt: alt || file.name,
        folder: safeFolder,
        width,
        height,
      },
    });

    return NextResponse.json(asset, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
