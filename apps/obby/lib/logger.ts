import { Effect } from 'effect';

const logger = {
  info: (message: string, meta?: unknown) => {
    Effect.runFork(Effect.logInfo(message, meta));
  },
  debug: (message: string, meta?: unknown) => {
    Effect.runFork(Effect.logDebug(message, meta));
  },
  warn: (message: string, meta?: unknown) => {
    Effect.runFork(Effect.logWarning(message, meta));
  },
  error: (message: string, meta?: unknown) => {
    Effect.runFork(Effect.logError(message, meta));
  },
};

export { logger };
