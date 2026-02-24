import OpenAI from "openai";
import { GeneratedComponent, StyleOption } from "@/types";
import { buildTailwindPrompt } from "./prompts/tailwindPrompt";
import { buildBasicCssPrompt } from "./prompts/basicCssPrompt";

export async function generateComponent(
  description: string,
  styleOption: StyleOption
): Promise<GeneratedComponent> {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const prompt =
    styleOption === "tailwind"
      ? buildTailwindPrompt(description)
      : buildBasicCssPrompt(description);

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.4,
    response_format: { type: "json_object" },
  });

  const content = response.choices[0].message.content;
  if (!content) throw new Error("No content returned from OpenAI");

  const parsed = JSON.parse(content) as GeneratedComponent;

  // Validate required fields
  if (!parsed.componentName || !parsed.componentCode) {
    throw new Error("Invalid response structure from AI");
  }

  return parsed;
}
