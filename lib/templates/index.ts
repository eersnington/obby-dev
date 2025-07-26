const templates = {
  'nextjs-developer': {
    name: 'Next.js Modern UI Developer',
    lib: [
      'next@14.2.5',
      'typescript',
      '@types/node',
      '@types/react',
      '@types/react-dom',
      'postcss',
      'tailwindcss',
      'shadcn',
    ],
    file: 'pages/index.tsx',
    instructions:
      'A Next.js 14 app with pages router, focused on creating beautiful, modern UI components using shadcn/ui. Prioritize user requirements - use basic shadcn/ui by default, add Motion for animations when requested, React Three Fiber for 3D when requested, and other libraries as needed. Include npm install commands for additional packages. Please make sure that port is 3000',
    port: 3000,
  },
};

export default templates;
export type Templates = typeof templates;
export type TemplateId = keyof typeof templates;
export type TemplateConfig = (typeof templates)[TemplateId];

export function templatesToPrompt(templates: Templates) {
  return `${Object.entries(templates)
    .map(
      ([id, t], index) =>
        `${index + 1}. ${id}: "${t.instructions}". File: ${t.file || 'none'}. Dependencies installed: ${t.lib.join(', ')}. Port: ${t.port || 'none'}.`,
    )
    .join('\n')}`;
}
