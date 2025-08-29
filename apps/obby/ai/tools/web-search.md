Use this tool to search the web for information on any topic using Jina AI's powerful search capabilities. This tool provides real-time access to web content and returns structured search results that can be analyzed and summarized.

## When to Use This Tool

Use this tool when you need to:

1. **Research Current Information**: Find up-to-date information on any topic
2. **Compare Sources**: Get multiple perspectives from different websites
3. **Fact Checking**: Verify information against multiple sources
4. **News and Updates**: Find recent news or updates on specific topics
5. **Technical Documentation**: Search for API docs, tutorials, or guides
6. **Market Research**: Gather information about products, companies, or trends

## Search Capabilities

This tool provides:

- **Real-time Results**: Access current web content and recent information
- **Structured Data**: Returns organized results with titles, URLs, descriptions, and dates
- **Relevance Ranking**: Results are ranked by relevance to your query
- **Multiple Sources**: Provides diverse perspectives from different websites
- **Date Information**: Includes publication dates when available
- **Direct Links**: Each result includes a clickable link to the source

## Best Practices

- **Use Specific Queries**: More specific searches yield better results
- **Include Context**: Add relevant keywords to improve result quality
- **Combine Terms**: Use multiple related terms for comprehensive coverage
- **Check Dates**: Pay attention to result dates for time-sensitive information
- **Verify Sources**: Cross-reference important information across multiple results

## Examples of Effective Queries

<example>
User: What are the latest Next.js 14 features?
Assistant: I'll search for information about Next.js 14 new features.
*Uses Web Search with query: "Next.js 14 new features app router"*
</example>

<example>
User: How do I deploy a React app to Vercel?
Assistant: Let me find the latest deployment guides for React on Vercel.
*Uses Web Search with query: "React app Vercel deployment guide 2024"*
</example>

## When NOT to Use This Tool

Avoid using this tool when:

1. **Local Information Needed**: Information about files or code in the current project
2. **Real-time Data**: Live data that changes by the second (stock prices, live sports)
3. **Private Content**: Information that requires authentication or is behind paywalls
4. **Very Recent Events**: Events that happened minutes ago (may not be indexed yet)
5. **Personal Data**: Searching for private or personal information

## API Requirements

This tool requires the `JINA_API_KEY` environment variable to be configured. The tool will gracefully handle cases where the API key is not available and provide appropriate error messages.

## Error Handling

The tool handles various error scenarios:

- **Missing API Key**: Clear error message when JINA_API_KEY is not configured
- **Network Issues**: Connection timeouts or server errors
- **Invalid Queries**: Malformed or problematic search terms
- **No Results**: When no relevant results are found
- **API Limits**: Rate limiting or quota exhaustion from Jina AI
- **Parse Errors**: Issues processing the search response format

## Result Format

Each search result includes:

- **Title**: The page or article title
- **URL**: Direct link to the source content
- **Description**: Brief summary of the content
- **Date**: Publication date (when available)
- **Rank**: Search result ranking for relevance

## Summary

Use Web Search to gather real-time information from the web with AI-powered relevance ranking and structured result formatting. Perfect for research, fact-checking, and staying up-to-date with current information.