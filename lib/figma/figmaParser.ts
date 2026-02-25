interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
  fills?: Array<{
    type: string;
    color?: { r: number; g: number; b: number; a: number };
  }>;
  style?: Record<string, unknown>;
  absoluteBoundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  cornerRadius?: number;
  characters?: string;
}

export async function parseFigmaFile(
  figmaUrl: string,
  accessToken: string
): Promise<string> {
  const fileKeyMatch = figmaUrl.match(
    /figma\.com\/(?:file|design)\/([a-zA-Z0-9_-]+)/
  );
  if (!fileKeyMatch)
    throw new Error(
      "Invalid Figma URL. Please provide a valid Figma file or design URL."
    );

  const fileKey = fileKeyMatch[1];

  const response = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
    headers: { "X-Figma-Token": accessToken },
  });

  if (!response.ok) {
    const error = (await response.json()) as { message?: string };
    throw new Error(
      `Figma API error: ${error.message || response.statusText}`
    );
  }

  const data = (await response.json()) as {
    document: FigmaNode;
    name: string;
  };
  return traverseFigmaDocument(data.document, data.name);
}

function traverseFigmaDocument(
  document: FigmaNode,
  fileName: string
): string {
  const components: string[] = [];
  collectComponents(document, components);

  if (components.length === 0) {
    return `A React component based on the Figma file "${fileName}". Create a clean, modern UI component.`;
  }

  return `A React component based on the Figma design "${fileName}". The design includes: ${components
    .slice(0, 5)
    .join(
      ", "
    )}. Create a polished, production-ready component that matches this structure.`;
}

function collectComponents(node: FigmaNode, result: string[]): void {
  if (
    node.type === "COMPONENT" ||
    node.type === "FRAME" ||
    node.type === "GROUP"
  ) {
    const size = node.absoluteBoundingBox
      ? ` (${Math.round(node.absoluteBoundingBox.width)}x${Math.round(
          node.absoluteBoundingBox.height
        )}px)`
      : "";
    result.push(`${node.name}${size}`);
  }
  if (node.children) {
    node.children.forEach((child) => collectComponents(child, result));
  }
}
