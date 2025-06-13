import type { projectFiles } from "@/types/webcontainer-files";

/**
 * Event Manager with Abort Controllers
 * Provides clean event handling with proper cleanup
 */
export class EventManager {
  private controllers = new Map<string, AbortController>();
  private activeListeners = new Set<string>();

  /**
   * Subscribe to an event with automatic cleanup
   */
  subscribe<T>(
    eventName: string,
    handler: (event: CustomEvent<T>) => void,
  ): () => void {
    // Clean up existing controller if any
    this.unsubscribe(eventName);

    const controller = new AbortController();
    this.controllers.set(eventName, controller);
    this.activeListeners.add(eventName);

    // Type-safe event listener
    const typedHandler = (event: Event) => {
      if (event instanceof CustomEvent) {
        handler(event as CustomEvent<T>);
      }
    };

    window.addEventListener(eventName, typedHandler, {
      signal: controller.signal,
    });

    // Return cleanup function
    return () => this.unsubscribe(eventName);
  }

  /**
   * Unsubscribe from a specific event
   */
  unsubscribe(eventName: string): void {
    const controller = this.controllers.get(eventName);
    if (controller) {
      controller.abort();
      this.controllers.delete(eventName);
      this.activeListeners.delete(eventName);
    }
  }

  /**
   * Emit a custom event
   */
  emit<T>(eventName: string, detail?: T): void {
    const event = new CustomEvent(eventName, { detail });
    window.dispatchEvent(event);
  }

  /**
   * Check if an event is being listened to
   */
  isListening(eventName: string): boolean {
    return this.activeListeners.has(eventName);
  }

  /**
   * Get all active listeners
   */
  getActiveListeners(): string[] {
    return Array.from(this.activeListeners);
  }

  /**
   * Clean up all event listeners
   */
  cleanup(): void {
    // biome-ignore lint/complexity/noForEach: this is cleaner
    this.controllers.forEach((controller) => {
      try {
        controller.abort();
      } catch (error) {
        console.warn("Error aborting controller:", error);
      }
    });

    this.controllers.clear();
    this.activeListeners.clear();
  }

  /**
   * Get the number of active listeners
   */
  get size(): number {
    return this.activeListeners.size;
  }
}

// Export singleton instance
export const globalEventManager = new EventManager();

// Event type definitions for type safety
export interface EditorEventMap {
  "save-files": { files: projectFiles };
  "remount-webcontainer": { files?: projectFiles };
  "terminal-command": { command: string; args?: string[] };
  "file-created": { path: string; content?: string };
  "file-deleted": { path: string };
  "file-renamed": { oldPath: string; newPath: string };
}

// Type-safe event emitter
export function emitEditorEvent<K extends keyof EditorEventMap>(
  eventName: K,
  detail: EditorEventMap[K],
): void {
  globalEventManager.emit(eventName, detail);
}

// Type-safe event subscriber
export function subscribeToEditorEvent<K extends keyof EditorEventMap>(
  eventName: K,
  handler: (event: CustomEvent<EditorEventMap[K]>) => void,
): () => void {
  return globalEventManager.subscribe(eventName, handler);
}
