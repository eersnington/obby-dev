import { analytics } from '@repo/analytics/posthog/server';
import { withAuth } from '@repo/auth/server';
import { flag } from 'flags/next';

export const createFlag = (key: string) =>
  flag({
    key,
    defaultValue: false,
    async decide() {
      const { user } = await withAuth({ ensureSignedIn: true });

      const userId = user.id;

      const isEnabled = await analytics.isFeatureEnabled(key, userId);

      return isEnabled ?? (this.defaultValue as boolean);
    },
  });
