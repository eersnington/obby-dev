/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as chats from "../chats.js";
import type * as documents from "../documents.js";
import type * as files from "../files.js";
import type * as http from "../http.js";
import type * as messages from "../messages.js";
import type * as organizations from "../organizations.js";
import type * as streams from "../streams.js";
import type * as stripe from "../stripe.js";
import type * as suggestions from "../suggestions.js";
import type * as users from "../users.js";
import type * as workos from "../workos.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  chats: typeof chats;
  documents: typeof documents;
  files: typeof files;
  http: typeof http;
  messages: typeof messages;
  organizations: typeof organizations;
  streams: typeof streams;
  stripe: typeof stripe;
  suggestions: typeof suggestions;
  users: typeof users;
  workos: typeof workos;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
