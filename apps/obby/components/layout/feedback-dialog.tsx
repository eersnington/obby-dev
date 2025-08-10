'use client';

import { Button } from '@repo/design-system/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/design-system/components/ui/dialog';
import { Textarea } from '@repo/design-system/components/ui/textarea';
import { Frown, Meh, Smile } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

export default function FeedbackModal() {
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: I need to implement feedback submission here with resend
    setFeedback('');
    setSelectedReaction(null);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="h-8 justify-center border-border/50 bg-background/50 hover:bg-accent/50"
          variant="outline"
        >
          Feedback
        </Button>
      </DialogTrigger>
      <form onSubmit={handleSubmit}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Give feedback</DialogTitle>
            <DialogDescription>
              {
                "We'd love to hear what went well or how we can improve the product experience."
              }
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Textarea
              className="min-h-[120px] resize-none"
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Your feedback"
              required
              value={feedback}
            />
          </div>

          <DialogFooter className="flex-col justify-between gap-2 sm:flex-row">
            <div className="flex gap-2">
              <Button
                onClick={() =>
                  setSelectedReaction(selectedReaction === 'sad' ? null : 'sad')
                }
                size="icon"
                type="button"
                variant={selectedReaction === 'sad' ? 'default' : 'outline'}
              >
                <Frown className="h-4 w-4" />
              </Button>
              <Button
                onClick={() =>
                  setSelectedReaction(
                    selectedReaction === 'neutral' ? null : 'neutral'
                  )
                }
                size="icon"
                type="button"
                variant={selectedReaction === 'neutral' ? 'default' : 'outline'}
              >
                <Meh className="h-4 w-4" />
              </Button>
              <Button
                onClick={() =>
                  setSelectedReaction(
                    selectedReaction === 'happy' ? null : 'happy'
                  )
                }
                size="icon"
                type="button"
                variant={selectedReaction === 'happy' ? 'default' : 'outline'}
              >
                <Smile className="h-4 w-4" />
              </Button>
            </div>

            <div className="ml-auto flex gap-2">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={!feedback.trim()} type="submit">
                Submit
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
