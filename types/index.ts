export type StyleOption = "tailwind" | "basic-css";

export type InputMode = "text" | "figma";

export interface GeneratedComponent {
  componentName: string;
  componentCode: string;
  typesCode: string;
  storyCode: string;
  testCode: string;
  cssCode: string | null;
}

export type CodeTab = "component" | "types" | "story" | "test" | "css";

export interface GenerateRequest {
  description: string;
  styleOption: StyleOption;
}

export interface FigmaImportRequest {
  figmaUrl: string;
  accessToken: string;
}
