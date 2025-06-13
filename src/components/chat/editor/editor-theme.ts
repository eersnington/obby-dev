import { EditorView } from "@codemirror/view";

export const editorTheme = EditorView.theme({
  "&": {
    fontSize: "14px",
    height: "100%",
  },
  ".cm-scroller": {
    lineHeight: "1.5",
    overflow: "auto",
    maxHeight: "100%",
  },
  "&.cm-editor": {
    height: "100%",
    maxHeight: "100%",
    overflow: "hidden",
  },
  ".cm-content": {
    minHeight: "100%",
  },
});
