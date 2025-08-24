Use this tool to crawl and extract content from web pages using Jina AI's web crawling service. This tool fetches website content and converts it into clean, structured markdown format that can be easily processed and analyzed by AI models.

## When to Use This Tool

Use this tool when you need to:

1. Extract content from web pages for analysis or summarization
2. Research information from specific websites or articles
3. Gather data from publicly accessible web content
4. Parse and convert web content to structured markdown format
5. Access real-time information from websites

## Crawling Capabilities

This tool provides:

- **Clean Content Extraction**: Removes ads, navigation, and other noise to focus on main content
- **Markdown Conversion**: Converts HTML content to clean, readable markdown format
- **Smart Parsing**: Preserves important structure like headings, lists, links, and formatting
- **Error Handling**: Graceful handling of inaccessible or malformed web pages
- **Rate Limiting**: Respects website crawling policies and avoids overwhelming servers

## Best Practices

- **Use Specific URLs**: Provide complete, valid URLs including the protocol (https://)
- **Check Content Quality**: Some websites may block crawlers or return limited content
- **Respect Rate Limits**: Avoid making too many rapid requests to the same domain
- **Verify URLs**: Ensure the URL is accessible and contains the content you need
- **Handle Errors**: Be prepared for cases where crawling fails due to access restrictions

## Examples of When to Use This Tool

<example>
User: Can you analyze the latest blog post from OpenAI's website?
Assistant: I'll crawl the OpenAI blog to get the latest content for analysis.
*Calls Web Crawl with the blog URL*
</example>

<example>
User: What are the key features mentioned in this product documentation?
Assistant: I'll extract the content from that documentation page to analyze the features.
*Calls Web Crawl with the documentation URL*
</example>

## When NOT to Use This Tool

Avoid using this tool when:

1. **Private/Protected Content**: The URL requires authentication or login
2. **Dynamic Content**: Content is loaded dynamically via JavaScript and may not be accessible
3. **Rate-Limited Sites**: Websites that aggressively block crawlers
4. **Large Files**: For downloading large files like PDFs, videos, or archives
5. **Real-time Data**: For content that changes rapidly and requires constant updates

## API Requirements

This tool requires the `JINA_API_KEY` environment variable to be configured. The tool will gracefully handle cases where the API key is not available and provide appropriate error messages.

## Error Handling

The tool handles various error scenarios:

- **Invalid URLs**: Malformed or inaccessible URLs
- **Network Issues**: Connection timeouts or server errors
- **Access Denied**: Websites that block crawling attempts
- **API Limits**: Rate limiting or quota exhaustion from Jina AI
- **Content Issues**: Empty or unprocessable content

## Summary

Use Web Crawl to extract and convert web content into clean markdown format for AI processing. This tool is ideal for research, content analysis, and gathering information from publicly accessible websites.
