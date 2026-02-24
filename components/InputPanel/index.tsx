"use client";

import { Loader2, Sparkles } from "lucide-react";
import { StyleOption, InputMode } from "@/types";
import StyleSelector from "./StyleSelector";
import TextDescriptionInput from "./TextDescriptionInput";
import FigmaImportInput from "./FigmaImportInput";

interface InputPanelProps {
  description: string;
  onDescriptionChange: (v: string) => void;
  figmaUrl: string;
  onFigmaUrlChange: (v: string) => void;
  figmaToken: string;
  onFigmaTokenChange: (v: string) => void;
  styleOption: StyleOption;
  onStyleOptionChange: (s: StyleOption) => void;
  inputMode: InputMode;
  onInputModeChange: (m: InputMode) => void;
  isLoading: boolean;
  onGenerate: () => void;
}

export default function InputPanel({
  description,
  onDescriptionChange,
  figmaUrl,
  onFigmaUrlChange,
  figmaToken,
  onFigmaTokenChange,
  styleOption,
  onStyleOptionChange,
  inputMode,
  onInputModeChange,
  isLoading,
  onGenerate,
}: InputPanelProps) {
  return (
    <div className="rounded-xl border border-gray-700 bg-gray-900 p-6">
      <h2 className="mb-6 text-lg font-semibold text-gray-100">
        Component Input
      </h2>

      {/* Mode Tabs */}
      <div className="mb-6 flex rounded-lg border border-gray-700 bg-gray-800 p-1">
        <button
          type="button"
          onClick={() => onInputModeChange("text")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
            inputMode === "text"
              ? "bg-indigo-600 text-white shadow"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Text Description
        </button>
        <button
          type="button"
          onClick={() => onInputModeChange("figma")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
            inputMode === "figma"
              ? "bg-indigo-600 text-white shadow"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Figma Import
        </button>
      </div>

      {/* Input Area */}
      <div className="mb-6">
        {inputMode === "text" ? (
          <TextDescriptionInput
            value={description}
            onChange={onDescriptionChange}
            disabled={isLoading}
          />
        ) : (
          <FigmaImportInput
            figmaUrl={figmaUrl}
            onFigmaUrlChange={onFigmaUrlChange}
            figmaToken={figmaToken}
            onFigmaTokenChange={onFigmaTokenChange}
            disabled={isLoading}
          />
        )}
      </div>

      {/* Style Selector */}
      <div className="mb-6">
        <p className="mb-3 text-sm font-medium text-gray-300">
          Styling Option
        </p>
        <StyleSelector selected={styleOption} onChange={onStyleOptionChange} />
      </div>

      {/* Generate Button */}
      <button
        type="button"
        onClick={onGenerate}
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            Generate Component
          </>
        )}
      </button>
    </div>
  );
}
