import { Sandbox } from '@vercel/sandbox';
import type { UIMessage, UIMessageStreamWriter } from 'ai';
import { tool } from 'ai';
import z from 'zod/v3';
import { env } from '@/env';
import type { DataPart } from '../messages/data-parts';
import description from './wait-command.md';

type Params = {
  writer: UIMessageStreamWriter<UIMessage<never, DataPart>>;
};

export const waitCommand = ({ writer }: Params) =>
  tool({
    description,
    inputSchema: z.object({
      sandboxId: z
        .string()
        .describe('The ID of the Sandbox where the command was run'),
      commandId: z.string().describe('The ID of the command to wait for.'),
      command: z
        .string()
        .describe('The command field of the command to wait for'),
      args: z
        .array(z.string())
        .describe('The arguments field of the command to wait for'),
    }),
    execute: async (
      { sandboxId, commandId, command, args },
      { toolCallId }
    ) => {
      writer.write({
        id: toolCallId,
        type: 'data-wait-command',
        data: { command, args, commandId, sandboxId, status: 'loading' },
      });

      const sandbox = await Sandbox.get({
        sandboxId,
        teamId: env.VERCEL_TEAM_ID ?? '',
        projectId: env.VERCEL_PROJECT_ID ?? '',
        token: env.VERCEL_TOKEN ?? '',
      });
      const cmd = await sandbox.getCommand(commandId);
      const done = await cmd.wait();
      const [stdout, stderr] = await Promise.all([
        done.stdout(),
        done.stderr(),
      ]);

      writer.write({
        id: toolCallId,
        type: 'data-wait-command',
        data: {
          command,
          args,
          commandId,
          sandboxId,
          exitCode: done.exitCode,
          status: 'done',
        },
      });

      return (
        `The command with ID ${commandId} has finished with exit code ${done.exitCode}.\n` +
        'Stdout of the command was: \n' +
        `\`\`\`\n${stdout}\n\`\`\`\n` +
        'Stderr of the command was: \n' +
        `\`\`\`\n${stderr}\n\`\`\``
      );
    },
  });
