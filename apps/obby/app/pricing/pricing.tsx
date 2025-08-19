import { Button } from '@repo/design-system/components/ui/button';
import { CheckIcon } from 'lucide-react';

const pricingPlans = [
  {
    id: 'tier1',
    title: 'Free',
    popular: false,
    description: 'For people looking to explore.',
    price: '$0',
    features: [
      '5 agent actions/month',
      '10 agent actions/day with BYOK',
      'Sync to local',
    ],
  },
  {
    id: 'tier2',
    title: 'Pro',
    popular: true,
    description: 'Ideal for power users who need higher access.',
    price: '$10',
    features: [
      '50 agent actions/month',
      '100 agent actions/day with BYOK',
      'Priority support',
    ],
  },
  {
    id: 'tier3',
    title: 'Team',
    popular: false,
    description: 'For teams requiring shared workspaces.',
    price: '$15',
    features: [
      '50 ai credits/month',
      '500 ai credits/day with BYOK',
      'Central billing',
      'Priority support',
    ],
  },
];

export function Pricing() {
  return (
    <section className="mx-auto flex w-[95%] flex-col items-center justify-center gap-20 bg-background py-20 text-foreground">
      <div className="flex w-full flex-col items-center gap-7">
        <h2 className="text-center font-medium text-2xl leading-6">
          Simple and transparent pricing
        </h2>
      </div>

      <div className="flex max-w-4xl flex-wrap justify-between">
        {pricingPlans.map((plan, index) => (
          <div
            className={`flex-1 rounded-none border border-primary/10 ${
              index === 1 ? 'border-t border-r-0 border-b border-l-0' : ''
            }`}
            key={plan.id}
          >
            <div className="flex h-full flex-col justify-between gap-6 p-[30px]">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4 p-0">
                  <div className="font-medium text-xl leading-5">
                    {plan.title}{' '}
                    {plan.popular && (
                      <span className="font-normal text-sm leading-[14px] opacity-80">
                        &#47;&#47; most popular
                      </span>
                    )}
                  </div>
                  <p className="font-normal text-sm leading-[22px] opacity-80">
                    {plan.description}
                  </p>
                  <div className="font-normal text-lg leading-3 md:text-2xl">
                    <span className="font-medium leading-4">{plan.price}</span>
                    <span>
                      {plan.title === 'Team' && '/user/month'}
                      {plan.title === 'Free' && ''}
                      {plan.title !== 'Team' &&
                        plan.title !== 'Free' &&
                        '/month'}
                    </span>
                  </div>
                </div>
                <hr className="border-border" />

                <div className="flex h-[165px] flex-col gap-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div
                      className="flex items-center gap-1.5"
                      key={`${plan.id}-${featureIndex}`}
                    >
                      <CheckIcon className="h-[15px] w-[15px]" />
                      <span className="font-normal text-sm leading-[15.4px]">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <hr className="border-border" />
              <div className="p-0">
                <Button
                  className={`h-10 w-[120px] rounded-none ${
                    index === 1
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'border border-border bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {plan.title === 'Free' ? 'Get Started' : 'Upgrade'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
