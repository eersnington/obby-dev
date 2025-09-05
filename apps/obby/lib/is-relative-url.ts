import { logger } from './logger';

export function isRelativeUrl(url: string): boolean {
  try {
    new URL(url);
    return false;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    logger.error('Error parsing URL', message);
    return true;
  }
}
