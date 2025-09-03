Use this tool to scrape a single web page via Firecrawl and return clean content in one or more requested formats: markdown (clean text), summary (concise overview), and screenshot (full‑page image URL).

## When to Use This Tool
Use it to:
1. Pull the latest content from a specific page for analysis or answering a question
2. Summarize an article or docs page
3. Get both text and a visual capture for reference or auditing
4. Enrich a response with authoritative, page‑level details

## Capabilities
- Markdown: Clean, structured page content (headings, lists, links preserved)
- Summary: High‑level AI-generated overview of main content
- Screenshot: Full-page rendered image URL
- Metadata: Page title, description, language, status code (always included)
- Streaming status: loading → done | error

## Inputs
- url (string, required) – Full absolute URL (https://…)
- formats (array, required) – One or more of: markdown, summary, screenshot

## Output
Only the requested format keys plus metadata. Screenshot (if requested) is a URL. Text result message includes markdown length for quick sizing.

## Best Practices
- Request only needed formats (omit screenshot unless necessary)
- Use markdown for detailed analysis, summary for quick context
- Validate the URL (must include protocol)
- If summary feels thin, also request markdown
- Do not EVER reply with the screenshot URL directly in your response

## Examples
<example>
User: Give me a quick overview of this page: https://example.com/blog/post
Assistant: (Calls Web Scrape with formats ["summary"])
</example>

<example>
User: Analyze this landing page and show me what it looks like.
Assistant: (Calls Web Scrape with formats ["markdown","screenshot"])
</example>

## When NOT to Use
1. Multi-page crawling or site-wide research (not supported)
2. Structured JSON extraction (not exposed in this wrapper)
3. Auth/login or paywalled pages
4. Rapid bulk scraping (single-page focus)
5. Needing location, language, or custom interaction actions (not exposed)

## API Requirement
Requires FIRECRAWL_API_KEY. Missing key returns an immediate error.

## Errors
Handles missing API key, invalid URL (schema), network/API failures, and empty content (markdown length may be 0).

## Summary
Use Web Scrape for fast, single-page enrichment: clean text (markdown), concise summary, and optional screenshot—powered by Firecrawl. Keep requests minimal, pick only the formats you need, and fall back to markdown if summary alone isn’t sufficient.
