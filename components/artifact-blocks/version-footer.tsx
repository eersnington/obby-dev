'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useWindowSize } from 'usehooks-ts';
import { getDocumentTimestampByIndex } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Doc } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useArtifact } from '@/hooks/use-artifact';

type Document = Doc<'documents'>;

interface VersionFooterProps {
  handleVersionChange: (type: 'next' | 'prev' | 'toggle' | 'latest') => void;
  documents: Array<Document> | undefined;
  currentVersionIndex: number;
}

export const VersionFooter = ({
  handleVersionChange,
  documents,
  currentVersionIndex,
}: VersionFooterProps) => {
  const { artifact } = useArtifact();
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const [isMutating, setIsMutating] = useState(false);

  const deleteDocuments = useMutation(
    api.documents.deleteDocumentsByIdAfterTimestamp,
  );

  if (!documents) return;

  return (
    <motion.div
      animate={{ y: 0 }}
      className="absolute bottom-0 z-50 flex w-full flex-col justify-between gap-4 border-t bg-background p-4 lg:flex-row"
      exit={{ y: isMobile ? 200 : 77 }}
      initial={{ y: isMobile ? 200 : 77 }}
      transition={{ type: 'spring', stiffness: 140, damping: 20 }}
    >
      <div>
        <div>You are viewing a previous version</div>
        <div className="text-muted-foreground text-sm">
          Restore this version to make edits
        </div>
      </div>

      <div className="flex flex-row gap-4">
        <Button
          disabled={isMutating}
          onClick={async () => {
            setIsMutating(true);
            try {
              await deleteDocuments({
                documentId: artifact.documentId,
                timestamp: new Date(
                  getDocumentTimestampByIndex(documents, currentVersionIndex),
                ).getTime(),
              });
            } finally {
              setIsMutating(false);
            }
          }}
        >
          <div>Restore this version</div>
          {isMutating && (
            <div className="animate-spin">
              <LoaderCircle className="h-4 w-4" />
            </div>
          )}
        </Button>
        <Button
          onClick={() => {
            handleVersionChange('latest');
          }}
          variant="outline"
        >
          Back to latest version
        </Button>
      </div>
    </motion.div>
  );
};
