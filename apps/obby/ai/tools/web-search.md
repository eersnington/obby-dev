Use this tool to search the web for information on any topic using Firecrawl's powerful search capabilities. This tool provides real-time access to web content and returns structured search results that can be analyzed and summarized.

## When to Use This Tool

Use this tool when you need to:

1. **Research Current Information**: Find up-to-date information on any topic
2. **Compare Sources**: Get multiple perspectives from different websites
3. **Fact Checking**: Verify information against multiple sources
4. **News and Updates**: Find recent news or updates on specific topics
5. **Technical Documentation**: Search for API docs, tutorials, or guides
6. **Market Research**: Gather information about products, companies, or trends
7. **Code Examples**: Search GitHub repositories and code documentation

## Search Capabilities

This tool provides:

- **Real-time Results**: Access current web content and recent information
- **Source Types**: Choose between web, and image search results
- **Direct Links**: Each result includes a clickable link to the source

## Advanced Search Options

### Categories
- **github**: Search within GitHub repositories, code, issues, and documentation

### Sources
- **web**: Standard web results (default)
- **images**: Image search results


## Best Practices

- **Use Specific Queries**: More specific searches yield better results
- **Include Context**: Add relevant keywords to improve result quality
- **Combine Terms**: Use multiple related terms for comprehensive coverage
- **Verify Sources**: Cross-reference important information across multiple results
- **Use Categories**: Leverage GitHubif you're looking for code examples from github.

## Examples of Effective Queries

<example>
User: What are the latest Next.js 15 features?
Assistant: I'll search for information about Next.js 14 new features using GitHub category for technical documentation.
*Uses Web Search with query: "Next.js 15 use cache", categories: ["github"]*
</example>

<example>
User: How do I create a background task with Trigger V4 in my app
Assistant: Let me find the latest docs for Trigger V4 for background task creation
*Uses Web Search with query: "Trigger V4 Background Tasks", includeContent: true*
</example>

## When NOT to Use This Tool

Avoid using this tool when:

1. **Local Information Needed**: Information about files or code in the current project
2. **Real-time Data**: Live data that changes by the second (stock prices, live sports)
3. **Private Content**: Information that requires authentication or is behind paywalls
4. **Very Recent Events**: Events that happened minutes ago (may not be indexed yet)
5. **Personal Data**: Searching for private or personal information

## API Requirements

This tool requires the `FIRECRAWL_API_KEY` environment variable to be configured. The tool will gracefully handle cases where the API key is not available and provide appropriate error messages.

## Error Handling

The tool handles various error scenarios:

- **Missing API Key**: Clear error message when FIRECRAWL_API_KEY is not configured
- **Network Issues**: Connection timeouts or server errors
- **Invalid Queries**: Malformed or problematic search terms
- **No Results**: When no relevant results are found
- **API Limits**: Rate limiting or quota exhaustion from Firecrawl
- **Parse Errors**: Issues processing the search response format

## Summary

Use Web Search to gather real-time information from the web with Firecrawl's advanced search capabilities. Perfect for research, fact-checking, finding code examples, academic sources, and staying up-to-date with current information. The tool supports GitHub-specific searches for development tasks and research category searches for academic content.
