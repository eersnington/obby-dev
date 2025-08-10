import type { UIMessage } from 'ai';
import type { DataPart } from '@/ai/messages/data-parts';
import type { Metadata } from '@/ai/messages/metadata';
import type { ToolSet } from '@/ai/tools';

export type ChatUIMessage = UIMessage<Metadata, DataPart, ToolSet>;
