import { useFullPreview } from "@/stores/code-tabs";
import { useTerminalStore } from "@/stores/terminal";
import { RefreshCw, ExternalLink, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import WebContainerLoading from "./webcontainer-loading";
import { useEditorCode } from "@/stores/editor";

const WebContainer = () => {
  const { url } = useTerminalStore();
  const { EditorCode } = useEditorCode();
  const { isLoadingWebContainer, isLoadingWebContainerMessage } =
    useTerminalStore((state) => state);
  const { setFullPreview } = useFullPreview();

  if (isLoadingWebContainer) {
    return <WebContainerLoading message={isLoadingWebContainerMessage} />;
  }

  if (!url) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full p-6">
        <Alert className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-center">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">
                  WebContainer not initialized
                </h3>
                <p className="text-sm text-muted-foreground">
                  The preview environment needs to be set up. Click below to
                  install dependencies and start the development server.
                </p>
              </div>
              <Button
                onClick={() => {
                  const event = new CustomEvent("remount-webcontainer", {
                    detail: { files: EditorCode },
                  });
                  window.dispatchEvent(event);
                }}
                className="w-full"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Initialize WebContainer
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col bg-background">
      {/* Preview Header */}
      <div className="flex items-center justify-between gap-2 px-4 py-2 border-b bg-muted/30">
        <div className="flex items-center gap-2 flex-1 max-w-2xl">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-md flex-1">
            <div className="flex items-center justify-center w-3 h-3 rounded-full bg-emerald-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <span className="text-sm text-muted-foreground truncate">
              http://localhost:5173
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const event = new CustomEvent("remount-webcontainer");
              window.dispatchEvent(event);
            }}
            className="h-8"
          >
            <RefreshCw className="h-3 w-3 mr-2" />
            Refresh
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setFullPreview(true)}
            className="h-8"
          >
            <ExternalLink className="h-3 w-3 mr-2" />
            Full Screen
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 w-full">
        <iframe
          title="WebContainer Preview"
          className="w-full h-full border-0"
          src={url}
          allow="cross-origin-isolated"
          sandbox="allow-same-origin allow-scripts allow-forms"
        />
      </div>
    </div>
  );
};

export default WebContainer;
