import { animate, type ValueAnimationTransition } from 'motion/react';
import { useRef } from 'react';

export function useScrollTo() {
  const ref = useRef<HTMLDivElement>(null);

  function scrollTo(options: ValueAnimationTransition = {}) {
    if (!ref.current) return;

    const defaultOptions: ValueAnimationTransition = {
      type: 'spring',
      bounce: 0,
      duration: 0.6,
    };

    animate(window.scrollY, ref.current.offsetTop, {
      ...defaultOptions,
      ...options,
      onUpdate: (latest) => window.scrollTo({ top: latest }),
    });
  }

  return [ref, scrollTo] as const;
}
