import type { Route } from "next";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-1 flex-col items-center justify-center gap-12 px-6 py-16 text-center">
      <section className="text-center">
        <h1 className="mb-3 bg-gradient-to-r from-fd-foreground to-fd-muted-foreground bg-clip-text font-extrabold text-4xl text-transparent tracking-tight md:text-5xl">
          Build with Obby
        </h1>
        <p className="mx-auto max-w-2xl text-base text-fd-muted-foreground md:text-lg">
          A coding agent that scaffolds, runs, and previews apps inside an
          ephemeral Vercel Sandbox — with multi‑provider models, live logs, and
          tools such as Firecrawl and Context7.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            className="rounded-md border border-fd-muted-foreground/30 px-4 py-2 font-semibold transition-colors hover:bg-fd-muted/30"
            href={"/docs" as Route}
          >
            Read the Docs
          </Link>
          <Link
            className="rounded-md border border-fd-muted-foreground/30 px-4 py-2 font-semibold text-fd-foreground transition-colors hover:bg-fd-muted/30"
            href="/docs/setup"
          >
            Quickstart
          </Link>
        </div>
      </section>

      <section
        aria-label="Key features"
        className="mx-auto grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <div className="rounded-lg border border-fd-muted-foreground/20 bg-fd-muted/20 p-4">
          <h3 className="font-semibold">Vercel Sandbox</h3>
          <p className="mt-1 text-fd-muted-foreground text-sm">
            Create a fresh, isolated environment, generate files, run commands,
            and preview web apps.
          </p>
        </div>
        <div className="rounded-lg border border-fd-muted-foreground/20 bg-fd-muted/20 p-4">
          <h3 className="font-semibold">Model Orchestration</h3>
          <p className="mt-1 text-fd-muted-foreground text-sm">
            OpenAI, Anthropic, Google, Groq, Gateway, OpenRouter, Bedrock — pick
            your provider and go.
          </p>
        </div>
        <div className="rounded-lg border border-fd-muted-foreground/20 bg-fd-muted/20 p-4">
          <h3 className="font-semibold">Tools that Flow</h3>
          <p className="mt-1 text-fd-muted-foreground text-sm">
            Generate Files, Run/Wait Command, and Get Sandbox URL — reliable,
            sequential workflows.
          </p>
        </div>
        <div className="rounded-lg border border-fd-muted-foreground/20 bg-fd-muted/20 p-4">
          <h3 className="font-semibold">Preview & Logs</h3>
          <p className="mt-1 text-fd-muted-foreground text-sm">
            Live web preview, file explorer with syntax highlighting, and
            streamed command logs.
          </p>
        </div>
      </section>
    </main>
  );
}
