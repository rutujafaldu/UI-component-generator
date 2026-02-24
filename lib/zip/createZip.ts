import JSZip from "jszip";
import { GeneratedComponent } from "@/types";

export async function createComponentZip(
  component: GeneratedComponent
): Promise<Blob> {
  const zip = new JSZip();
  const folder = zip.folder(component.componentName)!;

  folder.file(`${component.componentName}.tsx`, component.componentCode);
  folder.file(`${component.componentName}.types.ts`, component.typesCode);
  folder.file(`${component.componentName}.stories.tsx`, component.storyCode);
  folder.file(`${component.componentName}.test.tsx`, component.testCode);

  if (component.cssCode) {
    folder.file(`${component.componentName}.module.css`, component.cssCode);
  }

  // Add an index.ts barrel file
  folder.file(
    "index.ts",
    `export { default, ${component.componentName} } from './${component.componentName}';\nexport type * from './${component.componentName}.types';\n`
  );

  return await zip.generateAsync({ type: "blob" });
}
