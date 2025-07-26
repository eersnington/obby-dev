// not using this atm as it messes up sidebar behavior
// I do want the floating sidebar somehow

'use client';

import {
  Clock,
  LayoutGrid,
  ChevronRight,
  ChevronDown,
  Plus,
  X,
} from 'lucide-react';
import { Button } from 'components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from 'components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from 'components/ui/sidebar';
import { useEffect, useRef, useState } from 'react';

// Sample data matching your design
const navigationItems = [
  {
    title: 'History',
    icon: Clock,
    url: '#',
  },
  {
    title: 'Projects',
    icon: LayoutGrid,
    url: '#',
  },
  // {
  //   title: "Community",
  //   icon: Users,
  //   url: "#",
  // },
];

const favoriteProjects = ['Design System', 'Mobile App', 'Landing Page'];

const favoriteChats = ['Team Discussion', 'Client Feedback', 'Project Updates'];

const recentItems = [
  'Modernize login page',
  'Neovim config template',
  'Fork of Reducing sidebar ...',
  'Stock penguins landing',
  'Company metrics compon...',
  'Simplify UI layout',
  'Financial page structure',
  'Shadcn carousel page',
  'FMP API Issue',
  'Newcomos-Dashboard',
  'Stock screener API',
  'Next.js web app builder',
];

export function AppSidebar() {
  const { state } = useSidebar();
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsVisible(true);
    // Small delay to ensure the element is rendered before sliding in
    setTimeout(() => setIsHovering(true), 10);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovering(false);
      // Keep visible for animation out
      setTimeout(() => setIsVisible(false), 200);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Hover trigger area when collapsed */}
      {state === 'collapsed' && (
        <div
          className="fixed top-0 left-0 z-40 h-full w-8"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      )}

      {/* Floating sidebar overlay when collapsed and hovering */}
      {state === 'collapsed' && isVisible && (
        <div
          className="pointer-events-none fixed inset-0 z-50"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Sliding sidebar */}
          <div
            className={`pointer-events-auto absolute top-0 bottom-10 left-0 w-64 transform transition-transform duration-300 ease-out ${
              isHovering ? 'translate-x-0' : '-translate-x-full'
            }`}
            style={{
              transform:
                isVisible && !isHovering ? 'translateX(-100%)' : undefined,
            }}
          >
            <div className="my-4 h-full overflow-hidden rounded-xl border-border border-r bg-background">
              <div className="flex h-full flex-col">
                {/* Header */}
                <div className="border-border/50 border-b p-4">
                  <Button
                    className="h-12 w-full justify-center border-border/50 bg-background/50 hover:bg-accent/50"
                    variant="outline"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    New Chat
                  </Button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-4 py-2">
                  {/* Main Navigation */}
                  <div className="mb-6 space-y-1">
                    {navigationItems.map((item) => (
                      <a
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent/50"
                        href={item.url}
                        key={item.title}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </a>
                    ))}
                  </div>

                  {/* Favorite Projects */}
                  <div className="mb-6">
                    <Collapsible defaultOpen={false}>
                      <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium text-muted-foreground text-sm hover:text-foreground">
                        Favorite Projects
                        <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]:rotate-90" />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="mt-2 space-y-1">
                          {favoriteProjects.map((project) => (
                            <a
                              className="block rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-accent/50"
                              href="/"
                              key={project}
                            >
                              {project}
                            </a>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>

                  {/* Favorite Chats */}
                  <div className="mb-6">
                    <Collapsible defaultOpen={false}>
                      <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium text-muted-foreground text-sm hover:text-foreground">
                        Favorite Chats
                        <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]:rotate-90" />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="mt-2 space-y-1">
                          {favoriteChats.map((chat) => (
                            <a
                              className="block rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-accent/50"
                              href="/"
                              key={chat}
                            >
                              {chat}
                            </a>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>

                  {/* Recents */}
                  <div>
                    <Collapsible defaultOpen={true}>
                      <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium text-muted-foreground text-sm hover:text-foreground">
                        Recents
                        <ChevronDown className="h-4 w-4 transition-transform group-data-[state=closed]:rotate-180" />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="mt-2 space-y-1">
                          {recentItems.map((item) => (
                            <a
                              className="block rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-accent/50"
                              href="/"
                              key={item}
                            >
                              {item}
                            </a>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-border/50 border-t p-4">
                  <div className="rounded-lg border border-border/50 bg-background/50 p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium text-sm">New Feature</span>
                      <Button className="h-6 w-6 p-0" size="sm" variant="ghost">
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-muted-foreground text-xs">
                      Introducing GitHub sync on v0
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Regular sidebar when expanded */}
      {state === 'expanded' && (
        <Sidebar
          className="border-none"
          collapsible="offcanvas"
          variant="sidebar"
        >
          <SidebarHeader className="bg-background p-4">
            <Button
              className="h-12 w-full justify-center border-border/50 bg-background/50 hover:bg-accent/50"
              variant="outline"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Chat
            </Button>
          </SidebarHeader>

          <SidebarContent className="bg-background px-4">
            {/* Main Navigation */}
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild className="h-10">
                        <a href={item.url}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Favorite Projects */}
            <SidebarGroup>
              <Collapsible defaultOpen={false}>
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium text-muted-foreground text-sm hover:text-foreground">
                    Favorite Projects
                    <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]:rotate-90" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {favoriteProjects.map((project) => (
                        <SidebarMenuItem key={project}>
                          <SidebarMenuButton asChild className="h-8 text-sm">
                            <a href="/">{project}</a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </Collapsible>
            </SidebarGroup>

            {/* Favorite Chats */}
            <SidebarGroup>
              <Collapsible defaultOpen={false}>
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium text-muted-foreground text-sm hover:text-foreground">
                    Favorite Chats
                    <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]:rotate-90" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {favoriteChats.map((chat) => (
                        <SidebarMenuItem key={chat}>
                          <SidebarMenuButton asChild className="h-8 text-sm">
                            <a href="/">{chat}</a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </Collapsible>
            </SidebarGroup>

            {/* Recents */}
            <SidebarGroup>
              <Collapsible defaultOpen={true}>
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium text-muted-foreground text-sm hover:text-foreground">
                    Recents
                    <ChevronDown className="h-4 w-4 transition-transform group-data-[state=closed]:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {recentItems.map((item) => (
                        <SidebarMenuItem key={item}>
                          <SidebarMenuButton asChild className="h-8 text-sm">
                            <a href="/">{item}</a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </Collapsible>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="bg-background p-4">
            <div className="rounded-lg border border-border/50 bg-background/50 p-3 hover:bg-accent/50">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-medium text-sm">New Feature</span>
                <Button className="h-6 w-6 p-0" size="sm" variant="ghost">
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <p className="text-muted-foreground text-xs">
                Introducing GitHub sync on v0
              </p>
            </div>
          </SidebarFooter>
        </Sidebar>
      )}
    </>
  );
}
