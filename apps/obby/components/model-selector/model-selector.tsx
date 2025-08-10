'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@repo/design-system/components/ui/select';
import { Loader2Icon } from 'lucide-react';
import { memo, useMemo } from 'react';
import { useAvailableModels } from './use-available-models';

interface Props {
  modelId: string;
  onModelChange: (modelId: string) => void;
}

export const ModelSelector = memo(function UnMemoizedModelSelector({
  modelId,
  onModelChange,
}: Props) {
  const { models, isLoading, error } = useAvailableModels();
  const isDisabled = isLoading || !!error || !models?.length;
  const triggerContent = useMemo(() => {
    if (isLoading) {
      return (
        <div className="flex items-center gap-2">
          <Loader2Icon className="h-4 w-4 animate-spin" />
          <span>Loading</span>
        </div>
      );
    }
    if (error) {
      return <span className="text-red-500">Error</span>;
    }
    if (models?.length) {
      return <SelectValue placeholder="Select a model" />;
    }
    return <span>No models</span>;
  }, [error, isLoading, models?.length]);
  const sortedModels = useMemo(
    () =>
      models ? [...models].sort((a, b) => a.label.localeCompare(b.label)) : [],
    [models]
  );
  return (
    <Select disabled={isDisabled} onValueChange={onModelChange} value={modelId}>
      <SelectTrigger className="w-[180px] bg-background">
        {triggerContent}
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Models</SelectLabel>
          {sortedModels.map((model) => (
            <SelectItem key={model.id} value={model.id}>
              {model.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
});
