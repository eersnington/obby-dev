import { cn } from '@repo/design-system/lib/utils';
import { useEffect, useRef } from 'react';
import z from 'zod/v3';
import type { Command, CommandLog } from './types';

type Props = {
  command: Command;
  onLog: (data: { sandboxId: string; cmdId: string; log: CommandLog }) => void;
  onCompleted: (data: Command) => void;
};

export function CommandLogs({ command, onLog, onCompleted }: Props) {
  const ref = useRef<Awaited<ReturnType<typeof getCommandLogs>>>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: this is intended
  useEffect(() => {
    if (!ref.current) {
      const iterator = getCommandLogs(command.sandboxId, command.cmdId);
      ref.current = iterator;
      (async () => {
        for await (const log of iterator) {
          onLog({
            sandboxId: command.sandboxId,
            cmdId: command.cmdId,
            log,
          });
        }

        const log = await getCommand(command.sandboxId, command.cmdId);
        onCompleted({
          sandboxId: log.sandboxId,
          cmdId: log.cmdId,
          startedAt: log.startedAt,
          exitCode: log.exitCode ?? 0,
          command: command.command,
          args: command.args,
        });
      })();
    }
  }, []);

  return (
    <pre className={cn('whitespace-pre-wrap font-mono text-sm', {})}>
      {logContent(command)}
    </pre>
  );
}

function logContent(command: Command) {
  const date = new Date(command.startedAt).toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const line = `${command.command} ${command.args.join(' ')}`;
  const body = command.logs?.map((log) => log.data).join('') || '';
  return `[${date}] ${line}\n${body}`;
}

const logSchema = z.object({
  data: z.string(),
  stream: z.enum(['stdout', 'stderr']),
  timestamp: z.number(),
});

async function* getCommandLogs(sandboxId: string, cmdId: string) {
  const response = await fetch(
    `/api/sandboxes/${sandboxId}/cmds/${cmdId}/logs`,
    { headers: { Accept: 'application/json' } }
  );

  if (!response.body) {
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let line = '';

  // biome-ignore lint/nursery/noUnnecessaryConditions: work on this later
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    line += decoder.decode(value, { stream: true });
    const lines = line.split('\n');
    for (const segment of lines.slice(0, -1)) {
      if (segment) {
        try {
          const logEntry = JSON.parse(segment);
          yield logSchema.parse(logEntry);
        } catch {
          // ignore malformed JSON line fragments
        }
      }
    }
    line = lines.at(-1) ?? '';
  }
}

const cmdSchema = z.object({
  sandboxId: z.string(),
  cmdId: z.string(),
  startedAt: z.number(),
  exitCode: z.number().optional(),
});

async function getCommand(sandboxId: string, cmdId: string) {
  const response = await fetch(`/api/sandboxes/${sandboxId}/cmds/${cmdId}`, {
    headers: { Accept: 'application/json' },
  }); // this apparently throws errors. i need effectts
  const json = await response.json();
  return cmdSchema.parse(json);
}
