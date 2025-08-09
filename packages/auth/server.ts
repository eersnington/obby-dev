import 'server-only';

export * from '@workos-inc/authkit-nextjs';

// doing this to make it fully tree-shakable
export {
  GeneratePortalLinkIntent,
  type Organization,
  type OrganizationMembership,
  type User,
  WorkOS,
} from '@workos-inc/node';
