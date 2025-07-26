import { PricingSection } from 'components/pricing/pricing-section';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { SignUpButton } from 'components/app-layout/sign-up-button';

export default async function PricingPage() {
  const { user } = await withAuth();

  return (
    <div className="px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center sm:mb-16">
          <h1 className="mb-4 font-bold text-3xl tracking-tight sm:mb-6 sm:text-4xl lg:text-5xl xl:text-6xl">
            Pricing (Coming soon)
          </h1>
          <p className="mx-auto max-w-3xl px-4 text-base text-muted-foreground sm:text-lg lg:text-xl">
            {/* Get started immediately for free. Upgrade for more credits, usage
            and collaboration. */}
            I currently have around $1990 startup credits in GCP so I have
            access to Gemini models. Please feel free to use the gemini models,
            until of course that gets over.
          </p>
        </div>

        <PricingSection />

        {!user && (
          <div className="mt-16 flex flex-col items-center gap-3">
            <div className="font-bold text-2xl">Ready to get started?</div>
            <SignUpButton large />
          </div>
        )}
      </div>
    </div>
  );
}
