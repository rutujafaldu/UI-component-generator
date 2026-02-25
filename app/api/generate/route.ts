import { NextRequest, NextResponse } from "next/server";
import { generateComponent } from "@/lib/ai/generateComponent";
import { GenerateRequest } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body: GenerateRequest = await req.json();
    const { description, styleOption } = body;

    if (!description || description.trim().length < 10) {
      return NextResponse.json(
        {
          error:
            "Please provide a more detailed description (at least 10 characters).",
        },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key is not configured." },
        { status: 500 }
      );
    }

    const component = await generateComponent(description, styleOption);
    return NextResponse.json(component);
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate component",
      },
      { status: 500 }
    );
  }
}
