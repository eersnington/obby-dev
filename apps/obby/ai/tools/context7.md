Use this tool to fetch up-to-date, version-specific documentation and code examples for any library directly from Context7 via the Model Context Protocol (MCP). It resolves a library by name (e.g., “next.js”) or accepts an explicit Context7 ID (e.g., “/vercel/next.js/v14.3.0”) and returns focused, copy‑ready docs.

## When to Use This Tool
Use it to:
1. Ground answers in authoritative, current docs (reduce hallucinations)
2. Verify exact APIs, options, and version changes
3. Pull topical documentation sections (e.g., “routing”, “server actions”)
4. Paste accurate docs/examples directly into the conversation

## Capabilities
- Resolve library name to a Context7-compatible ID
- Fetch version-specific docs and examples from source
- Narrow results by topic (e.g., “routing”, “hooks”)
- Control max content size using a token budget
- Streaming status: loading → done | error

## Inputs
- libraryId (string, optional) – Exact Context7 ID (e.g., /org/project[/version])
- name (string, optional) – Library name to resolve (e.g., “next.js”, “supabase”)
  - Provide either libraryId OR name
- topic (string, optional) – Focus area (e.g., “routing”, “app router”)
- tokens (number, optional) – Max tokens to fetch (reasonable upper bound)
- command (string, optional, default: “npx”) – Process launcher for MCP server
- args (string[], optional) – Arguments for the MCP server process
  - Defaults internally to: ["-y", "@upstash/context7-mcp"] when not provided
- apiKey (string, optional) – Forwarded to the MCP server if provided. Not required.

## Output
- Returns a success message including the resolved library ID and content length
- Streams UI events (data-context7) with:
  - status: "loading" | "done" | "error"
  - libraryId, topic, tokens
  - result (string payload of docs/examples)
  - error (string, on failures)

Note: The tool returns the raw documentation payload as a string. Use only the most relevant snippets in your final answer. Don’t dump the entire result to the user.

## Best Practices
- Prefer a precise Context7 `libraryId` if you know it (fewer ambiguities)
- Provide a `topic` to keep content concise and on-target
- Use a modest `tokens` budget; increase only when needed
- Quote only the relevant sections (headings, signatures, examples) in replies
- If name resolution is ambiguous or fails, retry with a more specific name or provide `libraryId`

## Examples
<example>
User: What changed in Next.js 14 around routing?
Assistant: (Calls Context7 with name="next.js", topic="routing", tokens=4000)
</example>

<example>
User: Show me server actions details for this exact version.
Assistant: (Calls Context7 with libraryId="/vercel/next.js/v14.3.0", topic="server actions", tokens=5000)
</example>

<example>
User: How do I initialize the Supabase client and handle RLS?
Assistant: (Calls Context7 with name="supabase", topic="client initialization", tokens=3000)
</example>

## When NOT to Use
1. Asking for general advice that doesn’t need exact docs
2. Multi-library comparisons not tied to specific versions/topics
3. Extremely broad requests without a topic (may return too much data)
4. Situations where you already have the snippet locally available

## Errors
- Name resolution failed (ambiguous or unknown name)
- MCP server spawn issues or execution errors
- Remote fetch/network issues
- Missing or invalid parameters

On error, the tool streams a final "error" status and returns a concise failure message.

## Summary
Context7 gives you real, versioned documentation and examples right when you need them. Use a `libraryId` for precision or a `name` for convenience, add a `topic` to focus, control size with `tokens`, and quote only what’s relevant in your final answer.
