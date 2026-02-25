# AI Component Generator

An AI-powered React component generator built with **Next.js 14+**, **TypeScript**, and **OpenAI GPT-4o**. Transform natural language descriptions or Figma designs into production-ready React components with TypeScript types, Storybook stories, unit tests, and downloadable ZIP files.

---

## Features

- 🤖 **AI-Powered Generation** — Uses OpenAI GPT-4o to generate complete, production-ready React components
- 📝 **Natural Language Input** — Describe your component in plain English
- 🎨 **Figma Import** — Import designs directly from Figma files via the Figma REST API
- 🌊 **Tailwind CSS or Basic CSS** — Choose your preferred styling approach
- 📦 **Complete Output** — Generates the component, TypeScript types, Storybook story, and unit tests
- 💾 **ZIP Download** — Download all generated files as a ZIP archive
- 🌑 **Dark Theme** — Sleek dark UI with syntax-highlighted code preview

---

## Screenshots

> _Add screenshots here_

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- An [OpenAI API key](https://platform.openai.com/api-keys)

### Installation

```bash
# Clone the repository
git clone https://github.com/rutujafaldu/UI-component-generator.git
cd UI-component-generator

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env.local and add your AZURE_OPENAI_API_KEY/OPENAI_API_KEY

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

| Variable         | Description                                | Required |
| ---------------- | ------------------------------------------ | -------- |
| `OPENAI_API_KEY` | Your OpenAI API key (GPT-4o access needed) | ✅       |

---

## How to Use

### Text Description Mode

1. Select **Text Description** tab in the input panel
2. Type a detailed description of the component you want to generate
3. Choose your styling preference: **Tailwind CSS** or **Basic CSS**
4. Click **Generate Component**
5. Browse the generated files using the code tabs
6. Click **Download ZIP** to download all files

### Figma Import Mode

1. Select **Figma Import** tab in the input panel
2. Paste your Figma file URL (e.g., `https://www.figma.com/file/abc123/...`)
3. Enter your [Figma Personal Access Token](https://www.figma.com/settings)
4. Choose your styling preference and click **Generate Component**

---

## Tech Stack

| Technology               | Purpose                     |
| ------------------------ | --------------------------- |
| Next.js 15 (App Router)  | Framework                   |
| TypeScript (strict)      | Language                    |
| OpenAI GPT-4o            | AI component generation     |
| Figma REST API           | Design import               |
| Tailwind CSS             | App UI styling              |
| react-syntax-highlighter | Code highlighting           |
| prettier                 | Server-side code formatting |
| jszip                    | ZIP file generation         |
| lucide-react             | Icons                       |
| react-hot-toast          | Notifications               |

---

## Project Structure

```
UI-component-generator/
├── app/
│   ├── page.tsx                   # Main page
│   ├── layout.tsx                 # Root layout
│   ├── globals.css                # Global styles
│   └── api/
│       ├── generate/route.ts      # Component generation API
│       └── figma-import/route.ts  # Figma import API
├── components/
│   ├── InputPanel/                # Input section components
│   ├── OutputPanel/               # Code output components
│   └── DownloadPanel/             # ZIP download component
├── lib/
│   ├── ai/                        # OpenAI integration + prompts
│   ├── figma/                     # Figma API parser
│   ├── codegen/                   # Code formatting utilities
│   └── zip/                       # ZIP generation utility
├── types/
│   └── index.ts                   # Shared TypeScript types
├── .env.example                   # Environment variable template
└── README.md
```

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## License

MIT
