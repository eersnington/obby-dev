import { Editor } from "@monaco-editor/react";
import type * as monaco from "monaco-editor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import FileExplorer from "./file-explorer";
import DevNavbar from "./dev-nav-bar";
import { useState } from "react";
import { useFilePaths } from "@/stores/file-explorer";
import WebContainer from "./web-container";
import { useEditorCode } from "@/stores/editor";
import { Show, useShowTab } from "@/stores/code-tabs";
import { useTerminalStore } from "@/stores/terminal";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import Terminal from "./terminal";
import {
  findFileContent,
  getLanguageFromExtension,
} from "@/lib/utils/code-utils";
import type { projectFiles } from "@/types/webcontainer-files";

export default function CodeEditor() {
  const { filePaths, fileupdating } = useFilePaths();
  const { isSavingFiles, setIsSavingFiles } = useTerminalStore();

  const { showTab, setShowWorkspace } = useShowTab();
  const { EditorCode, setEditorCode } = useEditorCode();
  const code = findFileContent(EditorCode as projectFiles, filePaths) ?? "";
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [monacoInstance, setMonacoInstance] = useState<typeof monaco | null>(
    null,
  );

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setEditorCode(filePaths, value);
    }
  };

  const handleSaveFiles = () => {
    setIsSavingFiles(true);
    const event = new CustomEvent("save-files", {
      detail: { files: EditorCode },
    });
    window.dispatchEvent(event);
  };

  return (
    <ResizablePanel defaultSize={50} minSize={30} maxSize={70}>
      <div className="h-full flex flex-col">
        {/* Navigation Bar */}
        <div className="min-h-[5vh] w-full border-b border-border bg-black">
          <DevNavbar setShowWorkspace={setShowWorkspace} />
        </div>

        {/* Main Content Area */}
        <div className="h-full w-full bg-[#000]">
          {showTab === Show.CODE && (
            <ResizablePanelGroup
              direction="horizontal"
              className="min-h-[95vh]"
            >
              {/* File Explorer */}
              <ResizablePanel minSize={20} maxSize={40} defaultSize={25}>
                <FileExplorer />
              </ResizablePanel>

              <ResizableHandle />

              {/* Monaco Editor */}
              <ResizablePanel minSize={60} maxSize={80} defaultSize={75}>
                {/* Editor Header */}
                <div className="py-2 px-3 text-neutral-200 border-b border-border flex items-center justify-between">
                  <h1 className="text-sm font-medium">{filePaths}</h1>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={isSavingFiles}
                    onClick={handleSaveFiles}
                    className="h-7 px-3 text-xs"
                  >
                    {isSavingFiles ? (
                      <>
                        <div className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-3 w-3 mr-2" />
                        Save
                      </>
                    )}
                  </Button>
                </div>

                {/* Monaco Editor */}
                <Editor
                  className={"font-mono"}
                  height="88vh"
                  language={getLanguageFromExtension(filePaths)}
                  value={code}
                  onChange={handleEditorChange}
                  loading={
                    <div className="h-full w-full flex items-center justify-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 border-2 border-t-transparent border-blue-500 rounded-full animate-spin" />
                        <p className="text-sm text-neutral-400">
                          Initializing editor...
                        </p>
                      </div>
                    </div>
                  }
                  onMount={(editor, monaco) => {
                    setEditor(editor);
                    setMonacoInstance(monaco);

                    // Disable TypeScript/JavaScript validations for cleaner editing
                    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(
                      {
                        noSemanticValidation: true,
                        noSyntaxValidation: true,
                        noSuggestionDiagnostics: true,
                      },
                    );
                    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions(
                      {
                        noSemanticValidation: true,
                        noSyntaxValidation: true,
                        noSuggestionDiagnostics: true,
                      },
                    );

                    // Clear any existing markers
                    const model = editor.getModel();
                    if (model) {
                      monaco.editor.setModelMarkers(model, "", []);
                    }
                  }}
                  options={{
                    wordWrap: "on",
                    fontSize: 14,
                    fontFamily:
                      "var(--font-geist-mono), JetBrains Mono, monospace",
                    fontWeight: "400",
                    lineNumbers: "on",
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    cursorStyle: "line",
                    automaticLayout: true,
                    padding: { top: 16 },
                    folding: true,
                    bracketPairColorization: {
                      enabled: true,
                    },
                    // Disable autocomplete features for cleaner experience
                    quickSuggestions: false,
                    parameterHints: { enabled: false },
                    suggestOnTriggerCharacters: false,
                    acceptSuggestionOnEnter: "off",
                    tabCompletion: "off",
                    wordBasedSuggestions: "off",
                  }}
                  beforeMount={(monaco) => {
                    // Configure TypeScript compiler options
                    monaco.languages.typescript.typescriptDefaults.setCompilerOptions(
                      {
                        jsx: monaco.languages.typescript.JsxEmit.React,
                        jsxFactory: "React.createElement",
                        reactNamespace: "React",
                        allowNonTsExtensions: true,
                        allowJs: true,
                        target: monaco.languages.typescript.ScriptTarget.Latest,
                      },
                    );
                  }}
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          )}

          {showTab === Show.PREVIEW && <WebContainer />}

          {showTab === Show.TERMINAL && <Terminal />}
        </div>
      </div>
    </ResizablePanel>
  );
}
