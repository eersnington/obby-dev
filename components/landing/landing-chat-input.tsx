'use client';

import type React from 'react';
import { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { Button } from 'components/ui/button';
import { Textarea } from 'components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'components/ui/tooltip';
import { ArrowUp, Paperclip, X, Square } from 'lucide-react';
import { ChatPicker } from 'components/ai/fragments/chat-picker';
import { ChatSettings } from 'components/ai/fragments/chat-settings';
import { cn, isFileInArray } from 'lib/utils';
import { useAuth } from '@workos-inc/authkit-nextjs/components';
import { useRouter } from 'next/navigation';
import { createChatFromMessage } from '@/actions/createChat';
import { AuthDialog } from 'components/ai/fragments/auth-dialog';
import { AI_MODELS, type ModelInfo } from 'lib/ai/models';
import templates, { type TemplateId } from 'lib/templates';
import { useLocalStorage } from 'usehooks-ts';

type Attachment = {
  url: string;
  name: string;
  contentType: string;
  file: File;
};

export function LandingChatInput({ className }: { className?: string }) {
  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [uploadQueue, setUploadQueue] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthDialogOpen, setAuthDialog] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<'auto' | TemplateId>(
    'auto',
  );
  const [languageModel, setLanguageModel] = useLocalStorage<ModelInfo>(
    'languageModel',
    {
      id: 'obbylabs:fast-chat',
    },
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, loading } = useAuth();
  const router = useRouter();

  // Auto-resize textarea
  const adjustHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 2}px`;
    }
  }, []);

  const resetHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = '98px';
    }
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight();
    }
  }, [adjustHeight]);

  // Handle file selection
  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);
      if (!files.length) return;

      // Add to upload queue
      setUploadQueue(files.map((file) => file.name));

      // Process files with validation
      setTimeout(() => {
        const validFiles = files.filter(
          (file) =>
            file.type.startsWith('image/') &&
            !isFileInArray(
              file,
              attachments.map((a) => a.file),
            ),
        );

        const newAttachments = validFiles.map((file) => ({
          url: URL.createObjectURL(file),
          name: file.name,
          contentType: file.type,
          file,
        }));

        setAttachments((prev) => [...prev, ...newAttachments]);
        setUploadQueue([]);

        // Reset file input
        if (event.target) {
          event.target.value = '';
        }
      }, 500);
    },
    [attachments],
  );

  // Handle paste
  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
      const items = Array.from(e.clipboardData.items);

      for (const item of items) {
        if (item.type.indexOf('image') !== -1) {
          e.preventDefault();

          const file = item.getAsFile();
          if (
            file &&
            !isFileInArray(
              file,
              attachments.map((a) => a.file),
            )
          ) {
            const newAttachment = {
              url: URL.createObjectURL(file),
              name: file.name || 'pasted-image.png',
              contentType: file.type,
              file,
            };
            setAttachments((prev) => [...prev, newAttachment]);
          }
        }
      }
    },
    [attachments],
  );

  // Handle drag and drop
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      const droppedFiles = Array.from(e.dataTransfer.files).filter(
        (file) =>
          file.type.startsWith('image/') &&
          !isFileInArray(
            file,
            attachments.map((a) => a.file),
          ),
      );

      if (droppedFiles.length > 0) {
        const newAttachments = droppedFiles.map((file) => ({
          url: URL.createObjectURL(file),
          name: file.name,
          contentType: file.type,
          file,
        }));
        setAttachments((prev) => [...prev, ...newAttachments]);
      }
    },
    [attachments],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!(input.trim() || attachments.length)) return;

      if (!user || loading) {
        setAuthDialog(true);
        return;
      }

      setIsSubmitting(true);
      setError('');

      try {
        const files = attachments.map((attachment) => attachment.file);
        const result = await createChatFromMessage({
          message: input,
          files: files.length > 0 ? files : undefined,
        });

        if (result.success && result.chatId) {
          // Clean up attachment URLs
          attachments.forEach((attachment) =>
            URL.revokeObjectURL(attachment.url),
          );
          setInput('');
          setAttachments([]);
          resetHeight();
          router.push(`/chat/${result.chatId}`);
        } else {
          setError('Failed to create chat. Please try again.');
        }
      } catch (error) {
        console.error('Failed to create chat:', error);
        setError('An error occurred. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    },
    [input, attachments, user, loading, router, resetHeight],
  );

  const handleRetry = useCallback(() => {
    setError('');
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const stop = useCallback(() => {
    setIsSubmitting(false);
  }, []);

  function handleLanguageModelChange(e: ModelInfo) {
    setLanguageModel({ ...languageModel, ...e });
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      if (e.currentTarget.checkValidity()) {
        handleSubmit(e);
      } else {
        e.currentTarget.reportValidity();
      }
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => {
      // Clean up URL object
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  };

  // File preview component
  const filePreview = useMemo(() => {
    if (attachments.length === 0) return null;
    return attachments.map((attachment, index) => (
      <div className="relative" key={`${attachment.name}-${index}`}>
        <span
          className="absolute top-[-8px] right-[-8px] z-10 cursor-pointer rounded-full bg-transparent p-1"
          onClick={() => removeAttachment(index)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              removeAttachment(index);
            }
          }}
        >
          <X className="h-3 w-3" />
        </span>
        <img
          alt={attachment.name}
          className="h-10 w-10 rounded-xl object-cover"
          src={attachment.url}
        />
      </div>
    ));
  }, [attachments]);

  return (
    <>
      <AuthDialog open={isAuthDialogOpen} setOpen={setAuthDialog} />
      <div className={cn('relative w-full', className)}>
        {/* Error display */}
        {error && (
          <div className="mb-4 flex items-center rounded-xl bg-red-400/10 p-1.5 font-medium text-red-400 text-sm">
            <span className="flex-1 px-1.5">{error}</span>
            <Button
              className="rounded-sm bg-red-400/20 px-2 py-1"
              onClick={handleRetry}
            >
              Try again
            </Button>
          </div>
        )}

        <form
          className="flex flex-col bg-transparent"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onKeyDown={handleKeyDown}
          onSubmit={handleSubmit}
        >
          <div className="relative">
            <div
              className={cn(
                'relative z-10 rounded-2xl border-2 border-accent-foreground/10 bg-accent shadow-md',
                dragActive &&
                  'before:absolute before:inset-0 before:rounded-2xl before:border-2 before:border-primary before:border-dashed',
              )}
            >
              {/* Top section with model selector */}
              <div className="flex items-center gap-1 px-3 py-2">
                <ChatPicker
                  languageModel={languageModel}
                  models={AI_MODELS}
                  onLanguageModelChange={handleLanguageModelChange}
                  onSelectedTemplateChange={setSelectedTemplate}
                  selectedTemplate={selectedTemplate}
                  templates={templates}
                />
                <ChatSettings
                  apiKeyConfigurable={!process.env.NEXT_PUBLIC_NO_API_KEY_INPUT}
                  baseURLConfigurable={
                    !process.env.NEXT_PUBLIC_NO_BASE_URL_INPUT
                  }
                  languageModel={languageModel}
                  onLanguageModelChange={handleLanguageModelChange}
                />
              </div>

              {/* Textarea */}
              <Textarea
                autoFocus={true}
                className="m-0 w-full resize-none border-0 bg-inherit px-4 text-normal outline-none ring-0 focus-visible:ring-0"
                disabled={error !== ''}
                onChange={(e) => {
                  setInput(e.target.value);
                  adjustHeight();
                }}
                onPaste={handlePaste}
                placeholder="Ask Obby to build..."
                ref={textareaRef}
                required={true}
                rows={2}
                value={input}
              />

              {/* Bottom toolbar */}
              <div className="flex items-center gap-2 p-3">
                {/* Hidden file input */}
                <input
                  accept="image/*"
                  className="hidden"
                  id="multimodal-landing"
                  multiple={true}
                  name="multimodal-landing"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  type="file"
                />

                <div className="flex flex-1 items-center gap-2">
                  {/* Attachment button */}
                  <TooltipProvider>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <Button
                          className="h-10 w-10 rounded-xl"
                          disabled={error !== '' || isSubmitting}
                          onClick={(e) => {
                            e.preventDefault();
                            fileInputRef.current?.click();
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

                  {/* File previews */}
                  {attachments.length > 0 && filePreview}

                  {/* Upload queue */}
                  {uploadQueue.length > 0 &&
                    uploadQueue.map((filename) => (
                      <div
                        className="flex items-center gap-1 text-muted-foreground text-xs"
                        key={filename}
                      >
                        <div className="animate-pulse">
                          Uploading {filename}...
                        </div>
                      </div>
                    ))}
                </div>

                <div>
                  {isSubmitting ? (
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
                        <TooltipContent>Stop</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <Button
                            className="h-10 w-10 rounded-xl"
                            disabled={
                              error !== '' ||
                              !(input.trim() || attachments.length) ||
                              uploadQueue.length > 0
                            }
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

          {/* Disclaimer */}
          <p className="mt-2 text-center text-muted-foreground text-xs">
            Obby may make mistakes. Please use with discretion.
          </p>
        </form>
      </div>
    </>
  );
}
