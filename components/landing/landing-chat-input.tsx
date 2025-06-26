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

      if (!input.trim() && !attachments.length) return;

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
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              removeAttachment(index);
            }
          }}
          onClick={() => removeAttachment(index)}
          className="absolute top-[-8px] right-[-8px] bg-transparent rounded-full p-1 cursor-pointer z-10"
        >
          <X className="h-3 w-3" />
        </span>
        <img
          src={attachment.url}
          alt={attachment.name}
          className="rounded-xl w-10 h-10 object-cover"
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
          <div className="flex items-center p-1.5 text-sm font-medium mb-4 rounded-xl bg-red-400/10 text-red-400">
            <span className="flex-1 px-1.5">{error}</span>
            <Button
              className="px-2 py-1 rounded-sm bg-red-400/20"
              onClick={handleRetry}
            >
              Try again
            </Button>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
          className="flex flex-col bg-transparent"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="relative">
            <div
              className={cn(
                'shadow-md rounded-2xl relative z-10 bg-accent border-2 border-accent-foreground/10',
                dragActive &&
                  'before:absolute before:inset-0 before:rounded-2xl before:border-2 before:border-dashed before:border-primary',
              )}
            >
              {/* Top section with model selector */}
              <div className="flex items-center px-3 py-2 gap-1">
                <ChatPicker
                  templates={templates}
                  selectedTemplate={selectedTemplate}
                  onSelectedTemplateChange={setSelectedTemplate}
                  models={AI_MODELS}
                  languageModel={languageModel}
                  onLanguageModelChange={handleLanguageModelChange}
                />
                <ChatSettings
                  languageModel={languageModel}
                  onLanguageModelChange={handleLanguageModelChange}
                  apiKeyConfigurable={!process.env.NEXT_PUBLIC_NO_API_KEY_INPUT}
                  baseURLConfigurable={
                    !process.env.NEXT_PUBLIC_NO_BASE_URL_INPUT
                  }
                />
              </div>

              {/* Textarea */}
              <Textarea
                ref={textareaRef}
                autoFocus={true}
                rows={2}
                className="text-normal px-4 resize-none ring-0 bg-inherit w-full m-0 outline-none border-0 focus-visible:ring-0"
                required={true}
                placeholder="Ask Obby to build..."
                disabled={error !== ''}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  adjustHeight();
                }}
                onPaste={handlePaste}
              />

              {/* Bottom toolbar */}
              <div className="flex p-3 gap-2 items-center">
                {/* Hidden file input */}
                <input
                  type="file"
                  id="multimodal-landing"
                  name="multimodal-landing"
                  accept="image/*"
                  multiple={true}
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />

                <div className="flex items-center flex-1 gap-2">
                  {/* Attachment button */}
                  <TooltipProvider>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <Button
                          disabled={error !== '' || isSubmitting}
                          type="button"
                          variant="outline"
                          size="icon"
                          className="rounded-xl h-10 w-10"
                          onClick={(e) => {
                            e.preventDefault();
                            fileInputRef.current?.click();
                          }}
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
                        key={filename}
                        className="flex items-center gap-1 text-xs text-muted-foreground"
                      >
                        <div className="animate-pulse">
                          Uploading {filename}...
                        </div>
                      </div>
                    ))}
                </div>

                <div>
                  {!isSubmitting ? (
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <Button
                            disabled={
                              error !== '' ||
                              (!input.trim() && !attachments.length) ||
                              uploadQueue.length > 0
                            }
                            variant="default"
                            size="icon"
                            type="submit"
                            className="rounded-xl h-10 w-10"
                          >
                            <ArrowUp className="h-5 w-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Send message</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <TooltipProvider>
                      <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <Button
                            variant="secondary"
                            size="icon"
                            className="rounded-xl h-10 w-10"
                            onClick={(e) => {
                              e.preventDefault();
                              stop();
                            }}
                          >
                            <Square className="h-5 w-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Stop</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Obby may make mistakes. Please use with discretion.
          </p>
        </form>
      </div>
    </>
  );
}
