import type { ITheme } from "@xterm/xterm";

const cssVar = (token: string) => {
  // Check if we're in the browser environment
  if (typeof window === "undefined") {
    return undefined;
  }

  try {
    const style = getComputedStyle(document.documentElement);
    return style.getPropertyValue(token) || undefined;
  } catch {
    return undefined;
  }
};

export function getTerminalTheme(overrides?: ITheme): ITheme {
  return {
    cursor: cssVar("--bolt-elements-terminal-cursorColor") || "#ffffff",
    cursorAccent:
      cssVar("--bolt-elements-terminal-cursorColorAccent") || "#000000",
    foreground: cssVar("--bolt-elements-terminal-textColor") || "#d4d4d4",
    background: cssVar("--bolt-elements-terminal-backgroundColor") || "#1e1e1e",
    selectionBackground:
      cssVar("--bolt-elements-terminal-selection-backgroundColor") || "#264f78",
    selectionForeground:
      cssVar("--bolt-elements-terminal-selection-textColor") || "#ffffff",
    selectionInactiveBackground:
      cssVar("--bolt-elements-terminal-selection-backgroundColorInactive") ||
      "#3a3d41",

    // ansi escape code colors
    black: cssVar("--bolt-elements-terminal-color-black") || "#000000",
    red: cssVar("--bolt-elements-terminal-color-red") || "#cd3131",
    green: cssVar("--bolt-elements-terminal-color-green") || "#0dbc79",
    yellow: cssVar("--bolt-elements-terminal-color-yellow") || "#e5e510",
    blue: cssVar("--bolt-elements-terminal-color-blue") || "#2472c8",
    magenta: cssVar("--bolt-elements-terminal-color-magenta") || "#bc3fbc",
    cyan: cssVar("--bolt-elements-terminal-color-cyan") || "#11a8cd",
    white: cssVar("--bolt-elements-terminal-color-white") || "#e5e5e5",
    brightBlack:
      cssVar("--bolt-elements-terminal-color-brightBlack") || "#666666",
    brightRed: cssVar("--bolt-elements-terminal-color-brightRed") || "#f14c4c",
    brightGreen:
      cssVar("--bolt-elements-terminal-color-brightGreen") || "#23d18b",
    brightYellow:
      cssVar("--bolt-elements-terminal-color-brightYellow") || "#f5f543",
    brightBlue:
      cssVar("--bolt-elements-terminal-color-brightBlue") || "#3b8eea",
    brightMagenta:
      cssVar("--bolt-elements-terminal-color-brightMagenta") || "#d670d6",
    brightCyan:
      cssVar("--bolt-elements-terminal-color-brightCyan") || "#29b8db",
    brightWhite:
      cssVar("--bolt-elements-terminal-color-brightWhite") || "#e5e5e5",

    ...overrides,
  };
}
