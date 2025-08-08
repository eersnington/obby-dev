export { authkitMiddleware as authMiddleware } from '@workos-inc/authkit-nextjs';

// Match against pages that require authentication
// Leave this out if you want authentication on every page in your application
export const config = { matcher: ['/'] };
