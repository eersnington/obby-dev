import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InteractiveHoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  content?: string;
  onClick?: () => void;
  onHoverText?: string;
  arrow?: boolean;
}

const InteractiveHoverButton = React.forwardRef<HTMLButtonElement, InteractiveHoverButtonProps>(
  ({ content, onClick, className, arrow = true, ...props }, ref) => {
    return (
      <button
        onClick={onClick}
        ref={ref}
        className={cn(
          'group relative px-4 cursor-pointer overflow-hidden rounded-full border bg-background p-2 text-[14px] text-center',
          className,
        )}
        {...props}
      >
        <span className="relative px-2 inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 ml-2">
          {content}
        </span>
        <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100 ">
          <span>{content}</span>
          {arrow && <ArrowRight />}
        </div>
        <div className="absolute left-[10%] top-[40%] h-2 w-2 scale-[1] rounded-lg bg-primary transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8] group-hover:bg-primary"></div>
      </button>
    );
  },
);

InteractiveHoverButton.displayName = 'InteractiveHoverButton';

export { InteractiveHoverButton };