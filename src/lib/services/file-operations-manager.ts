import { webcontainerService } from "./webcontainer-service";
import { useTerminalStore } from "@/stores/terminal";
import { useEditorCode } from "@/stores/editor";
import type { projectFiles } from "@/types/webcontainer-files";
import type { WebContainerProcess } from "@webcontainer/api";

/**
 * File Operations Manager
 * Handles all file-related operations with WebContainer
 */
export class FileOperationsManager {
  private static instance: FileOperationsManager;
  private currentDevProcess: WebContainerProcess | null = null;

  private constructor() {}

  static getInstance(): FileOperationsManager {
    if (!FileOperationsManager.instance) {
      FileOperationsManager.instance = new FileOperationsManager();
    }
    return FileOperationsManager.instance;
  }

  /**
   * Save files to WebContainer and restart dev server if needed
   */
  async saveFiles(files: projectFiles): Promise<void> {
    const terminalStore = useTerminalStore.getState();

    try {
      terminalStore.setIsSavingFiles(true);
      terminalStore.addCommand("📦 Saving files to WebContainer...");

      // Ensure WebContainer is ready
      await webcontainerService.boot();

      // Mount the files
      await webcontainerService.mountFiles(files);

      terminalStore.addCommand("✅ Files saved successfully");

      // Restart dev server if it was running
      if (this.currentDevProcess) {
        await this.restartDevServer();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      terminalStore.addCommand(`❌ Error saving files: ${errorMessage}`);
      console.error("Failed to save files:", error);
      throw error;
    } finally {
      terminalStore.setIsSavingFiles(false);
    }
  }

  /**
   * Initialize project with files and install dependencies
   */
  async initializeProject(files: projectFiles): Promise<void> {
    const terminalStore = useTerminalStore.getState();

    try {
      terminalStore.setIsLoadingWebContainer(true);
      terminalStore.setIsLoadingWebContainerMessage("Initializing project...");
      terminalStore.addCommand("🚀 Initializing project...");

      // Boot WebContainer
      await webcontainerService.boot();

      // Mount files
      await webcontainerService.mountFiles(files);
      terminalStore.addCommand("📂 Project files mounted");

      // Install dependencies
      await this.installDependencies();

      terminalStore.addCommand("🎉 Project initialized successfully!");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      terminalStore.addCommand(
        `❌ Project initialization failed: ${errorMessage}`,
      );
      console.error("Failed to initialize project:", error);
      throw error;
    } finally {
      terminalStore.setIsLoadingWebContainer(false);
    }
  }

  /**
   * Install npm dependencies
   */
  async installDependencies(): Promise<void> {
    const terminalStore = useTerminalStore.getState();

    try {
      terminalStore.addCommand("📦 Installing dependencies...");

      const installProcess = await webcontainerService.spawn("npm", [
        "install",
      ]);

      // Stream output to terminal
      await this.streamProcessOutput(installProcess);

      const exitCode = await installProcess.exit;

      if (exitCode === 0) {
        terminalStore.addCommand("✅ Dependencies installed successfully");
      } else {
        throw new Error(`npm install failed with exit code ${exitCode}`);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      terminalStore.addCommand(
        `❌ Failed to install dependencies: ${errorMessage}`,
      );
      throw error;
    }
  }

  /**
   * Start development server
   */
  async startDevServer(): Promise<void> {
    const terminalStore = useTerminalStore.getState();

    try {
      // Kill existing dev process
      if (this.currentDevProcess) {
        await this.currentDevProcess.kill();
      }

      terminalStore.addCommand("🚀 Starting development server...");

      const devProcess = await webcontainerService.spawn("npm", ["run", "dev"]);
      this.currentDevProcess = devProcess;
      webcontainerService.setServerProcess(devProcess);

      // Stream output to terminal
      this.streamProcessOutput(devProcess).catch((error) => {
        console.error("Error streaming dev server output:", error);
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      terminalStore.addCommand(
        `❌ Failed to start dev server: ${errorMessage}`,
      );
      throw error;
    }
  }

  /**
   * Restart development server
   */
  async restartDevServer(): Promise<void> {
    const terminalStore = useTerminalStore.getState();

    try {
      terminalStore.addCommand("🔄 Restarting development server...");

      // Kill current process
      if (this.currentDevProcess) {
        await this.currentDevProcess.kill();
        this.currentDevProcess = null;
      }

      // Start new process
      await this.startDevServer();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      terminalStore.addCommand(
        `❌ Failed to restart dev server: ${errorMessage}`,
      );
      throw error;
    }
  }

  /**
   * Execute a terminal command
   */
  async executeCommand(command: string, args: string[] = []): Promise<void> {
    const terminalStore = useTerminalStore.getState();

    try {
      const fullCommand = `${command} ${args.join(" ")}`;
      terminalStore.addCommand(`> ${fullCommand}`);

      const process = await webcontainerService.spawn(command, args);

      // Stream output to terminal
      await this.streamProcessOutput(process);

      const exitCode = await process.exit;

      if (exitCode !== 0) {
        terminalStore.addCommand(
          `❌ Command failed with exit code ${exitCode}`,
        );
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      terminalStore.addCommand(`❌ Command failed: ${errorMessage}`);
      throw error;
    }
  }

  /**
   * Stream process output to terminal
   */
  private async streamProcessOutput(
    process: WebContainerProcess,
  ): Promise<void> {
    const terminalStore = useTerminalStore.getState();

    try {
      const reader = process.output.getReader();

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        // Add output to terminal
        if (value) {
          terminalStore.addCommand(value.trim());
        }
      }
    } catch (error) {
      console.error("Error streaming output for process:", error);
      throw error;
    }
  }

  /**
   * Get current dev server process
   */
  getCurrentDevProcess(): WebContainerProcess | null {
    return this.currentDevProcess;
  }

  /**
   * Check if dev server is running
   */
  isDevServerRunning(): boolean {
    return this.currentDevProcess !== null;
  }

  /**
   * Cleanup all processes
   */
  async cleanup(): Promise<void> {
    try {
      if (this.currentDevProcess) {
        await this.currentDevProcess.kill();
        this.currentDevProcess = null;
      }
    } catch (error) {
      console.error("Error during cleanup:", error);
    }
  }
}

// Export singleton instance
export const fileOperationsManager = FileOperationsManager.getInstance();
