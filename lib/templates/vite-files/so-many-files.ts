export const HTML_TEMPLATE_FILES = {
  '/index.html': `
  <!DOCTYPE html>
  <html>
  <head>
  <title>Anon AI</title>
  <style>
  body {
   background-color: #000;
   color: #fff;
   font-family: 'Courier New', Courier, monospace;
   font-size: 16px;
   line-height: 1.5;
   padding: 20px;
   margin: 0;
   height: 100vh;
   width: 100vw;
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   overflow: hidden;
   box-sizing: border-box;                  
  }
  </style>
  </head>
  <body>
  <h1>Anon AI</h1>
  <p>Vibe Coding LFG!!!</p>
  </body>
  </html>
  `,
};

export const shadcn_component_files = {
  '/src/components/ui/accordion.tsx':
    '"use client"\r\n\r\nimport * as React from "react"\r\nimport * as AccordionPrimitive from "@radix-ui/react-accordion"\r\nimport { ChevronDown } from "lucide-react"\r\n\r\nimport { type ClassValue, clsx } from \'clsx\';\r\nimport { twMerge } from \'tailwind-merge\';\r\nfunction cn(...inputs: ClassValue[]) {\r\n  return twMerge(clsx(inputs));\r\n}\r\n\r\nconst Accordion = AccordionPrimitive.Root\r\n\r\nconst AccordionItem = React.forwardRef<\r\n  React.ElementRef<typeof AccordionPrimitive.Item>,\r\n  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>\r\n>(({ className, ...props }, ref) => (\r\n  <AccordionPrimitive.Item\r\n    ref={ref}\r\n    className={cn("border-b", className)}\r\n    {...props}\r\n  />\r\n))\r\nAccordionItem.displayName = "AccordionItem"\r\n\r\nconst AccordionTrigger = React.forwardRef<\r\n  React.ElementRef<typeof AccordionPrimitive.Trigger>,\r\n  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>\r\n>(({ className, children, ...props }, ref) => (\r\n  <AccordionPrimitive.Header className="flex">\r\n    <AccordionPrimitive.Trigger\r\n      ref={ref}\r\n      className={cn(\r\n        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",\r\n        className\r\n      )}\r\n      {...props}\r\n    >\r\n      {children}\r\n      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />\r\n    </AccordionPrimitive.Trigger>\r\n  </AccordionPrimitive.Header>\r\n))\r\nAccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName\r\n\r\nconst AccordionContent = React.forwardRef<\r\n  React.ElementRef<typeof AccordionPrimitive.Content>,\r\n  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>\r\n>(({ className, children, ...props }, ref) => (\r\n  <AccordionPrimitive.Content\r\n    ref={ref}\r\n    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"\r\n    {...props}\r\n  >\r\n    <div className={cn("pb-4 pt-0", className)}>{children}</div>\r\n  </AccordionPrimitive.Content>\r\n))\r\n\r\nAccordionContent.displayName = AccordionPrimitive.Content.displayName\r\n\r\nexport { Accordion, AccordionItem, AccordionTrigger, AccordionContent }\r\n',
  '/src/components/ui/alert-dialog.tsx':
    '"use client"\r\n\r\nimport * as React from "react"\r\nimport * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"\r\n\r\nimport { type ClassValue, clsx } from \'clsx\';\r\nimport { twMerge } from \'tailwind-merge\';\r\nfunction cn(...inputs: ClassValue[]) {\r\n  return twMerge(clsx(inputs));\r\n}\r\nimport { buttonVariants } from "./button"\r\n\r\nconst AlertDialog = AlertDialogPrimitive.Root\r\n\r\nconst AlertDialogTrigger = AlertDialogPrimitive.Trigger\r\n\r\nconst AlertDialogPortal = AlertDialogPrimitive.Portal\r\n\r\nconst AlertDialogOverlay = React.forwardRef<\r\n  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,\r\n  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>\r\n>(({ className, ...props }, ref) => (\r\n  <AlertDialogPrimitive.Overlay\r\n    className={cn(\r\n      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",\r\n      className\r\n    )}\r\n    {...props}\r\n    ref={ref}\r\n  />\r\n))\r\nAlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName\r\n\r\nconst AlertDialogContent = React.forwardRef<\r\n  React.ElementRef<typeof AlertDialogPrimitive.Content>,\r\n  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>\r\n>(({ className, ...props }, ref) => (\r\n  <AlertDialogPortal>\r\n    <AlertDialogOverlay />\r\n    <AlertDialogPrimitive.Content\r\n      ref={ref}\r\n      className={cn(\r\n        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",\r\n        className\r\n      )}\r\n      {...props}\r\n    />\r\n  </AlertDialogPortal>\r\n))\r\nAlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName\r\n\r\nconst AlertDialogHeader = ({\r\n  className,\r\n  ...props\r\n}: React.HTMLAttributes<HTMLDivElement>) => (\r\n  <div\r\n    className={cn(\r\n      "flex flex-col space-y-2 text-center sm:text-left",\r\n      className\r\n    )}\r\n    {...props}\r\n  />\r\n)\r\nAlertDialogHeader.displayName = "AlertDialogHeader"\r\n\r\nconst AlertDialogFooter = ({\r\n  className,\r\n  ...props\r\n}: React.HTMLAttributes<HTMLDivElement>) => (\r\n  <div\r\n    className={cn(\r\n      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",\r\n      className\r\n    )}\r\n    {...props}\r\n  />\r\n)\r\nAlertDialogFooter.displayName = "AlertDialogFooter"\r\n\r\nconst AlertDialogTitle = React.forwardRef<\r\n  React.ElementRef<typeof AlertDialogPrimitive.Title>,\r\n  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>\r\n>(({ className, ...props }, ref) => (\r\n  <AlertDialogPrimitive.Title\r\n    ref={ref}\r\n    className={cn("text-lg font-semibold", className)}\r\n    {...props}\r\n  />\r\n))\r\nAlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName\r\n\r\nconst AlertDialogDescription = React.forwardRef<\r\n  React.ElementRef<typeof AlertDialogPrimitive.Description>,\r\n  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>\r\n>(({ className, ...props }, ref) => (\r\n  <AlertDialogPrimitive.Description\r\n    ref={ref}\r\n    className={cn("text-sm text-muted-foreground", className)}\r\n    {...props}\r\n  />\r\n))\r\nAlertDialogDescription.displayName =\r\n  AlertDialogPrimitive.Description.displayName\r\n\r\nconst AlertDialogAction = React.forwardRef<\r\n  React.ElementRef<typeof AlertDialogPrimitive.Action>,\r\n  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>\r\n>(({ className, ...props }, ref) => (\r\n  <AlertDialogPrimitive.Action\r\n    ref={ref}\r\n    className={cn(buttonVariants(), className)}\r\n    {...props}\r\n  />\r\n))\r\nAlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName\r\n\r\nconst AlertDialogCancel = React.forwardRef<\r\n  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,\r\n  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>\r\n>(({ className, ...props }, ref) => (\r\n  <AlertDialogPrimitive.Cancel\r\n    ref={ref}\r\n    className={cn(\r\n      buttonVariants({ variant: "outline" }),\r\n      "mt-2 sm:mt-0",\r\n      className\r\n    )}\r\n    {...props}\r\n  />\r\n))\r\nAlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName\r\n\r\nexport {\r\n  AlertDialog,\r\n  AlertDialogPortal,\r\n  AlertDialogOverlay,\r\n  AlertDialogTrigger,\r\n  AlertDialogContent,\r\n  AlertDialogHeader,\r\n  AlertDialogFooter,\r\n  AlertDialogTitle,\r\n  AlertDialogDescription,\r\n  AlertDialogAction,\r\n  AlertDialogCancel,\r\n}\r\n',
  '/src/components/ui/aspect-ratio.tsx':
    '"use client"\r\n\r\nimport * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"\r\n\r\nconst AspectRatio = AspectRatioPrimitive.Root\r\n\r\nexport { AspectRatio }\r\n',
  '/src/components/ui/avatar.tsx':
    '"use client"\r\n\r\nimport * as React from "react"\r\nimport * as AvatarPrimitive from "@radix-ui/react-avatar"\r\n\r\nimport { type ClassValue, clsx } from \'clsx\';\r\nimport { twMerge } from \'tailwind-merge\';\r\nfunction cn(...inputs: ClassValue[]) {\r\n  return twMerge(clsx(inputs));\r\n}\r\n\r\nconst Avatar = React.forwardRef<\r\n  React.ElementRef<typeof AvatarPrimitive.Root>,\r\n  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>\r\n>(({ className, ...props }, ref) => (\r\n  <AvatarPrimitive.Root\r\n    ref={ref}\r\n    className={cn(\r\n      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",\r\n      className\r\n    )}\r\n    {...props}\r\n  />\r\n))\r\nAvatar.displayName = AvatarPrimitive.Root.displayName\r\n\r\nconst AvatarImage = React.forwardRef<\r\n  React.ElementRef<typeof AvatarPrimitive.Image>,\r\n  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>\r\n>(({ className, ...props }, ref) => (\r\n  <AvatarPrimitive.Image\r\n    ref={ref}\r\n    className={cn("aspect-square h-full w-full", className)}\r\n    {...props}\r\n  />\r\n))\r\nAvatarImage.displayName = AvatarPrimitive.Image.displayName\r\n\r\nconst AvatarFallback = React.forwardRef<\r\n  React.ElementRef<typeof AvatarPrimitive.Fallback>,\r\n  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>\r\n>(({ className, ...props }, ref) => (\r\n  <AvatarPrimitive.Fallback\r\n    ref={ref}\r\n    className={cn(\r\n      "flex h-full w-full items-center justify-center rounded-full bg-muted",\r\n      className\r\n    )}\r\n    {...props}\r\n  />\r\n))\r\nAvatarFallback.displayName = AvatarPrimitive.Fallback.displayName\r\n\r\nexport { Avatar, AvatarImage, AvatarFallback }\r\n',
  '/src/components/ui/breadcrumb.tsx':
    'import * as React from "react"\r\nimport { Slot } from "@radix-ui/react-slot"\r\nimport { ChevronRight, MoreHorizontal } from "lucide-react"\r\n\r\nimport { type ClassValue, clsx } from \'clsx\';\r\nimport { twMerge } from \'tailwind-merge\';\r\nfunction cn(...inputs: ClassValue[]) {\r\n  return twMerge(clsx(inputs));\r\n}\r\n\r\nconst Breadcrumb = React.forwardRef<\r\n  HTMLElement,\r\n  React.ComponentPropsWithoutRef<"nav"> & {\r\n    separator?: React.ReactNode\r\n  }\r\n>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />)\r\nBreadcrumb.displayName = "Breadcrumb"\r\n\r\nconst BreadcrumbList = React.forwardRef<\r\n  HTMLOListElement,\r\n  React.ComponentPropsWithoutRef<"ol">\r\n>(({ className, ...props }, ref) => (\r\n  <ol\r\n    ref={ref}\r\n    className={cn(\r\n      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",\r\n      className\r\n    )}\r\n    {...props}\r\n  />\r\n))\r\nBreadcrumbList.displayName = "BreadcrumbList"\r\n\r\nconst BreadcrumbItem = React.forwardRef<\r\n  HTMLLIElement,\r\n  React.ComponentPropsWithoutRef<"li">\r\n>(({ className, ...props }, ref) => (\r\n  <li\r\n    ref={ref}\r\n    className={cn("inline-flex items-center gap-1.5", className)}\r\n    {...props}\r\n  />\r\n))\r\nBreadcrumbItem.displayName = "BreadcrumbItem"\r\n\r\nconst BreadcrumbLink = React.forwardRef<\r\n  HTMLAnchorElement,\r\n  React.ComponentPropsWithoutRef<"a"> & {\r\n    asChild?: boolean\r\n  }\r\n>(({ asChild, className, ...props }, ref) => {\r\n  const Comp = asChild ? Slot : "a"\r\n\r\n  return (\r\n    <Comp\r\n      ref={ref}\r\n      className={cn("transition-colors hover:text-foreground", className)}\r\n      {...props}\r\n    />\r\n  )\r\n})\r\nBreadcrumbLink.displayName = "BreadcrumbLink"\r\n\r\nconst BreadcrumbPage = React.forwardRef<\r\n  HTMLSpanElement,\r\n  React.ComponentPropsWithoutRef<"span">\r\n>(({ className, ...props }, ref) => (\r\n  <span\r\n    ref={ref}\r\n    role="link"\r\n    aria-disabled="true"\r\n    aria-current="page"\r\n    className={cn("font-normal text-foreground", className)}\r\n    {...props}\r\n  />\r\n))\r\nBreadcrumbPage.displayName = "BreadcrumbPage"\r\n\r\nconst BreadcrumbSeparator = ({\r\n  children,\r\n  className,\r\n  ...props\r\n}: React.ComponentProps<"li">) => (\r\n  <li\r\n    role="presentation"\r\n    aria-hidden="true"\r\n    className={cn("[&>svg]:w-3.5 [&>svg]:h-3.5", className)}\r\n    {...props}\r\n  >\r\n    {children ?? <ChevronRight />}\r\n  </li>\r\n)\r\nBreadcrumbSeparator.displayName = "BreadcrumbSeparator"\r\n\r\nconst BreadcrumbEllipsis = ({\r\n  className,\r\n  ...props\r\n}: React.ComponentProps<"span">) => (\r\n  <span\r\n    role="presentation"\r\n    aria-hidden="true"\r\n    className={cn("flex h-9 w-9 items-center justify-center", className)}\r\n    {...props}\r\n  >\r\n    <MoreHorizontal className="h-4 w-4" />\r\n    <span className="sr-only">More</span>\r\n  </span>\r\n)\r\nBreadcrumbEllipsis.displayName = "BreadcrumbElipssis"\r\n\r\nexport {\r\n  Breadcrumb,\r\n  BreadcrumbList,\r\n  BreadcrumbItem,\r\n  BreadcrumbLink,\r\n  BreadcrumbPage,\r\n  BreadcrumbSeparator,\r\n  BreadcrumbEllipsis,\r\n}\r\n',
  '/src/components/ui/calendar.tsx':
    '"use client"\r\n\r\nimport * as React from "react"\r\nimport { ChevronLeft, ChevronRight } from "lucide-react"\r\nimport { DayPicker } from "react-day-picker"\r\n\r\nimport { type ClassValue, clsx } from \'clsx\';\r\nimport { twMerge } from \'tailwind-merge\';\r\nfunction cn(...inputs: ClassValue[]) {\r\n  return twMerge(clsx(inputs));\r\n}\r\nimport { buttonVariants } from "./button"\r\n\r\nexport type CalendarProps = React.ComponentProps<typeof DayPicker>\r\n\r\nfunction Calendar({\r\n  className,\r\n  classNames,\r\n  showOutsideDays = true,\r\n  ...props\r\n}: CalendarProps) {\r\n  return (\r\n    <DayPicker\r\n      showOutsideDays={showOutsideDays}\r\n      className={cn("p-3", className)}\r\n      classNames={{\r\n        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",\r\n        month: "space-y-4",\r\n        caption: "flex justify-center pt-1 relative items-center",\r\n        caption_label: "text-sm font-medium",\r\n        nav: "space-x-1 flex items-center",\r\n        nav_button: cn(\r\n          buttonVariants({ variant: "outline" }),\r\n          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"\r\n        ),\r\n        nav_button_previous: "absolute left-1",\r\n        nav_button_next: "absolute right-1",\r\n        table: "w-full border-collapse space-y-1",\r\n        head_row: "flex",\r\n        head_cell:\r\n          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",\r\n        row: "flex w-full mt-2",\r\n        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",\r\n        day: cn(\r\n          buttonVariants({ variant: "ghost" }),\r\n          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"\r\n        ),\r\n        day_range_end: "day-range-end",\r\n        day_selected:\r\n          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",\r\n        day_today: "bg-accent text-accent-foreground",\r\n        day_outside:\r\n          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",\r\n        day_disabled: "text-muted-foreground opacity-50",\r\n        day_range_middle:\r\n          "aria-selected:bg-accent aria-selected:text-accent-foreground",\r\n        day_hidden: "invisible",\r\n        ...classNames,\r\n      }}\r\n      components={{\r\n        IconLeft: ({ className, ...props }) => (\r\n          <ChevronLeft className={cn("h-4 w-4", className)} {...props} />\r\n        ),\r\n        IconRight: ({ className, ...props }) => (\r\n          <ChevronRight className={cn("h-4 w-4", className)} {...props} />\r\n        ),\r\n      }}\r\n      {...props}\r\n    />\r\n  )\r\n}\r\nCalendar.displayName = "Calendar"\r\n\r\nexport { Calendar }\r\n',
  '/src/components/ui/carousel.tsx':
    '"use client"\r\n\r\nimport * as React from "react"\r\nimport useEmblaCarousel, {\r\n  type UseEmblaCarouselType,\r\n} from "embla-carousel-react"\r\nimport { ArrowLeft, ArrowRight } from "lucide-react"\r\n\r\nimport { type ClassValue, clsx } from \'clsx\';\r\nimport { twMerge } from \'tailwind-merge\';\r\nfunction cn(...inputs: ClassValue[]) {\r\n  return twMerge(clsx(inputs));\r\n}\r\nimport { Button } from "./button"\r\n\r\ntype CarouselApi = UseEmblaCarouselType[1]\r\ntype UseCarouselParameters = Parameters<typeof useEmblaCarousel>\r\ntype CarouselOptions = UseCarouselParameters[0]\r\ntype CarouselPlugin = UseCarouselParameters[1]\r\n\r\ntype CarouselProps = {\r\n  opts?: CarouselOptions\r\n  plugins?: CarouselPlugin\r\n  orientation?: "horizontal" | "vertical"\r\n  setApi?: (api: CarouselApi) => void\r\n}\r\n\r\ntype CarouselContextProps = {\r\n  carouselRef: ReturnType<typeof useEmblaCarousel>[0]\r\n  api: ReturnType<typeof useEmblaCarousel>[1]\r\n  scrollPrev: () => void\r\n  scrollNext: () => void\r\n  canScrollPrev: boolean\r\n  canScrollNext: boolean\r\n} & CarouselProps\r\n\r\nconst CarouselContext = React.createContext<CarouselContextProps | null>(null)\r\n\r\nfunction useCarousel() {\r\n  const context = React.useContext(CarouselContext)\r\n\r\n  if (!context) {\r\n    throw new Error("useCarousel must be used within a <Carousel />")\r\n  }\r\n\r\n  return context\r\n}\r\n\r\nconst Carousel = React.forwardRef<\r\n  HTMLDivElement,\r\n  React.HTMLAttributes<HTMLDivElement> & CarouselProps\r\n>(\r\n  (\r\n    {\r\n      orientation = "horizontal",\r\n      opts,\r\n      setApi,\r\n      plugins,\r\n      className,\r\n      children,\r\n      ...props\r\n    },\r\n    ref\r\n  ) => {\r\n    const [carouselRef, api] = useEmblaCarousel(\r\n      {\r\n        ...opts,\r\n        axis: orientation === "horizontal" ? "x" : "y",\r\n      },\r\n      plugins\r\n    )\r\n    const [canScrollPrev, setCanScrollPrev] = React.useState(false)\r\n    const [canScrollNext, setCanScrollNext] = React.useState(false)\r\n\r\n    const onSelect = React.useCallback((api: CarouselApi) => {\r\n      if (!api) {\r\n        return\r\n      }\r\n\r\n      setCanScrollPrev(api.canScrollPrev())\r\n      setCanScrollNext(api.canScrollNext())\r\n    }, [])\r\n\r\n    const scrollPrev = React.useCallback(() => {\r\n      api?.scrollPrev()\r\n    }, [api])\r\n\r\n    const scrollNext = React.useCallback(() => {\r\n      api?.scrollNext()\r\n    }, [api])\r\n\r\n    const handleKeyDown = React.useCallback(\r\n      (event: React.KeyboardEvent<HTMLDivElement>) => {\r\n        if (event.key === "ArrowLeft") {\r\n          event.preventDefault()\r\n          scrollPrev()\r\n        } else if (event.key === "ArrowRight") {\r\n          event.preventDefault()\r\n          scrollNext()\r\n        }\r\n      },\r\n      [scrollPrev, scrollNext]\r\n    )\r\n\r\n    React.useEffect(() => {\r\n      if (!api || !setApi) {\r\n        return\r\n      }\r\n\r\n      setApi(api)\r\n    }, [api, setApi])\r\n\r\n    React.useEffect(() => {\r\n      if (!api) {\r\n        return\r\n      }\r\n\r\n      onSelect(api)\r\n      api.on("reInit", onSelect)\r\n      api.on("select", onSelect)\r\n\r\n      return () => {\r\n        api?.off("select", onSelect)\r\n      }\r\n    }, [api, onSelect])\r\n\r\n    return (\r\n      <CarouselContext.Provider\r\n        value={{\r\n          carouselRef,\r\n          api: api,\r\n          opts,\r\n          orientation:\r\n            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),\r\n          scrollPrev,\r\n          scrollNext,\r\n          canScrollPrev,\r\n          canScrollNext,\r\n        }}\r\n      >\r\n        <div\r\n          ref={ref}\r\n          onKeyDownCapture={handleKeyDown}\r\n          className={cn("relative", className)}\r\n          role="region"\r\n          aria-roledescription="carousel"\r\n          {...props}\r\n        >\r\n          {children}\r\n        </div>\r\n      </CarouselContext.Provider>\r\n    )\r\n  }\r\n)\r\nCarousel.displayName = "Carousel"\r\n\r\nconst CarouselContent = React.forwardRef<\r\n  HTMLDivElement,\r\n  React.HTMLAttributes<HTMLDivElement>\r\n>(({ className, ...props }, ref) => {\r\n  const { carouselRef, orientation } = useCarousel()\r\n\r\n  return (\r\n    <div ref={carouselRef} className="overflow-hidden">\r\n      <div\r\n        ref={ref}\r\n        className={cn(\r\n          "flex",\r\n          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",\r\n          className\r\n        )}\r\n        {...props}\r\n      />\r\n    </div>\r\n  )\r\n})\r\nCarouselContent.displayName = "CarouselContent"\r\n\r\nconst CarouselItem = React.forwardRef<\r\n  HTMLDivElement,\r\n  React.HTMLAttributes<HTMLDivElement>\r\n>(({ className, ...props }, ref) => {\r\n  const { orientation } = useCarousel()\r\n\r\n  return (\r\n    <div\r\n      ref={ref}\r\n      role="group"\r\n      aria-roledescription="slide"\r\n      className={cn(\r\n        "min-w-0 shrink-0 grow-0 basis-full",\r\n        orientation === "horizontal" ? "pl-4" : "pt-4",\r\n        className\r\n      )}\r\n      {...props}\r\n    />\r\n  )\r\n})\r\nCarouselItem.displayName = "CarouselItem"\r\n\r\nconst CarouselPrevious = React.forwardRef<\r\n  HTMLButtonElement,\r\n  React.ComponentProps<typeof Button>\r\n>(({ className, variant = "outline", size = "icon", ...props }, ref) => {\r\n  const { orientation, scrollPrev, canScrollPrev } = useCarousel()\r\n\r\n  return (\r\n    <Button\r\n      ref={ref}\r\n      variant={variant}\r\n      size={size}\r\n      className={cn(\r\n        "absolute  h-8 w-8 rounded-full",\r\n        orientation === "horizontal"\r\n          ? "-left-12 top-1/2 -translate-y-1/2"\r\n          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",\r\n        className\r\n      )}\r\n      disabled={!canScrollPrev}\r\n      onClick={scrollPrev}\r\n      {...props}\r\n    >\r\n      <ArrowLeft className="h-4 w-4" />\r\n      <span className="sr-only">Previous slide</span>\r\n    </Button>\r\n  )\r\n})\r\nCarouselPrevious.displayName = "CarouselPrevious"\r\n\r\nconst CarouselNext = React.forwardRef<\r\n  HTMLButtonElement,\r\n  React.ComponentProps<typeof Button>\r\n>(({ className, variant = "outline", size = "icon", ...props }, ref) => {\r\n  const { orientation, scrollNext, canScrollNext } = useCarousel()\r\n\r\n  return (\r\n    <Button\r\n      ref={ref}\r\n      variant={variant}\r\n      size={size}\r\n      className={cn(\r\n        "absolute h-8 w-8 rounded-full",\r\n        orientation === "horizontal"\r\n          ? "-right-12 top-1/2 -translate-y-1/2"\r\n          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",\r\n        className\r\n      )}\r\n      disabled={!canScrollNext}\r\n      onClick={scrollNext}\r\n      {...props}\r\n    >\r\n      <ArrowRight className="h-4 w-4" />\r\n      <span className="sr-only">Next slide</span>\r\n    </Button>\r\n  )\r\n})\r\nCarouselNext.displayName = "CarouselNext"\r\n\r\nexport {\r\n  type CarouselApi,\r\n  Carousel,\r\n  CarouselContent,\r\n  CarouselItem,\r\n  CarouselPrevious,\r\n  CarouselNext,\r\n}\r\n',
  '/src/components/ui/chart.tsx':
    '"use client"\r\n\r\nimport * as React from "react"\r\nimport * as RechartsPrimitive from "recharts"\r\n\r\nimport { type ClassValue, clsx } from \'clsx\';\r\nimport { twMerge } from \'tailwind-merge\';\r\nfunction cn(...inputs: ClassValue[]) {\r\n  return twMerge(clsx(inputs));\r\n}\r\n\r\n// Format: { THEME_NAME: CSS_SELECTOR }\r\nconst THEMES = { light: "", dark: ".dark" } as const\r\n\r\nexport type ChartConfig = {\r\n  [k in string]: {\r\n    label?: React.ReactNode\r\n    icon?: React.ComponentType\r\n  } & (\r\n    | { color?: string; theme?: never }\r\n    | { color?: never; theme: Record<keyof typeof THEMES, string> }\r\n  )\r\n}\r\n\r\ntype ChartContextProps = {\r\n  config: ChartConfig\r\n}\r\n\r\nconst ChartContext = React.createContext<ChartContextProps | null>(null)\r\n\r\nfunction useChart() {\r\n  const context = React.useContext(ChartContext)\r\n\r\n  if (!context) {\r\n    throw new Error("useChart must be used within a <ChartContainer />")\r\n  }\r\n\r\n  return context\r\n}\r\n\r\nconst ChartContainer = React.forwardRef<\r\n  HTMLDivElement,\r\n  React.ComponentProps<"div"> & {\r\n    config: ChartConfig\r\n    children: React.ComponentProps<\r\n      typeof RechartsPrimitive.ResponsiveContainer\r\n    >["children"]\r\n  }\r\n>(({ id, className, children, config, ...props }, ref) => {\r\n  const uniqueId = React.useId()\r\n  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`\r\n\r\n  return (\r\n    <ChartContext.Provider value={{ config }}>\r\n      <div\r\n        data-chart={chartId}\r\n        ref={ref}\r\n        className={cn(\r\n          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke=\'#ccc\']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke=\'#fff\']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke=\'#ccc\']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke=\'#ccc\']]:stroke-border [&_.recharts-sector[stroke=\'#fff\']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",\r\n          className\r\n        )}\r\n        {...props}\r\n      >\r\n        <ChartStyle id={chartId} config={config} />\r\n        <RechartsPrimitive.ResponsiveContainer>\r\n          {children}\r\n        </RechartsPrimitive.ResponsiveContainer>\r\n      </div>\r\n    </ChartContext.Provider>\r\n  )\r\n})\r\nChartContainer.displayName = "Chart"\r\n\r\nconst ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {\r\n  const colorConfig = Object.entries(config).filter(\r\n    ([, config]) => config.theme || config.color\r\n  )\r\n\r\n  if (!colorConfig.length) {\r\n    return null\r\n  }\r\n\r\n  return (\r\n    <style\r\n      dangerouslySetInnerHTML={{\r\n        __html: Object.entries(THEMES)\r\n          .map(\r\n            ([theme, prefix]) => `\r\n${prefix} [data-chart=${id}] {\r\n${colorConfig\r\n  .map(([key, itemConfig]) => {\r\n    const color =\r\n      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||\r\n      itemConfig.color\r\n    return color ? `  --color-${key}: ${color};` : null\r\n  })\r\n  .join("\\n")}\r\n}\r\n`\r\n          )\r\n          .join("\\n"),\r\n      }}\r\n    />\r\n  )\r\n}\r\n\r\nconst ChartTooltip = RechartsPrimitive.Tooltip\r\n\r\nconst ChartTooltipContent = React.forwardRef<\r\n  HTMLDivElement,\r\n  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &\r\n    React.ComponentProps<"div"> & {\r\n      hideLabel?: boolean\r\n      hideIndicator?: boolean\r\n      indicator?: "line" | "dot" | "dashed"\r\n      nameKey?: string\r\n      labelKey?: string\r\n    }\r\n>(\r\n  (\r\n    {\r\n      active,\r\n      payload,\r\n      className,\r\n      indicator = "dot",\r\n      hideLabel = false,\r\n      hideIndicator = false,\r\n      label,\r\n      labelFormatter,\r\n      labelClassName,\r\n      formatter,\r\n      color,\r\n      nameKey,\r\n      labelKey,\r\n    },\r\n    ref\r\n  ) => {\r\n    const { config } = useChart()\r\n\r\n    const tooltipLabel = React.useMemo(() => {\r\n      if (hideLabel || !payload?.length) {\r\n        return null\r\n      }\r\n\r\n      const [item] = payload\r\n      const key = `${labelKey || item?.dataKey || item?.name || "value"}`\r\n      const itemConfig = getPayloadConfigFromPayload(config, item, key)\r\n      const value =\r\n        !labelKey && typeof label === "string"\r\n          ? config[label as keyof typeof config]?.label || label\r\n          : itemConfig?.label\r\n\r\n      if (labelFormatter) {\r\n        return (\r\n          <div className={cn("font-medium", labelClassName)}>\r\n            {labelFormatter(value, payload)}\r\n          </div>\r\n        )\r\n      }\r\n\r\n      if (!value) {\r\n        return null\r\n      }\r\n\r\n      return <div className={cn("font-medium", labelClassName)}>{value}</div>\r\n    }, [\r\n      label,\r\n      labelFormatter,\r\n      payload,\r\n      hideLabel,\r\n      labelClassName,\r\n      config,\r\n      labelKey,\r\n    ])\r\n\r\n    if (!active || !payload?.length) {\r\n      return null\r\n    }\r\n\r\n    const nestLabel = payload.length === 1 && indicator !== "dot"\r\n\r\n    return (\r\n      <div\r\n        ref={ref}\r\n        className={cn(\r\n          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",\r\n          className\r\n        )}\r\n      >\r\n        {!nestLabel ? tooltipLabel : null}\r\n        <div className="grid gap-1.5">\r\n          {payload.map((item, index) => {\r\n            const key = `${nameKey || item.name || item.dataKey || "value"}`\r\n            const itemConfig = getPayloadConfigFromPayload(config, item, key)\r\n            const indicatorColor = color || item.payload.fill || item.color\r\n\r\n            return (\r\n              <div\r\n                key={item.dataKey}\r\n                className={cn(\r\n                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",\r\n                  indicator === "dot" && "items-center"\r\n                )}\r\n              >\r\n                {formatter && item?.value !== undefined && item.name ? (\r\n                  formatter(item.value, item.name, item, index, item.payload)\r\n                ) : (\r\n                  <>\r\n                    {itemConfig?.icon ? (\r\n                      <itemConfig.icon />\r\n                    ) : (\r\n                      !hideIndicator && (\r\n                        <div\r\n                          className={cn(\r\n                            "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",\r\n                            {\r\n                              "h-2.5 w-2.5": indicator === "dot",\r\n                              "w-1": indicator === "line",\r\n                              "w-0 border-[1.5px] border-dashed bg-transparent":\r\n                                indicator === "dashed",\r\n                              "my-0.5": nestLabel && indicator === "dashed",\r\n                            }\r\n                          )}\r\n                          style={\r\n                            {\r\n                              "--color-bg": indicatorColor,\r\n                              "--color-border": indicatorColor,\r\n                            } as React.CSSProperties\r\n                          }\r\n                        />\r\n                      )\r\n                    )}\r\n                    <div\r\n                      className={cn(\r\n                        "flex flex-1 justify-between leading-none",\r\n                        nestLabel ? "items-end" : "items-center"\r\n                      )}\r\n                    >\r\n                      <div className="grid gap-1.5">\r\n                        {nestLabel ? tooltipLabel : null}\r\n                        <span className="text-muted-foreground">\r\n                          {itemConfig?.label || item.name}\r\n                        </span>\r\n                      </div>\r\n                      {item.value && (\r\n                        <span className="font-mono font-medium tabular-nums text-foreground">\r\n                          {item.value.toLocaleString()}\r\n                        </span>\r\n                      )}\r\n                    </div>\r\n                  </>\r\n                )}\r\n              </div>\r\n            )\r\n          })}\r\n        </div>\r\n      </div>\r\n    )\r\n  }\r\n)\r\nChartTooltipContent.displayName = "ChartTooltip"\r\n\r\nconst ChartLegend = RechartsPrimitive.Legend\r\n\r\nconst ChartLegendContent = React.forwardRef<\r\n  HTMLDivElement,\r\n  React.ComponentProps<"div"> &\r\n    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {\r\n      hideIcon?: boolean\r\n      nameKey?: string\r\n    }\r\n>(\r\n  (\r\n    { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },\r\n    ref\r\n  ) => {\r\n    const { config } = useChart()\r\n\r\n    if (!payload?.length) {\r\n      return null\r\n    }\r\n\r\n    return (\r\n      <div\r\n        ref={ref}\r\n        className={cn(\r\n          "flex items-center justify-center gap-4",\r\n          verticalAlign === "top" ? "pb-3" : "pt-3",\r\n          className\r\n        )}\r\n      >\r\n        {payload.map((item) => {\r\n          const key = `${nameKey || item.dataKey || "value"}`\r\n          const itemConfig = getPayloadConfigFromPayload(config, item, key)\r\n\r\n          return (\r\n            <div\r\n              key={item.value}\r\n              className={cn(\r\n                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"\r\n              )}\r\n            >\r\n              {itemConfig?.icon && !hideIcon ? (\r\n                <itemConfig.icon />\r\n              ) : (\r\n                <div\r\n                  className="h-2 w-2 shrink-0 rounded-[2px]"\r\n                  style={{\r\n                    backgroundColor: item.color,\r\n                  }}\r\n                />\r\n              )}\r\n              {itemConfig?.label}\r\n            </div>\r\n          )\r\n        })}\r\n      </div>\r\n    )\r\n  }\r\n)\r\nChartLegendContent.displayName = "ChartLegend"\r\n\r\n// Helper to extract item config from a payload.\r\nfunction getPayloadConfigFromPayload(\r\n  config: ChartConfig,\r\n  payload: unknown,\r\n  key: string\r\n) {\r\n  if (typeof payload !== "object" || payload === null) {\r\n    return undefined\r\n  }\r\n\r\n  const payloadPayload =\r\n    "payload" in payload &&\r\n    typeof payload.payload === "object" &&\r\n    payload.payload !== null\r\n      ? payload.payload\r\n      : undefined\r\n\r\n  let configLabelKey: string = key\r\n\r\n  if (\r\n    key in payload &&\r\n    typeof payload[key as keyof typeof payload] === "string"\r\n  ) {\r\n    configLabelKey = payload[key as keyof typeof payload] as string\r\n  } else if (\r\n    payloadPayload &&\r\n    key in payloadPayload &&\r\n    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"\r\n  ) {\r\n    configLabelKey = payloadPayload[\r\n      key as keyof typeof payloadPayload\r\n    ] as string\r\n  }\r\n\r\n  return configLabelKey in config\r\n    ? config[configLabelKey]\r\n    : config[key as keyof typeof config]\r\n}\r\n\r\nexport {\r\n  ChartContainer,\r\n  ChartTooltip,\r\n  ChartTooltipContent,\r\n  ChartLegend,\r\n  ChartLegendContent,\r\n  ChartStyle,\r\n}\r\n',
  '/src/components/ui/checkbox.tsx':
    '"use client"\r\n\r\nimport * as React from "react"\r\nimport * as CheckboxPrimitive from "@radix-ui/react-checkbox"\r\nimport { Check } from "lucide-react"\r\n\r\nimport { type ClassValue, clsx } from \'clsx\';\r\nimport { twMerge } from \'tailwind-merge\';\r\nfunction cn(...inputs: ClassValue[]) {\r\n  return twMerge(clsx(inputs));\r\n}\r\n\r\nconst Checkbox = React.forwardRef<\r\n  React.ElementRef<typeof CheckboxPrimitive.Root>,\r\n  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>\r\n>(({ className, ...props }, ref) => (\r\n  <CheckboxPrimitive.Root\r\n    ref={ref}\r\n    className={cn(\r\n      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",\r\n      className\r\n    )}\r\n    {...props}\r\n  >\r\n    <CheckboxPrimitive.Indicator\r\n      className={cn("flex items-center justify-center text-current")}\r\n    >\r\n      <Check className="h-4 w-4" />\r\n    </CheckboxPrimitive.Indicator>\r\n  </CheckboxPrimitive.Root>\r\n))\r\nCheckbox.displayName = CheckboxPrimitive.Root.displayName\r\n\r\nexport { Checkbox }\r\n',
  '/src/components/ui/collapsible.tsx':
    '"use client"\r\n\r\nimport * as CollapsiblePrimitive from "@radix-ui/react-collapsible"\r\n\r\nconst Collapsible = CollapsiblePrimitive.Root\r\n\r\nconst CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger\r\n\r\nconst CollapsibleContent = CollapsiblePrimitive.CollapsibleContent\r\n\r\nexport { Collapsible, CollapsibleTrigger, CollapsibleContent }\r\n',
  '/src/components/ui/command.tsx':
    '"use client"\r\n\r\nimport * as React from "react"\r\nimport { type DialogProps } from "@radix-ui/react-dialog"\r\nimport { Command as CommandPrimitive } from "cmdk"\r\nimport { Search } from "lucide-react"\r\n\r\nimport { type ClassValue, clsx } from \'clsx\';\r\nimport { twMerge } from \'tailwind-merge\';\r\nfunction cn(...inputs: ClassValue[]) {\r\n  return twMerge(clsx(inputs));\r\n}\r\nimport { Dialog, DialogContent } from "./dialog"\r\n\r\nconst Command = React.forwardRef<\r\n  React.ElementRef<typeof CommandPrimitive>,\r\n  React.ComponentPropsWithoutRef<typeof CommandPrimitive>\r\n>(({ className, ...props }, ref) => (\r\n  <CommandPrimitive\r\n    ref={ref}\r\n    className={cn(\r\n      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",\r\n      className\r\n    )}\r\n    {...props}\r\n  />\r\n))\r\nCommand.displayName = CommandPrimitive.displayName\r\n\r\nconst CommandDialog = ({ children, ...props }: DialogProps) => {\r\n  return (\r\n    <Dialog {...props}>\r\n      <DialogContent className="overflow-hidden p-0 shadow-lg">\r\n        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">\r\n          {children}\r\n        </Command>\r\n      </DialogContent>\r\n    </Dialog>\r\n  )\r\n}\r\n\r\nconst CommandInput = React.forwardRef<\r\n  React.ElementRef<typeof CommandPrimitive.Input>,\r\n  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>\r\n>(({ className, ...props }, ref) => (\r\n  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">\r\n    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />\r\n    <CommandPrimitive.Input\r\n      ref={ref}\r\n      className={cn(\r\n        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",\r\n        className\r\n      )}\r\n      {...props}\r\n    />\r\n  </div>\r\n))\r\n\r\nCommandInput.displayName = CommandPrimitive.Input.displayName\r\n\r\nconst CommandList = React.forwardRef<\r\n  React.ElementRef<typeof CommandPrimitive.List>,\r\n  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>\r\n>(({ className, ...props }, ref) => (\r\n  <CommandPrimitive.List\r\n    ref={ref}\r\n    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}\r\n    {...props}\r\n  />\r\n))\r\n\r\nCommandList.displayName = CommandPrimitive.List.displayName\r\n\r\nconst CommandEmpty = React.forwardRef<\r\n  React.ElementRef<typeof CommandPrimitive.Empty>,\r\n  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>\r\n>((props, ref) => (\r\n  <CommandPrimitive.Empty\r\n    ref={ref}\r\n    className="py-6 text-center text-sm"\r\n    {...props}\r\n  />\r\n))\r\n\r\nCommandEmpty.displayName = CommandPrimitive.Empty.displayName\r\n\r\nconst CommandGroup = React.forwardRef<\r\n  React.ElementRef<typeof CommandPrimitive.Group>,\r\n  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>\r\n>(({ className, ...props }, ref) => (\r\n  <CommandPrimitive.Group\r\n    ref={ref}\r\n    className={cn(\r\n      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",\r\n      className\r\n    )}\r\n    {...props}\r\n  />\r\n))\r\n\r\nCommandGroup.displayName = CommandPrimitive.Group.displayName\r\n\r\nconst CommandSeparator = React.forwardRef<\r\n  React.ElementRef<typeof CommandPrimitive.Separator>,\r\n  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>\r\n>(({ className, ...props }, ref) => (\r\n  <CommandPrimitive.Separator\r\n    ref={ref}\r\n    className={cn("-mx-1 h-px bg-border", className)}\r\n    {...props}\r\n  />\r\n))\r\nCommandSeparator.displayName = CommandPrimitive.Separator.displayName\r\n\r\nconst CommandItem = React.forwardRef<\r\n  React.ElementRef<typeof CommandPrimitive.Item>,\r\n  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>\r\n>(({ className, ...props }, ref) => (\r\n  <CommandPrimitive.Item\r\n    ref={ref}\r\n    className={cn(\r\n      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=\'true\']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",\r\n      className\r\n    )}\r\n    {...props}\r\n  />\r\n))\r\n\r\nCommandItem.displayName = CommandPrimitive.Item.displayName\r\n\r\nconst CommandShortcut = ({\r\n  className,\r\n  ...props\r\n}: React.HTMLAttributes<HTMLSpanElement>) => {\r\n  return (\r\n    <span\r\n      className={cn(\r\n        "ml-auto text-xs tracking-widest text-muted-foreground",\r\n        className\r\n      )}\r\n      {...props}\r\n    />\r\n  )\r\n}\r\nCommandShortcut.displayName = "CommandShortcut"\r\n\r\nexport {\r\n  Command,\r\n  CommandDialog,\r\n  CommandInput,\r\n  CommandList,\r\n  CommandEmpty,\r\n  CommandGroup,\r\n  CommandItem,\r\n  CommandShortcut,\r\n  CommandSeparator,\r\n}\r\n',
  '/src/components/ui/context-menu.tsx':
    '"use client"\r\n\r\nimport * as React from "react"\r\nimport * as ContextMenuPrimitive from "@radix-ui/react-context-menu"\r\nimport { Check, ChevronRight, Circle } from "lucide-react"\r\n\r\nimport { type ClassValue, clsx } from \'clsx\';\r\nimport { twMerge } from \'tailwind-merge\';\r\nfunction cn(...inputs: ClassValue[]) {\r\n  return twMerge(clsx(inputs));\r\n}\r\n\r\nconst ContextMenu = ContextMenuPrimitive.Root\r\n\r\nconst ContextMenuTrigger = ContextMenuPrimitive.Trigger\r\n\r\nconst ContextMenuGroup = ContextMenuPrimitive.Group\r\n\r\nconst ContextMenuPortal = ContextMenuPrimitive.Portal\r\n\r\nconst ContextMenuSub = ContextMenuPrimitive.Sub\r\n\r\nconst ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup\r\n\r\nconst ContextMenuSubTrigger = React.forwardRef<\r\n  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,\r\n  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {\r\n    inset?: boolean\r\n  }\r\n>(({ className, inset, children, ...props }, ref) => (\r\n  <ContextMenuPrimitive.SubTrigger\r\n    ref={ref}\r\n    className={cn(\r\n      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",\r\n      inset && "pl-8",\r\n      className\r\n    )}\r\n    {...props}\r\n  >\r\n    {children}\r\n    <ChevronRight className="ml-auto h-4 w-4" />\r\n  </ContextMenuPrimitive.SubTrigger>\r\n))\r\nContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName\r\n\r\nconst ContextMenuSubContent = React.forwardRef<\r\n  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,\r\n  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>\r\n>(({ className, ...props }, ref) => (\r\n  <ContextMenuPrimitive.SubContent\r\n    ref={ref}\r\n    className={cn(\r\n      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-context-menu-content-transform-origin]",\r\n      className\r\n    )}\r\n    {...props}\r\n  />\r\n))\r\nContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName\r\n\r\nconst ContextMenuContent = React.forwardRef<\r\n  React.ElementRef<typeof ContextMenuPrimitive.Content>,\r\n  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>\r\n>(({ className, ...props }, ref) => (\r\n  <ContextMenuPrimitive.Portal>\r\n    <ContextMenuPrimitive.Content\r\n      ref={ref}\r\n      className={cn(\r\n        "z-50 max-h-[--radix-context-menu-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-context-menu-content-transform-origin]",\r\n        className\r\n      )}\r\n      {...props}\r\n    />\r\n  </ContextMenuPrimitive.Portal>\r\n))\r\nContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName\r\n\r\nconst ContextMenuItem = React.forwardRef<\r\n  React.ElementRef<typeof ContextMenuPrimitive.Item>,\r\n  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {\r\n    inset?: boolean\r\n  }\r\n>(({ className, inset, ...props }, ref) => (\r\n  <ContextMenuPrimitive.Item\r\n    ref={ref}\r\n    className={cn(\r\n      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",\r\n      inset && "pl-8",\r\n      className\r\n    )}\r\n    {...props}\r\n  />\r\n))\r\nContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName\r\n\r\nconst ContextMenuCheckboxItem = React.forwardRef<\r\n  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,\r\n  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>\r\n>(({ className, children, checked, ...props }, ref) => (\r\n  <ContextMenuPrimitive.CheckboxItem\r\n    ref={ref}\r\n    className={cn(\r\n      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",\r\n      className\r\n    )}\r\n    checked={checked}\r\n    {...props}\r\n  >\r\n    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">\r\n      <ContextMenuPrimitive.ItemIndicator>\r\n        <Check className="h-4 w-4" />\r\n      </ContextMenuPrimitive.ItemIndicator>\r\n    </span>\r\n    {children}\r\n  </ContextMenuPrimitive.CheckboxItem>\r\n))\r\nContextMenuCheckboxItem.displayName =\r\n  ContextMenuPrimitive.CheckboxItem.displayName\r\n\r\nconst ContextMenuRadioItem = React.forwardRef<\r\n  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,\r\n  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>\r\n>(({ className, children, ...props }, ref) => (\r\n  <ContextMenuPrimitive.RadioItem\r\n    ref={ref}\r\n    className={cn(\r\n      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",\r\n      className\r\n    )}\r\n    {...props}\r\n  >\r\n    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">\r\n      <ContextMenuPrimitive.ItemIndicator>\r\n        <Circle className="h-2 w-2 fill-current" />\r\n      </ContextMenuPrimitive.ItemIndicator>\r\n    </span>\r\n    {children}\r\n  </ContextMenuPrimitive.RadioItem>\r\n))\r\nContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName\r\n\r\nconst ContextMenuLabel = React.forwardRef<\r\n  React.ElementRef<typeof ContextMenuPrimitive.Label>,\r\n  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {\r\n    inset?: boolean\r\n  }\r\n>(({ className, inset, ...props }, ref) => (\r\n  <ContextMenuPrimitive.Label\r\n    ref={ref}\r\n    className={cn(\r\n      "px-2 py-1.5 text-sm font-semibold text-foreground",\r\n      inset && "pl-8",\r\n      className\r\n    )}\r\n    {...props}\r\n  />\r\n))\r\nContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName\r\n\r\nconst ContextMenuSeparator = React.forwardRef<\r\n  React.ElementRef<typeof ContextMenuPrimitive.Separator>,\r\n  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>\r\n>(({ className, ...props }, ref) => (\r\n  <ContextMenuPrimitive.Separator\r\n    ref={ref}\r\n    className={cn("-mx-1 my-1 h-px bg-border", className)}\r\n    {...props}\r\n  />\r\n))\r\nContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName\r\n\r\nconst ContextMenuShortcut = ({\r\n  className,\r\n  ...props\r\n}: React.HTMLAttributes<HTMLSpanElement>) => {\r\n  return (\r\n    <span\r\n      className={cn(\r\n        "ml-auto text-xs tracking-widest text-muted-foreground",\r\n        className\r\n      )}\r\n      {...props}\r\n    />\r\n  )\r\n}\r\nContextMenuShortcut.displayName = "ContextMenuShortcut"\r\n\r\nexport {\r\n  ContextMenu,\r\n  ContextMenuTrigger,\r\n  ContextMenuContent,\r\n  ContextMenuItem,\r\n  ContextMenuCheckboxItem,\r\n  ContextMenuRadioItem,\r\n  ContextMenuLabel,\r\n  ContextMenuSeparator,\r\n  ContextMenuShortcut,\r\n  ContextMenuGroup,\r\n  ContextMenuPortal,\r\n  ContextMenuSub,\r\n  ContextMenuSubContent,\r\n  ContextMenuSubTrigger,\r\n  ContextMenuRadioGroup,\r\n}\r\n',
  '/src/components/ui/drawer.tsx':
    '"use client"\r\n\r\nimport * as React from "react"\r\nimport { Drawer as DrawerPrimitive } from "vaul"\r\n\r\nimport { type ClassValue, clsx } from \'clsx\';\r\nimport { twMerge } from \'tailwind-merge\';\r\nfunction cn(...inputs: ClassValue[]) {\r\n  return twMerge(clsx(inputs));\r\n}\r\n\r\nconst Drawer = ({\r\n  shouldScaleBackground = true,\r\n  ...props\r\n}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (\r\n  <DrawerPrimitive.Root\r\n    shouldScaleBackground={shouldScaleBackground}\r\n    {...props}\r\n  />\r\n)\r\nDrawer.displayName = "Drawer"\r\n\r\nconst DrawerTrigger = DrawerPrimitive.Trigger\r\n\r\nconst DrawerPortal = DrawerPrimitive.Portal\r\n\r\nconst DrawerClose = DrawerPrimitive.Close\r\n\r\nconst DrawerOverlay = React.forwardRef<\r\n  React.ElementRef<typeof DrawerPrimitive.Overlay>,\r\n  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>\r\n>(({ className, ...props }, ref) => (\r\n  <DrawerPrimitive.Overlay\r\n    ref={ref}\r\n    className={cn("fixed inset-0 z-50 bg-black/80", className)}\r\n    {...props}\r\n  />\r\n))\r\nDrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName\r\n\r\nconst DrawerContent = React.forwardRef<\r\n  React.ElementRef<typeof DrawerPrimitive.Content>,\r\n  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>\r\n>(({ className, children, ...props }, ref) => (\r\n  <DrawerPortal>\r\n    <DrawerOverlay />\r\n    <DrawerPrimitive.Content\r\n      ref={ref}\r\n      className={cn(\r\n        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",\r\n        className\r\n      )}\r\n      {...props}\r\n    >\r\n      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />\r\n      {children}\r\n    </DrawerPrimitive.Content>\r\n  </DrawerPortal>\r\n))\r\nDrawerContent.displayName = "DrawerContent"\r\n\r\nconst DrawerHeader = ({\r\n  className,\r\n  ...props\r\n}: React.HTMLAttributes<HTMLDivElement>) => (\r\n  <div\r\n    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}\r\n    {...props}\r\n  />\r\n)\r\nDrawerHeader.displayName = "DrawerHeader"\r\n\r\nconst DrawerFooter = ({\r\n  className,\r\n  ...props\r\n}: React.HTMLAttributes<HTMLDivElement>) => (\r\n  <div\r\n    className={cn("mt-auto flex flex-col gap-2 p-4", className)}\r\n    {...props}\r\n  />\r\n)\r\nDrawerFooter.displayName = "DrawerFooter"\r\n\r\nconst DrawerTitle = React.forwardRef<\r\n  React.ElementRef<typeof DrawerPrimitive.Title>,\r\n  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>\r\n>(({ className, ...props }, ref) => (\r\n  <DrawerPrimitive.Title\r\n    ref={ref}\r\n    className={cn(\r\n      "text-lg font-semibold leading-none tracking-tight",\r\n      className\r\n    )}\r\n    {...props}\r\n  />\r\n))\r\nDrawerTitle.displayName = DrawerPrimitive.Title.displayName\r\n\r\nconst DrawerDescription = React.forwardRef<\r\n  React.ElementRef<typeof DrawerPrimitive.Description>,\r\n  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>\r\n>(({ className, ...props }, ref) => (\r\n  <DrawerPrimitive.Description\r\n    ref={ref}\r\n    className={cn("text-sm text-muted-foreground", className)}\r\n    {...props}\r\n  />\r\n))\r\nDrawerDescription.displayName = DrawerPrimitive.Description.displayName\r\n\r\nexport {\r\n  Drawer,\r\n  DrawerPortal,\r\n  DrawerOverlay,\r\n  DrawerTrigger,\r\n  DrawerClose,\r\n  DrawerContent,\r\n  DrawerHeader,\r\n  DrawerFooter,\r\n  DrawerTitle,\r\n  DrawerDescription,\r\n}\r\n',
  '/src/components/ui/dropdown-menu.tsx':
    '"use client"\r\n\r\nimport * as React from "react"\r\nimport * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"\r\nimport { Check, ChevronRight, Circle } from "lucide-react"\r\n\r\nimport { type ClassValue, clsx } from \'clsx\';\r\nimport { twMerge } from \'tailwind-merge\';\r\nfunction cn(...inputs: ClassValue[]) {\r\n  return twMerge(clsx(inputs));\r\n}\r\n\r\nconst DropdownMenu = DropdownMenuPrimitive.Root\r\n\r\nconst DropdownMenuTrigger = DropdownMenuPrimitive.Trigger\r\n\r\nconst DropdownMenuGroup = DropdownMenuPrimitive.Group\r\n\r\nconst DropdownMenuPortal = DropdownMenuPrimitive.Portal\r\n\r\nconst DropdownMenuSub = DropdownMenuPrimitive.Sub\r\n\r\nconst DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup\r\n\r\nconst DropdownMenuSubTrigger = React.forwardRef<\r\n  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,\r\n  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {\r\n    inset?: boolean\r\n  }\r\n>(({ className, inset, children, ...props }, ref) => (\r\n  <DropdownMenuPrimitive.SubTrigger\r\n    ref={ref}\r\n    className={cn(\r\n      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",\r\n      inset && "pl-8",\r\n      className\r\n    )}\r\n    {...props}\r\n  >\r\n    {children}\r\n    <ChevronRight className="ml-auto" />\r\n  </DropdownMenuPrimitive.SubTrigger>\r\n))\r\nDropdownMenuSubTrigger.displayName =\r\n  DropdownMenuPrimitive.SubTrigger.displayName\r\n\r\nconst DropdownMenuSubContent = React.forwardRef<\r\n  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,\r\n  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>\r\n>(({ className, ...props }, ref) => (\r\n  <DropdownMenuPrimitive.SubContent\r\n    ref={ref}\r\n    className={cn(\r\n      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",\r\n      className\r\n    )}\r\n    {...props}\r\n  />\r\n))\r\nDropdownMenuSubContent.displayName =\r\n  DropdownMenuPrimitive.SubContent.displayName\r\n\r\nconst DropdownMenuContent = React.forwardRef<\r\n  React.ElementRef<typeof DropdownMenuPrimitive.Content>,\r\n  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>\r\n>(({ className, sideOffset = 4, ...props }, ref) => (\r\n  <DropdownMenuPrimitive.Portal>\r\n    <DropdownMenuPrimitive.Content\r\n      ref={ref}\r\n      sideOffset={sideOffset}\r\n      className={cn(\r\n        "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",\r\n        className\r\n      )}\r\n      {...props}\r\n    />\r\n  </DropdownMenuPrimitive.Portal>\r\n))\r\nDropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName\r\n\r\nconst DropdownMenuItem = React.forwardRef<\r\n  React.ElementRef<typeof DropdownMenuPrimitive.Item>,\r\n  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {\r\n    inset?: boolean\r\n  }\r\n>(({ className, inset, ...props }, ref) => (\r\n  <DropdownMenuPrimitive.Item\r\n    ref={ref}\r\n    className={cn(\r\n      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",\r\n      inset && "pl-8",\r\n      className\r\n    )}\r\n    {...props}\r\n  />\r\n))\r\nDropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName\r\n\r\nconst DropdownMenuCheckboxItem = React.forwardRef<\r\n  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,\r\n  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>\r\n>(({ className, children, checked, ...props }, ref) => (\r\n  <DropdownMenuPrimitive.CheckboxItem\r\n    ref={ref}\r\n    className={cn(\r\n      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",\r\n      className\r\n    )}\r\n    checked={checked}\r\n    {...props}\r\n  >\r\n    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">\r\n      <DropdownMenuPrimitive.ItemIndicator>\r\n        <Check className="h-4 w-4" />\r\n      </DropdownMenuPrimitive.ItemIndicator>\r\n    </span>\r\n    {children}\r\n  </DropdownMenuPrimitive.CheckboxItem>\r\n))\r\nDropdownMenuCheckboxItem.displayName =\r\n  DropdownMenuPrimitive.CheckboxItem.displayName\r\n\r\nconst DropdownMenuRadioItem = React.forwardRef<\r\n  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,\r\n  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>\r\n>(({ className, children, ...props }, ref) => (\r\n  <DropdownMenuPrimitive.RadioItem\r\n    ref={ref}\r\n    className={cn(\r\n      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",\r\n      className\r\n    )}\r\n    {...props}\r\n  >\r\n    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">\r\n      <DropdownMenuPrimitive.ItemIndicator>\r\n        <Circle className="h-2 w-2 fill-current" />\r\n      </DropdownMenuPrimitive.ItemIndicator>\r\n    </span>\r\n    {children}\r\n  </DropdownMenuPrimitive.RadioItem>\r\n))\r\nDropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName\r\n\r\nconst DropdownMenuLabel = React.forwardRef<\r\n  React.ElementRef<typeof DropdownMenuPrimitive.Label>,\r\n  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {\r\n    inset?: boolean\r\n  }\r\n>(({ className, inset, ...props }, ref) => (\r\n  <DropdownMenuPrimitive.Label\r\n    ref={ref}\r\n    className={cn(\r\n      "px-2 py-1.5 text-sm font-semibold",\r\n      inset && "pl-8",\r\n      className\r\n    )}\r\n    {...props}\r\n  />\r\n))\r\nDropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName\r\n\r\nconst DropdownMenuSeparator = React.forwardRef<\r\n  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,\r\n  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>\r\n>(({ className, ...props }, ref) => (\r\n  <DropdownMenuPrimitive.Separator\r\n    ref={ref}\r\n    className={cn("-mx-1 my-1 h-px bg-muted", className)}\r\n    {...props}\r\n  />\r\n))\r\nDropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName\r\n\r\nconst DropdownMenuShortcut = ({\r\n  className,\r\n  ...props\r\n}: React.HTMLAttributes<HTMLSpanElement>) => {\r\n  return (\r\n    <span\r\n      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}\r\n      {...props}\r\n    />\r\n  )\r\n}\r\nDropdownMenuShortcut.displayName = "DropdownMenuShortcut"\r\n\r\nexport {\r\n  DropdownMenu,\r\n  DropdownMenuTrigger,\r\n  DropdownMenuContent,\r\n  DropdownMenuItem,\r\n  DropdownMenuCheckboxItem,\r\n  DropdownMenuRadioItem,\r\n  DropdownMenuLabel,\r\n  DropdownMenuSeparator,\r\n  DropdownMenuShortcut,\r\n  DropdownMenuGroup,\r\n  DropdownMenuPortal,\r\n  DropdownMenuSub,\r\n  DropdownMenuSubContent,\r\n  DropdownMenuSubTrigger,\r\n  DropdownMenuRadioGroup,\r\n}\r\n',
  '/src/components/ui/form.tsx':
    '"use client"\r\n\r\nimport * as React from "react"\r\nimport * as LabelPrimitive from "@radix-ui/react-label"\r\nimport { Slot } from "@radix-ui/react-slot"\r\nimport {\r\n  Controller,\r\n  FormProvider,\r\n  useFormContext,\r\n  type ControllerProps,\r\n  type FieldPath,\r\n  type FieldValues,\r\n} from "react-hook-form"\r\n\r\nimport { type ClassValue, clsx } from \'clsx\';\r\nimport { twMerge } from \'tailwind-merge\';\r\nfunction cn(...inputs: ClassValue[]) {\r\n  return twMerge(clsx(inputs));\r\n}\r\nimport { Label } from "./label"\r\n\r\nconst Form = FormProvider\r\n\r\ntype FormFieldContextValue<\r\n  TFieldValues extends FieldValues = FieldValues,\r\n  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>\r\n> = {\r\n  name: TName\r\n}\r\n\r\nconst FormFieldContext = React.createContext<FormFieldContextValue>(\r\n  {} as FormFieldContextValue\r\n)\r\n\r\nconst FormField = <\r\n  TFieldValues extends FieldValues = FieldValues,\r\n  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>\r\n>({\r\n  ...props\r\n}: ControllerProps<TFieldValues, TName>) => {\r\n  return (\r\n    <FormFieldContext.Provider value={{ name: props.name }}>\r\n      <Controller {...props} />\r\n    </FormFieldContext.Provider>\r\n  )\r\n}\r\n\r\nconst useFormField = () => {\r\n  const fieldContext = React.useContext(FormFieldContext)\r\n  const itemContext = React.useContext(FormItemContext)\r\n  const { getFieldState, formState } = useFormContext()\r\n\r\n  const fieldState = getFieldState(fieldContext.name, formState)\r\n\r\n  if (!fieldContext) {\r\n    throw new Error("useFormField should be used within <FormField>")\r\n  }\r\n\r\n  const { id } = itemContext\r\n\r\n  return {\r\n    id,\r\n    name: fieldContext.name,\r\n    formItemId: `${id}-form-item`,\r\n    formDescriptionId: `${id}-form-item-description`,\r\n    formMessageId: `${id}-form-item-message`,\r\n    ...fieldState,\r\n  }\r\n}\r\n\r\ntype FormItemContextValue = {\r\n  id: string\r\n}\r\n\r\nconst FormItemContext = React.createContext<FormItemContextValue>(\r\n  {} as FormItemContextValue\r\n)\r\n\r\nconst FormItem = React.forwardRef<\r\n  HTMLDivElement,\r\n  React.HTMLAttributes<HTMLDivElement>\r\n>(({ className, ...props }, ref) => {\r\n  const id = React.useId()\r\n\r\n  return (\r\n    <FormItemContext.Provider value={{ id }}>\r\n      <div ref={ref} className={cn("space-y-2", className)} {...props} />\r\n    </FormItemContext.Provider>\r\n  )\r\n})\r\nFormItem.displayName = "FormItem"\r\n\r\nconst FormLabel = React.forwardRef<\r\n  React.ElementRef<typeof LabelPrimitive.Root>,\r\n  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>\r\n>(({ className, ...props }, ref) => {\r\n  const { error, formItemId } = useFormField()\r\n\r\n  return (\r\n    <Label\r\n      ref={ref}\r\n      className={cn(error && "text-destructive", className)}\r\n      htmlFor={formItemId}\r\n      {...props}\r\n    />\r\n  )\r\n})\r\nFormLabel.displayName = "FormLabel"\r\n\r\nconst FormControl = React.forwardRef<\r\n  React.ElementRef<typeof Slot>,\r\n  React.ComponentPropsWithoutRef<typeof Slot>\r\n>(({ ...props }, ref) => {\r\n  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()\r\n\r\n  return (\r\n    <Slot\r\n      ref={ref}\r\n      id={formItemId}\r\n      aria-describedby={\r\n        !error\r\n          ? `${formDescriptionId}`\r\n          : `${formDescriptionId} ${formMessageId}`\r\n      }\r\n      aria-invalid={!!error}\r\n      {...props}\r\n    />\r\n  )\r\n})\r\nFormControl.displayName = "FormControl"\r\n\r\nconst FormDescription = React.forwardRef<\r\n  HTMLParagraphElement,\r\n  React.HTMLAttributes<HTMLParagraphElement>\r\n>(({ className, ...props }, ref) => {\r\n  const { formDescriptionId } = useFormField()\r\n\r\n  return (\r\n    <p\r\n      ref={ref}\r\n      id={formDescriptionId}\r\n      className={cn("text-sm text-muted-foreground", className)}\r\n      {...props}\r\n    />\r\n  )\r\n})\r\nFormDescription.displayName = "FormDescription"\r\n\r\nconst FormMessage = React.forwardRef<\r\n  HTMLParagraphElement,\r\n  React.HTMLAttributes<HTMLParagraphElement>\r\n>(({ className, children, ...props }, ref) => {\r\n  const { error, formMessageId } = useFormField()\r\n  const body = error ? String(error?.message ?? "") : children\r\n\r\n  if (!body) {\r\n    return null\r\n  }\r\n\r\n  return (\r\n    <p\r\n      ref={ref}\r\n      id={formMessageId}\r\n      className={cn("text-sm font-medium text-destructive", className)}\r\n      {...props}\r\n    >\r\n      {body}\r\n    </p>\r\n  )\r\n})\r\nFormMessage.displayName = "FormMessage"\r\n\r\nexport {\r\n  useFormField,\r\n  Form,\r\n  FormItem,\r\n  FormLabel,\r\n  FormControl,\r\n  FormDescription,\r\n  FormMessage,\r\n  FormField,\r\n}\r\n',
  '/src/components/ui/hover-card.tsx':
    '"use client"\r\n\r\nimport * as React from "react"\r\nimport * as HoverCardPrimitive from "@radix-ui/react-hover-card"\r\n\r\nimport { type ClassValue, clsx } from \'clsx\';\r\nimport { twMerge } from \'tailwind-merge\';\r\nfunction cn(...inputs: ClassValue[]) {\r\n  return twMerge(clsx(inputs));\r\n}\r\n\r\nconst HoverCard = HoverCardPrimitive.Root\r\n\r\nconst HoverCardTrigger = HoverCardPrimitive.Trigger\r\n\r\nconst HoverCardContent = React.forwardRef<\r\n  React.ElementRef<typeof HoverCardPrimitive.Content>,\r\n  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>\r\n>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (\r\n  <HoverCardPrimitive.Content\r\n    ref={ref}\r\n    align={align}\r\n    sideOffset={sideOffset}\r\n    className={cn(\r\n      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-hover-card-content-transform-origin]",\r\n      className\r\n    )}\r\n    {...props}\r\n  />\r\n))\r\nHoverCardContent.displayName = HoverCardPrimitive.Content.displayName\r\n\r\nexport { HoverCard, HoverCardTrigger, HoverCardContent }\r\n',
  '/src/components/ui/input-otp.tsx':
    '"use client"\r\n\r\nimport * as React from "react"\r\nimport { OTPInput, OTPInputContext } from "input-otp"\r\nimport { Dot } from "lucide-react"\r\n\r\nimport { type ClassValue, clsx } from \'clsx\';\r\nimport { twMerge } from \'tailwind-merge\';\r\nfunction cn(...inputs: ClassValue[]) {\r\n  return twMerge(clsx(inputs));\r\n}\r\n\r\nconst InputOTP = React.forwardRef<\r\n  React.ElementRef<typeof OTPInput>,\r\n  React.ComponentPropsWithoutRef<typeof OTPInput>\r\n>(({ className, containerClassName, ...props }, ref) => (\r\n  <OTPInput\r\n    ref={ref}\r\n    containerClassName={cn(\r\n      "flex items-center gap-2 has-[:disabled]:opacity-50",\r\n      containerClassName\r\n    )}\r\n    className={cn("disabled:cursor-not-allowed", className)}\r\n    {...props}\r\n  />\r\n))\r\nInputOTP.displayName = "InputOTP"\r\n\r\nconst InputOTPGroup = React.forwardRef<\r\n  React.ElementRef<"div">,\r\n  React.ComponentPropsWithoutRef<"div">\r\n>(({ className, ...props }, ref) => (\r\n  <div ref={ref} className={cn("flex items-center", className)} {...props} />\r\n))\r\nInputOTPGroup.displayName = "InputOTPGroup"\r\n\r\nconst InputOTPSlot = React.forwardRef<\r\n  React.ElementRef<"div">,\r\n  React.ComponentPropsWithoutRef<"div"> & { index: number }\r\n>(({ index, className, ...props }, ref) => {\r\n  const inputOTPContext = React.useContext(OTPInputContext)\r\n  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]\r\n\r\n  return (\r\n    <div\r\n      ref={ref}\r\n      className={cn(\r\n        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",\r\n        isActive && "z-10 ring-2 ring-ring ring-offset-background",\r\n        className\r\n      )}\r\n      {...props}\r\n    >\r\n      {char}\r\n      {hasFakeCaret && (\r\n        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">\r\n          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />\r\n        </div>\r\n      )}\r\n    </div>\r\n  )\r\n})\r\nInputOTPSlot.displayName = "InputOTPSlot"\r\n\r\nconst InputOTPSeparator = React.forwardRef<\r\n  React.ElementRef<"div">,\r\n  React.ComponentPropsWithoutRef<"div">\r\n>(({ ...props }, ref) => (\r\n  <div ref={ref} role="separator" {...props}>\r\n    <Dot />\r\n  </div>\r\n))\r\nInputOTPSeparator.displayName = "InputOTPSeparator"\r\n\r\nexport { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }\r\n',
  '/src/components/ui/menubar.tsx':
    '"use client"\r\n\r\nimport * as React from "react"\r\nimport * as MenubarPrimitive from "@radix-ui/react-menubar"\r\nimport { Check, ChevronRight, Circle } from "lucide-react"\r\n\r\nimport { type ClassValue, clsx } from \'clsx\';\r\nimport { twMerge } from \'tailwind-merge\';\r\nfunction cn(...inputs: ClassValue[]) {\r\n  return twMerge(clsx(inputs));\r\n}\r\n\r\nfunction MenubarMenu({\r\n  ...props\r\n}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {\r\n  return <MenubarPrimitive.Menu {...props} />\r\n}\r\n\r\nfunction MenubarGroup({\r\n  ...props\r\n}: React.ComponentProps<typeof MenubarPrimitive.Group>) {\r\n  return <MenubarPrimitive.Group {...props} />\r\n}\r\n\r\nfunction MenubarPortal({\r\n  ...props\r\n}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {\r\n  return <MenubarPrimitive.Portal {...props} />\r\n}\r\n\r\nfunction MenubarRadioGroup({\r\n  ...props\r\n}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {\r\n  return <MenubarPrimitive.RadioGroup {...props} />\r\n}\r\n\r\nfunction MenubarSub({\r\n  ...props\r\n}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {\r\n  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />\r\n}\r\n\r\nconst Menubar = React.forwardRef<\r\n  React.ElementRef<typeof MenubarPrimitive.Root>,\r\n  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>\r\n>(({ className, ...props }, ref) => (\r\n  <MenubarPrimitive.Root\r\n    ref={ref}\r\n    className={cn(\r\n      "flex h-10 items-center space-x-1 rounded-md border bg-background p-1",\r\n      className\r\n    )}\r\n    {...props}\r\n  />\r\n))\r\nMenubar.displayName = MenubarPrimitive.Root.displayName\r\n\r\nconst MenubarTrigger = React.forwardRef<\r\n  React.ElementRef<typeof MenubarPrimitive.Trigger>,\r\n  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>\r\n>(({ className, ...props }, ref) => (\r\n  <MenubarPrimitive.Trigger\r\n    ref={ref}\r\n    className={cn(\r\n      "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",\r\n      className\r\n    )}\r\n    {...props}\r\n  />\r\n))\r\nMenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName\r\n\r\nconst MenubarSubTrigger = React.forwardRef<\r\n  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,\r\n  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {\r\n    inset?: boolean\r\n  }\r\n>(({ className, inset, children, ...props }, ref) => (\r\n  <MenubarPrimitive.SubTrigger\r\n    ref={ref}\r\n    className={cn(\r\n      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",\r\n      inset && "pl-8",\r\n      className\r\n    )}\r\n    {...props}\r\n  >\r\n    {children}\r\n    <ChevronRight className="ml-auto h-4 w-4" />\r\n  </MenubarPrimitive.SubTrigger>\r\n))\r\nMenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName\r\n\r\nconst MenubarSubContent = React.forwardRef<\r\n  React.ElementRef<typeof MenubarPrimitive.SubContent>,\r\n  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>\r\n>(({ className, ...props }, ref) => (\r\n  <MenubarPrimitive.SubContent\r\n    ref={ref}\r\n    className={cn(\r\n      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-menubar-content-transform-origin]",\r\n      className\r\n    )}\r\n    {...props}\r\n  />\r\n))\r\nMenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName\r\n\r\nconst MenubarContent = React.forwardRef<\r\n  React.ElementRef<typeof MenubarPrimitive.Content>,\r\n  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>\r\n>(\r\n  (\r\n    { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },\r\n    ref\r\n  ) => (\r\n    <MenubarPrimitive.Portal>\r\n      <MenubarPrimitive.Content\r\n        ref={ref}\r\n        align={align}\r\n        alignOffset={alignOffset}\r\n        sideOffset={sideOffset}\r\n        className={cn(\r\n          "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-menubar-content-transform-origin]",\r\n          className\r\n        )}\r\n        {...props}\r\n      />\r\n    </MenubarPrimitive.Portal>\r\n  )\r\n)\r\nMenubarContent.displayName = MenubarPrimitive.Content.displayName\r\n\r\nconst MenubarItem = React.forwardRef<\r\n  React.ElementRef<typeof MenubarPrimitive.Item>,\r\n  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {\r\n    inset?: boolean\r\n  }\r\n>(({ className, inset, ...props }, ref) => (\r\n  <MenubarPrimitive.Item\r\n    ref={ref}\r\n    className={cn(\r\n      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",\r\n      inset && "pl-8",\r\n      className\r\n    )}\r\n    {...props}\r\n  />\r\n))\r\nMenubarItem.displayName = MenubarPrimitive.Item.displayName\r\n\r\nconst MenubarCheckboxItem = React.forwardRef<\r\n  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,\r\n  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>\r\n>(({ className, children, checked, ...props }, ref) => (\r\n  <MenubarPrimitive.CheckboxItem\r\n    ref={ref}\r\n    className={cn(\r\n      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",\r\n      className\r\n    )}\r\n    checked={checked}\r\n    {...props}\r\n  >\r\n    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">\r\n      <MenubarPrimitive.ItemIndicator>\r\n        <Check className="h-4 w-4" />\r\n      </MenubarPrimitive.ItemIndicator>\r\n    </span>\r\n    {children}\r\n  </MenubarPrimitive.CheckboxItem>\r\n))\r\nMenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName\r\n\r\nconst MenubarRadioItem = React.forwardRef<\r\n  React.ElementRef<typeof MenubarPrimitive.RadioItem>,\r\n  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>\r\n>(({ className, children, ...props }, ref) => (\r\n  <MenubarPrimitive.RadioItem\r\n    ref={ref}\r\n    className={cn(\r\n      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",\r\n      className\r\n    )}\r\n    {...props}\r\n  >\r\n    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">\r\n      <MenubarPrimitive.ItemIndicator>\r\n        <Circle className="h-2 w-2 fill-current" />\r\n      </MenubarPrimitive.ItemIndicator>\r\n    </span>\r\n    {children}\r\n  </MenubarPrimitive.RadioItem>\r\n))\r\nMenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName\r\n\r\nconst MenubarLabel = React.forwardRef<\r\n  React.ElementRef<typeof MenubarPrimitive.Label>,\r\n  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {\r\n    inset?: boolean\r\n  }\r\n>(({ className, inset, ...props }, ref) => (\r\n  <MenubarPrimitive.Label\r\n    ref={ref}\r\n    className={cn(\r\n      "px-2 py-1.5 text-sm font-semibold",\r\n      inset && "pl-8",\r\n      className\r\n    )}\r\n    {...props}\r\n  />\r\n))\r\nMenubarLabel.displayName = MenubarPrimitive.Label.displayName\r\n\r\nconst MenubarSeparator = React.forwardRef<\r\n  React.ElementRef<typeof MenubarPrimitive.Separator>,\r\n  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>\r\n>(({ className, ...props }, ref) => (\r\n  <MenubarPrimitive.Separator\r\n    ref={ref}\r\n    className={cn("-mx-1 my-1 h-px bg-muted", className)}\r\n    {...props}\r\n  />\r\n))\r\nMenubarSeparator.displayName = MenubarPrimitive.Separator.displayName\r\n\r\nconst MenubarShortcut = ({\r\n  className,\r\n  ...props\r\n}: React.HTMLAttributes<HTMLSpanElement>) => {\r\n  return (\r\n    <span\r\n      className={cn(\r\n        "ml-auto text-xs tracking-widest text-muted-foreground",\r\n        className\r\n      )}\r\n      {...props}\r\n    />\r\n  )\r\n}\r\nMenubarShortcut.displayname = "MenubarShortcut"\r\n\r\nexport {\r\n  Menubar,\r\n  MenubarMenu,\r\n  MenubarTrigger,\r\n  MenubarContent,\r\n  MenubarItem,\r\n  MenubarSeparator,\r\n  MenubarLabel,\r\n  MenubarCheckboxItem,\r\n  MenubarRadioGroup,\r\n  MenubarRadioItem,\r\n  MenubarPortal,\r\n  MenubarSubContent,\r\n  MenubarSubTrigger,\r\n  MenubarGroup,\r\n  MenubarSub,\r\n  MenubarShortcut,\r\n}\r\n',
  '/src/components/ui/navigation-menu.tsx':
    'import * as React from "react"\r\nimport * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"\r\nimport { cva } from "class-variance-authority"\r\nimport { ChevronDown } from "lucide-react"\r\n\r\nimport { type ClassValue, clsx } from \'clsx\';\r\nimport { twMerge } from \'tailwind-merge\';\r\nfunction cn(...inputs: ClassValue[]) {\r\n  return twMerge(clsx(inputs));\r\n}\r\n\r\nconst NavigationMenu = React.forwardRef<\r\n  React.ElementRef<typeof NavigationMenuPrimitive.Root>,\r\n  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>\r\n>(({ className, children, ...props }, ref) => (\r\n  <NavigationMenuPrimitive.Root\r\n    ref={ref}\r\n    className={cn(\r\n      "relative z-10 flex max-w-max flex-1 items-center justify-center",\r\n      className\r\n    )}\r\n    {...props}\r\n  >\r\n    {children}\r\n    <NavigationMenuViewport />\r\n  </NavigationMenuPrimitive.Root>\r\n))\r\nNavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName\r\n\r\nconst NavigationMenuList = React.forwardRef<\r\n  React.ElementRef<typeof NavigationMenuPrimitive.List>,\r\n  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>\r\n>(({ className, ...props }, ref) => (\r\n  <NavigationMenuPrimitive.List\r\n    ref={ref}\r\n    className={cn(\r\n      "group flex flex-1 list-none items-center justify-center space-x-1",\r\n      className\r\n    )}\r\n    {...props}\r\n  />\r\n))\r\nNavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName\r\n\r\nconst NavigationMenuItem = NavigationMenuPrimitive.Item\r\n\r\nconst navigationMenuTriggerStyle = cva(\r\n  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-accent-foreground data-[state=open]:bg-accent/50 data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent"\r\n)\r\n\r\nconst NavigationMenuTrigger = React.forwardRef<\r\n  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,\r\n  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>\r\n>(({ className, children, ...props }, ref) => (\r\n  <NavigationMenuPrimitive.Trigger\r\n    ref={ref}\r\n    className={cn(navigationMenuTriggerStyle(), "group", className)}\r\n    {...props}\r\n  >\r\n    {children}{" "}\r\n    <ChevronDown\r\n      className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"\r\n      aria-hidden="true"\r\n    />\r\n  </NavigationMenuPrimitive.Trigger>\r\n))\r\nNavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName\r\n\r\nconst NavigationMenuContent = React.forwardRef<\r\n  React.ElementRef<typeof NavigationMenuPrimitive.Content>,\r\n  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>\r\n>(({ className, ...props }, ref) => (\r\n  <NavigationMenuPrimitive.Content\r\n    ref={ref}\r\n    className={cn(\r\n      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",\r\n      className\r\n    )}\r\n    {...props}\r\n  />\r\n))\r\nNavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName\r\n\r\nconst NavigationMenuLink = NavigationMenuPrimitive.Link\r\n\r\nconst NavigationMenuViewport = React.forwardRef<\r\n  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,\r\n  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>\r\n>(({ className, ...props }, ref) => (\r\n  <div className={cn("absolute left-0 top-full flex justify-center")}>\r\n    <NavigationMenuPrimitive.Viewport\r\n      className={cn(\r\n        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",\r\n        className\r\n      )}\r\n      ref={ref}\r\n      {...props}\r\n    />\r\n  </div>\r\n))\r\nNavigationMenuViewport.displayName =\r\n  NavigationMenuPrimitive.Viewport.displayName\r\n\r\nconst NavigationMenuIndicator = React.forwardRef<\r\n  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,\r\n  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>\r\n>(({ className, ...props }, ref) => (\r\n  <NavigationMenuPrimitive.Indicator\r\n    ref={ref}\r\n    className={cn(\r\n      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",\r\n      className\r\n    )}\r\n    {...props}\r\n  >\r\n    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />\r\n  </NavigationMenuPrimitive.Indicator>\r\n))\r\nNavigationMenuIndicator.displayName =\r\n  NavigationMenuPrimitive.Indicator.displayName\r\n\r\nexport {\r\n  navigationMenuTriggerStyle,\r\n  NavigationMenu,\r\n  NavigationMenuList,\r\n  NavigationMenuItem,\r\n  NavigationMenuContent,\r\n  NavigationMenuTrigger,\r\n  NavigationMenuLink,\r\n  NavigationMenuIndicator,\r\n  NavigationMenuViewport,\r\n}\r\n',
  '/src/components/ui/pagination.tsx':
    'import * as React from "react"\r\nimport { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"\r\n\r\nimport { type ClassValue, clsx } from \'clsx\';\r\nimport { twMerge } from \'tailwind-merge\';\r\nfunction cn(...inputs: ClassValue[]) {\r\n  return twMerge(clsx(inputs));\r\n}\r\nimport { ButtonProps, buttonVariants } from "./button"\r\n\r\nconst Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (\r\n  <nav\r\n    role="navigation"\r\n    aria-label="pagination"\r\n    className={cn("mx-auto flex w-full justify-center", className)}\r\n    {...props}\r\n  />\r\n)\r\nPagination.displayName = "Pagination"\r\n\r\nconst PaginationContent = React.forwardRef<\r\n  HTMLUListElement,\r\n  React.ComponentProps<"ul">\r\n>(({ className, ...props }, ref) => (\r\n  <ul\r\n    ref={ref}\r\n    className={cn("flex flex-row items-center gap-1", className)}\r\n    {...props}\r\n  />\r\n))\r\nPaginationContent.displayName = "PaginationContent"\r\n\r\nconst PaginationItem = React.forwardRef<\r\n  HTMLLIElement,\r\n  React.ComponentProps<"li">\r\n>(({ className, ...props }, ref) => (\r\n  <li ref={ref} className={cn("", className)} {...props} />\r\n))\r\nPaginationItem.displayName = "PaginationItem"\r\n\r\ntype PaginationLinkProps = {\r\n  isActive?: boolean\r\n} & Pick<ButtonProps, "size"> &\r\n  React.ComponentProps<"a">\r\n\r\nconst PaginationLink = ({\r\n  className,\r\n  isActive,\r\n  size = "icon",\r\n  ...props\r\n}: PaginationLinkProps) => (\r\n  <a\r\n    aria-current={isActive ? "page" : undefined}\r\n    className={cn(\r\n      buttonVariants({\r\n        variant: isActive ? "outline" : "ghost",\r\n        size,\r\n      }),\r\n      className\r\n    )}\r\n    {...props}\r\n  />\r\n)\r\nPaginationLink.displayName = "PaginationLink"\r\n\r\nconst PaginationPrevious = ({\r\n  className,\r\n  ...props\r\n}: React.ComponentProps<typeof PaginationLink>) => (\r\n  <PaginationLink\r\n    aria-label="Go to previous page"\r\n    size="default"\r\n    className={cn("gap-1 pl-2.5", className)}\r\n    {...props}\r\n  >\r\n    <ChevronLeft className="h-4 w-4" />\r\n    <span>Previous</span>\r\n  </PaginationLink>\r\n)\r\nPaginationPrevious.displayName = "PaginationPrevious"\r\n\r\nconst PaginationNext = ({\r\n  className,\r\n  ...props\r\n}: React.ComponentProps<typeof PaginationLink>) => (\r\n  <PaginationLink\r\n    aria-label="Go to next page"\r\n    size="default"\r\n    className={cn("gap-1 pr-2.5", className)}\r\n    {...props}\r\n  >\r\n    <span>Next</span>\r\n    <ChevronRight className="h-4 w-4" />\r\n  </PaginationLink>\r\n)\r\nPaginationNext.displayName = "PaginationNext"\r\n\r\nconst PaginationEllipsis = ({\r\n  className,\r\n  ...props\r\n}: React.ComponentProps<"span">) => (\r\n  <span\r\n    aria-hidden\r\n    className={cn("flex h-9 w-9 items-center justify-center", className)}\r\n    {...props}\r\n  >\r\n    <MoreHorizontal className="h-4 w-4" />\r\n    <span className="sr-only">More pages</span>\r\n  </span>\r\n)\r\nPaginationEllipsis.displayName = "PaginationEllipsis"\r\n\r\nexport {\r\n  Pagination,\r\n  PaginationContent,\r\n  PaginationEllipsis,\r\n  PaginationItem,\r\n  PaginationLink,\r\n  PaginationNext,\r\n  PaginationPrevious,\r\n}\r\n',
  '/src/components/ui/popover.tsx':
    '"use client"\r\n\r\nimport * as React from "react"\r\nimport * as PopoverPrimitive from "@radix-ui/react-popover"\r\n\r\nimport { type ClassValue, clsx } from \'clsx\';\r\nimport { twMerge } from \'tailwind-merge\';\r\nfunction cn(...inputs: ClassValue[]) {\r\n  return twMerge(clsx(inputs));\r\n}\r\n\r\nconst Popover = PopoverPrimitive.Root\r\n\r\nconst PopoverTrigger = PopoverPrimitive.Trigger\r\n\r\nconst PopoverContent = React.forwardRef<\r\n  React.ElementRef<typeof PopoverPrimitive.Content>,\r\n  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>\r\n>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (\r\n  <PopoverPrimitive.Portal>\r\n    <PopoverPrimitive.Content\r\n      ref={ref}\r\n      align={align}\r\n      sideOffset={sideOffset}\r\n      className={cn(\r\n        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-popover-content-transform-origin]",\r\n        className\r\n      )}\r\n      {...props}\r\n    />\r\n  </PopoverPrimitive.Portal>\r\n))\r\nPopoverContent.displayName = PopoverPrimitive.Content.displayName\r\n\r\nexport { Popover, PopoverTrigger, PopoverContent }\r\n',
  '/src/components/ui/progress.tsx':
    '"use client"\r\n\r\nimport * as React from "react"\r\nimport * as ProgressPrimitive from "@radix-ui/react-progress"\r\n\r\nimport { type ClassValue, clsx } from \'clsx\';\r\nimport { twMerge } from \'tailwind-merge\';\r\nfunction cn(...inputs: ClassValue[]) {\r\n  return twMerge(clsx(inputs));\r\n}\r\n\r\nconst Progress = React.forwardRef<\r\n  React.ElementRef<typeof ProgressPrimitive.Root>,\r\n  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>\r\n>(({ className, value, ...props }, ref) => (\r\n  <ProgressPrimitive.Root\r\n    ref={ref}\r\n    className={cn(\r\n      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",\r\n      className\r\n    )}\r\n    {...props}\r\n  >\r\n    <ProgressPrimitive.Indicator\r\n      className="h-full w-full flex-1 bg-primary transition-all"\r\n      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}\r\n    />\r\n  </ProgressPrimitive.Root>\r\n))\r\nProgress.displayName = ProgressPrimitive.Root.displayName\r\n\r\nexport { Progress }\r\n',
  '/src/components/ui/radio-group.tsx':
    '"use client"\r\n\r\nimport * as React from "react"\r\nimport * as RadioGroupPrimitive from "@radix-ui/react-radio-group"\r\nimport { Circle } from "lucide-react"\r\n\r\nimport { type ClassValue, clsx } from \'clsx\';\r\nimport { twMerge } from \'tailwind-merge\';\r\nfunction cn(...inputs: ClassValue[]) {\r\n  return twMerge(clsx(inputs));\r\n}\r\n\r\nconst RadioGroup = React.forwardRef<\r\n  React.ElementRef<typeof RadioGroupPrimitive.Root>,\r\n  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>\r\n>(({ className, ...props }, ref) => {\r\n  return (\r\n    <RadioGroupPrimitive.Root\r\n      className={cn("grid gap-2", className)}\r\n      {...props}\r\n      ref={ref}\r\n    />\r\n  )\r\n})\r\nRadioGroup.displayName = RadioGroupPrimitive.Root.displayName\r\n\r\nconst RadioGroupItem = React.forwardRef<\r\n  React.ElementRef<typeof RadioGroupPrimitive.Item>,\r\n  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>\r\n>(({ className, ...props }, ref) => {\r\n  return (\r\n    <RadioGroupPrimitive.Item\r\n      ref={ref}\r\n      className={cn(\r\n        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",\r\n        className\r\n      )}\r\n      {...props}\r\n    >\r\n      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">\r\n        <Circle className="h-2.5 w-2.5 fill-current text-current" />\r\n      </RadioGroupPrimitive.Indicator>\r\n    </RadioGroupPrimitive.Item>\r\n  )\r\n})\r\nRadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName\r\n\r\nexport { RadioGroup, RadioGroupItem }\r\n',
  '/src/components/ui/scroll-area.tsx':
    '"use client"\r\n\r\nimport * as React from "react"\r\nimport * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"\r\n\r\nimport { type ClassValue, clsx } from \'clsx\';\r\nimport { twMerge } from \'tailwind-merge\';\r\nfunction cn(...inputs: ClassValue[]) {\r\n  return twMerge(clsx(inputs));\r\n}\r\n\r\nconst ScrollArea = React.forwardRef<\r\n  React.ElementRef<typeof ScrollAreaPrimitive.Root>,\r\n  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>\r\n>(({ className, children, ...props }, ref) => (\r\n  <ScrollAreaPrimitive.Root\r\n    ref={ref}\r\n    className={cn("relative overflow-hidden", className)}\r\n    {...props}\r\n  >\r\n    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">\r\n      {children}\r\n    </ScrollAreaPrimitive.Viewport>\r\n    <ScrollBar />\r\n    <ScrollAreaPrimitive.Corner />\r\n  </ScrollAreaPrimitive.Root>\r\n))\r\nScrollArea.displayName = ScrollAreaPrimitive.Root.displayName\r\n\r\nconst ScrollBar = React.forwardRef<\r\n  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,\r\n  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>\r\n>(({ className, orientation = "vertical", ...props }, ref) => (\r\n  <ScrollAreaPrimitive.ScrollAreaScrollbar\r\n    ref={ref}\r\n    orientation={orientation}\r\n    className={cn(\r\n      "flex touch-none select-none transition-colors",\r\n      orientation === "vertical" &&\r\n        "h-full w-2.5 border-l border-l-transparent p-[1px]",\r\n      orientation === "horizontal" &&\r\n        "h-2.5 flex-col border-t border-t-transparent p-[1px]",\r\n      className\r\n    )}\r\n    {...props}\r\n  >\r\n    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />\r\n  </ScrollAreaPrimitive.ScrollAreaScrollbar>\r\n))\r\nScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName\r\n\r\nexport { ScrollArea, ScrollBar }\r\n',
  '/src/components/ui/select.tsx':
    '"use client"\r\n\r\nimport * as React from "react"\r\nimport * as SelectPrimitive from "@radix-ui/react-select"\r\nimport { Check, ChevronDown, ChevronUp } from "lucide-react"\r\n\r\nimport { type ClassValue, clsx } from \'clsx\';\r\nimport { twMerge } from \'tailwind-merge\';\r\nfunction cn(...inputs: ClassValue[]) {\r\n  return twMerge(clsx(inputs));\r\n}\r\n\r\nconst Select = SelectPrimitive.Root\r\n\r\nconst SelectGroup = SelectPrimitive.Group\r\n\r\nconst SelectValue = SelectPrimitive.Value\r\n\r\nconst SelectTrigger = React.forwardRef<\r\n  React.ElementRef<typeof SelectPrimitive.Trigger>,\r\n  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>\r\n>(({ className, children, ...props }, ref) => (\r\n  <SelectPrimitive.Trigger\r\n    ref={ref}\r\n    className={cn(\r\n      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",\r\n      className\r\n    )}\r\n    {...props}\r\n  >\r\n    {children}\r\n    <SelectPrimitive.Icon asChild>\r\n      <ChevronDown className="h-4 w-4 opacity-50" />\r\n    </SelectPrimitive.Icon>\r\n  </SelectPrimitive.Trigger>\r\n))\r\nSelectTrigger.displayName = SelectPrimitive.Trigger.displayName\r\n\r\nconst SelectScrollUpButton = React.forwardRef<\r\n  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,\r\n  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>\r\n>(({ className, ...props }, ref) => (\r\n  <SelectPrimitive.ScrollUpButton\r\n    ref={ref}\r\n    className={cn(\r\n      "flex cursor-default items-center justify-center py-1",\r\n      className\r\n    )}\r\n    {...props}\r\n  >\r\n    <ChevronUp className="h-4 w-4" />\r\n  </SelectPrimitive.ScrollUpButton>\r\n))\r\nSelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName\r\n\r\nconst SelectScrollDownButton = React.forwardRef<\r\n  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,\r\n  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>\r\n>(({ className, ...props }, ref) => (\r\n  <SelectPrimitive.ScrollDownButton\r\n    ref={ref}\r\n    className={cn(\r\n      "flex cursor-default items-center justify-center py-1",\r\n      className\r\n    )}\r\n    {...props}\r\n  >\r\n    <ChevronDown className="h-4 w-4" />\r\n  </SelectPrimitive.ScrollDownButton>\r\n))\r\nSelectScrollDownButton.displayName =\r\n  SelectPrimitive.ScrollDownButton.displayName\r\n\r\nconst SelectContent = React.forwardRef<\r\n  React.ElementRef<typeof SelectPrimitive.Content>,\r\n  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>\r\n>(({ className, children, position = "popper", ...props }, ref) => (\r\n  <SelectPrimitive.Portal>\r\n    <SelectPrimitive.Content\r\n      ref={ref}\r\n      className={cn(\r\n        "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]",\r\n        position === "popper" &&\r\n          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",\r\n        className\r\n      )}\r\n      position={position}\r\n      {...props}\r\n    >\r\n      <SelectScrollUpButton />\r\n      <SelectPrimitive.Viewport\r\n        className={cn(\r\n          "p-1",\r\n          position === "popper" &&\r\n            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"\r\n        )}\r\n      >\r\n        {children}\r\n      </SelectPrimitive.Viewport>\r\n      <SelectScrollDownButton />\r\n    </SelectPrimitive.Content>\r\n  </SelectPrimitive.Portal>\r\n))\r\nSelectContent.displayName = SelectPrimitive.Content.displayName\r\n\r\nconst SelectLabel = React.forwardRef<\r\n  React.ElementRef<typeof SelectPrimitive.Label>,\r\n  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>\r\n>(({ className, ...props }, ref) => (\r\n  <SelectPrimitive.Label\r\n    ref={ref}\r\n    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}\r\n    {...props}\r\n  />\r\n))\r\nSelectLabel.displayName = SelectPrimitive.Label.displayName\r\n\r\nconst SelectItem = React.forwardRef<\r\n  React.ElementRef<typeof SelectPrimitive.Item>,\r\n  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>\r\n>(({ className, children, ...props }, ref) => (\r\n  <SelectPrimitive.Item\r\n    ref={ref}\r\n    className={cn(\r\n      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",\r\n      className\r\n    )}\r\n    {...props}\r\n  >\r\n    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">\r\n      <SelectPrimitive.ItemIndicator>\r\n        <Check className="h-4 w-4" />\r\n      </SelectPrimitive.ItemIndicator>\r\n    </span>\r\n\r\n    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>\r\n  </SelectPrimitive.Item>\r\n))\r\nSelectItem.displayName = SelectPrimitive.Item.displayName\r\n\r\nconst SelectSeparator = React.forwardRef<\r\n  React.ElementRef<typeof SelectPrimitive.Separator>,\r\n  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>\r\n>(({ className, ...props }, ref) => (\r\n  <SelectPrimitive.Separator\r\n    ref={ref}\r\n    className={cn("-mx-1 my-1 h-px bg-muted", className)}\r\n    {...props}\r\n  />\r\n))\r\nSelectSeparator.displayName = SelectPrimitive.Separator.displayName\r\n\r\nexport {\r\n  Select,\r\n  SelectGroup,\r\n  SelectValue,\r\n  SelectTrigger,\r\n  SelectContent,\r\n  SelectLabel,\r\n  SelectItem,\r\n  SelectSeparator,\r\n  SelectScrollUpButton,\r\n  SelectScrollDownButton,\r\n}\r\n',
  '/src/components/ui/separator.tsx':
    '"use client"\r\n\r\nimport * as React from "react"\r\nimport * as SeparatorPrimitive from "@radix-ui/react-separator"\r\n\r\nimport { type ClassValue, clsx } from \'clsx\';\r\nimport { twMerge } from \'tailwind-merge\';\r\nfunction cn(...inputs: ClassValue[]) {\r\n  return twMerge(clsx(inputs));\r\n}\r\n\r\nconst Separator = React.forwardRef<\r\n  React.ElementRef<typeof SeparatorPrimitive.Root>,\r\n  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>\r\n>(\r\n  (\r\n    { className, orientation = "horizontal", decorative = true, ...props },\r\n    ref\r\n  ) => (\r\n    <SeparatorPrimitive.Root\r\n      ref={ref}\r\n      decorative={decorative}\r\n      orientation={orientation}\r\n      className={cn(\r\n        "shrink-0 bg-border",\r\n        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",\r\n        className\r\n      )}\r\n      {...props}\r\n    />\r\n  )\r\n)\r\nSeparator.displayName = SeparatorPrimitive.Root.displayName\r\n\r\nexport { Separator }\r\n',
  '/src/components/ui/sheet.tsx':
    '"use client"\r\n\r\nimport * as React from "react"\r\nimport * as SheetPrimitive from "@radix-ui/react-dialog"\r\nimport { cva, type VariantProps } from "class-variance-authority"\r\nimport { X } from "lucide-react"\r\n\r\nimport { type ClassValue, clsx } from \'clsx\';\r\nimport { twMerge } from \'tailwind-merge\';\r\nfunction cn(...inputs: ClassValue[]) {\r\n  return twMerge(clsx(inputs));\r\n}\r\n\r\nconst Sheet = SheetPrimitive.Root\r\n\r\nconst SheetTrigger = SheetPrimitive.Trigger\r\n\r\nconst SheetClose = SheetPrimitive.Close\r\n\r\nconst SheetPortal = SheetPrimitive.Portal\r\n\r\nconst SheetOverlay = React.forwardRef<\r\n  React.ElementRef<typeof SheetPrimitive.Overlay>,\r\n  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>\r\n>(({ className, ...props }, ref) => (\r\n  <SheetPrimitive.Overlay\r\n    className={cn(\r\n      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",\r\n      className\r\n    )}\r\n    {...props}\r\n    ref={ref}\r\n  />\r\n))\r\nSheetOverlay.displayName = SheetPrimitive.Overlay.displayName\r\n\r\nconst sheetVariants = cva(\r\n  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",\r\n  {\r\n    variants: {\r\n      side: {\r\n        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",\r\n        bottom:\r\n          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",\r\n        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",\r\n        right:\r\n          "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",\r\n      },\r\n    },\r\n    defaultVariants: {\r\n      side: "right",\r\n    },\r\n  }\r\n)\r\n\r\ninterface SheetContentProps\r\n  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,\r\n    VariantProps<typeof sheetVariants> {}\r\n\r\nconst SheetContent = React.forwardRef<\r\n  React.ElementRef<typeof SheetPrimitive.Content>,\r\n  SheetContentProps\r\n>(({ side = "right", className, children, ...props }, ref) => (\r\n  <SheetPortal>\r\n    <SheetOverlay />\r\n    <SheetPrimitive.Content\r\n      ref={ref}\r\n      className={cn(sheetVariants({ side }), className)}\r\n      {...props}\r\n    >\r\n      {children}\r\n      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">\r\n        <X className="h-4 w-4" />\r\n        <span className="sr-only">Close</span>\r\n      </SheetPrimitive.Close>\r\n    </SheetPrimitive.Content>\r\n  </SheetPortal>\r\n))\r\nSheetContent.displayName = SheetPrimitive.Content.displayName\r\n\r\nconst SheetHeader = ({\r\n  className,\r\n  ...props\r\n}: React.HTMLAttributes<HTMLDivElement>) => (\r\n  <div\r\n    className={cn(\r\n      "flex flex-col space-y-2 text-center sm:text-left",\r\n      className\r\n    )}\r\n    {...props}\r\n  />\r\n)\r\nSheetHeader.displayName = "SheetHeader"\r\n\r\nconst SheetFooter = ({\r\n  className,\r\n  ...props\r\n}: React.HTMLAttributes<HTMLDivElement>) => (\r\n  <div\r\n    className={cn(\r\n      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",\r\n      className\r\n    )}\r\n    {...props}\r\n  />\r\n)\r\nSheetFooter.displayName = "SheetFooter"\r\n\r\nconst SheetTitle = React.forwardRef<\r\n  React.ElementRef<typeof SheetPrimitive.Title>,\r\n  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>\r\n>(({ className, ...props }, ref) => (\r\n  <SheetPrimitive.Title\r\n    ref={ref}\r\n    className={cn("text-lg font-semibold text-foreground", className)}\r\n    {...props}\r\n  />\r\n))\r\nSheetTitle.displayName = SheetPrimitive.Title.displayName\r\n\r\nconst SheetDescription = React.forwardRef<\r\n  React.ElementRef<typeof SheetPrimitive.Description>,\r\n  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>\r\n>(({ className, ...props }, ref) => (\r\n  <SheetPrimitive.Description\r\n    ref={ref}\r\n    className={cn("text-sm text-muted-foreground", className)}\r\n    {...props}\r\n  />\r\n))\r\nSheetDescription.displayName = SheetPrimitive.Description.displayName\r\n\r\nexport {\r\n  Sheet,\r\n  SheetPortal,\r\n  SheetOverlay,\r\n  SheetTrigger,\r\n  SheetClose,\r\n  SheetContent,\r\n  SheetHeader,\r\n  SheetFooter,\r\n  SheetTitle,\r\n  SheetDescription,\r\n}\r\n',
  '/src/components/ui/sidebar.tsx':
    '"use client"\r\n\r\nimport * as React from "react"\r\nimport { Slot } from "@radix-ui/react-slot"\r\nimport { VariantProps, cva } from "class-variance-authority"\r\nimport { PanelLeft } from "lucide-react"\r\n\r\nimport { useIsMobile } from "../../hooks/use-mobile"\r\nimport { type ClassValue, clsx } from \'clsx\';\r\nimport { twMerge } from \'tailwind-merge\';\r\nfunction cn(...inputs: ClassValue[]) {\r\n  return twMerge(clsx(inputs));\r\n}\r\nimport { Button } from "./button"\r\nimport { Input } from "./input"\r\nimport { Separator } from "./separator"\r\nimport {\r\n  Sheet,\r\n  SheetContent,\r\n  SheetDescription,\r\n  SheetHeader,\r\n  SheetTitle,\r\n} from "./sheet"\r\nimport { Skeleton } from "./skeleton"\r\nimport {\r\n  Tooltip,\r\n  TooltipContent,\r\n  TooltipProvider,\r\n  TooltipTrigger,\r\n} from "./tooltip"\r\n\r\nconst SIDEBAR_COOKIE_NAME = "sidebar_state"\r\nconst SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7\r\nconst SIDEBAR_WIDTH = "16rem"\r\nconst SIDEBAR_WIDTH_MOBILE = "18rem"\r\nconst SIDEBAR_WIDTH_ICON = "3rem"\r\nconst SIDEBAR_KEYBOARD_SHORTCUT = "b"\r\n\r\ntype SidebarContextProps = {\r\n  state: "expanded" | "collapsed"\r\n  open: boolean\r\n  setOpen: (open: boolean) => void\r\n  openMobile: boolean\r\n  setOpenMobile: (open: boolean) => void\r\n  isMobile: boolean\r\n  toggleSidebar: () => void\r\n}\r\n\r\nconst SidebarContext = React.createContext<SidebarContextProps | null>(null)\r\n\r\nfunction useSidebar() {\r\n  const context = React.useContext(SidebarContext)\r\n  if (!context) {\r\n    throw new Error("useSidebar must be used within a SidebarProvider.")\r\n  }\r\n\r\n  return context\r\n}\r\n\r\nconst SidebarProvider = React.forwardRef<\r\n  HTMLDivElement,\r\n  React.ComponentProps<"div"> & {\r\n    defaultOpen?: boolean\r\n    open?: boolean\r\n    onOpenChange?: (open: boolean) => void\r\n  }\r\n>(\r\n  (\r\n    {\r\n      defaultOpen = true,\r\n      open: openProp,\r\n      onOpenChange: setOpenProp,\r\n      className,\r\n      style,\r\n      children,\r\n      ...props\r\n    },\r\n    ref\r\n  ) => {\r\n    const isMobile = useIsMobile()\r\n    const [openMobile, setOpenMobile] = React.useState(false)\r\n\r\n    // This is the internal state of the sidebar.\r\n    // We use openProp and setOpenProp for control from outside the component.\r\n    const [_open, _setOpen] = React.useState(defaultOpen)\r\n    const open = openProp ?? _open\r\n    const setOpen = React.useCallback(\r\n      (value: boolean | ((value: boolean) => boolean)) => {\r\n        const openState = typeof value === "function" ? value(open) : value\r\n        if (setOpenProp) {\r\n          setOpenProp(openState)\r\n        } else {\r\n          _setOpen(openState)\r\n        }\r\n\r\n        // This sets the cookie to keep the sidebar state.\r\n        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`\r\n      },\r\n      [setOpenProp, open]\r\n    )\r\n\r\n    // Helper to toggle the sidebar.\r\n    const toggleSidebar = React.useCallback(() => {\r\n      return isMobile\r\n        ? setOpenMobile((open) => !open)\r\n        : setOpen((open) => !open)\r\n    }, [isMobile, setOpen, setOpenMobile])\r\n\r\n    // Adds a keyboard shortcut to toggle the sidebar.\r\n    React.useEffect(() => {\r\n      const handleKeyDown = (event: KeyboardEvent) => {\r\n        if (\r\n          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&\r\n          (event.metaKey || event.ctrlKey)\r\n        ) {\r\n          event.preventDefault()\r\n          toggleSidebar()\r\n        }\r\n      }\r\n\r\n      window.addEventListener("keydown", handleKeyDown)\r\n      return () => window.removeEventListener("keydown", handleKeyDown)\r\n    }, [toggleSidebar])\r\n\r\n    // We add a state so that we can do data-state="expanded" or "collapsed".\r\n    // This makes it easier to style the sidebar with Tailwind classes.\r\n    const state = open ? "expanded" : "collapsed"\r\n\r\n    const contextValue = React.useMemo<SidebarContextProps>(\r\n      () => ({\r\n        state,\r\n        open,\r\n        setOpen,\r\n        isMobile,\r\n        openMobile,\r\n        setOpenMobile,\r\n        toggleSidebar,\r\n      }),\r\n      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]\r\n    )\r\n\r\n    return (\r\n      <SidebarContext.Provider value={contextValue}>\r\n        <TooltipProvider delayDuration={0}>\r\n          <div\r\n            style={\r\n              {\r\n                "--sidebar-width": SIDEBAR_WIDTH,\r\n                "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,\r\n                ...style,\r\n              } as React.CSSProperties\r\n            }\r\n            className={cn(\r\n              "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",\r\n              className\r\n            )}\r\n            ref={ref}\r\n            {...props}\r\n          >\r\n            {children}\r\n          </div>\r\n        </TooltipProvider>\r\n      </SidebarContext.Provider>\r\n    )\r\n  }\r\n)\r\nSidebarProvider.displayName = "SidebarProvider"\r\n\r\nconst Sidebar = React.forwardRef<\r\n  HTMLDivElement,\r\n  React.ComponentProps<"div"> & {\r\n    side?: "left" | "right"\r\n    variant?: "sidebar" | "floating" | "inset"\r\n    collapsible?: "offcanvas" | "icon" | "none"\r\n  }\r\n>(\r\n  (\r\n    {\r\n      side = "left",\r\n      variant = "sidebar",\r\n      collapsible = "offcanvas",\r\n      className,\r\n      children,\r\n      ...props\r\n    },\r\n    ref\r\n  ) => {\r\n    const { isMobile, state, openMobile, setOpenMobile } = useSidebar()\r\n\r\n    if (collapsible === "none") {\r\n      return (\r\n        <div\r\n          className={cn(\r\n            "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",\r\n            className\r\n          )}\r\n          ref={ref}\r\n          {...props}\r\n        >\r\n          {children}\r\n        </div>\r\n      )\r\n    }\r\n\r\n    if (isMobile) {\r\n      return (\r\n        <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>\r\n          <SheetContent\r\n            data-sidebar="sidebar"\r\n            data-mobile="true"\r\n            className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"\r\n            style={\r\n              {\r\n                "--sidebar-width": SIDEBAR_WIDTH_MOBILE,\r\n              } as React.CSSProperties\r\n            }\r\n            side={side}\r\n          >\r\n            <SheetHeader className="sr-only">\r\n              <SheetTitle>Sidebar</SheetTitle>\r\n              <SheetDescription>Displays the mobile sidebar.</SheetDescription>\r\n            </SheetHeader>\r\n            <div className="flex h-full w-full flex-col">{children}</div>\r\n          </SheetContent>\r\n        </Sheet>\r\n      )\r\n    }\r\n\r\n    return (\r\n      <div\r\n        ref={ref}\r\n        className="group peer hidden text-sidebar-foreground md:block"\r\n        data-state={state}\r\n        data-collapsible={state === "collapsed" ? collapsible : ""}\r\n        data-variant={variant}\r\n        data-side={side}\r\n      >\r\n        {/* This is what handles the sidebar gap on desktop */}\r\n        <div\r\n          className={cn(\r\n            "relative w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear",\r\n            "group-data-[collapsible=offcanvas]:w-0",\r\n            "group-data-[side=right]:rotate-180",\r\n            variant === "floating" || variant === "inset"\r\n              ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"\r\n              : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]"\r\n          )}\r\n        />\r\n        <div\r\n          className={cn(\r\n            "fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear md:flex",\r\n            side === "left"\r\n              ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"\r\n              : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",\r\n            // Adjust the padding for floating and inset variants.\r\n            variant === "floating" || variant === "inset"\r\n              ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"\r\n              : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",\r\n            className\r\n          )}\r\n          {...props}\r\n        >\r\n          <div\r\n            data-sidebar="sidebar"\r\n            className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"\r\n          >\r\n            {children}\r\n          </div>\r\n        </div>\r\n      </div>\r\n    )\r\n  }\r\n)\r\nSidebar.displayName = "Sidebar"\r\n\r\nconst SidebarTrigger = React.forwardRef<\r\n  React.ElementRef<typeof Button>,\r\n  React.ComponentProps<typeof Button>\r\n>(({ className, onClick, ...props }, ref) => {\r\n  const { toggleSidebar } = useSidebar()\r\n\r\n  return (\r\n    <Button\r\n      ref={ref}\r\n      data-sidebar="trigger"\r\n      variant="ghost"\r\n      size="icon"\r\n      className={cn("h-7 w-7", className)}\r\n      onClick={(event) => {\r\n        onClick?.(event)\r\n        toggleSidebar()\r\n      }}\r\n      {...props}\r\n    >\r\n      <PanelLeft />\r\n      <span className="sr-only">Toggle Sidebar</span>\r\n    </Button>\r\n  )\r\n})\r\nSidebarTrigger.displayName = "SidebarTrigger"\r\n\r\nconst SidebarRail = React.forwardRef<\r\n  HTMLButtonElement,\r\n  React.ComponentProps<"button">\r\n>(({ className, ...props }, ref) => {\r\n  const { toggleSidebar } = useSidebar()\r\n\r\n  return (\r\n    <button\r\n      ref={ref}\r\n      data-sidebar="rail"\r\n      aria-label="Toggle Sidebar"\r\n      tabIndex={-1}\r\n      onClick={toggleSidebar}\r\n      title="Toggle Sidebar"\r\n      className={cn(\r\n        "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",\r\n        "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",\r\n        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",\r\n        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar",\r\n        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",\r\n        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",\r\n        className\r\n      )}\r\n      {...props}\r\n    />\r\n  )\r\n})\r\nSidebarRail.displayName = "SidebarRail"\r\n\r\nconst SidebarInset = React.forwardRef<\r\n  HTMLDivElement,\r\n  React.ComponentProps<"main">\r\n>(({ className, ...props }, ref) => {\r\n  return (\r\n    <main\r\n      ref={ref}\r\n      className={cn(\r\n        "relative flex w-full flex-1 flex-col bg-background",\r\n        "md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",\r\n        className\r\n      )}\r\n      {...props}\r\n    />\r\n  )\r\n})\r\nSidebarInset.displayName = "SidebarInset"\r\n\r\nconst SidebarInput = React.forwardRef<\r\n  React.ElementRef<typeof Input>,\r\n  React.ComponentProps<typeof Input>\r\n>(({ className, ...props }, ref) => {\r\n  return (\r\n    <Input\r\n      ref={ref}\r\n      data-sidebar="input"\r\n      className={cn(\r\n        "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",\r\n        className\r\n      )}\r\n      {...props}\r\n    />\r\n  )\r\n})\r\nSidebarInput.displayName = "SidebarInput"\r\n\r\nconst SidebarHeader = React.forwardRef<\r\n  HTMLDivElement,\r\n  React.ComponentProps<"div">\r\n>(({ className, ...props }, ref) => {\r\n  return (\r\n    <div\r\n      ref={ref}\r\n      data-sidebar="header"\r\n      className={cn("flex flex-col gap-2 p-2", className)}\r\n      {...props}\r\n    />\r\n  )\r\n})\r\nSidebarHeader.displayName = "SidebarHeader"\r\n\r\nconst SidebarFooter = React.forwardRef<\r\n  HTMLDivElement,\r\n  React.ComponentProps<"div">\r\n>(({ className, ...props }, ref) => {\r\n  return (\r\n    <div\r\n      ref={ref}\r\n      data-sidebar="footer"\r\n      className={cn("flex flex-col gap-2 p-2", className)}\r\n      {...props}\r\n    />\r\n  )\r\n})\r\nSidebarFooter.displayName = "SidebarFooter"\r\n\r\nconst SidebarSeparator = React.forwardRef<\r\n  React.ElementRef<typeof Separator>,\r\n  React.ComponentProps<typeof Separator>\r\n>(({ className, ...props }, ref) => {\r\n  return (\r\n    <Separator\r\n      ref={ref}\r\n      data-sidebar="separator"\r\n      className={cn("mx-2 w-auto bg-sidebar-border", className)}\r\n      {...props}\r\n    />\r\n  )\r\n})\r\nSidebarSeparator.displayName = "SidebarSeparator"\r\n\r\nconst SidebarContent = React.forwardRef<\r\n  HTMLDivElement,\r\n  React.ComponentProps<"div">\r\n>(({ className, ...props }, ref) => {\r\n  return (\r\n    <div\r\n      ref={ref}\r\n      data-sidebar="content"\r\n      className={cn(\r\n        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",\r\n        className\r\n      )}\r\n      {...props}\r\n    />\r\n  )\r\n})\r\nSidebarContent.displayName = "SidebarContent"\r\n\r\nconst SidebarGroup = React.forwardRef<\r\n  HTMLDivElement,\r\n  React.ComponentProps<"div">\r\n>(({ className, ...props }, ref) => {\r\n  return (\r\n    <div\r\n      ref={ref}\r\n      data-sidebar="group"\r\n      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}\r\n      {...props}\r\n    />\r\n  )\r\n})\r\nSidebarGroup.displayName = "SidebarGroup"\r\n\r\nconst SidebarGroupLabel = React.forwardRef<\r\n  HTMLDivElement,\r\n  React.ComponentProps<"div"> & { asChild?: boolean }\r\n>(({ className, asChild = false, ...props }, ref) => {\r\n  const Comp = asChild ? Slot : "div"\r\n\r\n  return (\r\n    <Comp\r\n      ref={ref}\r\n      data-sidebar="group-label"\r\n      className={cn(\r\n        "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",\r\n        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",\r\n        className\r\n      )}\r\n      {...props}\r\n    />\r\n  )\r\n})\r\nSidebarGroupLabel.displayName = "SidebarGroupLabel"\r\n\r\nconst SidebarGroupAction = React.forwardRef<\r\n  HTMLButtonElement,\r\n  React.ComponentProps<"button"> & { asChild?: boolean }\r\n>(({ className, asChild = false, ...props }, ref) => {\r\n  const Comp = asChild ? Slot : "button"\r\n\r\n  return (\r\n    <Comp\r\n      ref={ref}\r\n      data-sidebar="group-action"\r\n      className={cn(\r\n        "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",\r\n        // Increases the hit area of the button on mobile.\r\n        "after:absolute after:-inset-2 after:md:hidden",\r\n        "group-data-[collapsible=icon]:hidden",\r\n        className\r\n      )}\r\n      {...props}\r\n    />\r\n  )\r\n})\r\nSidebarGroupAction.displayName = "SidebarGroupAction"\r\n\r\nconst SidebarGroupContent = React.forwardRef<\r\n  HTMLDivElement,\r\n  React.ComponentProps<"div">\r\n>(({ className, ...props }, ref) => (\r\n  <div\r\n    ref={ref}\r\n    data-sidebar="group-content"\r\n    className={cn("w-full text-sm", className)}\r\n    {...props}\r\n  />\r\n))\r\nSidebarGroupContent.displayName = "SidebarGroupContent"\r\n\r\nconst SidebarMenu = React.forwardRef<\r\n  HTMLUListElement,\r\n  React.ComponentProps<"ul">\r\n>(({ className, ...props }, ref) => (\r\n  <ul\r\n    ref={ref}\r\n    data-sidebar="menu"\r\n    className={cn("flex w-full min-w-0 flex-col gap-1", className)}\r\n    {...props}\r\n  />\r\n))\r\nSidebarMenu.displayName = "SidebarMenu"\r\n\r\nconst SidebarMenuItem = React.forwardRef<\r\n  HTMLLIElement,\r\n  React.ComponentProps<"li">\r\n>(({ className, ...props }, ref) => (\r\n  <li\r\n    ref={ref}\r\n    data-sidebar="menu-item"\r\n    className={cn("group/menu-item relative", className)}\r\n    {...props}\r\n  />\r\n))\r\nSidebarMenuItem.displayName = "SidebarMenuItem"\r\n\r\nconst sidebarMenuButtonVariants = cva(\r\n  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",\r\n  {\r\n    variants: {\r\n      variant: {\r\n        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",\r\n        outline:\r\n          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",\r\n      },\r\n      size: {\r\n        default: "h-8 text-sm",\r\n        sm: "h-7 text-xs",\r\n        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",\r\n      },\r\n    },\r\n    defaultVariants: {\r\n      variant: "default",\r\n      size: "default",\r\n    },\r\n  }\r\n)\r\n\r\nconst SidebarMenuButton = React.forwardRef<\r\n  HTMLButtonElement,\r\n  React.ComponentProps<"button"> & {\r\n    asChild?: boolean\r\n    isActive?: boolean\r\n    tooltip?: string | React.ComponentProps<typeof TooltipContent>\r\n  } & VariantProps<typeof sidebarMenuButtonVariants>\r\n>(\r\n  (\r\n    {\r\n      asChild = false,\r\n      isActive = false,\r\n      variant = "default",\r\n      size = "default",\r\n      tooltip,\r\n      className,\r\n      ...props\r\n    },\r\n    ref\r\n  ) => {\r\n    const Comp = asChild ? Slot : "button"\r\n    const { isMobile, state } = useSidebar()\r\n\r\n    const button = (\r\n      <Comp\r\n        ref={ref}\r\n        data-sidebar="menu-button"\r\n        data-size={size}\r\n        data-active={isActive}\r\n        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}\r\n        {...props}\r\n      />\r\n    )\r\n\r\n    if (!tooltip) {\r\n      return button\r\n    }\r\n\r\n    if (typeof tooltip === "string") {\r\n      tooltip = {\r\n        children: tooltip,\r\n      }\r\n    }\r\n\r\n    return (\r\n      <Tooltip>\r\n        <TooltipTrigger asChild>{button}</TooltipTrigger>\r\n        <TooltipContent\r\n          side="right"\r\n          align="center"\r\n          hidden={state !== "collapsed" || isMobile}\r\n          {...tooltip}\r\n        />\r\n      </Tooltip>\r\n    )\r\n  }\r\n)\r\nSidebarMenuButton.displayName = "SidebarMenuButton"\r\n\r\nconst SidebarMenuAction = React.forwardRef<\r\n  HTMLButtonElement,\r\n  React.ComponentProps<"button"> & {\r\n    asChild?: boolean\r\n    showOnHover?: boolean\r\n  }\r\n>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {\r\n  const Comp = asChild ? Slot : "button"\r\n\r\n  return (\r\n    <Comp\r\n      ref={ref}\r\n      data-sidebar="menu-action"\r\n      className={cn(\r\n        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",\r\n        // Increases the hit area of the button on mobile.\r\n        "after:absolute after:-inset-2 after:md:hidden",\r\n        "peer-data-[size=sm]/menu-button:top-1",\r\n        "peer-data-[size=default]/menu-button:top-1.5",\r\n        "peer-data-[size=lg]/menu-button:top-2.5",\r\n        "group-data-[collapsible=icon]:hidden",\r\n        showOnHover &&\r\n          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",\r\n        className\r\n      )}\r\n      {...props}\r\n    />\r\n  )\r\n})\r\nSidebarMenuAction.displayName = "SidebarMenuAction"\r\n\r\nconst SidebarMenuBadge = React.forwardRef<\r\n  HTMLDivElement,\r\n  React.ComponentProps<"div">\r\n>(({ className, ...props }, ref) => (\r\n  <div\r\n    ref={ref}\r\n    data-sidebar="menu-badge"\r\n    className={cn(\r\n      "pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground",\r\n      "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",\r\n      "peer-data-[size=sm]/menu-button:top-1",\r\n      "peer-data-[size=default]/menu-button:top-1.5",\r\n      "peer-data-[size=lg]/menu-button:top-2.5",\r\n      "group-data-[collapsible=icon]:hidden",\r\n      className\r\n    )}\r\n    {...props}\r\n  />\r\n))\r\nSidebarMenuBadge.displayName = "SidebarMenuBadge"\r\n\r\nconst SidebarMenuSkeleton = React.forwardRef<\r\n  HTMLDivElement,\r\n  React.ComponentProps<"div"> & {\r\n    showIcon?: boolean\r\n  }\r\n>(({ className, showIcon = false, ...props }, ref) => {\r\n  // Random width between 50 to 90%.\r\n  const width = React.useMemo(() => {\r\n    return `${Math.floor(Math.random() * 40) + 50}%`\r\n  }, [])\r\n\r\n  return (\r\n    <div\r\n      ref={ref}\r\n      data-sidebar="menu-skeleton"\r\n      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}\r\n      {...props}\r\n    >\r\n      {showIcon && (\r\n        <Skeleton\r\n          className="size-4 rounded-md"\r\n          data-sidebar="menu-skeleton-icon"\r\n        />\r\n      )}\r\n      <Skeleton\r\n        className="h-4 max-w-[--skeleton-width] flex-1"\r\n        data-sidebar="menu-skeleton-text"\r\n        style={\r\n          {\r\n            "--skeleton-width": width,\r\n          } as React.CSSProperties\r\n        }\r\n      />\r\n    </div>\r\n  )\r\n})\r\nSidebarMenuSkeleton.displayName = "SidebarMenuSkeleton"\r\n\r\nconst SidebarMenuSub = React.forwardRef<\r\n  HTMLUListElement,\r\n  React.ComponentProps<"ul">\r\n>(({ className, ...props }, ref) => (\r\n  <ul\r\n    ref={ref}\r\n    data-sidebar="menu-sub"\r\n    className={cn(\r\n      "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",\r\n      "group-data-[collapsible=icon]:hidden",\r\n      className\r\n    )}\r\n    {...props}\r\n  />\r\n))\r\nSidebarMenuSub.displayName = "SidebarMenuSub"\r\n\r\nconst SidebarMenuSubItem = React.forwardRef<\r\n  HTMLLIElement,\r\n  React.ComponentProps<"li">\r\n>(({ ...props }, ref) => <li ref={ref} {...props} />)\r\nSidebarMenuSubItem.displayName = "SidebarMenuSubItem"\r\n\r\nconst SidebarMenuSubButton = React.forwardRef<\r\n  HTMLAnchorElement,\r\n  React.ComponentProps<"a"> & {\r\n    asChild?: boolean\r\n    size?: "sm" | "md"\r\n    isActive?: boolean\r\n  }\r\n>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {\r\n  const Comp = asChild ? Slot : "a"\r\n\r\n  return (\r\n    <Comp\r\n      ref={ref}\r\n      data-sidebar="menu-sub-button"\r\n      data-size={size}\r\n      data-active={isActive}\r\n      className={cn(\r\n        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",\r\n        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",\r\n        size === "sm" && "text-xs",\r\n        size === "md" && "text-sm",\r\n        "group-data-[collapsible=icon]:hidden",\r\n        className\r\n      )}\r\n      {...props}\r\n    />\r\n  )\r\n})\r\nSidebarMenuSubButton.displayName = "SidebarMenuSubButton"\r\n\r\nexport {\r\n  Sidebar,\r\n  SidebarContent,\r\n  SidebarFooter,\r\n  SidebarGroup,\r\n  SidebarGroupAction,\r\n  SidebarGroupContent,\r\n  SidebarGroupLabel,\r\n  SidebarHeader,\r\n  SidebarInput,\r\n  SidebarInset,\r\n  SidebarMenu,\r\n  SidebarMenuAction,\r\n  SidebarMenuBadge,\r\n  SidebarMenuButton,\r\n  SidebarMenuItem,\r\n  SidebarMenuSkeleton,\r\n  SidebarMenuSub,\r\n  SidebarMenuSubButton,\r\n  SidebarMenuSubItem,\r\n  SidebarProvider,\r\n  SidebarRail,\r\n  SidebarSeparator,\r\n  SidebarTrigger,\r\n  useSidebar,\r\n}\r\n',
  '/src/components/ui/slider.tsx':
    '"use client"\r\n\r\nimport * as React from "react"\r\nimport * as SliderPrimitive from "@radix-ui/react-slider"\r\n\r\nimport { type ClassValue, clsx } from \'clsx\';\r\nimport { twMerge } from \'tailwind-merge\';\r\nfunction cn(...inputs: ClassValue[]) {\r\n  return twMerge(clsx(inputs));\r\n}\r\n\r\nconst Slider = React.forwardRef<\r\n  React.ElementRef<typeof SliderPrimitive.Root>,\r\n  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>\r\n>(({ className, ...props }, ref) => (\r\n  <SliderPrimitive.Root\r\n    ref={ref}\r\n    className={cn(\r\n      "relative flex w-full touch-none select-none items-center",\r\n      className\r\n    )}\r\n    {...props}\r\n  >\r\n    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">\r\n      <SliderPrimitive.Range className="absolute h-full bg-primary" />\r\n    </SliderPrimitive.Track>\r\n    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />\r\n  </SliderPrimitive.Root>\r\n))\r\nSlider.displayName = SliderPrimitive.Root.displayName\r\n\r\nexport { Slider }\r\n',
  '/src/components/ui/switch.tsx':
    '"use client"\r\n\r\nimport * as React from "react"\r\nimport * as SwitchPrimitives from "@radix-ui/react-switch"\r\n\r\nimport { type ClassValue, clsx } from \'clsx\';\r\nimport { twMerge } from \'tailwind-merge\';\r\nfunction cn(...inputs: ClassValue[]) {\r\n  return twMerge(clsx(inputs));\r\n}\r\n\r\nconst Switch = React.forwardRef<\r\n  React.ElementRef<typeof SwitchPrimitives.Root>,\r\n  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>\r\n>(({ className, ...props }, ref) => (\r\n  <SwitchPrimitives.Root\r\n    className={cn(\r\n      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",\r\n      className\r\n    )}\r\n    {...props}\r\n    ref={ref}\r\n  >\r\n    <SwitchPrimitives.Thumb\r\n      className={cn(\r\n        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"\r\n      )}\r\n    />\r\n  </SwitchPrimitives.Root>\r\n))\r\nSwitch.displayName = SwitchPrimitives.Root.displayName\r\n\r\nexport { Switch }\r\n',
  '/src/components/ui/table.tsx':
    'import * as React from "react"\r\n\r\nimport { type ClassValue, clsx } from \'clsx\';\r\nimport { twMerge } from \'tailwind-merge\';\r\nfunction cn(...inputs: ClassValue[]) {\r\n  return twMerge(clsx(inputs));\r\n}\r\n\r\nconst Table = React.forwardRef<\r\n  HTMLTableElement,\r\n  React.HTMLAttributes<HTMLTableElement>\r\n>(({ className, ...props }, ref) => (\r\n  <div className="relative w-full overflow-auto">\r\n    <table\r\n      ref={ref}\r\n      className={cn("w-full caption-bottom text-sm", className)}\r\n      {...props}\r\n    />\r\n  </div>\r\n))\r\nTable.displayName = "Table"\r\n\r\nconst TableHeader = React.forwardRef<\r\n  HTMLTableSectionElement,\r\n  React.HTMLAttributes<HTMLTableSectionElement>\r\n>(({ className, ...props }, ref) => (\r\n  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />\r\n))\r\nTableHeader.displayName = "TableHeader"\r\n\r\nconst TableBody = React.forwardRef<\r\n  HTMLTableSectionElement,\r\n  React.HTMLAttributes<HTMLTableSectionElement>\r\n>(({ className, ...props }, ref) => (\r\n  <tbody\r\n    ref={ref}\r\n    className={cn("[&_tr:last-child]:border-0", className)}\r\n    {...props}\r\n  />\r\n))\r\nTableBody.displayName = "TableBody"\r\n\r\nconst TableFooter = React.forwardRef<\r\n  HTMLTableSectionElement,\r\n  React.HTMLAttributes<HTMLTableSectionElement>\r\n>(({ className, ...props }, ref) => (\r\n  <tfoot\r\n    ref={ref}\r\n    className={cn(\r\n      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",\r\n      className\r\n    )}\r\n    {...props}\r\n  />\r\n))\r\nTableFooter.displayName = "TableFooter"\r\n\r\nconst TableRow = React.forwardRef<\r\n  HTMLTableRowElement,\r\n  React.HTMLAttributes<HTMLTableRowElement>\r\n>(({ className, ...props }, ref) => (\r\n  <tr\r\n    ref={ref}\r\n    className={cn(\r\n      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",\r\n      className\r\n    )}\r\n    {...props}\r\n  />\r\n))\r\nTableRow.displayName = "TableRow"\r\n\r\nconst TableHead = React.forwardRef<\r\n  HTMLTableCellElement,\r\n  React.ThHTMLAttributes<HTMLTableCellElement>\r\n>(({ className, ...props }, ref) => (\r\n  <th\r\n    ref={ref}\r\n    className={cn(\r\n      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",\r\n      className\r\n    )}\r\n    {...props}\r\n  />\r\n))\r\nTableHead.displayName = "TableHead"\r\n\r\nconst TableCell = React.forwardRef<\r\n  HTMLTableCellElement,\r\n  React.TdHTMLAttributes<HTMLTableCellElement>\r\n>(({ className, ...props }, ref) => (\r\n  <td\r\n    ref={ref}\r\n    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}\r\n    {...props}\r\n  />\r\n))\r\nTableCell.displayName = "TableCell"\r\n\r\nconst TableCaption = React.forwardRef<\r\n  HTMLTableCaptionElement,\r\n  React.HTMLAttributes<HTMLTableCaptionElement>\r\n>(({ className, ...props }, ref) => (\r\n  <caption\r\n    ref={ref}\r\n    className={cn("mt-4 text-sm text-muted-foreground", className)}\r\n    {...props}\r\n  />\r\n))\r\nTableCaption.displayName = "TableCaption"\r\n\r\nexport {\r\n  Table,\r\n  TableHeader,\r\n  TableBody,\r\n  TableFooter,\r\n  TableHead,\r\n  TableRow,\r\n  TableCell,\r\n  TableCaption,\r\n}\r\n',
  '/src/components/ui/toggle-group.tsx':
    '"use client"\r\n\r\nimport * as React from "react"\r\nimport * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"\r\nimport { type VariantProps } from "class-variance-authority"\r\n\r\nimport { type ClassValue, clsx } from \'clsx\';\r\nimport { twMerge } from \'tailwind-merge\';\r\nfunction cn(...inputs: ClassValue[]) {\r\n  return twMerge(clsx(inputs));\r\n}\r\nimport { toggleVariants } from "./toggle"\r\n\r\nconst ToggleGroupContext = React.createContext<\r\n  VariantProps<typeof toggleVariants>\r\n>({\r\n  size: "default",\r\n  variant: "default",\r\n})\r\n\r\nconst ToggleGroup = React.forwardRef<\r\n  React.ElementRef<typeof ToggleGroupPrimitive.Root>,\r\n  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &\r\n    VariantProps<typeof toggleVariants>\r\n>(({ className, variant, size, children, ...props }, ref) => (\r\n  <ToggleGroupPrimitive.Root\r\n    ref={ref}\r\n    className={cn("flex items-center justify-center gap-1", className)}\r\n    {...props}\r\n  >\r\n    <ToggleGroupContext.Provider value={{ variant, size }}>\r\n      {children}\r\n    </ToggleGroupContext.Provider>\r\n  </ToggleGroupPrimitive.Root>\r\n))\r\n\r\nToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName\r\n\r\nconst ToggleGroupItem = React.forwardRef<\r\n  React.ElementRef<typeof ToggleGroupPrimitive.Item>,\r\n  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &\r\n    VariantProps<typeof toggleVariants>\r\n>(({ className, children, variant, size, ...props }, ref) => {\r\n  const context = React.useContext(ToggleGroupContext)\r\n\r\n  return (\r\n    <ToggleGroupPrimitive.Item\r\n      ref={ref}\r\n      className={cn(\r\n        toggleVariants({\r\n          variant: context.variant || variant,\r\n          size: context.size || size,\r\n        }),\r\n        className\r\n      )}\r\n      {...props}\r\n    >\r\n      {children}\r\n    </ToggleGroupPrimitive.Item>\r\n  )\r\n})\r\n\r\nToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName\r\n\r\nexport { ToggleGroup, ToggleGroupItem }\r\n',
  '/src/components/ui/sonner.tsx': `'use client';\n\nimport { useTheme } from 'next-themes';\nimport { Toaster as Sonner, ToasterProps } from 'sonner';\n\nconst Toaster = ({ ...props }: ToasterProps) => {\n  const { theme = 'system' } = useTheme();\n\n  return (\n    <Sonner\n      theme={theme as ToasterProps['theme']}\n      className="toaster group"\n      style={\n        {\n          '--normal-bg': 'var(--popover)',\n          '--normal-text': 'var(--popover-foreground)',\n          '--normal-border': 'var(--border)',\n        } as React.CSSProperties\n      }\n      {...props}\n    />\n  );\n};\n\nexport { Toaster };\n`,
  '/src/components/ui/use-mobile.tsx':
    'import * as React from "react"; const MOBILE_BREAKPOINT = 768; export function useIsMobile() { const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined); React.useEffect(() => { const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`); const onChange = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT); mql.addEventListener("change", onChange); setIsMobile(window.innerWidth < MOBILE_BREAKPOINT); return () => mql.removeEventListener("change", onChange); }, []); return !!isMobile; }',
  '/src/hooks/use-mobile.tsx':
    'import * as React from "react"; const MOBILE_BREAKPOINT = 768; export function useIsMobile() { const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined); React.useEffect(() => { const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`); const onChange = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT); mql.addEventListener("change", onChange); setIsMobile(window.innerWidth < MOBILE_BREAKPOINT); return () => mql.removeEventListener("change", onChange); }, []); return !!isMobile; }',
  '/src/components/ui/card.tsx': `
  
  import * as React from "react"
  import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
  
  function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
  
  function Card({ className, ...props }: React.ComponentProps<"div">) {
    return (
      <div
        data-slot="card"
        className={cn(
          "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
          className
        )}
        {...props}
      />
    )
  }
  
  function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
    return (
      <div
        data-slot="card-header"
        className={cn(
          "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
          className
        )}
        {...props}
      />
    )
  }
  
  function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
    return (
      <div
        data-slot="card-title"
        className={cn("leading-none font-semibold", className)}
        {...props}
      />
    )
  }
  
  function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
    return (
      <div
        data-slot="card-description"
        className={cn("text-muted-foreground text-sm", className)}
        {...props}
      />
    )
  }
  
  function CardAction({ className, ...props }: React.ComponentProps<"div">) {
    return (
      <div
        data-slot="card-action"
        className={cn(
          "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
          className
        )}
        {...props}
      />
    )
  }
  
  function CardContent({ className, ...props }: React.ComponentProps<"div">) {
    return (
      <div
        data-slot="card-content"
        className={cn("px-6", className)}
        {...props}
      />
    )
  }
  
  function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
    return (
      <div
        data-slot="card-footer"
        className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
        {...props}
      />
    )
  }
  
  export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardAction,
    CardDescription,
    CardContent,
  }
  
  `,

  '/src/components/ui/button.tsx': `
  import * as React from 'react';
  import { Slot } from '@radix-ui/react-slot';
  import { cva, type VariantProps } from 'class-variance-authority';
  
  import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
  
  function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
  
  const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
      variants: {
        variant: {
          default:
            'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
          destructive:
            'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
          outline:
            'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
          secondary:
            'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
          ghost:
            'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
          link: 'text-primary underline-offset-4 hover:underline',
        },
        size: {
          default: 'h-9 px-4 py-2 has-[>svg]:px-3',
          sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
          lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
          icon: 'size-9',
        },
      },
      defaultVariants: {
        variant: 'default',
        size: 'default',
      },
    }
  );
  
  function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
  }: React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    }) {
    const Comp = asChild ? Slot : 'button';
  
    return (
      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
  
  export { Button, buttonVariants };
    `,
  '/src/components/ui/dialog.tsx': `
    'use client';
  
  import * as React from 'react';
  import * as DialogPrimitive from '@radix-ui/react-dialog';
  import { XIcon } from 'lucide-react';
  
  import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
  
  function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
  
  function Dialog({
    ...props
  }: React.ComponentProps<typeof DialogPrimitive.Root>) {
    return <DialogPrimitive.Root data-slot="dialog" {...props} />;
  }
  
  function DialogTrigger({
    ...props
  }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
    return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
  }
  
  function DialogPortal({
    ...props
  }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
    return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
  }
  
  function DialogClose({
    ...props
  }: React.ComponentProps<typeof DialogPrimitive.Close>) {
    return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
  }
  
  function DialogOverlay({
    className,
    ...props
  }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
    return (
      <DialogPrimitive.Overlay
        data-slot="dialog-overlay"
        className={cn(
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
          className
        )}
        {...props}
      />
    );
  }
  
  function DialogContent({
    className,
    children,
    ...props
  }: React.ComponentProps<typeof DialogPrimitive.Content>) {
    return (
      <DialogPortal data-slot="dialog-portal">
        <DialogOverlay />
        <DialogPrimitive.Content
          data-slot="dialog-content"
          className={cn(
            'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
            className
          )}
          {...props}
        >
          {children}
          <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPortal>
    );
  }
  
  function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
    return (
      <div
        data-slot="dialog-header"
        className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
        {...props}
      />
    );
  }
  
  function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
    return (
      <div
        data-slot="dialog-footer"
        className={cn(
          'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
          className
        )}
        {...props}
      />
    );
  }
  
  function DialogTitle({
    className,
    ...props
  }: React.ComponentProps<typeof DialogPrimitive.Title>) {
    return (
      <DialogPrimitive.Title
        data-slot="dialog-title"
        className={cn('text-lg leading-none font-semibold', className)}
        {...props}
      />
    );
  }
  
  function DialogDescription({
    className,
    ...props
  }: React.ComponentProps<typeof DialogPrimitive.Description>) {
    return (
      <DialogPrimitive.Description
        data-slot="dialog-description"
        className={cn('text-muted-foreground text-sm', className)}
        {...props}
      />
    );
  }
  
  export {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
  };
  
    `,
  '/src/components/ui/label.tsx': `
  "use client"
  
  import * as React from "react"
  import * as LabelPrimitive from "@radix-ui/react-label"
  
  import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
  
  function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
  
  function Label({
    className,
    ...props
  }: React.ComponentProps<typeof LabelPrimitive.Root>) {
    return (
      <LabelPrimitive.Root
        data-slot="label"
        className={cn(
          "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
          className
        )}
        {...props}
      />
    )
  }
  
  export { Label }
    `,
  '/src/components/ui/skeleton.tsx': `
  import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
  
  function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
  
  function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
    return (
      <div
        data-slot="skeleton"
        className={cn('bg-accent animate-pulse rounded-md', className)}
        {...props}
      />
    );
  }
  
  export { Skeleton };
  
    `,
  '/src/components/ui/input.tsx': `
  import * as React from 'react';
  import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
  
  function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
  
  function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
    return (
      <input
        type={type}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          className
        )}
        {...props}
      />
    );
  }
  export { Input };
    `,
  '/src/components/ui/tooltip.tsx': `
  "use client"
  
  import * as React from "react"
  import * as TooltipPrimitive from "@radix-ui/react-tooltip"
  
  import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
  
  function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
  
  function TooltipProvider({
    delayDuration = 0,
    ...props
  }: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
    return (
      <TooltipPrimitive.Provider
        data-slot="tooltip-provider"
        delayDuration={delayDuration}
        {...props}
      />
    )
  }
  
  function Tooltip({
    ...props
  }: React.ComponentProps<typeof TooltipPrimitive.Root>) {
    return (
      <TooltipProvider>
        <TooltipPrimitive.Root data-slot="tooltip" {...props} />
      </TooltipProvider>
    )
  }
  
  function TooltipTrigger({
    ...props
  }: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
    return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
  }
  
  function TooltipContent({
    className,
    sideOffset = 0,
    children,
    ...props
  }: React.ComponentProps<typeof TooltipPrimitive.Content>) {
    return (
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          data-slot="tooltip-content"
          sideOffset={sideOffset}
          className={cn(
            "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
            className
          )}
          {...props}
        >
          {children}
          <TooltipPrimitive.Arrow className="bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    )
  }
  
  export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
  
    `,
  '/src/components/ui/toggle.tsx': `
  "use client"
  
  import * as React from "react"
  import * as TogglePrimitive from "@radix-ui/react-toggle"
  import { cva, type VariantProps } from "class-variance-authority"
  
  import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
  
  function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
  
  const toggleVariants = cva(
    "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
    {
      variants: {
        variant: {
          default: "bg-transparent",
          outline:
            "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
        },
        size: {
          default: "h-9 px-2 min-w-9",
          sm: "h-8 px-1.5 min-w-8",
          lg: "h-10 px-2.5 min-w-10",
        },
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    }
  )
  
  function Toggle({
    className,
    variant,
    size,
    ...props
  }: React.ComponentProps<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>) {
    return (
      <TogglePrimitive.Root
        data-slot="toggle"
        className={cn(toggleVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
  
  export { Toggle, toggleVariants }
    `,
};

export const REACT_TEMPLATE_FILES = {
  '/.gitignore': `
  # Logs
  logs
  *.log
  npm-debug.log*
  yarn-debug.log*
  yarn-error.log*
  pnpm-debug.log*
  lerna-debug.log*
  
  node_modules
  dist
  dist-ssr
  *.local
  
  # Editor directories and files
  .vscode
  !.vscode/extensions.json
  .idea
  .DS_Store
  *.suo
  *.ntvs*
  *.njsproj
  *.sln
  *.sw?
    `.trim(),
  '/eslint.config.js': `
  import js from '@eslint/js'
  import globals from 'globals'
  import reactHooks from 'eslint-plugin-react-hooks'
  import reactRefresh from 'eslint-plugin-react-refresh'
  import tseslint from 'typescript-eslint'
  
  export default tseslint.config(
    { ignores: ['dist'] },
    {
      extends: [js.configs.recommended, ...tseslint.configs.recommended],
      files: ['**/*.{ts,tsx}'],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
      },
      plugins: {
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
      },
      rules: {
        ...reactHooks.configs.recommended.rules,
        'react-refresh/only-export-components': [
          'warn',
          { allowConstantExport: true },
        ],
        "@typescript-eslint/no-unused-vars": "off",
      },
    },
  )
    `.trim(),
  '/index.html': `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Anon AI</title>
      <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      <link rel="stylesheet" href="/src/index.css" />
    </head>
    <body>
      <div id="root"></div>
      <script type="module" src="/src/main.tsx"></script>
    </body>
  </html>
    `.trim(),
  '/package.json': JSON.stringify(
    {
      name: 'anon',
      private: true,
      version: '0.0.0',
      type: 'module',
      scripts: {
        dev: 'vite',
        build: 'tsc -b && vite build',
        lint: 'eslint .',
        preview: 'vite preview',
      },
      dependencies: {
        react: '^19.1.0',
        'react-dom': '^19.1.0',
        motion: '^12.15.0',
        'react-router-dom': '7.2.0',
        axios: '1.8.1',
        '@permaweb/aoconnect': '0.0.82',
      },
      devDependencies: {
        '@eslint/js': '^9.25.0',
        '@types/react': '^19.1.2',
        '@types/react-dom': '^19.1.2',
        '@vitejs/plugin-react': '^4.4.1',
        eslint: '^9.25.0',
        'eslint-plugin-react-hooks': '^5.2.0',
        'eslint-plugin-react-refresh': '^0.4.19',
        globals: '^16.0.0',
        typescript: '~5.8.3',
        'typescript-eslint': '^8.30.1',
        vite: '^6.3.5',
      },
    },
    null,
    2,
  ).trim(),
  '/src/App.tsx': `
  import { Toaster  } from "./components/ui/sonner";
  import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import Index from "./pages/Index";
  
  const queryClient = new QueryClient();
  
  const App = () => (
    <QueryClientProvider client={queryClient}>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
          </Routes>
        </BrowserRouter>
    </QueryClientProvider>
  );
  
  export default App;
    `,
  '/src/pages/Index.tsx': `
  import { useState, useEffect } from 'react';
  
  function Index() {
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
  
    useEffect(() => {
      checkConnection();
    }, []);
  
    const checkConnection = async () => {
      try {
        if (window.arweaveWallet) {
          const permissions = await window.arweaveWallet.getPermissions();
          if (permissions.length > 0) {
            const addr = await window.arweaveWallet.getActiveAddress();
            setAddress(addr);
            setIsConnected(true);
          }
        }
      } catch (error) {
        // Wallet not connected or available
      }
    };
  
    const handleConnect = async () => {
      setIsConnecting(true);
      setError('');
      
      try {
        await window.arweaveWallet.connect(
          [
            'ENCRYPT',
            'DECRYPT',
            'DISPATCH',
            'SIGNATURE',
            'ACCESS_ADDRESS',
            'SIGN_TRANSACTION',
            'ACCESS_PUBLIC_KEY',
            'ACCESS_ALL_ADDRESSES',
            'ACCESS_ARWEAVE_CONFIG',
          ],
          {
            name: 'Anon',
            logo: 'https://arweave.net/pYIMnXpJRFUwTzogx_z5HCOPRRjCbSPYIlUqOjJ9Srs',
          },
          {
            host: 'arweave.net',
            port: 443,
            protocol: 'https',
          }
        );
        
        const addr = await window.arweaveWallet.getActiveAddress();
        setAddress(addr);
        setIsConnected(true);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        setIsConnected(false);
        handleConnectionError(errorMessage);
      } finally {
        setIsConnecting(false);
      }
    };
  
    const handleDisconnect = async () => {
      try {
        await window.arweaveWallet.disconnect();
        setIsConnected(false);
        setAddress('');
        setError('');
      } catch (error) {
        console.log('Error disconnecting wallet:', error);
      }
    };
  
    const handleConnectionError = (errorMessage) => {
      if (errorMessage.toLowerCase().includes('cancel') ||
          errorMessage.toLowerCase().includes('rejected') ||
          errorMessage.toLowerCase().includes('denied')) {
        setError('Connection cancelled by user');
      } else if (errorMessage.toLowerCase().includes('not found') ||
                 errorMessage.toLowerCase().includes('undefined')) {
        setError('ArConnect wallet extension not found. Please install ArConnect.');
      } else {
        setError("Connection failed");
      }
    };
  
    const formatAddress = (addr) => {
      if (!addr) return '';
      return addr.slice(0, 6);
    };
  
    const copyAddress = () => {
      navigator.clipboard.writeText(address);
    };
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white px-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>
  
        {/* Success notification */}
        {showSuccess && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
            🎉 Wallet connected successfully!
          </div>
        )}
  
        <div className="relative z-10 text-center max-w-md w-full">
          {/* Header */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-2xl">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Arweave Wallet
            </h1>
            <p className="text-gray-300 leading-relaxed">
              Connect your ArConnect wallet to access decentralized features and manage your AR tokens securely
            </p>
          </div>
  
          {/* Main Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-2xl transform transition-all duration-300 hover:scale-105">
            {!isConnected ? (
              <div className="space-y-4">
                <button
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isConnecting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <>
                      <span>🔗</span>
                      <span>Connect Wallet</span>
                    </>
                  )}
                </button>
                
                {error && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-red-300 text-sm">
                    {error}
                  </div>
                )}
                
                <div className="text-xs text-gray-400 mt-4">
                  <p>Supported wallets: ArConnect</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-300 font-semibold">Wallet Connected</span>
                  </div>
                  
                  <div className="bg-black/30 rounded-lg p-3 flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Address:</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm">{formatAddress(address)}</span>
                      <button 
                        onClick={copyAddress}
                        className="text-cyan-400 hover:text-cyan-300 transition-colors"
                        title="Copy address"
                      >
                        📋
                      </button>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleDisconnect}
                  className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>🔌</span>
                  <span>Disconnect</span>
                </button>
              </div>
            )}
          </div>
  
          {/* Features */}
          {isConnected && (
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl mb-2">💎</div>
                <h3 className="font-semibold text-sm">Secure Storage</h3>
                <p className="text-xs text-gray-400 mt-1">Your keys, your crypto</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="text-2xl mb-2">🌐</div>
                <h3 className="font-semibold text-sm">Decentralized</h3>
                <p className="text-xs text-gray-400 mt-1">Powered by Arweave</p>
              </div>
            </div>
          )}
  
          {/* Footer */}
          <footer className="mt-8 text-xs text-gray-400 space-y-1">
            <p>Powered by Arweave Network</p>
            <p>Wednesday, June 11, 2025</p>
          </footer>
        </div>
      </div>
    );
  }
  
  export default Index;
      `.trim(),
  '/src/main.tsx': `
    import App from './App.tsx'
    import { StrictMode } from 'react'
  import { createRoot } from 'react-dom/client'
  
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
    <div className="text-white" >
    <App/>
    </div>
    </StrictMode>,
  )
    `.trim(),
  '/vite-env.d.ts': `
    /// <reference types="vite/client" />
    `.trim(),
  '/tsconfig.app.json': JSON.stringify(
    {
      compilerOptions: {
        tsBuildInfoFile: './node_modules/.tmp/tsconfig.app.tsbuildinfo',
        target: 'ES2020',
        useDefineForClassFields: true,
        lib: ['ES2020', 'DOM', 'DOM.Iterable'],
        module: 'ESNext',
        skipLibCheck: true,

        /* Bundler mode */
        moduleResolution: 'bundler',
        allowImportingTsExtensions: true,
        verbatimModuleSyntax: true,
        moduleDetection: 'force',
        noEmit: true,
        jsx: 'react-jsx',

        /* Linting */
        strict: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noFallthroughCasesInSwitch: true,
        noUncheckedSideEffectImports: true,

        baseUrl: '.', // Required for `paths` to work
        paths: {
          '@/*': ['/src/*'],
        },
      },
      include: ['src'],
    },
    null,
    2,
  ).trim(),
  '/tsconfig.json': JSON.stringify(
    {
      files: [],
      references: [
        { path: './tsconfig.app.json' },
        { path: './tsconfig.node.json' },
      ],
    },
    null,
    2,
  ).trim(),
  '/tsconfig.node.json': JSON.stringify(
    {
      compilerOptions: {
        tsBuildInfoFile: './node_modules/.tmp/tsconfig.node.tsbuildinfo',
        target: 'ES2022',
        lib: ['ES2023'],
        module: 'ESNext',
        skipLibCheck: true,

        /* Bundler mode */
        moduleResolution: 'bundler',
        allowImportingTsExtensions: true,
        verbatimModuleSyntax: true,
        moduleDetection: 'force',
        noEmit: true,

        /* Linting */
        strict: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        erasableSyntaxOnly: true,
        noFallthroughCasesInSwitch: true,
        noUncheckedSideEffectImports: true,
      },
      include: ['vite.config.ts'],
    },
    null,
    2,
  ).trim(),
  '/vite.config.ts': `
  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'
  import path from "path";
  
  // https://vite.dev/config/
  export default defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  })
    `.trim(),
  '/README.md': `
  # Project by Anon
  `.trim(),
  '/src/lib/utils.ts': ` 
  import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
  
  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
  `,
};
