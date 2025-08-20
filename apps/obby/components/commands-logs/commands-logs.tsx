'use client';

import { ScrollArea } from '@repo/design-system/components/ui/scroll-area';
import { SquareChevronRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Panel, PanelHeader } from '@/components/panels/panels';
import { CommandLogs } from './command-logs';
import type { Command, CommandLog } from './types';

type Props = {
  className?: string;
  commands: Command[];
  onLog: (data: { sandboxId: string; cmdId: string; log: CommandLog }) => void;
  onCompleted: (data: Command) => void;
};

export function CommandsLogs(props: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: wrong suggestion
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [props.commands]);

  return (
    <Panel className={props.className}>
      <PanelHeader>
        <SquareChevronRight className="mr-2 w-4" />
        <span className="font-mono font-semibold uppercase">
          Sandbox Remote Output
        </span>
      </PanelHeader>
      <div className="h-[calc(100%-2rem)]">
        <ScrollArea className="h-full">
          <div className="space-y-2 p-2">
            {props.commands.map((command) => (
              <CommandLogs
                command={command}
                key={command.cmdId}
                onCompleted={props.onCompleted}
                onLog={props.onLog}
              />
            ))}
          </div>
          <div ref={bottomRef} />
        </ScrollArea>
      </div>
    </Panel>
  );
}
