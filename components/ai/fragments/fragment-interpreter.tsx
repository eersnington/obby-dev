import { generateArrayKey } from '@/lib/utils/array-utils';
import { Alert, AlertTitle, AlertDescription } from 'components/ui/alert';
import type { ExecutionResultInterpreter } from 'lib/types';
import { Terminal } from 'lucide-react';
import Image from 'next/image';

function LogsOutput({
  stdout,
  stderr,
}: {
  stdout: string[];
  stderr: string[];
}) {
  if (stdout.length === 0 && stderr.length === 0) return null;

  return (
    <div className="flex h-32 max-h-32 w-full flex-col items-start justify-start space-y-1 overflow-y-auto p-4">
      {stdout &&
        stdout.length > 0 &&
        stdout.map((out: string, index: number) => (
          <pre className="text-xs" key={generateArrayKey(index)}>
            {out}
          </pre>
        ))}
      {stderr &&
        stderr.length > 0 &&
        stderr.map((err: string, index: number) => (
          <pre className="text-red-500 text-xs" key={generateArrayKey(index)}>
            {err}
          </pre>
        ))}
    </div>
  );
}

export function FragmentInterpreter({
  result,
}: {
  result: ExecutionResultInterpreter;
}) {
  const { cellResults, stdout, stderr, runtimeError } = result;

  // The AI-generated code experienced runtime error
  if (runtimeError) {
    const { name, value, traceback } = runtimeError;
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>
            {name}: {value}
          </AlertTitle>
          <AlertDescription className="whitespace-pre-wrap font-mono">
            {traceback}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Cell results can contain text, pdfs, images, and code (html, latex, json)
  // TODO: Show all results
  // TODO: Check other formats than `png`
  if (cellResults.length > 0) {
    const imgInBase64 = cellResults[0].png;
    return (
      <div className="flex h-full flex-col">
        <div className="flex w-full flex-1 items-start justify-center border-b p-4">
          <Image
            alt="result"
            height={400}
            src={`data:image/png;base64,${imgInBase64}`}
            width={600}
          />
        </div>
        <LogsOutput stderr={stderr} stdout={stdout} />
      </div>
    );
  }

  // No cell results, but there is stdout or stderr
  if (stdout.length > 0 || stderr.length > 0) {
    return <LogsOutput stderr={stderr} stdout={stdout} />;
  }

  return <span>No output or logs</span>;
}
