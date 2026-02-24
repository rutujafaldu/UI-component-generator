import { NextRequest, NextResponse } from "next/server";
import { parseFigmaFile } from "@/lib/figma/figmaParser";
import { FigmaImportRequest } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body: FigmaImportRequest = await req.json();
    const { figmaUrl, accessToken } = body;

    if (!figmaUrl) {
      return NextResponse.json(
        { error: "Figma URL is required." },
        { status: 400 }
      );
    }
    if (!accessToken) {
      return NextResponse.json(
        { error: "Figma access token is required." },
        { status: 400 }
      );
    }

    const description = await parseFigmaFile(figmaUrl, accessToken);
    return NextResponse.json({ description });
  } catch (error) {
    console.error("Figma import error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to import Figma file",
      },
      { status: 500 }
    );
  }
}
