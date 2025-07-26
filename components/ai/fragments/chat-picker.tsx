import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select';
import type { ModelInfo } from 'lib/ai/models';
import type { TemplateId, Templates } from 'lib/templates';
import 'core-js/features/object/group-by.js';
import Image from 'next/image';

export function ChatPicker({
  templates,
  selectedTemplate,
  onSelectedTemplateChange,
  models,
  languageModel,
  onLanguageModelChange,
}: {
  templates: Templates;
  selectedTemplate: 'auto' | TemplateId;
  onSelectedTemplateChange: (template: 'auto' | TemplateId) => void;
  models: ModelInfo[];
  languageModel: ModelInfo;
  onLanguageModelChange: (config: ModelInfo) => void;
}) {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex flex-col">
        <Select
          defaultValue={languageModel.id}
          name="languageModel"
          onValueChange={(modelId) => {
            const selectedModel = models.find((model) => model.id === modelId);
            if (selectedModel) {
              onLanguageModelChange(selectedModel);
            }
          }}
        >
          <SelectTrigger className="h-6 whitespace-nowrap border-none px-2 py-0 text-xs shadow-none focus:ring-0">
            <SelectValue placeholder="Language model" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(
              Object.groupBy(models, ({ provider }) => provider || 'unknown'),
            ).map(([provider, models]) => (
              <SelectGroup key={provider}>
                <SelectLabel>{provider}</SelectLabel>
                {models?.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    <div className="flex items-center space-x-2">
                      <Image
                        alt={model.provider || 'AI Provider'}
                        className="flex"
                        height={14}
                        src={`/logos/ai/${model.image}`}
                        width={14}
                      />
                      <span>{model.name || model.id}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
