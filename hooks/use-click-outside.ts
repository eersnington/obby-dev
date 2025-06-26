import { useClickOutside as useMantineClickOutside } from '@mantine/hooks';
import type { RefObject } from 'react';

/**
 * A wrapper around Mantine's `useClickOutside` hook.
 * Migration or replacement in the future if the underlying library has issues.
 * What cause me to do this was the usehooks-ts issue with react 19 -https://github.com/juliencrn/usehooks-ts/issues/663
 *
 * @param onClickAway The callback to execute when a click is detected outside the ref.
 * @returns A ref object to be attached to the DOM element.
 */
export const useClickOutside = <T extends HTMLElement>(
  onClickAway: () => void,
): RefObject<T | null> => {
  // <-- This return type is now correct
  // The return type of our wrapper now matches the underlying hook.
  return useMantineClickOutside<T>(onClickAway);
};
