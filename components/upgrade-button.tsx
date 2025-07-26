'use client';

import { Button } from 'components/ui/button';
import redirectToBillingPortal from 'actions/redirectToBillingPortal';

export function UpgradeButton({
  children,
  path,
}: {
  children: React.ReactNode;
  path: string;
}) {
  const handleClick = () => {
    redirectToBillingPortal(path);
  };

  return (
    <Button className="cursor-pointer" onClick={handleClick} variant="default">
      {children}
    </Button>
  );
}
