"use client";

interface FigmaImportInputProps {
  figmaUrl: string;
  onFigmaUrlChange: (v: string) => void;
  figmaToken: string;
  onFigmaTokenChange: (v: string) => void;
  disabled: boolean;
}

export default function FigmaImportInput({
  figmaUrl,
  onFigmaUrlChange,
  figmaToken,
  onFigmaTokenChange,
  disabled,
}: FigmaImportInputProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="figmaUrl" className="text-sm font-medium text-gray-300">
          Figma File URL
        </label>
        <input
          id="figmaUrl"
          type="url"
          value={figmaUrl}
          onChange={(e) => onFigmaUrlChange(e.target.value)}
          disabled={disabled}
          placeholder="https://www.figma.com/file/..."
          className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-sm text-gray-100 placeholder-gray-500 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <p className="text-xs text-gray-500">
          Paste your Figma file URL (e.g.,
          https://www.figma.com/file/abc123/...)
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="figmaToken"
          className="text-sm font-medium text-gray-300"
        >
          Figma Personal Access Token
        </label>
        <input
          id="figmaToken"
          type="password"
          value={figmaToken}
          onChange={(e) => onFigmaTokenChange(e.target.value)}
          disabled={disabled}
          placeholder="figd_..."
          className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-sm text-gray-100 placeholder-gray-500 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <p className="text-xs text-gray-500">
          Your Figma Personal Access Token — generate one at{" "}
          <a
            href="https://www.figma.com/settings"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300"
          >
            figma.com/settings
          </a>
        </p>
      </div>
    </div>
  );
}
