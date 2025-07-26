import { Check } from 'lucide-react';
import { PricingButton } from './pricing-button';
import { generateArrayKey } from 'lib/utils/array-utils';

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant?: 'default' | 'secondary' | 'outline';
  recommended?: boolean;
}

export function PricingCard({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  buttonVariant = 'default',
  recommended = false,
}: PricingCardProps) {
  if (recommended) {
    return (
      <div className="h-full rounded-lg bg-gradient-to-br from-[var(--obby-purple)] via-[var(--obby-pink)] via-[var(--obby-violet)] to-[var(--obby-orange)] p-[1px]">
        <div className="h-full rounded-lg bg-background">
          <div className="relative flex h-full flex-col overflow-hidden rounded-lg border-0 bg-transparent">
            {/* Popular Badge */}
            <div className="absolute top-4 right-4">
              <div className="relative overflow-hidden rounded-full px-3 py-1 font-medium text-xs">
                <span className="obby-gradient absolute inset-0 opacity-90" />
                <span className="relative text-white">Popular</span>
              </div>
            </div>

            <div className="px-6 pt-6 pb-6 text-center">
              <h3 className="font-semibold text-lg">{title}</h3>
              <div className="mt-3">
                <span className="font-bold text-2xl sm:text-3xl">{price}</span>{' '}
                <span className="font-normal text-lg text-muted-foreground">
                  {period}
                </span>
              </div>
              <p className="mt-2 text-muted-foreground text-sm">
                {description}
              </p>
            </div>

            {/* Features - flex-1 to take remaining space */}
            <div className="flex-1 space-y-3 px-6">
              {features.map((feature, index) => (
                <div
                  className="flex items-start gap-2"
                  key={generateArrayKey(index)}
                >
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-auto px-6 pt-6 pb-6">
              <div className="relative overflow-hidden rounded-md">
                <PricingButton planTitle={title}>{buttonText}</PricingButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border">
      <div className="px-6 pt-6 pb-6 text-center">
        <h3 className="font-semibold text-lg">{title}</h3>
        <div className="mt-3">
          <span className="font-bold text-2xl sm:text-3xl">{price}</span>
          <span className="font-normal text-lg text-muted-foreground">
            {period}
          </span>
        </div>
        <p className="mt-2 text-muted-foreground text-sm">{description}</p>
      </div>

      <div className="flex-1 space-y-3 px-6">
        {features.map((feature, index) => (
          <div className="flex items-start gap-2" key={generateArrayKey(index)}>
            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
            <span className="text-sm">{feature}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto px-6 pt-6 pb-6">
        <PricingButton planTitle={title} variant={buttonVariant}>
          {buttonText}
        </PricingButton>
      </div>
    </div>
  );
}
