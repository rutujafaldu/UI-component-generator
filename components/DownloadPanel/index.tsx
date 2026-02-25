"use client";

import { Download } from "lucide-react";
import { GeneratedComponent } from "@/types";
import { createComponentZip } from "@/lib/zip/createZip";

interface DownloadPanelProps {
  generatedComponent: GeneratedComponent | null;
}

export default function DownloadPanel({
  generatedComponent,
}: DownloadPanelProps) {
  const handleDownload = async () => {
    if (!generatedComponent) return;

    const blob = await createComponentZip(generatedComponent);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${generatedComponent.componentName}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-xl border border-gray-700 bg-gray-900 p-4">
      <button
        type="button"
        onClick={handleDownload}
        disabled={!generatedComponent}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-600 bg-gray-800 px-6 py-3 text-sm font-medium text-gray-300 transition-all hover:border-gray-500 hover:bg-gray-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Download className="h-4 w-4" />
        Download ZIP
      </button>
      {generatedComponent && (
        <p className="mt-2 text-center text-xs text-gray-500">
          Downloads {generatedComponent.componentName} with component, types,
          story, test
          {generatedComponent.cssCode ? ", and CSS" : ""} files
        </p>
      )}
    </div>
  );
}
