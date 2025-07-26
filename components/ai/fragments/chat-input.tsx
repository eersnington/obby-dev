'use client';

import { RepoBanner } from './repo-banner';
import { Button } from 'components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'components/ui/tooltip';
import { isFileInArray } from 'lib/utils';
import { ArrowUp, Paperclip, Square, X } from 'lucide-react';
import { useLocalStorage, useWindowSize } from 'usehooks-ts';

import {
  type SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Textarea } from 'components/ui/textarea';
import { useScrollToBottom } from 'hooks/use-scroll-to-bottom';

export function ChatInput({
  retry,
  isErrored,
  errorMessage,
  isLoading,
  isRateLimited,
  stop,
  input,
  setInput,
  handleInputChange,
  handleSubmit,
  isMultiModal,
  files,
  handleFileChange,
  children,
}: {
  retry: () => void;
  isErrored: boolean;
  errorMessage: string;
  isLoading: boolean;
  isRateLimited: boolean;
  stop: () => void;
  input: string;
  setInput: (value: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isMultiModal: boolean;
  files: File[];
  handleFileChange: (change: SetStateAction<File[]>) => void;
  children: React.ReactNode;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { width } = useWindowSize();

  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight();
    }
  }, []);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 2}px`;
    }
  };

  const resetHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = '98px';
    }
  };

  const [localStorageInput, setLocalStorageInput] = useLocalStorage(
    'input',
    '',
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: Only run once after hydration
  useEffect(() => {
    if (textareaRef.current) {
      const domValue = textareaRef.current.value;
      // Prefer DOM value over localStorage to handle hydration
      const finalValue = domValue || localStorageInput || '';
      setInput(finalValue);
      adjustHeight();
    }
  }, []);

  useEffect(() => {
    setLocalStorageInput(input);
  }, [input, setLocalStorageInput]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange((prev) => {
      const newFiles = Array.from(e.target.files || []);
      const uniqueFiles = newFiles.filter((file) => !isFileInArray(file, prev));
      return [...prev, ...uniqueFiles];
    });
  };

  const handleFileRemove = (file: File) => {
    handleFileChange((prev) => prev.filter((f) => f !== file));
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = Array.from(e.clipboardData.items);

    for (const item of items) {
      if (item.type.indexOf('image') !== -1) {
        e.preventDefault();

        const file = item.getAsFile();
        if (file) {
          handleFileChange((prev) => {
            if (!isFileInArray(file, prev)) {
              return [...prev, file];
            }
            return prev;
          });
        }
      }
    }
  };

  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith('image/'),
    );

    if (droppedFiles.length > 0) {
      handleFileChange((prev) => {
        const uniqueFiles = droppedFiles.filter(
          (file) => !isFileInArray(file, prev),
        );
        return [...prev, ...uniqueFiles];
      });
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: intended
  const filePreview = useMemo(() => {
    if (files.length === 0) return null;
    return Array.from(files).map((file) => {
      return (
        <div className="relative" key={file.name}>
          <span
            className="absolute top-[-8] right-[-8] rounded-full bg-muted p-1"
            onClick={() => handleFileRemove(file)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleFileRemove(file);
              }
            }}
          >
            <X className="h-3 w-3 cursor-pointer" />
          </span>
          <img
            alt={file.name}
            className="h-10 w-10 rounded-xl object-cover"
            src={URL.createObjectURL(file)}
          />
        </div>
      );
    });
  }, [files]);

  const onEnter = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      if (e.currentTarget.checkValidity()) {
        handleSubmit(e);
      } else {
        e.currentTarget.reportValidity();
      }
    }
  };

  const { isAtBottom, scrollToBottom } = useScrollToBottom();

  // biome-ignore lint/correctness/useExhaustiveDependencies: intended
  useEffect(() => {
    if (!isMultiModal) {
      handleFileChange([]);
    }
  }, [isMultiModal]);

  return (
    <form
      className="mt-auto mb-2 flex flex-col bg-transparent"
      onDragEnter={isMultiModal ? handleDrag : undefined}
      onDragLeave={isMultiModal ? handleDrag : undefined}
      onDragOver={isMultiModal ? handleDrag : undefined}
      onDrop={isMultiModal ? handleDrop : undefined}
      onKeyDown={onEnter}
      onSubmit={handleSubmit}
    >
      {isErrored && (
        <div
          className={`mx-4 mb-10 flex items-center rounded-xl p-1.5 font-medium text-sm ${
            isRateLimited
              ? 'bg-orange-400/10 text-orange-400'
              : 'bg-red-400/10 text-red-400'
          }`}
        >
          <span className="flex-1 px-1.5">{errorMessage}</span>
          <Button
            className={`rounded-sm px-2 py-1 ${
              isRateLimited ? 'bg-orange-400/20' : 'bg-red-400/20'
            }`}
            onClick={retry}
          >
            Try again
          </Button>
        </div>
      )}
      <div className="relative">
        {/* <RepoBanner className="absolute bottom-full inset-x-2 translate-y-1 z-0 pb-2" /> */}
        <div
          className={`relative z-10 rounded-2xl border bg-accent shadow-md ${
            dragActive
              ? 'before:absolute before:inset-0 before:rounded-2xl before:border-2 before:border-primary before:border-dashed'
              : ''
          }`}
        >
          <div className="flex items-center gap-1 px-3 py-2">{children}</div>
          <Textarea
            autoFocus={true}
            className="m-0 w-full resize-none border-0 bg-inherit px-4 text-normal outline-none ring-0 focus-visible:ring-0"
            disabled={isErrored}
            onChange={handleInputChange}
            onPaste={isMultiModal ? handlePaste : undefined}
            placeholder="Ask Obby to build..."
            required={true}
            rows={2}
            value={input}
          />
          <div className="flex items-center gap-2 p-3">
            <input
              accept="image/*"
              className="hidden"
              id="multimodal"
              multiple={true}
              name="multimodal"
              onChange={handleFileInput}
              type="file"
            />
            <div className="flex flex-1 items-center gap-2">
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      className="h-10 w-10 rounded-xl"
                      disabled={!isMultiModal || isErrored}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('multimodal')?.click();
                      }}
                      size="icon"
                      type="button"
                      variant="outline"
                    >
                      <Paperclip className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Add attachments</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {files.length > 0 && filePreview}
            </div>
            <div>
              {isLoading ? (
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Button
                        className="h-10 w-10 rounded-xl"
                        onClick={(e) => {
                          e.preventDefault();
                          stop();
                        }}
                        size="icon"
                        variant="secondary"
                      >
                        <Square className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Stop generation</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Button
                        className="h-10 w-10 rounded-xl"
                        disabled={isErrored}
                        size="icon"
                        type="submit"
                        variant="default"
                      >
                        <ArrowUp className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Send message</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
        </div>
      </div>
      <p className="mt-2 text-center text-muted-foreground text-xs">
        Obby may make mistakes. Please use with discretion.
      </p>
    </form>
  );
}
