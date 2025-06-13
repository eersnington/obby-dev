import type React from "react";
import { useEffect, useRef } from "react";
import { EditorView, keymap, lineNumbers } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { json } from "@codemirror/lang-json";
import { python } from "@codemirror/lang-python";
import { markdown } from "@codemirror/lang-markdown";
import { cpp } from "@codemirror/lang-cpp";
import { rust } from "@codemirror/lang-rust";
import { defaultKeymap } from "@codemirror/commands";
import { oneDark } from "@codemirror/theme-one-dark";
import { useTheme } from "next-themes";

export interface EditorDocument {
  filePath: string;
  value: string;
  scroll?: {
    left: number;
    top: number;
  };
}

export type OnChangeCallback = (update: { content: string }) => void;
export type OnScrollCallback = (position: {
  left: number;
  top: number;
}) => void;
export type OnSaveCallback = () => void;

interface CodeMirrorEditorProps {
  doc?: EditorDocument;
  theme?: "light" | "dark";
  editable?: boolean;
  autoFocusOnDocumentChange?: boolean;
  onScroll?: OnScrollCallback;
  onChange?: OnChangeCallback;
  onSave?: OnSaveCallback;
  className?: string;
}

const languageExtensions = {
  javascript,
  typescript: () => javascript({ jsx: true, typescript: true }),
  jsx: () => javascript({ jsx: true }),
  tsx: () => javascript({ jsx: true, typescript: true }),
  html,
  css,
  json,
  python,
  markdown,
  cpp,
  rust,
};

function getLanguageExtension(filePath: string) {
  const extension = filePath.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "js":
      return languageExtensions.javascript();
    case "ts":
      return languageExtensions.typescript();
    case "jsx":
      return languageExtensions.jsx();
    case "tsx":
      return languageExtensions.tsx();
    case "html":
      return languageExtensions.html();
    case "css":
      return languageExtensions.css();
    case "json":
      return languageExtensions.json();
    case "py":
      return languageExtensions.python();
    case "md":
      return languageExtensions.markdown();
    case "cpp":
      return languageExtensions.cpp();
    case "rs":
      return languageExtensions.rust();
    default:
      return languageExtensions.typescript();
  }
}

export const CodeMirrorEditor: React.FC<CodeMirrorEditorProps> = ({
  doc,
  editable = true,
  autoFocusOnDocumentChange = true,
  onScroll,
  onChange,
  onSave,
  className,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!editorRef.current) return;

    const state = EditorState.create({
      doc: doc?.value ?? "",
      extensions: [
        lineNumbers(),
        getLanguageExtension(doc?.filePath ?? ""),
        theme === "dark" ? oneDark : [],
        keymap.of([
          ...defaultKeymap,
          {
            key: "Mod-s",
            run: () => {
              onSave?.();
              return true;
            },
          },
        ]),
        EditorView.updateListener.of((update) => {
          if (update.docChanged && onChange) {
            onChange({ content: update.state.doc.toString() });
          }
        }),
        EditorView.domEventHandlers({
          scroll() {
            if (onScroll && viewRef.current) {
              onScroll({
                left: viewRef.current.scrollDOM.scrollLeft,
                top: viewRef.current.scrollDOM.scrollTop,
              });
            }
          },
        }),
        EditorView.editable.of(editable),
      ],
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, [theme, editable, onSave, doc?.filePath, onChange, doc?.value, onScroll]);

  useEffect(() => {
    if (viewRef.current && doc) {
      const currentDoc = viewRef.current.state.doc.toString();
      if (currentDoc !== doc.value) {
        viewRef.current.dispatch({
          changes: { from: 0, to: currentDoc.length, insert: doc.value },
        });
      }

      if (doc.scroll) {
        viewRef.current.scrollDOM.scrollTo(doc.scroll.left, doc.scroll.top);
      }

      if (autoFocusOnDocumentChange) {
        viewRef.current.focus();
      }
    }
  }, [doc, autoFocusOnDocumentChange]);

  return <div ref={editorRef} className={className} />;
};
