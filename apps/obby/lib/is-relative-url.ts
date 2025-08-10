import { log } from '@repo/observability/log';

export function isRelativeUrl(url: string): boolean {
  try {
    new URL(url);
    return false;
  } catch (error: unknown) {
    log.error('Error parsing URL');
    const message = error instanceof Error ? error.message : String(error);
    log.error(message);
    return true;
  }
}
