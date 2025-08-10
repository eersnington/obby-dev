import { handleAuth } from '@repo/auth/server';

// Redirect the user to `/` after successful sign in
// The redirect can be customized: `handleAuth({ returnPathname: '/foo' })`
export const GET = handleAuth({ returnPathname: '/' });
