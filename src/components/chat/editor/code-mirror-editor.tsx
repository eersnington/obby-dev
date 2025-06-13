"use client";

import { useEffect, useRef } from "react";
import { EditorState, Compartment, type Extension } from "@codemirror/state";
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLineGutter,
  highlightActiveLine,
  drawSelection,
  dropCursor,
} from "@codemirror/view";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import {
  autocompletion,
  closeBrackets,
  acceptCompletion,
} from "@codemirror/autocomplete";
import {
  bracketMatching,
  foldGutter,
  indentOnInput,
  indentUnit,
} from "@codemirror/language";
import { searchKeymap } from "@codemirror/search";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { json } from "@codemirror/lang-json";
import { markdown } from "@codemirror/lang-markdown";
import { rust } from "@codemirror/lang-rust";
import { sass } from "@codemirror/lang-sass";
import { vue } from "@codemirror/lang-vue";
import { wast } from "@codemirror/lang-wast";
import { vscodeDark, vscodeLight } from "@uiw/codemirror-theme-vscode";
import { useTheme } from "next-themes";
import { useEditorCode } from "@/stores/editor";
import { useFilePaths } from "@/stores/file-explorer";
import { editorTheme } from "./editor-theme";

const languageMapping: { [key: string]: () => Extension } = {
  ts: () => javascript({ typescript: true, jsx: true }),
  tsx: () => javascript({ typescript: true, jsx: true }),
  js: () => javascript({ jsx: true }),
  jsx: () => javascript({ jsx: true }),
  py: () => python(),
  cpp: () => cpp(),
  css: () => css(),
  html: () => html(),
  json: () => json(),
  md: () => markdown(),
  rs: () => rust(),
  sass: () => sass(),
  scss: () => sass(),
  vue: () => vue(),
  wat: () => wast(),
};

export function CodeMirrorEditorV2() {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const languageCompartmentRef = useRef(new Compartment());
  const themeCompartmentRef = useRef(new Compartment());

  const { filePaths } = useFilePaths();
  const { EditorCode, setEditorCode } = useEditorCode();
  const { theme } = useTheme();

  const fileContent = EditorCode[filePaths]?.file?.contents ?? "";
  const fileExtension = filePaths.split(".").pop() ?? "";

  // biome-ignore lint/correctness/useExhaustiveDependencies: Incorrect error because ...
  useEffect(() => {
    if (editorRef.current && !viewRef.current) {
      const getLanguageExtension = () => {
        const lang = languageMapping[fileExtension];
        return lang ? lang() : [];
      };

      const startState = EditorState.create({
        doc: fileContent,
        extensions: [
          lineNumbers(),
          highlightActiveLineGutter(),
          history(),
          foldGutter(),
          drawSelection(),
          dropCursor(),
          EditorState.allowMultipleSelections.of(true),
          indentOnInput(),
          bracketMatching(),
          closeBrackets(),
          autocompletion(),
          highlightActiveLine(),
          keymap.of([
            ...defaultKeymap,
            ...searchKeymap,
            ...historyKeymap,
            { key: "Tab", run: acceptCompletion },
          ]),
          indentUnit.of("  "),
          languageCompartmentRef.current.of(getLanguageExtension()),
          themeCompartmentRef.current.of(
            theme === "dark" ? vscodeDark : vscodeLight,
          ),
          editorTheme,
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              setEditorCode(filePaths, update.state.doc.toString());
            }
          }),
        ],
      });

      const view = new EditorView({
        state: startState,
        parent: editorRef.current,
      });

      viewRef.current = view;
    }

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  }, [filePaths, setEditorCode, fileExtension, theme]);

  useEffect(() => {
    if (
      viewRef.current &&
      fileContent !== viewRef.current.state.doc.toString()
    ) {
      viewRef.current.dispatch({
        changes: {
          from: 0,
          to: viewRef.current.state.doc.length,
          insert: fileContent,
        },
      });
    }
  }, [fileContent]);

  // Language switcher
  useEffect(() => {
    if (viewRef.current) {
      const getLanguageExtension = () => {
        const lang = languageMapping[fileExtension];
        return lang ? lang() : [];
      };
      viewRef.current.dispatch({
        effects: languageCompartmentRef.current.reconfigure(
          getLanguageExtension(),
        ),
      });
    }
  }, [fileExtension]);

  // Theme switcher
  useEffect(() => {
    if (viewRef.current) {
      viewRef.current.dispatch({
        effects: themeCompartmentRef.current.reconfigure(
          theme === "dark" ? vscodeDark : vscodeLight,
        ),
      });
    }
  }, [theme]);

  return (
    <div className="flex-1 min-h-0 overflow-hidden">
      <div ref={editorRef} className="h-full w-full" />
    </div>
  );
}
