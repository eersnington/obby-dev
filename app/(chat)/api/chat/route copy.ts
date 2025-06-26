import type { Duration } from "lib/utils/duration";
import { toPrompt } from "lib/ai/prompt";
import ratelimit from "lib/ratelimit";
import { fragmentSchema as schema } from "lib/fragment";
import { streamObject, type CoreMessage } from "ai";
import { getModelFromRegistry } from "lib/ai/providers";
import type { ModelInfo } from "lib/ai/models";
import templates from "lib/templates";
import type { GoogleGenerativeAIProviderOptions } from "@ai-sdk/google";

export const maxDuration = 60;

const rateLimitMaxRequests = process.env.RATE_LIMIT_MAX_REQUESTS
  ? Number.parseInt(process.env.RATE_LIMIT_MAX_REQUESTS)
  : 10;
const ratelimitWindow = process.env.RATE_LIMIT_WINDOW
  ? (process.env.RATE_LIMIT_WINDOW as Duration)
  : "1d";

export async function POST(req: Request) {
  const {
    messages,
    userID,
    teamID,
    model,
    config,
  }: {
    messages: CoreMessage[];
    userID: string | undefined;
    teamID: string | undefined;
    model: string;
    config: ModelInfo & {
      apiKey?: string;
    };
  } = await req.json();

  console.log("[req]", messages, userID, teamID, model, config);

  const llmModel = getModelFromRegistry(model);

  const limit = !config.apiKey
    ? await ratelimit(
        req.headers.get("x-forwarded-for"),
        rateLimitMaxRequests,
        ratelimitWindow,
      )
    : false;

  if (limit) {
    return new Response("You have reached your request limit for the day.", {
      status: 429,
      headers: {
        "X-RateLimit-Limit": limit.amount.toString(),
        "X-RateLimit-Remaining": limit.remaining.toString(),
        "X-RateLimit-Reset": limit.reset.toString(),
      },
    });
  }

  console.log("userID", userID);
  console.log("teamID", teamID);
  console.log("model", model);
  // console.log('config', config)

  const { apiKey: modelApiKey, ...modelParams } = config;

  try {
    const stream = streamObject({
      model: llmModel,
      providerOptions: {
        google: {
          thinkingConfig: {
            thinkingBudget: 500,
          },
        } satisfies GoogleGenerativeAIProviderOptions,
      },
      schema,
      system: toPrompt(templates),
      messages,
      maxRetries: 0, // do not retry on errors
      ...modelParams,
      onFinish({ usage }) {
        console.log("Token usage:", usage);
      },
    });

    return stream.toTextStreamResponse();
    // biome-ignore lint/suspicious/noExplicitAny: TODO: add better types
  } catch (error: any) {
    const isRateLimitError =
      error && (error.statusCode === 429 || error.message.includes("limit"));
    const isOverloadedError =
      error && (error.statusCode === 529 || error.statusCode === 503);
    const isAccessDeniedError =
      error && (error.statusCode === 403 || error.statusCode === 401);

    if (isRateLimitError) {
      return new Response(
        "The provider is currently unavailable due to request limit. Try using your own API key.",
        {
          status: 429,
        },
      );
    }

    if (isOverloadedError) {
      return new Response(
        "The provider is currently unavailable. Please try again later.",
        {
          status: 529,
        },
      );
    }

    if (isAccessDeniedError) {
      return new Response(
        "Access denied. Please make sure your API key is valid.",
        {
          status: 403,
        },
      );
    }

    console.error("Error:", error);

    return new Response(
      "An unexpected error has occurred. Please try again later.",
      {
        status: 500,
      },
    );
  }
}
