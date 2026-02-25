//import OpenAI from "openai";
import { AzureOpenAI } from "openai";
import { GeneratedComponent, StyleOption } from "@/types";
import { buildTailwindPrompt } from "./prompts/tailwindPrompt";
import { buildBasicCssPrompt } from "./prompts/basicCssPrompt";

const endpoint = "https://arjundpatel-0991-resource.cognitiveservices.azure.com/";
const modelName = "o4-mini";
const deployment = "o4-mini";

export async function generateComponent(
  description: string,
  styleOption: StyleOption
): Promise<GeneratedComponent> {
  //const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const apiKey = process.env.AZURE_OPENAI_API_KEY;
  const apiVersion = "2025-04-01-preview";
  const options = { endpoint, apiKey, deployment, apiVersion }

  const client = new AzureOpenAI(options);

  const prompt =
    styleOption === "tailwind"
      ? buildTailwindPrompt(description)
      : buildBasicCssPrompt(description);

  const response = await client.chat.completions.create({
    model: modelName,
    messages: [{ role: "user", content: prompt }],
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
