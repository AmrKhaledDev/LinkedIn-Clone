import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";
// ====================================================================
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;
    const pathname = formData.get("pathname") as string;

    if (!file)
      return NextResponse.json({ error: "No File Uploaded" }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer()).toString("base64");

    const isVideo = file.type.startsWith("video");

    const result = await cloudinary.uploader.upload(
      `data:${file.type};base64,${buffer}`,
      {
        folder: pathname,
        resource_type: isVideo ? "video" : "image",
      }
    );

    return NextResponse.json(
      { url: result.secure_url, type: isVideo ? "video" : "image" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
