'use client';

import type { User } from '@repo/auth/server';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/design-system/components/ui/avatar';
import { Button } from '@repo/design-system/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/design-system/components/ui/dropdown-menu';
import { Skeleton } from '@repo/design-system/components/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@repo/design-system/components/ui/tooltip';
import {
  DollarSign,
  LogOut,
  Monitor,
  Moon,
  Settings,
  Sun,
  UserIcon,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import signOutAction from '@/actions/auth/signOut';

export function UserNav({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOutClick = async () => {
    await signOutAction();
  };

  const creditsUsed = 0;
  const creditsTotal = 40;
  const resetDays = 4;

  const themeOptions = [
    { value: 'system', label: 'System', icon: Monitor },
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
  ];

  if (!mounted) {
    return <Skeleton className="size-8 rounded-full" />;
  }

  return (
    <DropdownMenu onOpenChange={setOpen} open={open}>
      <DropdownMenuTrigger asChild>
        <Button
          className="relative size-8 cursor-pointer rounded-full hover:bg-accent"
          variant="ghost"
        >
          <Avatar className="size-7">
            <AvatarImage
              src={(user.profilePictureUrl as string) || '/placeholder.svg'}
            />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user.firstName?.[0] || <UserIcon className="size-4" />}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 rounded-lg" forceMount>
        <DropdownMenuLabel className="py-3 font-normal">
          <p className="text-muted-foreground text-sm">{user.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="px-2 py-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm">Messages Left</span>
              <span className="text-muted-foreground text-sm">
                {creditsUsed}/{creditsTotal}
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-secondary">
              <div
                className="h-1.5 rounded-full bg-primary transition-all duration-300"
                style={{ width: `${(creditsUsed / creditsTotal) * 100}%` }}
              />
            </div>
            <p className="text-muted-foreground text-xs">
              Usage resets in {resetDays} days
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              className="flex cursor-pointer items-center gap-2 py-2"
              href="/settings"
              onClick={() => setOpen(false)}
            >
              <Settings className="size-4 text-muted-foreground" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              className="flex cursor-pointer items-center gap-2 py-2"
              href="/pricing"
              onClick={() => setOpen(false)}
            >
              <DollarSign className="size-4 text-muted-foreground" />
              <span>Pricing</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              className="flex cursor-pointer items-center gap-2 py-2"
              href="/community"
              onClick={() => setOpen(false)}
            >
              <Users className="size-4 text-muted-foreground" />
              <span>Community</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <div className="py-2">
          <p className="mb-2 px-2 font-medium text-muted-foreground text-sm">
            Preferences
          </p>
          <div className="space-y-1">
            <div className="flex items-center justify-between px-2 py-1">
              <span className="text-sm">Theme</span>
              <TooltipProvider>
                <div className="flex items-center gap-1 rounded-full bg-muted p-1">
                  {themeOptions.map((option) => {
                    const Icon = option.icon;
                    const isActive = theme === option.value;
                    return (
                      <Tooltip key={option.value}>
                        <TooltipTrigger asChild>
                          <button
                            className={`relative flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200 ${
                              isActive
                                ? 'bg-background shadow-sm'
                                : 'hover:bg-background/50'
                            }`}
                            onClick={() => setTheme(option.value)}
                            type="button"
                          >
                            <Icon
                              className={`size-4 transition-colors duration-200 ${
                                isActive
                                  ? 'text-foreground'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>{option.label}</TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </TooltipProvider>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer py-2"
          onClick={() => {
            setOpen(false);
            handleSignOutClick();
          }}
        >
          <LogOut className="mr-2 size-4 text-muted-foreground" />
          <span>Sign Out</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="p-1">
          <Button asChild className="w-full" onClick={() => setOpen(false)}>
            <Link href="/pricing">Upgrade to Premium</Link>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
