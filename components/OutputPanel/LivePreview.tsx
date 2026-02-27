"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  RefreshCw,
  Maximize2,
  Minimize2,
  X,
} from "lucide-react";

interface LivePreviewProps {
  componentCode: string;
  cssCode: string | null;
  componentName: string;
  styleOption: "tailwind" | "basic-css";
}

export default function LivePreview({
  componentCode,
  cssCode,
  componentName,
  styleOption,
}: LivePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setError(null);
  }, [componentCode, cssCode, key]);

  function buildSrcdoc(): string {
    const tailwindCdn =
      styleOption === "tailwind"
        ? '<script src="https://cdn.tailwindcss.com"><\/script>'
        : "";

    const cssBlock = cssCode
      ? `<style>${cssCode
          .replace(/:local\(/g, ":is(.")
          .replace(/\.module\.css/g, "")}</style>`
      : "";

    // Escape the component code so it can be safely embedded in a JS string
    const escapedCode = componentCode
      .replace(/\\/g, "\\\\")
      .replace(/`/g, "\\`")
      .replace(/\$/g, "\\$");

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  ${tailwindCdn}
  <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin><\/script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin><\/script>
  <script src="https://unpkg.com/@babel/standalone@7/babel.min.js"><\/script>
  ${cssBlock}
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 24px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f9fafb;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
    }
    #root {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      width: 100%;
    }
    .preview-error {
      color: #ef4444;
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 8px;
      padding: 16px;
      font-size: 14px;
      max-width: 100%;
      word-break: break-word;
    }
    .preview-label {
      font-size: 11px;
      color: #9ca3af;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-top: 8px;
    }
  </style>
</head>
<body>
  <div id="root"><div style="color:#999;font-size:14px;">Loading preview...</div></div>
  <script>
    window.onerror = function(msg, src, line, col, err) {
      var m = err ? err.message : String(msg);
      document.getElementById('root').innerHTML =
        '<div class="preview-error"><strong>Preview Error:</strong> ' +
        m.replace(/</g, '&lt;') + '</div>';
      window.parent.postMessage({ type: 'preview-error', message: m }, '*');
      return true;
    };
  <\/script>
  <script>
    (function() {
      // Provide a mock styles object for CSS module imports
      window.__styles = new Proxy({}, {
        get: function(target, name) { return String(name); }
      });

      // The raw component TSX code
      var rawCode = \`${escapedCode}\`;

      // Remove import lines (we provide everything globally)
      // Handle all imports (single-line and multi-line) that end with from '...'
      rawCode = rawCode.replace(/^import\\s[\\s\\S]*?\\sfrom\\s+['"][^'"]*['"];?\\s*$/gm, '');
      // Handle side-effect imports: import 'something';
      rawCode = rawCode.replace(/^import\\s+['"][^'"]*['"];?\\s*$/gm, '');

      // Remove all export patterns
      // "export default function/const/class ..." -> keep the declaration
      rawCode = rawCode.replace(/export\\s+default\\s+(?=(?:function|const|class|let|var)\\b)/g, '');
      // "export default ComponentName;" -> remove entire line
      rawCode = rawCode.replace(/^export\\s+default\\s+[A-Za-z_$][A-Za-z0-9_$]*\\s*;?\\s*$/gm, '');
      // "export { X }" or "export { X as default }" -> remove entire line
      rawCode = rawCode.replace(/^export\\s*\\{[^}]*\\}\\s*;?\\s*$/gm, '');
      // "export const/function/class/interface/type/enum ..." -> keep the declaration
      rawCode = rawCode.replace(/export\\s+(?=(?:const|function|class|interface|type|enum|let|var)\\b)/g, '');

      // Add wrapper: expose React hooks globally and provide styles variable
      var wrappedCode = \`
        var React = window.React;
        var ReactDOM = window.ReactDOM;
        var useState = React.useState;
        var useEffect = React.useEffect;
        var useRef = React.useRef;
        var useCallback = React.useCallback;
        var useMemo = React.useMemo;
        var useId = React.useId;
        var useReducer = React.useReducer;
        var useLayoutEffect = React.useLayoutEffect;
        var useImperativeHandle = React.useImperativeHandle;
        var useDebugValue = React.useDebugValue;
        var useDeferredValue = React.useDeferredValue;
        var useTransition = React.useTransition;
        var useSyncExternalStore = React.useSyncExternalStore;
        var useInsertionEffect = React.useInsertionEffect;
        var forwardRef = React.forwardRef;
        var createContext = React.createContext;
        var useContext = React.useContext;
        var Fragment = React.Fragment;
        var memo = React.memo;
        var cloneElement = React.cloneElement;
        var Children = React.Children;
        var lazy = React.lazy;
        var Suspense = React.Suspense;
        var startTransition = React.startTransition;
        var createElement = React.createElement;
        var isValidElement = React.isValidElement;
        var styles = window.__styles;

        \` + rawCode;

      // Transpile TSX to JS using Babel
      var output;
      try {
        output = Babel.transform(wrappedCode, {
          presets: [
            ['typescript', { isTSX: true, allExtensions: true }],
            'react'
          ],
          filename: 'component.tsx',
        }).code;
      } catch(e) {
        document.getElementById('root').innerHTML =
          '<div class="preview-error"><strong>Babel Error:</strong> ' +
          e.message.replace(/</g, '&lt;') + '</div>';
        window.parent.postMessage({ type: 'preview-error', message: e.message }, '*');
        return;
      }

      // Helper: check if something is a valid React component
      // (function, forwardRef object, memo object, etc.)
      function isValidComponent(c) {
        if (!c) return false;
        if (typeof c === 'function') return true;
        // forwardRef and memo return objects with $$typeof
        if (typeof c === 'object' && c.$$typeof) return true;
        return false;
      }

      // Append a line to assign the component to window INSIDE the eval scope
      // This is necessary because Babel adds "use strict" which prevents
      // eval'd var declarations from leaking into the outer scope
      var componentNames = ['${componentName}'];
      // Also extract all PascalCase declarations from the transpiled output
      var declMatches = (output.match(/(?:var|let|const)\\s+([A-Z][A-Za-z0-9]+)\\s*=/g) || []);
      for (var di = 0; di < declMatches.length; di++) {
        var dname = declMatches[di].replace(/(?:var|let|const)\\s+/, '').replace(/\\s*=$/, '');
        if (componentNames.indexOf(dname) === -1) componentNames.push(dname);
      }

      // Build the assignment code: try each name and assign the first valid one
      var assignCode = '\\n;(function() {';
      for (var ci = 0; ci < componentNames.length; ci++) {
        assignCode += '\\ntry { if (typeof ' + componentNames[ci] + ' !== "undefined") window["__COMP_' + componentNames[ci] + '"] = ' + componentNames[ci] + '; } catch(e) {}';
      }
      assignCode += '\\n})();';

      // Execute the transpiled code + assignment
      try {
        eval(output + assignCode);
      } catch(e) {
        document.getElementById('root').innerHTML =
          '<div class="preview-error"><strong>Runtime Error:</strong> ' +
          e.message.replace(/</g, '&lt;') + '</div>';
        window.parent.postMessage({ type: 'preview-error', message: e.message }, '*');
        return;
      }

      // Find the component from window globals
      var Comp = window['__COMP_${componentName}'];
      if (!isValidComponent(Comp)) {
        // Try other PascalCase names
        for (var ci2 = 0; ci2 < componentNames.length; ci2++) {
          var candidate = window['__COMP_' + componentNames[ci2]];
          if (isValidComponent(candidate)) { Comp = candidate; break; }
        }
      }

      if (!isValidComponent(Comp)) {
        document.getElementById('root').innerHTML =
          '<div class="preview-error"><strong>Error:</strong> Could not find a valid React component named \\'${componentName}\\' to render.</div>';
        window.parent.postMessage({ type: 'preview-error', message: 'Could not find component ${componentName}' }, '*');
        return;
      }

      // Render the component with multiple variants using ErrorBoundary
      // so individual variant failures don't crash everything

      // ErrorBoundary class to catch render errors per-variant
      var ErrorBoundary = (function() {
        function EB(props) {
          this.state = { hasError: false, error: null };
          this.props = props;
        }
        EB.prototype = Object.create(React.Component.prototype);
        EB.prototype.constructor = EB;
        EB.getDerivedStateFromError = function(error) {
          return { hasError: true, error: error };
        };
        EB.prototype.render = function() {
          if (this.state.hasError) {
            return React.createElement('div', {
              style: { color: '#f59e0b', fontSize: '12px', padding: '4px 8px', background: '#fefce8', borderRadius: '4px', border: '1px solid #fde68a' }
            }, 'Variant error: ' + (this.state.error ? this.state.error.message : 'unknown'));
          }
          return this.props.children;
        };
        return EB;
      })();

      // noop function for event handler props
      var noop = function() {};
      var defaultHandlers = {
        onClick: noop, onChange: noop, onSubmit: noop, onFocus: noop,
        onBlur: noop, onMouseEnter: noop, onMouseLeave: noop,
        onKeyDown: noop, onKeyUp: noop, onClose: noop, onOpen: noop,
        onToggle: noop, onSelect: noop, onInput: noop,
      };

      // Helper to render a single variant wrapped in ErrorBoundary
      function variant(label, props) {
        return [
          React.createElement('div', { className: 'preview-label', key: label + '-label' }, label),
          React.createElement(ErrorBoundary, { key: label + '-eb' },
            React.createElement(Comp, Object.assign({}, defaultHandlers, props))
          )
        ];
      }

      var root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(
        React.createElement('div', {
          style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '100%' }
        },
          variant('Default', { label: 'Click me' }),
          variant('With Children', { children: 'Click me' }),
          variant('Small', { size: 'sm', label: 'Small', children: 'Small' }),
          variant('Large', { size: 'lg', label: 'Large', children: 'Large' }),
          variant('Disabled', { disabled: true, label: 'Disabled', children: 'Disabled' }),
          variant('Loading', { loading: true, isLoading: true, label: 'Loading', children: 'Loading' }),
        )
      );
    })();
  <\/script>
</body>
</html>`;
  }

  // Listen for errors from iframe
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type === "preview-error") {
        setError(event.data.message);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">Live Preview</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setKey((k) => k + 1)}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
            title="Reload preview"
          >
            <RefreshCw className="h-3 w-3" />
          </button>
          <button
            type="button"
            onClick={() => setIsFullscreen((f) => !f)}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? (
              <Minimize2 className="h-3 w-3" />
            ) : (
              <Maximize2 className="h-3 w-3" />
            )}
          </button>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-3 py-2 text-xs text-yellow-400">
          <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" />
          <span>Preview may be incomplete: {error}</span>
        </div>
      )}

      {/* Iframe */}
      <div
        className={`overflow-hidden rounded-lg border border-gray-700 bg-white transition-all ${
          isFullscreen ? "fixed inset-4 z-50 shadow-2xl" : "relative h-[400px]"
        }`}
      >
        {isFullscreen && (
          <button
            type="button"
            onClick={() => setIsFullscreen(false)}
            className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-lg bg-gray-900/80 px-3 py-1.5 text-xs font-medium text-white shadow-lg backdrop-blur transition-colors hover:bg-gray-900"
            title="Exit fullscreen"
          >
            <X className="h-3.5 w-3.5" />
            Close
          </button>
        )}
        <iframe
          key={key}
          ref={iframeRef}
          srcDoc={buildSrcdoc()}
          title="Component Preview"
          sandbox="allow-scripts"
          className="h-full w-full border-0"
        />
      </div>
    </div>
  );
}
