"use client";

import { useEffect, useRef, useState } from "react";
import type { Terminal as TerminalType } from "@xterm/xterm";
import type { FitAddon as FitAddonType } from "@xterm/addon-fit";
import type { WebContainerProcess, FileSystemTree } from "@webcontainer/api";
import { useWebContainer } from "@/hooks/use-webcontainers";
import { useTerminalStore } from "@/stores/terminal";
import { useEditorCode } from "@/stores/editor";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TerminalIcon } from "lucide-react";
import { getTerminalTheme } from "./terminal-theme";

interface TerminalState {
  terminal: TerminalType | null;
  fitAddon: FitAddonType | null;
  shellProcess: WebContainerProcess | null;
  inputWriter: WritableStreamDefaultWriter<string> | null;
  isReady: boolean;
}

export default function Terminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<TerminalState>({
    terminal: null,
    fitAddon: null,
    shellProcess: null,
    inputWriter: null,
    isReady: false,
  });

  const [isClient, setIsClient] = useState(false);
  const [isTerminalReady, setIsTerminalReady] = useState(false);
  const [filesInitialized, setFilesInitialized] = useState(false);
  const { terminal: terminalHistory } = useTerminalStore();
  const { webcontainer } = useWebContainer();
  const { EditorCode } = useEditorCode();

  // Initialize xterm.js with minimal setup
  useEffect(() => {
    if (!isClient || !terminalRef.current || stateRef.current.isReady) return;

    const loadTerminal = async () => {
      try {
        // Dynamic imports to avoid SSR issues
        const [xtermModule, fitAddonModule] = await Promise.all([
          import("@xterm/xterm"),
          import("@xterm/addon-fit"),
        ]);

        const { Terminal } = xtermModule;
        const { FitAddon } = fitAddonModule;

        // Create terminal with theme-based configuration
        const terminal = new Terminal({
          cursorBlink: true,
          fontFamily: "Menlo, courier-new, courier, monospace",
          fontSize: 14,
          lineHeight: 1.0,
          theme: getTerminalTheme(),
          cursorStyle: "block",
          convertEol: true,
          scrollback: 10000,
          rightClickSelectsWord: true,
        });

        // Create and load fit addon
        const fitAddon = new FitAddon();
        terminal.loadAddon(fitAddon);

        // Store references
        stateRef.current = {
          terminal,
          fitAddon,
          shellProcess: null,
          inputWriter: null,
          isReady: true,
        };

        // Open terminal
        if (terminalRef.current) {
          terminal.open(terminalRef.current);

          // Focus terminal
          terminal.focus();

          // Restore terminal history
          if (terminalHistory.length > 0) {
            for (const line of terminalHistory) {
              terminal.writeln(line);
            }
          } else {
            // Show initial message
            terminal.writeln("🚀 WebContainer Terminal");
            terminal.writeln("Initializing environment...");
            terminal.writeln("");
          }

          // Setup resize observer for better responsiveness
          const resizeObserver = new ResizeObserver(() => {
            try {
              fitAddon.fit();
              // Notify shell process of resize
              if (stateRef.current.shellProcess) {
                stateRef.current.shellProcess.resize({
                  cols: terminal.cols,
                  rows: terminal.rows,
                });
              }
            } catch (error) {
              console.error("Error resizing terminal:", error);
            }
          });

          resizeObserver.observe(terminalRef.current);

          // Fit terminal to container initially
          setTimeout(() => {
            try {
              fitAddon.fit();
              setIsTerminalReady(true);
            } catch (error) {
              console.error("Error fitting terminal:", error);
            }
          }, 100);

          // Setup basic keyboard handling
          terminal.attachCustomKeyEventHandler((event: KeyboardEvent) => {
            const { ctrlKey, metaKey, key } = event;
            const isCtrlOrCmd = ctrlKey || metaKey;

            // Copy (Ctrl+C / Cmd+C) when text is selected
            if (isCtrlOrCmd && key === "c" && terminal.hasSelection()) {
              event.preventDefault();
              navigator.clipboard.writeText(terminal.getSelection());
              return false;
            }

            // Paste (Ctrl+V / Cmd+V)
            if (isCtrlOrCmd && key === "v") {
              event.preventDefault();
              navigator.clipboard
                .readText()
                .then((text: string) => {
                  if (text && stateRef.current.inputWriter) {
                    try {
                      stateRef.current.inputWriter.write(text);
                    } catch (error) {
                      console.error("Error pasting text:", error);
                    }
                  }
                })
                .catch(console.error);
              return false;
            }

            // Clear terminal (Ctrl+L / Cmd+L)
            if (isCtrlOrCmd && key === "l") {
              event.preventDefault();
              terminal.clear();
              return false;
            }

            return true;
          });

          // Handle container clicks
          const handleClick = () => terminal.focus();
          terminalRef.current.addEventListener("click", handleClick);

          // Cleanup function
          return () => {
            resizeObserver.disconnect();
            if (terminalRef.current) {
              terminalRef.current.removeEventListener("click", handleClick);
            }

            // Clean up input writer
            if (stateRef.current.inputWriter) {
              try {
                stateRef.current.inputWriter.releaseLock();
              } catch (error) {
                console.error("Error releasing input writer lock:", error);
              }
            }

            // Clean up shell process
            if (stateRef.current.shellProcess) {
              try {
                stateRef.current.shellProcess.kill();
              } catch (error) {
                console.error("Error killing shell process:", error);
              }
            }

            terminal.dispose();
            stateRef.current = {
              terminal: null,
              fitAddon: null,
              shellProcess: null,
              inputWriter: null,
              isReady: false,
            };
          };
        }
      } catch (error) {
        console.error("Failed to load terminal:", error);
      }
    };

    loadTerminal();
  }, [isClient, terminalHistory]);

  // Initialize files in WebContainer when ready
  useEffect(() => {
    if (!webcontainer || !isTerminalReady || filesInitialized) return;

    const initializeFiles = async () => {
      try {
        const { terminal } = stateRef.current;
        if (terminal) {
          terminal.writeln("📂 Mounting project files in WebContainer...");
        }

        // Mount the project files from editor
        await webcontainer.mount(EditorCode as unknown as FileSystemTree);

        if (terminal) {
          terminal.writeln("✅ Project files mounted successfully");
          terminal.writeln("🎉 WebContainer is ready!");
          terminal.writeln("  npm install     - Install dependencies");
          terminal.writeln("  npm run dev     - Start development server");
          terminal.writeln("");
        }

        setFilesInitialized(true);
      } catch (error) {
        console.error("Failed to initialize files:", error);
        if (stateRef.current.terminal) {
          stateRef.current.terminal.writeln("");
          stateRef.current.terminal.writeln(
            `❌ Failed to initialize: ${error instanceof Error ? error.message : String(error)}`,
          );
          stateRef.current.terminal.writeln("");
        }
        setFilesInitialized(true);
      }
    };

    initializeFiles();
  }, [webcontainer, isTerminalReady, filesInitialized, EditorCode]);

  // Re-mount files when EditorCode changes
  useEffect(() => {
    if (!webcontainer || !filesInitialized || !stateRef.current.terminal)
      return;

    const remountFiles = async () => {
      try {
        await webcontainer.mount(EditorCode as unknown as FileSystemTree);
        console.log("Files updated in WebContainer");
      } catch (error) {
        console.error("Failed to update files:", error);
      }
    };

    remountFiles();
  }, [EditorCode, webcontainer, filesInitialized]);

  // Start shell when WebContainer and files are ready
  useEffect(() => {
    if (
      !webcontainer ||
      !isTerminalReady ||
      !filesInitialized ||
      stateRef.current.shellProcess
    )
      return;

    const startShell = async () => {
      try {
        const { terminal } = stateRef.current;
        if (!terminal) return;

        terminal.writeln("🔧 Starting interactive shell...");

        // Start shell process
        const shellProcess = await webcontainer.spawn("jsh", [], {
          terminal: {
            cols: terminal.cols,
            rows: terminal.rows,
          },
        });

        stateRef.current.shellProcess = shellProcess;

        // Pipe shell output to terminal
        shellProcess.output.pipeTo(
          new WritableStream({
            write(data) {
              if (stateRef.current.terminal) {
                stateRef.current.terminal.write(data);
              }
            },
          }),
        );

        // Handle terminal input and send to shell
        const inputWriter = shellProcess.input.getWriter();
        stateRef.current.inputWriter = inputWriter;

        terminal.onData((data) => {
          try {
            inputWriter.write(data);
          } catch (error) {
            console.error("Error writing to shell input:", error);
          }
        });

        console.log("Shell started successfully");
      } catch (error) {
        console.error("Failed to start shell:", error);
        if (stateRef.current.terminal) {
          stateRef.current.terminal.writeln(
            "\r\n❌ Failed to start shell. Please try refreshing.",
          );
        }
      }
    };

    startShell();
  }, [webcontainer, isTerminalReady, filesInitialized]);

  // Set client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle clear terminal action
  const handleClearTerminal = () => {
    if (stateRef.current.terminal) {
      stateRef.current.terminal.clear();
      stateRef.current.terminal.focus();
    }
  };

  return (
    <div className="h-full flex flex-col bg-background border rounded-lg">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/30">
        <div className="flex items-center gap-3">
          <TerminalIcon className="h-4 w-4" />
          <span className="text-sm font-medium">Terminal</span>
          {!webcontainer && (
            <span className="text-xs text-muted-foreground">
              (Waiting for WebContainer...)
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearTerminal}
            className="h-7 px-2 text-xs"
            disabled={!isTerminalReady}
          >
            Clear
          </Button>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="flex-1 transition-all duration-200 ease-in-out">
        {!webcontainer ? (
          <Alert className="m-4">
            <AlertDescription>
              WebContainer is not available. Please wait for initialization.
            </AlertDescription>
          </Alert>
        ) : (
          <div
            ref={terminalRef}
            className="h-full w-full bg-background"
            style={{
              fontFamily: "Menlo, courier-new, courier, monospace",
              fontSize: "14px",
              lineHeight: "1.0",
              position: "relative",
            }}
          />
        )}
      </div>
    </div>
  );
}
