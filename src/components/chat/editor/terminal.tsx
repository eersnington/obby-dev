"use client";

import { useEffect, useRef, useState } from "react";
import type { Terminal as TerminalType } from "@xterm/xterm";
import type { FitAddon as FitAddonType } from "@xterm/addon-fit";
import type { ClipboardAddon as ClipboardAddonType } from "@xterm/addon-clipboard";
import type { WebLinksAddon as WebLinksAddonType } from "@xterm/addon-web-links";
import type { SearchAddon as SearchAddonType } from "@xterm/addon-search";
import type { WebContainerProcess, FileSystemTree } from "@webcontainer/api";
import { useWebContainer } from "@/hooks/use-webcontainers";
import { useTerminalStore } from "@/stores/terminal";
import { useEditorCode } from "@/stores/editor";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TerminalIcon, Search, Copy } from "lucide-react";

interface TerminalState {
  terminal: TerminalType | null;
  fitAddon: FitAddonType | null;
  clipboardAddon: ClipboardAddonType | null;
  webLinksAddon: WebLinksAddonType | null;
  searchAddon: SearchAddonType | null;
  shellProcess: WebContainerProcess | null;
  inputWriter: WritableStreamDefaultWriter<string> | null;
  isReady: boolean;
}

const TerminalMain = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<TerminalState>({
    terminal: null,
    fitAddon: null,
    clipboardAddon: null,
    webLinksAddon: null,
    searchAddon: null,
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

  // Initialize xterm.js and addons
  useEffect(() => {
    if (!isClient || !terminalRef.current || stateRef.current.isReady) return;

    const loadTerminal = async () => {
      try {
        // Dynamic imports to avoid SSR issues
        const [
          xtermModule,
          fitAddonModule,
          clipboardAddonModule,
          webLinksAddonModule,
          searchAddonModule,
        ] = await Promise.all([
          import("@xterm/xterm"),
          import("@xterm/addon-fit"),
          import("@xterm/addon-clipboard"),
          import("@xterm/addon-web-links"),
          import("@xterm/addon-search"),
        ]);

        // Import CSS
        try {
          // @ts-expect-error - CSS import is not typed
          await import("@xterm/xterm/css/xterm.css");
        } catch (e) {
          console.warn("Could not load xterm.css");
        }

        const { Terminal } = xtermModule;
        const { FitAddon } = fitAddonModule;
        const { ClipboardAddon } = clipboardAddonModule;
        const { WebLinksAddon } = webLinksAddonModule;
        const { SearchAddon } = searchAddonModule;

        // Create terminal with optimized configuration for proper text selection
        const terminal = new Terminal({
          cursorBlink: true,
          fontFamily: "monospace", // Use system monospace for better compatibility
          fontSize: 14,
          lineHeight: 1.0, // Important: Use 1.0 for proper character alignment
          letterSpacing: 0,
          allowProposedApi: true, // Enable proposed APIs for better features
          theme: {
            background: "#1e1e1e",
            foreground: "#d4d4d4",
            cursor: "#ffffff",
            cursorAccent: "#000000",
            selectionBackground: "#264f78",
            selectionForeground: "#ffffff",
            black: "#000000",
            red: "#cd3131",
            green: "#0dbc79",
            yellow: "#e5e510",
            blue: "#2472c8",
            magenta: "#bc3fbc",
            cyan: "#11a8cd",
            white: "#e5e5e5",
            brightBlack: "#666666",
            brightRed: "#f14c4c",
            brightGreen: "#23d18b",
            brightYellow: "#f5f543",
            brightBlue: "#3b8eea",
            brightMagenta: "#d670d6",
            brightCyan: "#29b8db",
            brightWhite: "#e5e5e5",
          },
          cursorStyle: "block",
          convertEol: true,
          scrollback: 10000,
          rightClickSelectsWord: true,
          fastScrollModifier: "alt",
          fastScrollSensitivity: 5,
          scrollSensitivity: 1,
          minimumContrastRatio: 4.5,
        });

        // Create and load addons
        const fitAddon = new FitAddon();
        const clipboardAddon = new ClipboardAddon();
        const webLinksAddon = new WebLinksAddon();
        const searchAddon = new SearchAddon();

        terminal.loadAddon(fitAddon);
        terminal.loadAddon(clipboardAddon);
        terminal.loadAddon(webLinksAddon);
        terminal.loadAddon(searchAddon);

        // Store references
        stateRef.current = {
          terminal,
          fitAddon,
          clipboardAddon,
          webLinksAddon,
          searchAddon,
          shellProcess: null,
          inputWriter: null,
          isReady: true,
        };

        // Open terminal
        if (terminalRef.current) {
          terminal.open(terminalRef.current);

          // Apply custom styling for better text selection and appearance
          const style = document.createElement("style");
          style.textContent = `
            /* Terminal container styles */
            .xterm {
              font-variant-ligatures: none;
              position: relative;
              width: 100% !important;
              height: 100% !important;
            }
            
            /* Viewport styles */
            .xterm-viewport {
              background-color: #1e1e1e !important;
              overflow-y: auto !important;
            }
            
            /* Scrollbar styles */
            .xterm-viewport::-webkit-scrollbar {
              width: 8px;
            }
            .xterm-viewport::-webkit-scrollbar-track {
              background: transparent;
            }
            .xterm-viewport::-webkit-scrollbar-thumb {
              background-color: rgba(255, 255, 255, 0.1);
              border-radius: 4px;
            }
            .xterm-viewport::-webkit-scrollbar-thumb:hover {
              background-color: rgba(255, 255, 255, 0.2);
            }
            
            /* Screen and text styles for proper alignment */
            .xterm-screen {
              padding: 8px !important;
              background-color: #1e1e1e !important;
            }
            
            .xterm-rows {
              font-family: monospace !important;
              font-size: 14px !important;
              line-height: 1.0 !important;
              letter-spacing: 0 !important;
              color: #d4d4d4 !important;
            }
            
            /* Selection styles for better visibility */
            .xterm-selection div {
              background-color: rgba(38, 79, 120, 0.6) !important;
              position: absolute !important;
              pointer-events: none !important;
            }
            
            /* Character spacing fix */
            .xterm-char-measure-element {
              font-family: monospace !important;
              font-size: 14px !important;
              line-height: 1.0 !important;
              letter-spacing: 0 !important;
            }
            
            /* Ensure text is visible */
            .xterm-rows canvas {
              background-color: transparent !important;
            }
            
            .xterm-text-layer {
              color: #d4d4d4 !important;
            }
          `;
          document.head.appendChild(style);

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

          // Fit terminal to container
          setTimeout(() => {
            try {
              fitAddon.fit();
              setIsTerminalReady(true);
            } catch (error) {
              console.error("Error fitting terminal:", error);
            }
          }, 100);

          // Setup keyboard handling
          setupKeyboardHandling(terminal, clipboardAddon);

          // Handle container clicks
          const handleClick = () => terminal.focus();
          terminalRef.current.addEventListener("click", handleClick);

          // Handle window resize
          const handleResize = () => {
            if (fitAddon && terminalRef.current) {
              try {
                const { width, height } =
                  terminalRef.current.getBoundingClientRect();
                if (width > 0 && height > 0) {
                  fitAddon.fit();
                  // Notify shell process of resize
                  if (stateRef.current.shellProcess) {
                    stateRef.current.shellProcess.resize({
                      cols: terminal.cols,
                      rows: terminal.rows,
                    });
                  }
                }
              } catch (error) {
                console.error("Error resizing terminal:", error);
              }
            }
          };

          window.addEventListener("resize", handleResize);

          // Cleanup function
          return () => {
            window.removeEventListener("resize", handleResize);
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
              clipboardAddon: null,
              webLinksAddon: null,
              searchAddon: null,
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

  // Setup keyboard handling for proper clipboard and shortcuts
  const setupKeyboardHandling = (
    terminal: TerminalType,
    clipboardAddon: ClipboardAddonType,
  ) => {
    // Handle keyboard events
    terminal.attachCustomKeyEventHandler((event: KeyboardEvent) => {
      const { ctrlKey, metaKey, key, shiftKey } = event;
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

      // Find (Ctrl+F / Cmd+F)
      if (isCtrlOrCmd && key === "f") {
        event.preventDefault();
        // You can implement a search UI here
        console.log("Search functionality can be implemented here");
        return false;
      }

      // Select all (Ctrl+A / Cmd+A)
      if (isCtrlOrCmd && key === "a") {
        event.preventDefault();
        terminal.selectAll();
        return false;
      }

      return true;
    });
  };

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
          terminal.writeln("");
          terminal.writeln("Available commands:");
          terminal.writeln("  ls              - List files and directories");
          terminal.writeln("  cd <dir>        - Change directory");
          terminal.writeln("  cat <file>      - View file contents");
          terminal.writeln("  mkdir <dir>     - Create directory");
          terminal.writeln("  touch <file>    - Create file");
          terminal.writeln("  echo 'text'     - Print text");
          terminal.writeln("");
          terminal.writeln("Note: npm commands will work after you add a package.json file");
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
          stateRef.current.terminal.writeln(
            "You can still use basic commands, but the project files may not be available.",
          );
          stateRef.current.terminal.writeln("");
        }
        // Still set as initialized so user can use basic shell
        setFilesInitialized(true);
      }
    };

    initializeFiles();
  }, [webcontainer, isTerminalReady, filesInitialized, EditorCode]);

  // Re-mount files when EditorCode changes (after initial setup)
  useEffect(() => {
    if (!webcontainer || !filesInitialized || !stateRef.current.terminal) return;

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

        // Start JavaScript shell (jsh) - the recommended shell for WebContainer
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
        // Create a single writable stream to handle all input
        const inputWriter = shellProcess.input.getWriter();

        // Store the writer reference for cleanup
        const currentState = stateRef.current;
        currentState.inputWriter = inputWriter;

        terminal.onData((data) => {
          try {
            // Handle Ctrl+C (interrupt)
            if (data === "\u0003") {
              // Send interrupt signal
              inputWriter.write(data);
              return;
            }

            // Send data to shell
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

  // Handle terminal visibility changes for proper fitting
  useEffect(() => {
    if (!isClient || !terminalRef.current) return;

    const container = terminalRef.current;
    const observer = new MutationObserver(() => {
      if (stateRef.current.fitAddon && container) {
        const { width, height } = container.getBoundingClientRect();
        if (width > 0 && height > 0) {
          setTimeout(() => {
            try {
              stateRef.current.fitAddon?.fit();
              stateRef.current.terminal?.focus();
            } catch (error) {
              console.error("Error in mutation observer:", error);
            }
          }, 100);
        }
      }
    });

    observer.observe(container, {
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    return () => observer.disconnect();
  }, [isClient]);

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

  // Handle copy selection
  const handleCopySelection = () => {
    if (stateRef.current.terminal) {
      const selection = stateRef.current.terminal.getSelection();
      if (selection) {
        navigator.clipboard.writeText(selection).catch(console.error);
      }
    }
  };

  // Handle search
  const handleSearch = () => {
    if (stateRef.current.searchAddon) {
      // You can implement a search UI here
      const searchTerm = prompt("Search:");
      if (searchTerm) {
        stateRef.current.searchAddon.findNext(searchTerm);
      }
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
            onClick={handleSearch}
            className="h-7 px-2 text-xs"
            disabled={!isTerminalReady}
          >
            <Search className="h-3 w-3 mr-1" />
            Search
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopySelection}
            className="h-7 px-2 text-xs"
            disabled={!isTerminalReady}
          >
            <Copy className="h-3 w-3 mr-1" />
            Copy
          </Button>
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
              fontFamily: "monospace",
              fontSize: "14px",
              lineHeight: "1.0",
              position: "relative",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TerminalMain;
