"use client";

import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EditorTheme {
  id: string;
  name: string;
  monaco: string;
}

const editorThemes: EditorTheme[] = [
  { id: "vs-dark", name: "Dark", monaco: "vs-dark" },
  { id: "vs-light", name: "Light", monaco: "vs" },
  { id: "hc-black", name: "High Contrast Dark", monaco: "hc-black" },
  { id: "hc-light", name: "High Contrast Light", monaco: "hc-light" },
];

interface EditorThemeSelectorProps {
  onThemeChange?: (theme: string) => void;
  currentTheme?: string;
}

export function EditorThemeSelector({
  onThemeChange,
  currentTheme = "vs-dark",
}: EditorThemeSelectorProps) {
  const handleThemeChange = (themeId: string) => {
    const theme = editorThemes.find((t) => t.id === themeId);
    if (theme && onThemeChange) {
      onThemeChange(theme.monaco);
    }
  };

  const currentThemeName =
    editorThemes.find((t) => t.id === currentTheme)?.name || "Dark";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-2">
          <Palette className="h-4 w-4" />
          <span className="text-sm">{currentThemeName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {editorThemes.map((theme) => (
          <DropdownMenuItem
            key={theme.id}
            onClick={() => handleThemeChange(theme.id)}
            className={currentTheme === theme.id ? "bg-accent" : ""}
          >
            {theme.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
