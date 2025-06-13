"use client";

import { useEffect, useState, useRef } from "react";
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
import {
  globalEventManager,
  subscribeToEditorEvent,
  emitEditorEvent,
} from "@/lib/services/event-manager";
import { fileOperationsManager } from "@/lib/services/file-operations-manager";
import { webcontainerService } from "@/lib/services/webcontainer-service";
import { findFileContent } from "@/lib/utils/code-utils";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { CodeMirrorEditorV2 } from "@/components/chat/editor/code-mirror-editor";
import { toast } from "sonner";
import type { EditorSelection } from "@codemirror/state";

export function EditorClient() {
  const { filePaths } = useFilePaths();
  const { setCode, EditorCode, setEditorCode } = useEditorCode();
  const [editorTheme, setEditorTheme] = useState("vs-dark");
  const {
    setShowWorkspace,
    setShowCode,
    showTab,
    setShowPreview,
    setShowTerminal,
  } = useShowTab();
  const { addCommand, isSavingFiles, setIsSavingFiles } = useTerminalStore();

  const eventManager = useRef(globalEventManager);

  const code = findFileContent(EditorCode, filePaths) ?? "";

  const handleEditorChange = (update: {
    content: string;
    selection: EditorSelection;
  }) => {
    setEditorCode(filePaths, update.content);
  };

  const handleSaveFiles = () => {
    emitEditorEvent("save-files", { files: EditorCode });
  };

  useEffect(() => {
    const initializeApp = async () => {
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

        // Initialize WebContainer and project
        await fileOperationsManager.initializeProject(defaultProjectFiles);
      } catch (error) {
        toast.error("Failed to initialize editor");
        console.error("Editor initialization error:", error);
      }
    };

    initializeApp();

    const unsubscribeSave = subscribeToEditorEvent(
      "save-files",
      async (event) => {
        try {
          setIsSavingFiles(true);
          await fileOperationsManager.saveFiles(event.detail.files);
          toast.success("Files saved successfully");
        } catch (error) {
          console.error("Error saving files:", error);
          toast.error("Failed to save files");
        } finally {
          setIsSavingFiles(false);
        }
      },
    );

    return () => {
      unsubscribeSave();
      eventManager.current.cleanup();
      webcontainerService.cleanup();
    };
  }, [setCode, setShowWorkspace, setShowCode, addCommand, setIsSavingFiles]);

  return (
    <div className="h-full w-full flex flex-col p-2 font-mono">
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
              <div className="flex-1 h-0 overflow-hidden">
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

                        {/* CodeMirror Editor */}
                        <CodeMirrorEditorV2 />
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
