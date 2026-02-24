export function buildBasicCssPrompt(description: string): string {
  return `You are an expert React and TypeScript developer. Generate a complete, production-ready React component based on the following description.

Description: "${description}"

STRICT REQUIREMENTS:
1. The component MUST be written in TypeScript with full, explicit type definitions.
2. Use a CSS Module file for all styling (import styles from './ComponentName.module.css').
3. Export a named component AND a default export.
4. Use functional components with React hooks where needed.
5. The component should be accessible (ARIA attributes where appropriate).
6. Make it visually polished and production-ready.

You MUST respond with ONLY a valid JSON object (no markdown, no code fences, no explanation) with EXACTLY these keys:
{
  "componentName": "PascalCaseName",
  "componentCode": "// full component .tsx file contents as a string (must import styles from './ComponentName.module.css')",
  "typesCode": "// TypeScript interfaces and types as a string",
  "storyCode": "// Storybook CSF3 story file contents as a string",
  "testCode": "// Jest + React Testing Library test file contents as a string",
  "cssCode": "/* CSS module file contents */"
}`;
}
