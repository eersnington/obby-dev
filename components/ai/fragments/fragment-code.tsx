import { CodeView } from './code-view';
import { Button } from 'components/ui/button';
import CopyButton from 'components/copy-button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'components/ui/tooltip';
import { Download, FileText } from 'lucide-react';
import { useState } from 'react';

export function FragmentCode({
  files,
}: {
  files: { name: string; content: string }[];
}) {
  const [currentFile, setCurrentFile] = useState(files[0].name);
  const currentFileContent = files.find(
    (file) => file.name === currentFile,
  )?.content;

  function download(filename: string, content: string) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-2 pt-1">
        <div className="flex flex-1 gap-2 overflow-x-auto">
          {files.map((file) => (
            <div
              className={`flex cursor-pointer select-none items-center gap-2 rounded-md border px-2 py-1 text-muted-foreground text-sm hover:bg-muted ${
                file.name === currentFile ? 'border-muted bg-muted' : ''
              }`}
              key={file.name}
              onClick={() => setCurrentFile(file.name)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setCurrentFile(file.name);
                }
              }}
            >
              <FileText className="h-4 w-4" />
              {file.name}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <CopyButton copyValue={currentFileContent || ''} />
              </TooltipTrigger>
              <TooltipContent side="bottom">Copy</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  className="text-muted-foreground"
                  onClick={() =>
                    download(currentFile, currentFileContent || '')
                  }
                  size="icon"
                  variant="ghost"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Download</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="flex flex-1 flex-col overflow-x-auto">
        <CodeView
          code={currentFileContent || ''}
          lang={currentFile.split('.').pop() || ''}
        />
      </div>
    </div>
  );
}
