import { useEffect, useState } from "react";
import { WebContainer } from "@webcontainer/api";
import { debounce } from "lodash";

// Store the singleton instance and boot promise outside the hook
let webcontainerInstance: WebContainer | null = null;
let bootPromise: Promise<WebContainer> | null = null;
const mountedFiles = new Set<string>(); // Track which files have been mounted

// Debounce the remount function to prevent rapid consecutive remounts
const debouncedRemount = debounce(async (container: WebContainer, files) => {
  try {
    await container.mount(files);
    console.log("Files mounted successfully (debounced)");
  } catch (error) {
    console.error("Failed to mount files:", error);
  }
}, 1000);

export function useWebContainer() {
  const [webcontainer, setWebcontainer] = useState<WebContainer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function bootWebContainer() {
      try {
        setError(null);

        if (!webcontainerInstance) {
          if (!bootPromise) {
            console.log("Creating new WebContainer boot promise");

            // Boot WebContainer with optimized options
            bootPromise = WebContainer.boot({
              coep: "credentialless", // Enable shared array buffer without COEP headers
              workdirName: "project", // Set working directory name
            });
          }

          webcontainerInstance = await bootPromise;
          console.log("WebContainer instance created successfully");

          // Set up event listeners for better debugging
          webcontainerInstance.on("server-ready", (port, url) => {
            console.log(`Server ready on port ${port}: ${url}`);
          });

          webcontainerInstance.on("port", (port, type, url) => {
            console.log(`Port ${port} ${type}: ${url}`);
          });

          webcontainerInstance.on("error", (error) => {
            console.error("WebContainer error:", error);
            setError(error.message);
          });
        } else {
          console.log("Reusing existing WebContainer instance");
        }

        setWebcontainer(webcontainerInstance);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        console.error("Failed to boot WebContainer:", error);
        setError(errorMessage);

        // Reset the promises so we can try again
        webcontainerInstance = null;
        bootPromise = null;
      } finally {
        setLoading(false);
      }
    }

    bootWebContainer();

    return () => {
      setWebcontainer(null);
    };
  }, []);

  // Function to restart WebContainer if needed
  const restartWebContainer = async () => {
    setLoading(true);
    setError(null);

    // Clean up existing instance
    if (webcontainerInstance) {
      try {
        // Note: WebContainer doesn't have a dispose method, but we can clean up our references
        webcontainerInstance = null;
        bootPromise = null;
      } catch (error) {
        console.error("Error during WebContainer cleanup:", error);
      }
    }

    // Restart the boot process
    setWebcontainer(null);

    // The useEffect will handle the restart
    setTimeout(() => {
      window.location.reload(); // For now, reload the page to fully restart
    }, 100);
  };

  return {
    webcontainer,
    loading,
    error,
    mountedFiles,
    debouncedRemount,
    restartWebContainer,
  };
}
