import prettier from "prettier/standalone";
import parserTypescript from "prettier/plugins/typescript";
import parserEstree from "prettier/plugins/estree";
import parserCss from "prettier/plugins/postcss";

export async function formatTypeScript(code: string): Promise<string> {
  try {
    return await prettier.format(code, {
      parser: "typescript",
      plugins: [parserTypescript, parserEstree],
      semi: true,
      singleQuote: false,
      trailingComma: "es5",
      printWidth: 100,
      tabWidth: 2,
    });
  } catch {
    return code; // Return unformatted if prettier fails
  }
}

export async function formatCss(code: string): Promise<string> {
  try {
    return await prettier.format(code, {
      parser: "css",
      plugins: [parserCss],
      tabWidth: 2,
    });
  } catch {
    return code;
  }
}
