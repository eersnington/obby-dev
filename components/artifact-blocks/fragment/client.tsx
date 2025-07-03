import { Copy, ExternalLink, Play, Globe } from 'lucide-react';
import { toast } from 'sonner';
import { Artifact } from '../create-artifact';
import { useChatStore } from '@/stores/chat-store';
import type { FragmentSchema } from '@/lib/fragment';
import type { ExecutionResult } from '@/lib/types';
import { Preview } from '@/components/ai/fragments/preview';
import { useEffect, useCallback } from 'react';

interface FragmentMetadata {
  executionResult?: ExecutionResult;
  isCreatingSandbox: boolean;
  sandboxError?: string;
  fragmentSchema?: FragmentSchema;
  selectedTab: 'code' | 'fragment';
}

export const fragmentArtifact = new Artifact<'fragment', FragmentMetadata>({
  kind: 'fragment',
  description: 'Generates applications with a live E2B sandbox preview.',
  initialize: async ({ setMetadata }) => {
    setMetadata({
      isCreatingSandbox: false,
      selectedTab: 'code',
      fragmentSchema: undefined,
      executionResult: undefined,
    });
  },
  onStreamPart: ({ streamPart, setArtifact, setMetadata }) => {
    if (streamPart.type === 'fragment-delta') {
      const { isChatActive } = useChatStore.getState();
      try {
        const fragmentData = JSON.parse(
          streamPart.content as string,
        ) as Partial<FragmentSchema>;
        setMetadata((metadata) => ({
          ...metadata,
          fragmentSchema: {
            ...(metadata?.fragmentSchema || {}),
            ...fragmentData,
          } as FragmentSchema,
        }));
        setArtifact((draftArtifact) => ({
          ...draftArtifact,
          content: streamPart.content as string,
          title: fragmentData.title || draftArtifact.title,
          isVisible:
            draftArtifact.status === 'streaming' &&
            fragmentData.code &&
            fragmentData.code.length > 50 &&
            isChatActive
              ? true
              : draftArtifact.isVisible,
          status: 'streaming',
        }));
      } catch (error) {
        console.error('Failed to parse fragment data:', error);
      }
    }
  },
  content: ({ metadata, setMetadata, status }) => {
    const createSandbox = useCallback(async () => {
      if (!metadata?.fragmentSchema) {
        toast.error('No fragment data available to create a sandbox.');
        return;
      }
      setMetadata((prev) => ({
        ...prev,
        isCreatingSandbox: true,
        sandboxError: undefined,
      }));
      try {
        const response = await fetch('/api/sandbox', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fragment: metadata.fragmentSchema,
            userID: 'current-user', // Replace with actual user ID
          }),
        });
        if (!response.ok) {
          throw new Error(
            `Sandbox creation failed with status: ${response.status}`,
          );
        }
        const result = await response.json();
        setMetadata((prev) => ({
          ...prev,
          executionResult: result,
          isCreatingSandbox: false,
          selectedTab: 'fragment',
        }));
        toast.success('Sandbox created successfully!');
      } catch (error: any) {
        setMetadata((prev) => ({
          ...prev,
          sandboxError: error.message,
          isCreatingSandbox: false,
        }));
        try {
          toast.error(`Failed to create sandbox: ${error.message}`);
        } catch (error) {}
        console.log('error', error);
      }
    }, [metadata, setMetadata]);

    useEffect(() => {
      if (
        status === 'idle' &&
        metadata?.fragmentSchema?.code &&
        !metadata.executionResult &&
        !metadata.isCreatingSandbox
      ) {
        createSandbox();
      }
    }, [status, metadata, createSandbox]);

    if (!metadata) {
      return <div>Loading artifact...</div>; // Or return null
    }

    return (
      <Preview
        teamID={undefined}
        accessToken={undefined}
        selectedTab={metadata.selectedTab}
        onSelectedTabChange={(tab) => {
          if (tab === 'code' || tab === 'fragment') {
            setMetadata((prev) => ({ ...prev, selectedTab: tab }));
          }
        }}
        isChatLoading={false} // this is handled by the artifact system now
        isPreviewLoading={metadata.isCreatingSandbox}
        fragment={metadata.fragmentSchema}
        result={metadata.executionResult}
        onClose={() => {
          // this should be handled by the artifact's own close button
        }}
      />
    );
  },
  actions: [
    {
      icon: <Play size={18} />,
      label: 'Re-run Sandbox',
      description: 'Create and run the sandbox environment.',
      onClick: async ({ metadata, setMetadata }) => {
        if (!metadata?.fragmentSchema) {
          toast.error('No fragment data available to create a sandbox.');
          return;
        }
        setMetadata((prev) => ({
          ...prev,
          isCreatingSandbox: true,
          sandboxError: undefined,
        }));
        try {
          const response = await fetch('/api/sandbox', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fragment: metadata.fragmentSchema,
              userID: 'current-user', // TODO: check user ID within the route handler
            }),
          });
          if (!response.ok) {
            throw new Error(
              `Sandbox creation failed with status: ${response.status}`,
            );
          }
          const result = await response.json();
          setMetadata((prev) => ({
            ...prev,
            executionResult: result,
            isCreatingSandbox: false,
            selectedTab: 'fragment',
          }));
          toast.success('Sandbox created successfully!');
        } catch (error: any) {
          setMetadata((prev) => ({
            ...prev,
            sandboxError: error.message,
            isCreatingSandbox: false,
          }));
          try {
            toast.error(`Failed to create sandbox: ${error.message}`);
          } catch (error) {}
          console.log('error', error);
        }
      },
    },
    {
      icon: <ExternalLink size={18} />,
      description: 'Open sandbox in a new tab',
      onClick: ({ metadata }) => {
        if (metadata?.executionResult && 'url' in metadata.executionResult) {
          window.open(metadata.executionResult.url, '_blank');
        } else {
          toast.error('No sandbox URL is available.');
        }
      },
      isDisabled: ({ metadata }) =>
        !metadata?.executionResult || !('url' in metadata.executionResult),
    },
    {
      icon: <Copy size={18} />,
      description: 'Copy code to clipboard',
      onClick: ({ metadata }) => {
        if (metadata?.fragmentSchema?.code) {
          navigator.clipboard.writeText(metadata.fragmentSchema.code);
          toast.success('Code copied to clipboard!');
        } else {
          toast.error('No code available to copy.');
        }
      },
    },
  ],
  toolbar: [
    {
      icon: <Globe />,
      description: 'Deploy to production',
      onClick: ({ appendMessage }) => {
        appendMessage({
          role: 'user',
          content: 'Help me deploy this application to production.',
        });
      },
    },
  ],
});
