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
    const uploadsDir = path.join(process.cwd(), "public", "uploads", safeFolder);
    await mkdir(uploadsDir, { recursive: true });

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

    const finalPath = path.join(uploadsDir, finalFilename);
    await writeFile(finalPath, finalBuffer);

    const url = `/uploads/${safeFolder}/${finalFilename}`;

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
