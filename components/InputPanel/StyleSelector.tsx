"use client";

import { StyleOption } from "@/types";

interface StyleSelectorProps {
  selected: StyleOption;
  onChange: (s: StyleOption) => void;
}

export default function StyleSelector({
  selected,
  onChange,
}: StyleSelectorProps) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => onChange("tailwind")}
        className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
          selected === "tailwind"
            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
            : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
        }`}
      >
        🌊 Tailwind CSS
      </button>
      <button
        type="button"
        onClick={() => onChange("basic-css")}
        className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
          selected === "basic-css"
            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
            : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
        }`}
      >
        🎨 Basic CSS
      </button>
    </div>
  );
}
