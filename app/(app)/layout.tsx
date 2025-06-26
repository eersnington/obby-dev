import { SidebarInset, SidebarProvider } from 'components/ui/sidebar';
import { Header } from 'components/app-layout/header';
import { AppSidebar } from '@/components/app-layout/app-sidebar';
import { withAuth } from '@workos-inc/authkit-nextjs';
import { headers } from 'next/headers';
import { getOSFromUA } from '@/lib/utils/os-utils';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [headersRes, authUser] = await Promise.all([headers(), withAuth()]);
  const { user } = authUser;

  const os = getOSFromUA(headersRes.get('user-agent'));

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <Header />
        <div className="flex flex-1">
          <AppSidebar user={user} os={os} />
          <SidebarInset className="p-2">{children}</SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
