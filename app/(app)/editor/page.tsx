'use client';

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackPreview,
} from '@codesandbox/sandpack-react';

const files = {
  '/styles.css': `@import "tailwindcss";

:root {
  --background: oklch(0.9399 0.0203 345.6985);
  --foreground: oklch(0.4712 0 0);
  --card: oklch(0.9498 0.0500 86.8891);
  --card-foreground: oklch(0.4712 0 0);
  --popover: oklch(1.0000 0 0);
  --popover-foreground: oklch(0.4712 0 0);
  --primary: oklch(0.6209 0.1801 348.1385);
  --primary-foreground: oklch(1.0000 0 0);
  --secondary: oklch(0.8095 0.0694 198.1863);
  --secondary-foreground: oklch(0.3211 0 0);
  --muted: oklch(0.8800 0.0504 212.0952);
  --muted-foreground: oklch(0.5795 0 0);
  --accent: oklch(0.9195 0.0801 87.6670);
  --accent-foreground: oklch(0.3211 0 0);
  --destructive: oklch(0.7091 0.1697 21.9551);
  --destructive-foreground: oklch(1.0000 0 0);
  --border: oklch(0.6209 0.1801 348.1385);
  --input: oklch(0.9189 0 0);
  --ring: oklch(0.7002 0.1597 350.7532);
  --chart-1: oklch(0.7002 0.1597 350.7532);
  --chart-2: oklch(0.8189 0.0799 212.0892);
  --chart-3: oklch(0.9195 0.0801 87.6670);
  --chart-4: oklch(0.7998 0.1110 348.1791);
  --chart-5: oklch(0.6197 0.1899 353.9091);
  --sidebar: oklch(0.9140 0.0424 343.0913);
  --sidebar-foreground: oklch(0.3211 0 0);
  --sidebar-primary: oklch(0.6559 0.2118 354.3084);
  --sidebar-primary-foreground: oklch(1.0000 0 0);
  --sidebar-accent: oklch(0.8228 0.1095 346.0184);
  --sidebar-accent-foreground: oklch(0.3211 0 0);
  --sidebar-border: oklch(0.9464 0.0327 307.1745);
  --sidebar-ring: oklch(0.6559 0.2118 354.3084);
  --font-sans: Poppins, sans-serif;
  --font-serif: Lora, serif;
  --font-mono: Fira Code, monospace;
  --radius: 0.4rem;
  --shadow-2xs: 3px 3px 0px 0px hsl(325.7800 58.1800% 56.8600% / 0.50);
  --shadow-xs: 3px 3px 0px 0px hsl(325.7800 58.1800% 56.8600% / 0.50);
  --shadow-sm: 3px 3px 0px 0px hsl(325.7800 58.1800% 56.8600% / 1.00), 3px 1px 2px -1px hsl(325.7800 58.1800% 56.8600% / 1.00);
  --shadow: 3px 3px 0px 0px hsl(325.7800 58.1800% 56.8600% / 1.00), 3px 1px 2px -1px hsl(325.7800 58.1800% 56.8600% / 1.00);
  --shadow-md: 3px 3px 0px 0px hsl(325.7800 58.1800% 56.8600% / 1.00), 3px 2px 4px -1px hsl(325.7800 58.1800% 56.8600% / 1.00);
  --shadow-lg: 3px 3px 0px 0px hsl(325.7800 58.1800% 56.8600% / 1.00), 3px 4px 6px -1px hsl(325.7800 58.1800% 56.8600% / 1.00);
  --shadow-xl: 3px 3px 0px 0px hsl(325.7800 58.1800% 56.8600% / 1.00), 3px 8px 10px -1px hsl(325.7800 58.1800% 56.8600% / 1.00);
  --shadow-2xl: 3px 3px 0px 0px hsl(325.7800 58.1800% 56.8600% / 2.50);
}

.dark {
  --background: oklch(0.2497 0.0305 234.1628);
  --foreground: oklch(0.9306 0.0197 349.0785);
  --card: oklch(0.2902 0.0299 233.5352);
  --card-foreground: oklch(0.9306 0.0197 349.0785);
  --popover: oklch(0.2902 0.0299 233.5352);
  --popover-foreground: oklch(0.9306 0.0197 349.0785);
  --primary: oklch(0.9195 0.0801 87.6670);
  --primary-foreground: oklch(0.2497 0.0305 234.1628);
  --secondary: oklch(0.7794 0.0803 4.1330);
  --secondary-foreground: oklch(0.2497 0.0305 234.1628);
  --muted: oklch(0.2713 0.0086 255.5780);
  --muted-foreground: oklch(0.7794 0.0803 4.1330);
  --accent: oklch(0.6699 0.0988 356.9762);
  --accent-foreground: oklch(0.9306 0.0197 349.0785);
  --destructive: oklch(0.6702 0.1806 350.3599);
  --destructive-foreground: oklch(0.2497 0.0305 234.1628);
  --border: oklch(0.3907 0.0399 242.2181);
  --input: oklch(0.3093 0.0305 232.0027);
  --ring: oklch(0.6998 0.0896 201.8672);
  --chart-1: oklch(0.6998 0.0896 201.8672);
  --chart-2: oklch(0.7794 0.0803 4.1330);
  --chart-3: oklch(0.6699 0.0988 356.9762);
  --chart-4: oklch(0.4408 0.0702 217.0848);
  --chart-5: oklch(0.2713 0.0086 255.5780);
  --sidebar: oklch(0.2303 0.0270 235.9743);
  --sidebar-foreground: oklch(0.9670 0.0029 264.5419);
  --sidebar-primary: oklch(0.6559 0.2118 354.3084);
  --sidebar-primary-foreground: oklch(1.0000 0 0);
  --sidebar-accent: oklch(0.8228 0.1095 346.0184);
  --sidebar-accent-foreground: oklch(0.2781 0.0296 256.8480);
  --sidebar-border: oklch(0.3729 0.0306 259.7328);
  --sidebar-ring: oklch(0.6559 0.2118 354.3084);
  --font-sans: Poppins, sans-serif;
  --font-serif: Lora, serif;
  --font-mono: Fira Code, monospace;
  --radius: 0.4rem;
  --shadow-2xs: 3px 3px 0px 0px hsl(206.1538 28.0576% 27.2549% / 0.50);
  --shadow-xs: 3px 3px 0px 0px hsl(206.1538 28.0576% 27.2549% / 0.50);
  --shadow-sm: 3px 3px 0px 0px hsl(206.1538 28.0576% 27.2549% / 1.00), 3px 1px 2px -1px hsl(206.1538 28.0576% 27.2549% / 1.00);
  --shadow: 3px 3px 0px 0px hsl(206.1538 28.0576% 27.2549% / 1.00), 3px 1px 2px -1px hsl(206.1538 28.0576% 27.2549% / 1.00);
  --shadow-md: 3px 3px 0px 0px hsl(206.1538 28.0576% 27.2549% / 1.00), 3px 2px 4px -1px hsl(206.1538 28.0576% 27.2549% / 1.00);
  --shadow-lg: 3px 3px 0px 0px hsl(206.1538 28.0576% 27.2549% / 1.00), 3px 4px 6px -1px hsl(206.1538 28.0576% 27.2549% / 1.00);
  --shadow-xl: 3px 3px 0px 0px hsl(206.1538 28.0576% 27.2549% / 1.00), 3px 8px 10px -1px hsl(206.1538 28.0576% 27.2549% / 1.00);
  --shadow-2xl: 3px 3px 0px 0px hsl(206.1538 28.0576% 27.2549% / 2.50);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --font-serif: var(--font-serif);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --shadow-2xs: var(--shadow-2xs);
  --shadow-xs: var(--shadow-xs);
  --shadow-sm: var(--shadow-sm);
  --shadow: var(--shadow);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
  --shadow-xl: var(--shadow-xl);
  --shadow-2xl: var(--shadow-2xl);
}`,
  '/pages/index.js': `export default function Home({ data }) {
  return (
    <div 
      className="min-h-screen bg-background text-foreground font-sans"
    >
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          <span className="block">Ready to dive in?</span>
          <span 
            className="block bg-primary"
          >
            Start your free trial today.
          </span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-lg drop-shadow-2xl">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-lg border border-transparent px-5 py-3 text-base font-medium text-primary-foreground hover:opacity-90 transition"
            >
                Get started
            </a>
          </div>
          <div className="ml-3 inline-flex rounded-lg">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-base font-medium hover:opacity-90 transition"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

 
export function getServerSideProps() {
  return {
    props: { data: "world" },
  }
}`,
};

export default () => (
  <SandpackProvider
    className="m-4 rounded-2xl border"
    customSetup={{
      dependencies: {
        tailwindcss: 'latest',
      },
    }}
    files={files}
    options={{
      externalResources: [
        'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4',
      ],
    }}
    template="nextjs"
  >
    <SandpackLayout className="h-full w-full">
      <SandpackFileExplorer className="h-full" />
      <SandpackCodeEditor className="h-full" showRunButton />
      <SandpackPreview className="h-full" />
    </SandpackLayout>
  </SandpackProvider>
);
