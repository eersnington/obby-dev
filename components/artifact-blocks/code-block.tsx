'use client';

interface CodeBlockProps {
  node: any;
  inline: boolean;
  className: string;
  children: any;
}

export function CodeBlock({
  node,
  inline,
  className,
  children,
  ...props
}: CodeBlockProps) {
  const match = /language-(\w+)/.exec(className || '');
  if (inline) {
    return (
      <code
        className={`${className} rounded-md bg-zinc-100 px-1 py-0.5 text-sm dark:bg-zinc-800`}
        {...props}
      >
        {children}
      </code>
    );
  } else {
    return match ? (
      <pre className="w-full overflow-x-auto rounded-xl border border-zinc-200 p-4 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50">
        <code
          className={`whitespace-pre-wrap break-words language-${match[1]}`}
        >
          {children}
        </code>
      </pre>
    ) : (
      <code className="whitespace-pre-wrap break-words rounded-md bg-gray-200 px-1 py-0.5 dark:bg-gray-800">
        {children}
      </code>
    );
  }
}
