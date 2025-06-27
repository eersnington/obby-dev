'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { SidebarHistory } from './sidebar-history';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import type { User } from '@workos-inc/node';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export const AppSidebar = ({
  user,
  os,
}: { user: User | null; os: string | null }) => {
  const router = useRouter();
  const { setOpenMobile } = useSidebar();
  const [openCommandDialog, setOpenCommandDialog] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenCommandDialog((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelectChat = (chatId: string) => {
    router.push(`/chat/${chatId}`);
    setOpenCommandDialog(false);
    setOpenMobile(false);
  };

  if (!user) {
    return null;
  }

  return (
    <Sidebar className="border-none">
      <SidebarHeader className="bg-background">
        <Button
          asChild
          variant="outline"
          className="h-9 w-full justify-center bg-background/50 border-border/50 hover:bg-accent/50"
        >
          <Link href="/chat">New Chat</Link>
        </Button>
        <Button
          variant="ghost"
          type="button"
          className="h-9 w-full text-start justify-between group overflow-hidden"
          onClick={() => setOpenCommandDialog(true)}
        >
          <span className="inline-flex items-center gap-2">
            <Search className="w-4 h-4" />
            Search chats
          </span>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-0 transition-all duration-100 ease-out group-hover:translate-x-0 group-hover:opacity-100">
            <span className="text-xs">{os === 'macOS' ? '⌘' : 'Ctrl'}</span>K
          </kbd>
        </Button>
      </SidebarHeader>
      <SidebarContent className="bg-background">
        <SidebarHistory
          user={user}
          openCommandDialog={openCommandDialog}
          setOpenCommandDialog={setOpenCommandDialog}
          onSelectChat={handleSelectChat}
        />
      </SidebarContent>
      <SidebarFooter className="bg-background">
        <Alert
          variant="default"
          className="hover:border-accent-foreground/50 hover:-translate-y-1.5 transition-transform duration-300 ease-out"
        >
          <AlertTitle>We're Public Beta!</AlertTitle>
          <AlertDescription>
            Sorry if you're experience a lot of bugs at the moment. Will be
            ironed out in a few days
          </AlertDescription>
        </Alert>
      </SidebarFooter>
    </Sidebar>
  );
};
