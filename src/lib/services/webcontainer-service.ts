import {
  WebContainer,
  type FileSystemTree,
  type WebContainerProcess,
} from "@webcontainer/api";
import { useTerminalStore } from "@/stores/terminal";
import type { projectFiles } from "@/types/webcontainer-files";

/**
 * Singleton WebContainer Service
 * Manages WebContainer lifecycle and operations following Bolt patterns
 */
export class WebContainerService {
  private static instance: WebContainerService;
  private webcontainer: WebContainer | null = null;
  private bootPromise: Promise<WebContainer> | null = null;
  private serverProcess: WebContainerProcess | null = null;

  private constructor() {}

  static getInstance(): WebContainerService {
    if (!WebContainerService.instance) {
      WebContainerService.instance = new WebContainerService();
    }
    return WebContainerService.instance;
  }

  async boot(): Promise<WebContainer> {
    if (this.webcontainer) return this.webcontainer;

    if (!this.bootPromise) {
      this.bootPromise = this.initializeWebContainer();
    }

    return this.bootPromise;
  }

  private async initializeWebContainer(): Promise<WebContainer> {
    try {
      const webcontainer = await WebContainer.boot({
        coep: "credentialless",
        workdirName: "project",
      });

      this.webcontainer = webcontainer;
      this.setupEventListeners();

      console.log("WebContainer initialized successfully");
      return webcontainer;
    } catch (error) {
      console.error("Failed to initialize WebContainer:", error);
      // Reset promises so we can try again
      this.bootPromise = null;
      this.webcontainer = null;
      throw error;
    }
  }

  private setupEventListeners() {
    if (!this.webcontainer) return;

    // Server ready handling
    this.webcontainer.on("server-ready", (port: number, url: string) => {
      console.log(`Server ready on port ${port}: ${url}`);
      const terminalStore = useTerminalStore.getState();
      terminalStore.setUrl(url);
      terminalStore.setIsLoadingWebContainer(false);
      terminalStore.addCommand(`🚀 Server ready at: ${url}`);
    });

    // Port handling
    this.webcontainer.on(
      "port",
      (port: number, type: "open" | "close", url?: string) => {
        console.log(`Port ${port} ${type}${url ? `: ${url}` : ""}`);
        if (type === "open" && url) {
          const terminalStore = useTerminalStore.getState();
          terminalStore.setUrl(url);
        }
      },
    );

    // Error handling
    this.webcontainer.on("error", (error) => {
      console.error("WebContainer error:", error);
      const terminalStore = useTerminalStore.getState();
      terminalStore.addCommand(`❌ WebContainer Error: ${error.message}`);
    });
  }

  async mountFiles(files: projectFiles): Promise<void> {
    if (!this.webcontainer) {
      throw new Error("WebContainer not initialized. Call boot() first.");
    }

    try {
      await this.webcontainer.mount(files as unknown as FileSystemTree);
      console.log("Files mounted successfully");
    } catch (error) {
      console.error("Failed to mount files:", error);
      throw error;
    }
  }

  async spawn(
    command: string,
    args: string[] = [],
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    options?: any,
  ): Promise<WebContainerProcess> {
    if (!this.webcontainer) {
      throw new Error("WebContainer not initialized. Call boot() first.");
    }

    try {
      return await this.webcontainer.spawn(command, args, options);
    } catch (error) {
      console.error(
        `Failed to spawn command: ${command} ${args.join(" ")}`,
        error,
      );
      throw error;
    }
  }

  async killServerProcess(): Promise<void> {
    if (this.serverProcess) {
      try {
        await this.serverProcess.kill();
        this.serverProcess = null;
        console.log("Server process killed");
      } catch (error) {
        console.error("Failed to kill server process:", error);
      }
    }
  }

  setServerProcess(process: WebContainerProcess): void {
    this.serverProcess = process;
  }

  getWebContainer(): WebContainer | null {
    return this.webcontainer;
  }

  isReady(): boolean {
    return this.webcontainer !== null;
  }

  async restart(): Promise<WebContainer> {
    console.log("Restarting WebContainer...");

    // Kill server process
    await this.killServerProcess();

    // Reset state
    this.webcontainer = null;
    this.bootPromise = null;

    // Reset terminal state
    const terminalStore = useTerminalStore.getState();
    terminalStore.setUrl("");
    terminalStore.setIsLoadingWebContainer(true);
    terminalStore.setIsLoadingWebContainerMessage("Restarting WebContainer...");

    // Boot again
    return this.boot();
  }

  cleanup(): void {
    if (this.serverProcess) {
      this.serverProcess.kill();
      this.serverProcess = null;
    }

    this.webcontainer = null;
    this.bootPromise = null;
  }
}

// Export singleton instance for easy access
export const webcontainerService = WebContainerService.getInstance();
