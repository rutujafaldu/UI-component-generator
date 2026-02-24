"use client";

import { Code2 } from "lucide-react";
import { GeneratedComponent, CodeTab } from "@/types";
import CodeTabs from "./CodeTabs";
import CodePreview from "./CodePreview";

interface OutputPanelProps {
  generatedComponent: GeneratedComponent | null;
  activeTab: CodeTab;
  onTabChange: (t: CodeTab) => void;
}

function getCodeForTab(
  component: GeneratedComponent,
  tab: CodeTab
): { code: string; language: string } {
  switch (tab) {
    case "component":
      return { code: component.componentCode, language: "tsx" };
    case "types":
      return { code: component.typesCode, language: "typescript" };
    case "story":
      return { code: component.storyCode, language: "tsx" };
    case "test":
      return { code: component.testCode, language: "tsx" };
    case "css":
      return { code: component.cssCode ?? "", language: "css" };
  }
}

export default function OutputPanel({
  generatedComponent,
  activeTab,
  onTabChange,
}: OutputPanelProps) {
  return (
    <div className="rounded-xl border border-gray-700 bg-gray-900 p-6">
      <h2 className="mb-6 text-lg font-semibold text-gray-100">
        Generated Output
      </h2>

      {!generatedComponent ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-gray-700 bg-gray-800/50 py-16 text-center">
          <Code2 className="h-12 w-12 text-gray-600" />
          <div>
            <p className="text-gray-400">Your generated component will appear here</p>
            <p className="mt-1 text-sm text-gray-600">
              Enter a description and click {'"Generate Component"'} to get started
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-indigo-600/20 px-2 py-1 text-xs font-mono font-medium text-indigo-400">
              {generatedComponent.componentName}
            </span>
          </div>
          <CodeTabs
            activeTab={activeTab}
            onChange={onTabChange}
            hasCss={!!generatedComponent.cssCode}
          />
          <CodePreview
            key={activeTab}
            {...getCodeForTab(generatedComponent, activeTab)}
          />
        </div>
      )}
    </div>
  );
}
