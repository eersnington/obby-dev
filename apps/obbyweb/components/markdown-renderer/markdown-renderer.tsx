import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        a: ({ children, href, ...props }) => (
          <a href={href} target="_blank" {...props}>
            {children}
          </a>
        ),
        code: ({ children, className, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          return match ? (
            <code
              className={`${className} rounded bg-muted px-1 py-0.5 font-mono text-sm`}
              {...props}
            >
              {children}
            </code>
          ) : (
            <code
              className="rounded bg-muted px-1 py-0.5 font-mono text-sm"
              {...props}
            >
              {children}
            </code>
          );
        },
        pre: ({ children, ...props }) => (
          <pre
            className="overflow-x-auto rounded-sm bg-muted p-3 text-sm"
            {...props}
          >
            {children}
          </pre>
        ),
        h1: ({ children, ...props }) => (
          <h1 className="mt-4 mb-2 font-semibold text-lg first:mt-0" {...props}>
            {children}
          </h1>
        ),
        h2: ({ children, ...props }) => (
          <h2
            className="mt-3 mb-2 font-semibold text-base first:mt-0"
            {...props}
          >
            {children}
          </h2>
        ),
        h3: ({ children, ...props }) => (
          <h3 className="mt-2 mb-1 font-semibold text-sm first:mt-0" {...props}>
            {children}
          </h3>
        ),
        ul: ({ children, ...props }) => (
          <ul className="mb-2 list-disc space-y-1 pl-4" {...props}>
            {children}
          </ul>
        ),
        ol: ({ children, ...props }) => (
          <ol className="mb-2 list-decimal space-y-1 pl-4" {...props}>
            {children}
          </ol>
        ),
        p: ({ children, ...props }) => (
          <p className="mb-2 last:mb-0" {...props}>
            {children}
          </p>
        ),
        blockquote: ({ children, ...props }) => (
          <blockquote
            className="my-2 border-muted border-l-4 pl-4 italic"
            {...props}
          >
            {children}
          </blockquote>
        ),
      }}
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
    >
      {content}
    </ReactMarkdown>
  );
}
