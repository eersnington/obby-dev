"use client";

import { useEffect, useRef, useState } from "react";
import type { Terminal as TerminalType, ITerminalOptions } from "@xterm/xterm";
import type { FitAddon as FitAddonType } from "@xterm/addon-fit";
import { useTerminalStore } from "@/stores/terminal";
import { Button } from "@/components/ui/button";
import { TerminalIcon } from "lucide-react";
import { getTerminalTheme } from "./terminal-theme";
import { fileOperationsManager } from "@/lib/services/file-operations-manager";
import { subscribeToEditorEvent } from "@/lib/services/event-manager";
import { webcontainerService } from "@/lib/services/webcontainer-service";
import type { WebContainerProcess } from "@webcontainer/api";

const terminalOptions: ITerminalOptions = {
  cursorBlink: true,
  fontFamily: "Menlo, courier-new, courier, monospace",
  fontSize: 14,
  lineHeight: 1.0,
  theme: getTerminalTheme(),
  cursorStyle: "block",
  convertEol: true,
  scrollback: 10000,
  rightClickSelectsWord: true,
};

export default function NewTerminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [xterm, setXterm] = useState<{
    terminal: TerminalType;
    fitAddon: FitAddonType;
  } | null>(null);
  const [shellProcess, setShellProcess] = useState<WebContainerProcess | null>(
    null,
  );

  useEffect(() => {
    const initTerminal = async () => {
      const { Terminal } = await import("@xterm/xterm");
      const { FitAddon } = await import("@xterm/addon-fit");
      const terminal = new Terminal(terminalOptions);
      const fitAddon = new FitAddon();
      terminal.loadAddon(fitAddon);

      if (terminalRef.current) {
        terminal.open(terminalRef.current);
        fitAddon.fit();
      }
      setXterm({ terminal, fitAddon });
    };
    initTerminal();
  }, []);

  useEffect(() => {
    if (!xterm || shellProcess) return;

    const startShell = async () => {
      const webcontainer = await webcontainerService.boot();
      const newShellProcess = await webcontainer.spawn("jsh", {
        terminal: {
          cols: xterm.terminal.cols,
          rows: xterm.terminal.rows,
        },
      });
      setShellProcess(newShellProcess);

      newShellProcess.output.pipeTo(
        new WritableStream({
          write(data) {
            xterm.terminal.write(data);
          },
        }),
      );

      const input = newShellProcess.input.getWriter();
      xterm.terminal.onData((data) => {
        input.write(data);
      });
    };

    startShell();
  }, [xterm, shellProcess]);

  useEffect(() => {
    if (!xterm) return;
    const { terminal } = xterm;

    const unsubscribe = useTerminalStore.subscribe((state) => {
      if (state.terminal.length > 0) {
        const lastCommand = state.terminal[state.terminal.length - 1];
        terminal.writeln(lastCommand);
      }
    });

    const commandUnsubscribe = subscribeToEditorEvent(
      "terminal-command",
      (event) => {
        const { command, args } = event.detail;
        fileOperationsManager.executeCommand(command, args);
      },
    );

    return () => {
      unsubscribe();
      commandUnsubscribe();
    };
  }, [xterm]);

  const handleClearTerminal = () => {
    if (xterm) {
      xterm.terminal.clear();
      xterm.terminal.focus();
    }
  };

  return (
    <div className="flex flex-col bg-background border rounded-lg">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-muted/30">
        <div className="flex items-center gap-3">
          <TerminalIcon className="h-4 w-4" />
          <span className="text-sm font-medium">Terminal</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearTerminal}
            className="h-7 px-2 text-xs"
            disabled={!xterm}
          >
            Clear
          </Button>
        </div>
      </div>
      <div className="flex-1 transition-all duration-200 ease-in-out">
        <div
          ref={terminalRef}
          className="w-full bg-background"
          style={{
            fontFamily: "Menlo, courier-new, courier, monospace",
            fontSize: "14px",
            lineHeight: "1.0",
            position: "relative",
          }}
        />
      </div>
    </div>
  );
}
