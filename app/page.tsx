"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import InputPanel from "@/components/InputPanel";
import OutputPanel from "@/components/OutputPanel";
import DownloadPanel from "@/components/DownloadPanel";
import { GeneratedComponent, StyleOption, InputMode, CodeTab } from "@/types";

export default function Home() {
  const [description, setDescription] = useState("");
  const [figmaUrl, setFigmaUrl] = useState("");
  const [figmaToken, setFigmaToken] = useState("");
  const [styleOption, setStyleOption] = useState<StyleOption>("tailwind");
  const [inputMode, setInputMode] = useState<InputMode>("text");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedComponent, setGeneratedComponent] =
    useState<GeneratedComponent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<CodeTab>("component");

  const handleGenerate = async () => {
    setError(null);
    setIsLoading(true);

    try {
      let finalDescription = description;

      if (inputMode === "figma") {
        const figmaRes = await fetch("/api/figma-import", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ figmaUrl, accessToken: figmaToken }),
        });
        const figmaData = (await figmaRes.json()) as
          | { description: string }
          | { error: string };
        if (!figmaRes.ok) {
          throw new Error(
            "error" in figmaData ? figmaData.error : "Failed to import Figma file"
          );
        }
        finalDescription = (figmaData as { description: string }).description;
      }

      const genRes = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: finalDescription, styleOption }),
      });

      const genData = (await genRes.json()) as
        | GeneratedComponent
        | { error: string };

      if (!genRes.ok) {
        throw new Error(
          "error" in genData ? genData.error : "Failed to generate component"
        );
      }

      setGeneratedComponent(genData as GeneratedComponent);
      setActiveTab("component");
      toast.success("Component generated successfully!");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                AI Component Generator
              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-400 sm:text-xl">
              Transform natural language or Figma designs into production-ready
              React components
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-400">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left Column: Input */}
          <div className="flex flex-col gap-6">
            <InputPanel
              description={description}
              onDescriptionChange={setDescription}
              figmaUrl={figmaUrl}
              onFigmaUrlChange={setFigmaUrl}
              figmaToken={figmaToken}
              onFigmaTokenChange={setFigmaToken}
              styleOption={styleOption}
              onStyleOptionChange={setStyleOption}
              inputMode={inputMode}
              onInputModeChange={setInputMode}
              isLoading={isLoading}
              onGenerate={handleGenerate}
            />
          </div>

          {/* Right Column: Output + Download */}
          <div className="flex flex-col gap-6">
            <OutputPanel
              generatedComponent={generatedComponent}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
            <DownloadPanel generatedComponent={generatedComponent} />
          </div>
        </div>
      </main>
    </div>
  );
}
