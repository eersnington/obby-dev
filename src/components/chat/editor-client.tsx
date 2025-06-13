"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { ChatPanel } from "@/components/chat/editor/chat-panel";
import FileExplorer from "@/components/chat/editor/file-explorer";
import WebContainer from "@/components/chat/editor/web-container";
import Terminal from "@/components/chat/editor/terminal";
import { EditorThemeSelector } from "@/components/chat/editor/editor-theme-selector";
import { useFilePaths } from "@/stores/file-explorer";
import { useEditorCode } from "@/stores/editor";
import { useShowTab, Show } from "@/stores/code-tabs";
import { useTerminalStore } from "@/stores/terminal";
import { defaultProjectFiles } from "@/lib/utils/default-project-files";
import { Editor } from "@monaco-editor/react";
import {
  findFileContent,
  getLanguageFromExtension,
} from "@/lib/utils/code-utils";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { projectFiles } from "@/types/webcontainer-files";
import { Geist_Mono } from "next/font/google";

const GeistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function EditorClient() {
  const { filePaths } = useFilePaths();
  const { setCode, EditorCode, setEditorCode } = useEditorCode();
  const {
    setShowWorkspace,
    setShowCode,
    showTab,
    setShowPreview,
    setShowTerminal,
  } = useShowTab();
  const { addCommand, isSavingFiles, setIsSavingFiles } = useTerminalStore();
  const [editorTheme, setEditorTheme] = useState("vs-dark");

  const code = findFileContent(EditorCode as projectFiles, filePaths) ?? "";

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setEditorCode(filePaths, value);
    }
  };

  const handleSaveFiles = () => {
    try {
      setIsSavingFiles(true);
      const event = new CustomEvent("save-files", {
        detail: { files: EditorCode },
      });
      window.dispatchEvent(event);
      toast.success("Files saved successfully");
    } catch (error) {
      console.error("Error saving files:", error);
      toast.error("Failed to save files");
      setIsSavingFiles(false);
    }
  };

  useEffect(() => {
    const initializeEditor = () => {
      try {
        // Set editor code from default project files first
        setCode(defaultProjectFiles);

        // Show workspace and code tab by default
        setShowWorkspace(true);
        setShowCode();

        // Add welcome terminal messages
        addCommand("Welcome to Obby Dev Editor!");
        addCommand("Type commands to get started...");

        toast.success("Editor initialized successfully");
      } catch (error) {
        toast.error("Failed to initialize editor");
        console.error("Editor initialization error:", error);
      }
    };

    initializeEditor();
  }, [setCode, setShowWorkspace, setShowCode, addCommand]);

  return (
    <div className="h-full w-full overflow-hidden p-2">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        {/* Chat Panel - Left Side */}
        <ResizablePanel defaultSize={40} minSize={30} maxSize={70}>
          <ChatPanel />
        </ResizablePanel>

        <ResizableHandle className="bg-transparent hover:bg-accent rounded-full transition-colors mx-0.5 my-2 w-0.5" />

        {/* WebContainer Panel - Right Side */}
        <ResizablePanel defaultSize={60} minSize={40}>
          <Card className="h-full flex flex-col">
            {/* Tabs */}
            <Tabs value={showTab} className="h-full flex flex-col">
              {/* Tabs Header */}
              <div className="flex items-center justify-between border-b px-4 py-2">
                <TabsList className="bg-transparent">
                  <TabsTrigger
                    value={Show.CODE}
                    onClick={() => setShowCode()}
                    className="data-[state=active]:bg-muted data-[state=active]:shadow-sm rounded-lg"
                  >
                    Code
                  </TabsTrigger>
                  <TabsTrigger
                    value={Show.PREVIEW}
                    onClick={() => setShowPreview()}
                    className="data-[state=active]:bg-muted data-[state=active]:shadow-sm rounded-lg"
                  >
                    Preview
                  </TabsTrigger>
                  <TabsTrigger
                    value={Show.TERMINAL}
                    onClick={() => setShowTerminal()}
                    className="data-[state=active]:bg-muted data-[state=active]:shadow-sm rounded-lg"
                  >
                    Terminal
                  </TabsTrigger>
                </TabsList>

                {showTab === Show.CODE && (
                  <EditorThemeSelector
                    currentTheme={editorTheme}
                    onThemeChange={setEditorTheme}
                  />
                )}
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-hidden">
                <TabsContent value={Show.CODE} className="h-full m-0">
                  <ResizablePanelGroup
                    direction="horizontal"
                    className="h-full"
                  >
                    {/* File Explorer */}
                    <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
                      <FileExplorer />
                    </ResizablePanel>

                    <ResizableHandle />

                    {/* Code Editor */}
                    <ResizablePanel defaultSize={75} minSize={60}>
                      <div className="h-full flex flex-col">
                        {/* File Header */}
                        <div className="px-4 py-2 bg-muted/30 border-b flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {filePaths}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled={isSavingFiles}
                            onClick={handleSaveFiles}
                            className="h-7 px-2"
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
                        <div className="flex-1">
                          <Editor
                            className={GeistMono.className}
                            height="100%"
                            language={getLanguageFromExtension(filePaths)}
                            value={code}
                            theme={editorTheme}
                            onChange={handleEditorChange}
                            options={{
                              wordWrap: "on",
                              fontSize: 14,
                              fontFamily:
                                "var(--font-geist-mono), JetBrains Mono, monospace",
                              lineNumbers: "on",
                              minimap: { enabled: false },
                              scrollBeyondLastLine: false,
                              cursorStyle: "line",
                              automaticLayout: true,
                              padding: { top: 16 },
                              folding: true,
                              bracketPairColorization: { enabled: true },
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
                                  jsx: monaco.languages.typescript.JsxEmit
                                    .React,
                                  jsxFactory: "React.createElement",
                                  reactNamespace: "React",
                                  allowNonTsExtensions: true,
                                  allowJs: true,
                                  target:
                                    monaco.languages.typescript.ScriptTarget
                                      .Latest,
                                },
                              );
                            }}
                            onMount={(editor, monaco) => {
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
                          />
                        </div>
                      </div>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </TabsContent>

                <TabsContent value={Show.PREVIEW} className="h-full m-0">
                  <WebContainer />
                </TabsContent>

                <TabsContent value={Show.TERMINAL} className="h-full m-0">
                  <Terminal />
                </TabsContent>
              </div>
            </Tabs>
          </Card>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
