'use server';

import { workos } from '@/app/(legacy)/api/workos';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { GeneratePortalLinkIntent } from '@workos-inc/node';

export async function getAuditLogPortalLink(
  organizationId: string,
): Promise<string> {
  // Check if the organization has the audit logs entitlement
  // We add a check here since the client side check is not secure enough
  const { entitlements } = await withAuth({ ensureSignedIn: true });

  if (!entitlements?.includes('audit-logs')) {
    throw new Error('Audit logs entitlement is required to view audit logs.');
  }

  const { link } = await workos.portal.generateLink({
    organization: organizationId,
    intent: GeneratePortalLinkIntent.AuditLogs,
  });

  return link;
}
