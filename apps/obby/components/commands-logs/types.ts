export type Command = {
  sandboxId: string;
  cmdId: string;
  startedAt: number;
  command: string;
  args: string[];
  exitCode?: number;
  logs?: CommandLog[];
};

export type CommandLog = {
  data: string;
  stream: 'stdout' | 'stderr';
  timestamp: number;
};
