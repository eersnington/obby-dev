/** biome-ignore-all lint/suspicious/noExplicitAny: this needs to be refactored */
import type { UIMessage, UIMessageStreamWriter } from "ai";
import { experimental_createMCPClient as createMCPClient, tool } from "ai";
import { Experimental_StdioMCPTransport as StdioMCPTransport } from "ai/mcp-stdio";
import { z } from "zod";
import { logger } from "@/lib/logger";
import type { DataPart } from "../messages/data-parts";
import description from "./context7.md";

type Params = {
  writer: UIMessageStreamWriter<UIMessage<never, DataPart>>;
};

const MAX_TOKENS = 20_000;

const LIBRARY_ID_REGEX =
  /\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+(?:\/[A-Za-z0-9_.+-]+)?/;

const schemas = {
  "resolve-library-id": {
    inputSchema: z.object({
      libraryName: z
        .string()
        .min(1)
        .describe('The library name to resolve, e.g. "next.js" or "supabase"'),
    }),
  },
  "get-library-docs": {
    inputSchema: z.object({
      context7CompatibleLibraryID: z
        .string()
        .min(1)
        .describe(
          'Exact Context7-compatible library ID, e.g. "/vercel/next.js" or "/vercel/next.js/v14.3.0"'
        ),
      tokens: z
        .number()
        .int()
        .positive()
        .max(MAX_TOKENS)
        .optional()
        .describe(
          "Max documentation tokens to retrieve (default defined by server)"
        ),
      topic: z
        .string()
        .min(1)
        .optional()
        .describe(
          'Focus topic, e.g. "routing", "app router", "server actions"'
        ),
    }),
  },
} as const;

// Helper function to extract library ID from resolution result
function extractLibraryId(resolution: unknown): string | undefined {
  if (typeof resolution === "string") {
    const match = resolution.match(LIBRARY_ID_REGEX);
    return match?.[0];
  }

  if (resolution && typeof resolution === "object") {
    const resObj = resolution as Record<string, unknown>;
    const maybeId =
      (typeof resObj.id === "string" && resObj.id) ||
      (typeof resObj.libraryId === "string" && resObj.libraryId) ||
      (typeof resObj.context7CompatibleLibraryID === "string" &&
        resObj.context7CompatibleLibraryID);
    return maybeId || undefined;
  }

  return;
}

function writeResponse(
  writer: UIMessageStreamWriter<UIMessage<never, DataPart>>,
  toolCallId: string,
  data: any
) {
  writer.write({
    id: toolCallId,
    type: "data-context7",
    data,
  });
}

async function resolveLibraryId(
  mcpTools: Record<string, any>,
  name: string
): Promise<string | undefined> {
  logger.info("Resolving library ID", { tool: "context7", name });

  const resolver = mcpTools["resolve-library-id"];
  const resolution = await resolver.execute({ libraryName: name });
  const resolvedId = extractLibraryId(resolution);

  if (!resolvedId) {
    logger.error("Library ID resolution failed", {
      tool: "context7",
      name,
      resolution:
        typeof resolution === "object"
          ? JSON.stringify(resolution, null, 2)
          : String(resolution),
    });
    return;
  }

  logger.info("Library ID resolved successfully", {
    tool: "context7",
    name,
    resolvedId,
  });

  return resolvedId;
}

// Helper function to fetch documentation
async function fetchDocumentation(
  mcpTools: Record<string, any>,
  libraryId: string,
  tokens: number | undefined,
  topic: string | undefined
): Promise<string> {
  logger.info("Fetching documentation", {
    tool: "context7",
    libraryId,
    topic,
    tokens,
  });

  const getDocs = mcpTools["get-library-docs"];
  const result = await getDocs.execute({
    context7CompatibleLibraryID: libraryId,
    tokens,
    topic,
  });

  const resultString =
    typeof result === "string" ? result : JSON.stringify(result, null, 2);

  logger.info("Documentation fetched successfully", {
    tool: "context7",
    libraryId,
    topic,
    tokens,
    contentLength: resultString.length,
  });

  return resultString;
}

function createMCPClientWithTransport(
  command: string,
  args: string[]
): Promise<Awaited<ReturnType<typeof createMCPClient>>> {
  const transport = new StdioMCPTransport({ command, args });
  return createMCPClient({ transport });
}

function getMCPTools(mcpClient: Awaited<ReturnType<typeof createMCPClient>>) {
  return mcpClient.tools({
    schemas: {
      "resolve-library-id": schemas["resolve-library-id"],
      "get-library-docs": schemas["get-library-docs"],
    },
  });
}

function prepareCommandArgs(
  providedArgs: string[] | undefined,
  apiKey: string | undefined
): string[] {
  const baseArgs = providedArgs ?? ["-y", "@upstash/context7-mcp"];
  return apiKey && !providedArgs
    ? [...baseArgs, "--api-key", apiKey]
    : baseArgs;
}

async function getLibraryId(
  mcpTools: Record<string, any>,
  providedId: string | undefined,
  name: string | undefined
): Promise<string> {
  if (providedId) {
    return providedId;
  }

  if (!name) {
    throw new Error("No library ID available after resolution attempt");
  }

  const resolvedId = await resolveLibraryId(mcpTools, name);
  if (!resolvedId) {
    throw new Error(`Failed to resolve library ID from name "${name}"`);
  }

  return resolvedId;
}

async function executeMainLogic(
  input: {
    libraryId?: string;
    name?: string;
    topic?: string;
    tokens?: number;
    command?: string;
    args?: string[];
    apiKey?: string;
  },
  toolCallId: string,
  writer: UIMessageStreamWriter<UIMessage<never, DataPart>>
): Promise<string> {
  const command = input.command ?? "npx";
  const query = input.name ?? input.libraryId ?? "unknown";

  writeResponse(writer, toolCallId, {
    status: "loading",
    query,
    libraryId: input.libraryId,
    topic: input.topic,
    tokens: input.tokens,
  });

  const args = prepareCommandArgs(input.args, input.apiKey);

  logger.info("Spawning MCP server", {
    tool: "context7",
    command,
    args: args.map((arg) => (arg.includes("api-key") ? "[REDACTED]" : arg)),
    query,
  });

  const mcpClient = await createMCPClientWithTransport(command, args);
  const mcpTools = await getMCPTools(mcpClient);

  try {
    const libraryId = await getLibraryId(mcpTools, input.libraryId, input.name);

    const resultString = await fetchDocumentation(
      mcpTools,
      libraryId,
      input.tokens,
      input.topic
    );

    writeResponse(writer, toolCallId, {
      status: "done",
      libraryId,
      topic: input.topic,
      tokens: input.tokens,
      result: resultString,
    });

    return `Fetched Context7 docs for ${libraryId}${
      input.topic ? ` (topic: ${input.topic})` : ""
    }. Content length: ${resultString.length}`;
  } finally {
    await mcpClient.close();
  }
}

export const context7 = ({ writer }: Params) =>
  tool({
    description,
    inputSchema: z
      .object({
        libraryId: z
          .string()
          .min(1)
          .optional()
          .describe(
            'Exact Context7 ID like "/org/project[/version]" if you already know it'
          ),
        name: z
          .string()
          .min(1)
          .optional()
          .describe(
            'Library name to resolve, e.g. "next.js", "react", "supabase"'
          ),
        topic: z
          .string()
          .min(1)
          .optional()
          .describe("Optional topic to focus docs on"),
        tokens: z
          .number()
          .int()
          .positive()
          .max(MAX_TOKENS)
          .optional()
          .describe("Max number of tokens to fetch from Context7"),
        command: z
          .string()
          .min(1)
          .optional()
          .default("npx")
          .describe("Command used to spawn the MCP server (default: npx)"),
        args: z
          .array(z.string().min(1))
          .optional()
          .describe(
            'Arguments to pass to the command. Defaults to ["-y","@upstash/context7-mcp"]. If provided, used as-is.'
          ),
        apiKey: z
          .string()
          .min(1)
          .optional()
          .describe(
            'Optional API key forwarded to the MCP server. If provided, it is appended as "--api-key <KEY>". Not required.'
          ),
      })
      .refine((v) => Boolean(v.libraryId) || Boolean(v.name), {
        message: 'Provide either "libraryId" or "name".',
        path: ["name"],
      }),
    execute: async (input, { toolCallId }) => {
      const query = input.name ?? input.libraryId ?? "unknown";

      try {
        return await executeMainLogic(input, toolCallId, writer);
      } catch (error) {
        const message = `Context7 tool execution failed: ${
          error instanceof Error ? error.message : "Unknown error occurred"
        }`;

        logger.error("Context7 tool execution failed", {
          tool: "context7",
          error: error instanceof Error ? error.message : "Unknown error",
          query,
        });

        writeResponse(writer, toolCallId, {
          status: "error",
          query,
          error: message,
        });

        return message;
      }
    },
  });
