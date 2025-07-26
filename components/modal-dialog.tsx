'use client';

import type React from 'react';
import { useState } from 'react';
import { Button } from 'components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'components/ui/dialog';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import { Alert, AlertDescription } from 'components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

/**
 * The 'subscriptionLevel' prop is the name of the subscription plan and is directly tied to the Stripe price lookup key.
 * You will need to have a price in Stripe with the same lookup key as the subscriptionLevel.
 * See https://docs.stripe.com/products-prices/pricing-models for more details
 */
export function ModalDialog({
  subscriptionLevel,
  userId,
}: {
  subscriptionLevel: string;
  userId: string;
}) {
  const router = useRouter();

  const [orgName, setOrgName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubscribe = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setLoading(true);

    if (orgName === '') {
      setError('Please fill out Organization name before submitting.');
      setLoading(false);
      return;
    }

    // Call API to create a new organization and subscribe to plan
    // The user will be redirected to Stripe Checkout
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        orgName,
        subscriptionLevel: subscriptionLevel.toLowerCase(),
      }),
    });

    const { error, url } = await res.json();

    if (!error) {
      return router.push(url);
    }

    setLoading(false);
    setError(`Error subscribing to plan: ${error}`);
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button onClick={() => setError('')}>
          Subscribe to {subscriptionLevel}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Subscribe to {subscriptionLevel}</DialogTitle>
          <DialogDescription>
            Enter details about your business
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <div>
            <Label
              className="font-semibold text-sm"
              htmlFor="organization-name"
            >
              Organization name
            </Label>
            <Input
              className="mt-1"
              id="organization-name"
              onBlur={(e) => setOrgName(e.target.value)}
              placeholder="Enter your organization name"
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <Button onClick={() => setOpen(false)} variant="outline">
            Cancel
          </Button>
          <Button disabled={loading} onClick={handleSubscribe}>
            {loading ? 'Processing...' : 'Subscribe'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
