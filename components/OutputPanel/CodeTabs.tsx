"use client";

import { CodeTab } from "@/types";

interface CodeTabsProps {
  activeTab: CodeTab;
  onChange: (t: CodeTab) => void;
  hasCss: boolean;
}

const tabs: { id: CodeTab; label: string }[] = [
  { id: "preview", label: "Preview" },
  { id: "component", label: "Component (.tsx)" },
  { id: "types", label: "Types (.ts)" },
  { id: "story", label: "Story (.stories.tsx)" },
  { id: "test", label: "Test (.test.tsx)" },
  { id: "css", label: "CSS (.css)" },
];

export default function CodeTabs({
  activeTab,
  onChange,
  hasCss,
}: CodeTabsProps) {
  const visibleTabs = tabs.filter((t) => t.id !== "css" || hasCss);

  return (
    <div className="flex flex-wrap gap-1 border-b border-gray-700 pb-2">
      {visibleTabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
            activeTab === tab.id
              ? "bg-indigo-600 text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
