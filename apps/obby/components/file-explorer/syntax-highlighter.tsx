import {
  CodeBlock,
  CodeBlockCopyButton,
} from '@repo/design-system/components/ai-elements/code-block';

export function SyntaxHighlighter(props: { path: string; code: string }) {
  const lang = detectLanguageFromFilename(props.path);
  return (
    <div className="h-full min-h-0 w-full">
      <CodeBlock
        className="min-h-full w-full"
        code={props.code}
        language={lang ?? 'javascript'}
        showLineNumbers
      >
        <CodeBlockCopyButton />
      </CodeBlock>
    </div>
  );
}

function detectLanguageFromFilename(path: string): string {
  const pathParts = path.split('/');
  const filename = pathParts.at(-1) || '';
  const lower = filename.toLowerCase();
  const rawExt = lower.includes('.') ? lower.split('.').pop() : '';
  const extension = rawExt || (lower === 'dockerfile' ? 'dockerfile' : '');

  const extensionMap: Record<string, string> = {
    // JavaScript/TypeScript
    js: 'jsx',
    jsx: 'jsx',
    ts: 'typescript',
    tsx: 'tsx',
    mjs: 'javascript',
    cjs: 'javascript',

    // Python
    py: 'python',
    pyw: 'python',
    pyi: 'python',

    // Web technologies
    html: 'html',
    htm: 'html',
    css: 'css',
    scss: 'scss',
    sass: 'sass',
    less: 'less',

    // Other popular languages
    java: 'java',
    c: 'c',
    cpp: 'cpp',
    cxx: 'cpp',
    cc: 'cpp',
    h: 'c',
    hpp: 'cpp',
    cs: 'csharp',
    php: 'php',
    rb: 'ruby',
    go: 'go',
    rs: 'rust',
    swift: 'swift',
    kt: 'kotlin',
    scala: 'scala',
    sh: 'bash',
    bash: 'bash',
    zsh: 'bash',
    fish: 'bash',
    ps1: 'powershell',

    // Data formats
    json: 'json',
    xml: 'xml',
    yaml: 'yaml',
    yml: 'yaml',
    toml: 'toml',
    ini: 'ini',

    // Markup
    md: 'markdown',
    markdown: 'markdown',
    tex: 'latex',

    // Database
    sql: 'sql',

    // Config files
    dockerfile: 'dockerfile',
    gitignore: 'bash',
    env: 'bash',
  };

  return extensionMap[extension || ''] || 'text';
}
