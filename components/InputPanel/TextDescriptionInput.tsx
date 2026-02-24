"use client";

interface TextDescriptionInputProps {
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
}

export default function TextDescriptionInput({
  value,
  onChange,
  disabled,
}: TextDescriptionInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="description"
        className="text-sm font-medium text-gray-300"
      >
        Component Description
      </label>
      <textarea
        id="description"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        rows={8}
        placeholder="Describe your component... e.g., 'A pricing card with a title, price, feature list, and a CTA button with a hover effect'"
        className="w-full resize-none rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 font-mono text-sm text-gray-100 placeholder-gray-500 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
      />
      <p className="text-xs text-gray-500">
        Be as specific as possible for better results. Min. 10 characters.
      </p>
    </div>
  );
}
