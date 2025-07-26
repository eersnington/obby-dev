import { generateArrayKey } from 'lib/utils/array-utils';
import { PricingCard } from './pricing-card';

// TODO: Need to rework this entrirely. Main plan is to have a $10 sub with BYOK
// I'm thinking of introducing a BYOK in free tier with msg limits (so convex bills wont go brr)

const pricingPlans = [
  {
    title: 'Free',
    price: '$0',
    period: '/month',
    description: 'For getting started with Obby.',
    features: ['20 monthly credit', 'Limited Agent use'],
    buttonText: 'Start Building',
    buttonVariant: 'outline' as const,
  },
  {
    title: 'Pro',
    price: '$10',
    period: '/month',
    description: 'For higher limits and power users.',
    features: [
      '100 credits per month',
      'Higher Agent use',
      'Higher image quality',
      '5x higher attachment size limit',
      'BYOK (Bring Your Own Key) for unlimited use',
      'Import from Figma',
      // "Priority support",
    ],
    buttonText: 'Upgrade to Premium',
    buttonVariant: 'default' as const,
    recommended: true,
  },
  {
    title: 'Team',
    price: '$20',
    period: '/user/month',
    description: 'For fast moving teams and collaboration.',
    features: [
      'Everything in Pro',
      'Share chats between teams',
      'Admin panel to manage team members',
      // "Priority support",
    ],
    buttonText: 'Upgrade to Team',
    buttonVariant: 'secondary' as const,
  },
];

export function PricingSection() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {pricingPlans.map((plan, index) => (
        <PricingCard
          buttonText={plan.buttonText}
          buttonVariant={plan.buttonVariant}
          description={plan.description}
          features={plan.features}
          key={generateArrayKey(index)}
          period={plan.period}
          price={plan.price}
          recommended={plan.recommended}
          title={plan.title}
        />
      ))}
    </div>
  );
}
