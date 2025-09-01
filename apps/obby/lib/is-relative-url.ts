import { Effect } from 'effect';

export function isRelativeUrl(url: string): boolean {
  try {
    new URL(url);
    return false;
  } catch (error: unknown) {
    Effect.log('Error parsing URL');
    const message = error instanceof Error ? error.message : String(error);
    Effect.log(message);
    return true;
  }
}
