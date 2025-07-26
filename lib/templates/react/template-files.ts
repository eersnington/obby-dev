export const SHADCN_TEMPLATE_FILES = {
  '/src/components/ui/accordion.tsx': `import * as React from "react"
  import * as AccordionPrimitive from "@radix-ui/react-accordion"
  import { ChevronDownIcon } from "lucide-react"
  
  import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
  
  function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
  
  
  function Accordion({
    ...props
  }: React.ComponentProps<typeof AccordionPrimitive.Root>) {
    return <AccordionPrimitive.Root data-slot="accordion" {...props} />
  }
  
  function AccordionItem({
    className,
    ...props
  }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
    return (
      <AccordionPrimitive.Item
        data-slot="accordion-item"
        className={cn("border-b last:border-b-0", className)}
        {...props}
      />
    )
  }
  
  function AccordionTrigger({
    className,
    children,
    ...props
  }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
    return (
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
          data-slot="accordion-trigger"
          className={cn(
            "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
            className
          )}
          {...props}
        >
          {children}
          <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    )
  }
  
  function AccordionContent({
    className,
    children,
    ...props
  }: React.ComponentProps<typeof AccordionPrimitive.Content>) {
    return (
      <AccordionPrimitive.Content
        data-slot="accordion-content"
        className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
        {...props}
      >
        <div className={cn("pt-0 pb-4", className)}>{children}</div>
      </AccordionPrimitive.Content>
    )
  }
  
  export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
  `,
  '/src/components/ui/alert-dialog.tsx': `"use client"
  
  import * as React from "react"
  import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"
  
  import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
  import { buttonVariants } from "@/components/ui/button"
  
  function AlertDialog({
    ...props
  }: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
    return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
  }
  
  function AlertDialogTrigger({
    ...props
  }: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
    return (
      <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
    )
  }
  
  function AlertDialogPortal({
    ...props
  }: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
    return (
      <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
    )
  }
  
  function AlertDialogOverlay({
    className,
    ...props
  }: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
    return (
      <AlertDialogPrimitive.Overlay
        data-slot="alert-dialog-overlay"
        className={cn(
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
          className
        )}
        {...props}
      />
    )
  }
  
  function AlertDialogContent({
    className,
    ...props
  }: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
    return (
      <AlertDialogPortal>
        <AlertDialogOverlay />
        <AlertDialogPrimitive.Content
          data-slot="alert-dialog-content"
          className={cn(
            "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
            className
          )}
          {...props}
        />
      </AlertDialogPortal>
    )
  }
  
  function AlertDialogHeader({
    className,
    ...props
  }: React.ComponentProps<"div">) {
    return (
      <div
        data-slot="alert-dialog-header"
        className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
        {...props}
      />
    )
  }
  
  function AlertDialogFooter({
    className,
    ...props
  }: React.ComponentProps<"div">) {
    return (
      <div
        data-slot="alert-dialog-footer"
        className={cn(
          "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
          className
        )}
        {...props}
      />
    )
  }
  
  function AlertDialogTitle({
    className,
    ...props
  }: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
    return (
      <AlertDialogPrimitive.Title
        data-slot="alert-dialog-title"
        className={cn("text-lg font-semibold", className)}
        {...props}
      />
    )
  }
  
  function AlertDialogDescription({
    className,
    ...props
  }: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
    return (
      <AlertDialogPrimitive.Description
        data-slot="alert-dialog-description"
        className={cn("text-muted-foreground text-sm", className)}
        {...props}
      />
    )
  }
  
  function AlertDialogAction({
    className,
    ...props
  }: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
    return (
      <AlertDialogPrimitive.Action
        className={cn(buttonVariants(), className)}
        {...props}
      />
    )
  }
  
  function AlertDialogCancel({
    className,
    ...props
  }: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
    return (
      <AlertDialogPrimitive.Cancel
        className={cn(buttonVariants({ variant: "outline" }), className)}
        {...props}
      />
    )
  }
  
  export {
    AlertDialog,
    AlertDialogPortal,
    AlertDialogOverlay,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel,
  }
    `,
  '/src/components/ui/alert.tsx': `import * as React from "react"
  import { cva, type VariantProps } from "class-variance-authority"
    
  import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
    
    const alertVariants = cva(
      "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
      {
        variants: {
          variant: {
            default: "bg-card text-card-foreground",
            destructive:
              "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
          },
        },
        defaultVariants: {
          variant: "default",
        },
      }
    )
    
    function Alert({
      className,
      variant,
      ...props
    }: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
      return (
        <div
          data-slot="alert"
          role="alert"
          className={cn(alertVariants({ variant }), className)}
          {...props}
        />
      )
    }
    
    function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
      return (
        <div
          data-slot="alert-title"
          className={cn(
            "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
            className
          )}
          {...props}
        />
      )
    }
    
    function AlertDescription({
      className,
      ...props
    }: React.ComponentProps<"div">) {
      return (
        <div
          data-slot="alert-description"
          className={cn(
            "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
            className
          )}
          {...props}
        />
      )
    }
    
    export { Alert, AlertTitle, AlertDescription }
    `,
  '/src/components/ui/aspect-ratio.tsx': `import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"
    
    function AspectRatio({
      ...props
    }: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
      return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />
    }
    
    export { AspectRatio }
    `,
  '/src/components/ui/avatar.tsx': `"use client"
    
    import * as React from "react"
    import * as AvatarPrimitive from "@radix-ui/react-avatar"
    
    import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
    
    function Avatar({
      className,
      ...props
    }: React.ComponentProps<typeof AvatarPrimitive.Root>) {
      return (
        <AvatarPrimitive.Root
          data-slot="avatar"
          className={cn(
            "relative flex size-8 shrink-0 overflow-hidden rounded-full",
            className
          )}
          {...props}
        />
      )
    }
    
    function AvatarImage({
      className,
      ...props
    }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
      return (
        <AvatarPrimitive.Image
          data-slot="avatar-image"
          className={cn("aspect-square size-full", className)}
          {...props}
        />
      )
    }
    
    function AvatarFallback({
      className,
      ...props
    }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
      return (
        <AvatarPrimitive.Fallback
          data-slot="avatar-fallback"
          className={cn(
            "bg-muted flex size-full items-center justify-center rounded-full",
            className
          )}
          {...props}
        />
      )
    }
    
    export { Avatar, AvatarImage, AvatarFallback }
    `,
  '/src/components/ui/badge.tsx': `import * as React from "react"
    import { Slot } from "@radix-ui/react-slot"
    import { cva, type VariantProps } from "class-variance-authority"
    
    import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
    
    const badgeVariants = cva(
      "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
      {
        variants: {
          variant: {
            default:
              "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
            secondary:
              "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
            destructive:
              "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline:
              "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
          },
        },
        defaultVariants: {
          variant: "default",
        },
      }
    )
    
    function Badge({
      className,
      variant,
      asChild = false,
      ...props
    }: React.ComponentProps<"span"> &
      VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
      const Comp = asChild ? Slot : "span"
    
      return (
        <Comp
          data-slot="badge"
          className={cn(badgeVariants({ variant }), className)}
          {...props}
        />
      )
    }
    
    export { Badge, badgeVariants }
    `,
  '/src/components/ui/breadcrumb.tsx': `import * as React from "react"
    import { Slot } from "@radix-ui/react-slot"
    import { ChevronRight, MoreHorizontal } from "lucide-react"
    
    import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
    
    function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
      return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
    }
    
    function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
      return (
        <ol
          data-slot="breadcrumb-list"
          className={cn(
            "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
            className
          )}
          {...props}
        />
      )
    }
    
    function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
      return (
        <li
          data-slot="breadcrumb-item"
          className={cn("inline-flex items-center gap-1.5", className)}
          {...props}
        />
      )
    }
    
    function BreadcrumbLink({
      asChild,
      className,
      ...props
    }: React.ComponentProps<"a"> & {
      asChild?: boolean
    }) {
      const Comp = asChild ? Slot : "a"
    
      return (
        <Comp
          data-slot="breadcrumb-link"
          className={cn("hover:text-foreground transition-colors", className)}
          {...props}
        />
      )
    }
    
    function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
      return (
        <span
          data-slot="breadcrumb-page"
          role="link"
          aria-disabled="true"
          aria-current="page"
          className={cn("text-foreground font-normal", className)}
          {...props}
        />
      )
    }
    
    function BreadcrumbSeparator({
      children,
      className,
      ...props
    }: React.ComponentProps<"li">) {
      return (
        <li
          data-slot="breadcrumb-separator"
          role="presentation"
          aria-hidden="true"
          className={cn("[&>svg]:size-3.5", className)}
          {...props}
        >
          {children ?? <ChevronRight />}
        </li>
      )
    }
    
    function BreadcrumbEllipsis({
      className,
      ...props
    }: React.ComponentProps<"span">) {
      return (
        <span
          data-slot="breadcrumb-ellipsis"
          role="presentation"
          aria-hidden="true"
          className={cn("flex size-9 items-center justify-center", className)}
          {...props}
        >
          <MoreHorizontal className="size-4" />
          <span className="sr-only">More</span>
        </span>
      )
    }
    
    export {
      Breadcrumb,
      BreadcrumbList,
      BreadcrumbItem,
      BreadcrumbLink,
      BreadcrumbPage,
      BreadcrumbSeparator,
      BreadcrumbEllipsis,
    }
    `,
  '/src/components/ui/button.tsx': `import * as React from "react"
    import { Slot } from "@radix-ui/react-slot"
    import { cva, type VariantProps } from "class-variance-authority"
    
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
              "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
            destructive:
              "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline:
              "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
            secondary:
              "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
            ghost:
              "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
            link: "text-primary underline-offset-4 hover:underline",
          },
          size: {
            default: "h-9 px-4 py-2 has-[>svg]:px-3",
            sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
            lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
            icon: "size-9",
          },
        },
        defaultVariants: {
          variant: "default",
          size: "default",
        },
      }
    )
    
    function Button({
      className,
      variant,
      size,
      asChild = false,
      ...props
    }: React.ComponentProps<"button"> &
      VariantProps<typeof buttonVariants> & {
        asChild?: boolean
      }) {
      const Comp = asChild ? Slot : "button"
    
      return (
        <Comp
          data-slot="button"
          className={cn(buttonVariants({ variant, size, className }))}
          {...props}
        />
      )
    }
    
    export { Button, buttonVariants }
    `,
  '/src/components/ui/calendar.tsx': `import * as React from "react"
    import {
      ChevronDownIcon,
      ChevronLeftIcon,
      ChevronRightIcon,
    } from "lucide-react"
    import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker"
    
    import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
    import { Button, buttonVariants } from "@/components/ui/button"
    
    function Calendar({
      className,
      classNames,
      showOutsideDays = true,
      captionLayout = "label",
      buttonVariant = "ghost",
      formatters,
      components,
      ...props
    }: React.ComponentProps<typeof DayPicker> & {
      buttonVariant?: React.ComponentProps<typeof Button>["variant"]
    }) {
      const defaultClassNames = getDefaultClassNames()
    
      return (
        <DayPicker
          showOutsideDays={showOutsideDays}
          className={cn(
            "bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
            String.raw\`rtl:**:[.rdp-button_next>svg]:rotate-180\`,
            String.raw\`rtl:**:[.rdp-button_previous>svg]:rotate-180\`,
            className
          )}
          captionLayout={captionLayout}
          formatters={{
            formatMonthDropdown: (date) =>
              date.toLocaleString("default", { month: "short" }),
            ...formatters,
          }}
          classNames={{
            root: cn("w-fit", defaultClassNames.root),
            months: cn(
              "flex gap-4 flex-col md:flex-row relative",
              defaultClassNames.months
            ),
            month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
            nav: cn(
              "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
              defaultClassNames.nav
            ),
            button_previous: cn(
              buttonVariants({ variant: buttonVariant }),
              "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
              defaultClassNames.button_previous
            ),
            button_next: cn(
              buttonVariants({ variant: buttonVariant }),
              "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
              defaultClassNames.button_next
            ),
            month_caption: cn(
              "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
              defaultClassNames.month_caption
            ),
            dropdowns: cn(
              "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
              defaultClassNames.dropdowns
            ),
            dropdown_root: cn(
              "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
              defaultClassNames.dropdown_root
            ),
            dropdown: cn("absolute inset-0 opacity-0", defaultClassNames.dropdown),
            caption_label: cn(
              "select-none font-medium",
              captionLayout === "label"
                ? "text-sm"
                : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
              defaultClassNames.caption_label
            ),
            table: "w-full border-collapse",
            weekdays: cn("flex", defaultClassNames.weekdays),
            weekday: cn(
              "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
              defaultClassNames.weekday
            ),
            week: cn("flex w-full mt-2", defaultClassNames.week),
            week_number_header: cn(
              "select-none w-(--cell-size)",
              defaultClassNames.week_number_header
            ),
            week_number: cn(
              "text-[0.8rem] select-none text-muted-foreground",
              defaultClassNames.week_number
            ),
            day: cn(
              "relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
              defaultClassNames.day
            ),
            range_start: cn(
              "rounded-l-md bg-accent",
              defaultClassNames.range_start
            ),
            range_middle: cn("rounded-none", defaultClassNames.range_middle),
            range_end: cn("rounded-r-md bg-accent", defaultClassNames.range_end),
            today: cn(
              "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
              defaultClassNames.today
            ),
            outside: cn(
              "text-muted-foreground aria-selected:text-muted-foreground",
              defaultClassNames.outside
            ),
            disabled: cn(
              "text-muted-foreground opacity-50",
              defaultClassNames.disabled
            ),
            hidden: cn("invisible", defaultClassNames.hidden),
            ...classNames,
          }}
          components={{
            Root: ({ className, rootRef, ...props }) => {
              return (
                <div
                  data-slot="calendar"
                  ref={rootRef}
                  className={cn(className)}
                  {...props}
                />
              )
            },
            Chevron: ({ className, orientation, ...props }) => {
              if (orientation === "left") {
                return (
                  <ChevronLeftIcon className={cn("size-4", className)} {...props} />
                )
              }
    
              if (orientation === "right") {
                return (
                  <ChevronRightIcon
                    className={cn("size-4", className)}
                    {...props}
                  />
                )
              }
    
              return (
                <ChevronDownIcon className={cn("size-4", className)} {...props} />
              )
            },
            DayButton: CalendarDayButton,
            WeekNumber: ({ children, ...props }) => {
              return (
                <td {...props}>
                  <div className="flex size-(--cell-size) items-center justify-center text-center">
                    {children}
                  </div>
                </td>
              )
            },
            ...components,
          }}
          {...props}
        />
      )
    }
    
    function CalendarDayButton({
      className,
      day,
      modifiers,
      ...props
    }: React.ComponentProps<typeof DayButton>) {
      const defaultClassNames = getDefaultClassNames()
    
      const ref = React.useRef<HTMLButtonElement>(null)
      React.useEffect(() => {
        if (modifiers.focused) ref.current?.focus()
      }, [modifiers.focused])
    
      return (
        <Button
          ref={ref}
          variant="ghost"
          size="icon"
          data-day={day.date.toLocaleDateString()}
          data-selected-single={
            modifiers.selected &&
            !modifiers.range_start &&
            !modifiers.range_end &&
            !modifiers.range_middle
          }
          data-range-start={modifiers.range_start}
          data-range-end={modifiers.range_end}
          data-range-middle={modifiers.range_middle}
          className={cn(
            "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
            defaultClassNames.day,
            className
          )}
          {...props}
        />
      )
    }
    
    export { Calendar, CalendarDayButton }
    `,
  '/src/components/ui/card.tsx': `import * as React from "react"
    
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
  '/src/components/ui/carousel.tsx': `"use client"
    
    import * as React from "react"
    import useEmblaCarousel, {
      type UseEmblaCarouselType,
    } from "embla-carousel-react"
    import { ArrowLeft, ArrowRight } from "lucide-react"
    
    import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
    import { Button } from "@/components/ui/button"
    
    type CarouselApi = UseEmblaCarouselType[1]
    type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
    type CarouselOptions = UseCarouselParameters[0]
    type CarouselPlugin = UseCarouselParameters[1]
    
    type CarouselProps = {
      opts?: CarouselOptions
      plugins?: CarouselPlugin
      orientation?: "horizontal" | "vertical"
      setApi?: (api: CarouselApi) => void
    }
    
    type CarouselContextProps = {
      carouselRef: ReturnType<typeof useEmblaCarousel>[0]
      api: ReturnType<typeof useEmblaCarousel>[1]
      scrollPrev: () => void
      scrollNext: () => void
      canScrollPrev: boolean
      canScrollNext: boolean
    } & CarouselProps
    
    const CarouselContext = React.createContext<CarouselContextProps | null>(null)
    
    function useCarousel() {
      const context = React.useContext(CarouselContext)
    
      if (!context) {
        throw new Error("useCarousel must be used within a <Carousel />")
      }
    
      return context
    }
    
    function Carousel({
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    }: React.ComponentProps<"div"> & CarouselProps) {
      const [carouselRef, api] = useEmblaCarousel(
        {
          ...opts,
          axis: orientation === "horizontal" ? "x" : "y",
        },
        plugins
      )
      const [canScrollPrev, setCanScrollPrev] = React.useState(false)
      const [canScrollNext, setCanScrollNext] = React.useState(false)
    
      const onSelect = React.useCallback((api: CarouselApi) => {
        if (!api) return
        setCanScrollPrev(api.canScrollPrev())
        setCanScrollNext(api.canScrollNext())
      }, [])
    
      const scrollPrev = React.useCallback(() => {
        api?.scrollPrev()
      }, [api])
    
      const scrollNext = React.useCallback(() => {
        api?.scrollNext()
      }, [api])
    
      const handleKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault()
            scrollPrev()
          } else if (event.key === "ArrowRight") {
            event.preventDefault()
            scrollNext()
          }
        },
        [scrollPrev, scrollNext]
      )
    
      React.useEffect(() => {
        if (!api || !setApi) return
        setApi(api)
      }, [api, setApi])
    
      React.useEffect(() => {
        if (!api) return
        onSelect(api)
        api.on("reInit", onSelect)
        api.on("select", onSelect)
    
        return () => {
          api?.off("select", onSelect)
        }
      }, [api, onSelect])
    
      return (
        <CarouselContext.Provider
          value={{
            carouselRef,
            api: api,
            opts,
            orientation:
              orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
            scrollPrev,
            scrollNext,
            canScrollPrev,
            canScrollNext,
          }}
        >
          <div
            onKeyDownCapture={handleKeyDown}
            className={cn("relative", className)}
            role="region"
            aria-roledescription="carousel"
            data-slot="carousel"
            {...props}
          >
            {children}
          </div>
        </CarouselContext.Provider>
      )
    }
    
    function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
      const { carouselRef, orientation } = useCarousel()
    
      return (
        <div
          ref={carouselRef}
          className="overflow-hidden"
          data-slot="carousel-content"
        >
          <div
            className={cn(
              "flex",
              orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
              className
            )}
            {...props}
          />
        </div>
      )
    }
    
    function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
      const { orientation } = useCarousel()
    
      return (
        <div
          role="group"
          aria-roledescription="slide"
          data-slot="carousel-item"
          className={cn(
            "min-w-0 shrink-0 grow-0 basis-full",
            orientation === "horizontal" ? "pl-4" : "pt-4",
            className
          )}
          {...props}
        />
      )
    }
    
    function CarouselPrevious({
      className,
      variant = "outline",
      size = "icon",
      ...props
    }: React.ComponentProps<typeof Button>) {
      const { orientation, scrollPrev, canScrollPrev } = useCarousel()
    
      return (
        <Button
          data-slot="carousel-previous"
          variant={variant}
          size={size}
          className={cn(
            "absolute size-8 rounded-full",
            orientation === "horizontal"
              ? "top-1/2 -left-12 -translate-y-1/2"
              : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
            className
          )}
          disabled={!canScrollPrev}
          onClick={scrollPrev}
          {...props}
        >
          <ArrowLeft />
          <span className="sr-only">Previous slide</span>
        </Button>
      )
    }
    
    function CarouselNext({
      className,
      variant = "outline",
      size = "icon",
      ...props
    }: React.ComponentProps<typeof Button>) {
      const { orientation, scrollNext, canScrollNext } = useCarousel()
    
      return (
        <Button
          data-slot="carousel-next"
          variant={variant}
          size={size}
          className={cn(
            "absolute size-8 rounded-full",
            orientation === "horizontal"
              ? "top-1/2 -right-12 -translate-y-1/2"
              : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
            className
          )}
          disabled={!canScrollNext}
          onClick={scrollNext}
          {...props}
        >
          <ArrowRight />
          <span className="sr-only">Next slide</span>
        </Button>
      )
    }
    
    export {
      type CarouselApi,
      Carousel,
      CarouselContent,
      CarouselItem,
      CarouselPrevious,
      CarouselNext,
    }
    `,
  '/src/components/ui/chart.tsx': `import * as React from "react"
    import * as RechartsPrimitive from "recharts"
    
    import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
    
    // Format: { THEME_NAME: CSS_SELECTOR }
    const THEMES = { light: "", dark: ".dark" } as const
    
    export type ChartConfig = {
      [k in string]: {
        label?: React.ReactNode
        icon?: React.ComponentType
      } & (
        | { color?: string; theme?: never }
        | { color?: never; theme: Record<keyof typeof THEMES, string> }
      )
    }
    
    type ChartContextProps = {
      config: ChartConfig
    }
    
    const ChartContext = React.createContext<ChartContextProps | null>(null)
    
    function useChart() {
      const context = React.useContext(ChartContext)
    
      if (!context) {
        throw new Error("useChart must be used within a <ChartContainer />")
      }
    
      return context
    }
    
    function ChartContainer({
      id,
      className,
      children,
      config,
      ...props
    }: React.ComponentProps<"div"> & {
      config: ChartConfig
      children: React.ComponentProps<
        typeof RechartsPrimitive.ResponsiveContainer
      >["children"]
    }) {
      const uniqueId = React.useId()
      const chartId = \`chart-\${id || uniqueId.replace(/:/g, "")}\`
    
      return (
        <ChartContext.Provider value={{ config }}>
          <div
            data-slot="chart"
            data-chart={chartId}
            className={cn(
              "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
              className
            )}
            {...props}
          >
            <ChartStyle id={chartId} config={config} />
            <RechartsPrimitive.ResponsiveContainer>
              {children}
            </RechartsPrimitive.ResponsiveContainer>
          </div>
        </ChartContext.Provider>
      )
    }
    
    const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
      const colorConfig = Object.entries(config).filter(
        ([, config]) => config.theme || config.color
      )
    
      if (!colorConfig.length) {
        return null
      }
    
      return (
        <style
          dangerouslySetInnerHTML={{
            __html: Object.entries(THEMES)
              .map(
                ([theme, prefix]) => \`
    \${prefix} [data-chart=\${id}] {
    \${colorConfig
      .map(([key, itemConfig]) => {
        const color =
          itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
          itemConfig.color
        return color ? \`  --color-\${key}: \${color};\` : null
      })
      .join("\n")}
    }
    \`
              )
              .join("\n"),
          }}
        />
      )
    }
    
    const ChartTooltip = RechartsPrimitive.Tooltip
    
    function ChartTooltipContent({
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    }: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
      React.ComponentProps<"div"> & {
        hideLabel?: boolean
        hideIndicator?: boolean
        indicator?: "line" | "dot" | "dashed"
        nameKey?: string
        labelKey?: string
      }) {
      const { config } = useChart()
    
      const tooltipLabel = React.useMemo(() => {
        if (hideLabel || !payload?.length) {
          return null
        }
    
        const [item] = payload
        const key = \`\${labelKey || item?.dataKey || item?.name || "value"}\`
        const itemConfig = getPayloadConfigFromPayload(config, item, key)
        const value =
          !labelKey && typeof label === "string"
            ? config[label as keyof typeof config]?.label || label
            : itemConfig?.label
    
        if (labelFormatter) {
          return (
            <div className={cn("font-medium", labelClassName)}>
              {labelFormatter(value, payload)}
            </div>
          )
        }
    
        if (!value) {
          return null
        }
    
        return <div className={cn("font-medium", labelClassName)}>{value}</div>
      }, [
        label,
        labelFormatter,
        payload,
        hideLabel,
        labelClassName,
        config,
        labelKey,
      ])
    
      if (!active || !payload?.length) {
        return null
      }
    
      const nestLabel = payload.length === 1 && indicator !== "dot"
    
      return (
        <div
          className={cn(
            "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
            className
          )}
        >
          {!nestLabel ? tooltipLabel : null}
          <div className="grid gap-1.5">
            {payload.map((item, index) => {
              const key = \`\${nameKey || item.name || item.dataKey || "value"}\`
              const itemConfig = getPayloadConfigFromPayload(config, item, key)
              const indicatorColor = color || item.payload.fill || item.color
    
              return (
                <div
                  key={item.dataKey}
                  className={cn(
                    "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
                    indicator === "dot" && "items-center"
                  )}
                >
                  {formatter && item?.value !== undefined && item.name ? (
                    formatter(item.value, item.name, item, index, item.payload)
                  ) : (
                    <>
                      {itemConfig?.icon ? (
                        <itemConfig.icon />
                      ) : (
                        !hideIndicator && (
                          <div
                            className={cn(
                              "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                              {
                                "h-2.5 w-2.5": indicator === "dot",
                                "w-1": indicator === "line",
                                "w-0 border-[1.5px] border-dashed bg-transparent":
                                  indicator === "dashed",
                                "my-0.5": nestLabel && indicator === "dashed",
                              }
                            )}
                            style={
                              {
                                "--color-bg": indicatorColor,
                                "--color-border": indicatorColor,
                              } as React.CSSProperties
                            }
                          />
                        )
                      )}
                      <div
                        className={cn(
                          "flex flex-1 justify-between leading-none",
                          nestLabel ? "items-end" : "items-center"
                        )}
                      >
                        <div className="grid gap-1.5">
                          {nestLabel ? tooltipLabel : null}
                          <span className="text-muted-foreground">
                            {itemConfig?.label || item.name}
                          </span>
                        </div>
                        {item.value && (
                          <span className="text-foreground font-mono font-medium tabular-nums">
                            {item.value.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )
    }
    
    const ChartLegend = RechartsPrimitive.Legend
    
    function ChartLegendContent({
      className,
      hideIcon = false,
      payload,
      verticalAlign = "bottom",
      nameKey,
    }: React.ComponentProps<"div"> &
      Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
        hideIcon?: boolean
        nameKey?: string
      }) {
      const { config } = useChart()
    
      if (!payload?.length) {
        return null
      }
    
      return (
        <div
          className={cn(
            "flex items-center justify-center gap-4",
            verticalAlign === "top" ? "pb-3" : "pt-3",
            className
          )}
        >
          {payload.map((item) => {
            const key = \`\${nameKey || item.dataKey || "value"}\`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
    
            return (
              <div
                key={item.value}
                className={cn(
                  "[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3"
                )}
              >
                {itemConfig?.icon && !hideIcon ? (
                  <itemConfig.icon />
                ) : (
                  <div
                    className="h-2 w-2 shrink-0 rounded-[2px]"
                    style={{
                      backgroundColor: item.color,
                    }}
                  />
                )}
                {itemConfig?.label}
              </div>
            )
          })}
        </div>
      )
    }
    
    // Helper to extract item config from a payload.
    function getPayloadConfigFromPayload(
      config: ChartConfig,
      payload: unknown,
      key: string
    ) {
      if (typeof payload !== "object" || payload === null) {
        return undefined
      }
    
      const payloadPayload =
        "payload" in payload &&
        typeof payload.payload === "object" &&
        payload.payload !== null
          ? payload.payload
          : undefined
    
      let configLabelKey: string = key
    
      if (
        key in payload &&
        typeof payload[key as keyof typeof payload] === "string"
      ) {
        configLabelKey = payload[key as keyof typeof payload] as string
      } else if (
        payloadPayload &&
        key in payloadPayload &&
        typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
      ) {
        configLabelKey = payloadPayload[
          key as keyof typeof payloadPayload
        ] as string
      }
    
      return configLabelKey in config
        ? config[configLabelKey]
        : config[key as keyof typeof config]
    }
    
    export {
      ChartContainer,
      ChartTooltip,
      ChartTooltipContent,
      ChartLegend,
      ChartLegendContent,
      ChartStyle,
    }
    `,
  '/src/components/ui/checkbox.tsx': `"use client"
    
    import * as React from "react"
    import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
    import { CheckIcon } from "lucide-react"
    
    import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
    
    function Checkbox({
      className,
      ...props
    }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
      return (
        <CheckboxPrimitive.Root
          data-slot="checkbox"
          className={cn(
            "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator
            data-slot="checkbox-indicator"
            className="flex items-center justify-center text-current transition-none"
          >
            <CheckIcon className="size-3.5" />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
      )
    }
    
    export { Checkbox }
    `,
  '/src/components/ui/collapsible.tsx': `import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
    
    function Collapsible({
      ...props
    }: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
      return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
    }
    
    function CollapsibleTrigger({
      ...props
    }: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
      return (
        <CollapsiblePrimitive.CollapsibleTrigger
          data-slot="collapsible-trigger"
          {...props}
        />
      )
    }
    
    function CollapsibleContent({
      ...props
    }: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
      return (
        <CollapsiblePrimitive.CollapsibleContent
          data-slot="collapsible-content"
          {...props}
        />
      )
    }
    
    export { Collapsible, CollapsibleTrigger, CollapsibleContent }
    `,
  '/src/components/ui/command.tsx': `"use client"
    
    import * as React from "react"
    import { Command as CommandPrimitive } from "cmdk"
    import { SearchIcon } from "lucide-react"
    
    import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
    import {
      Dialog,
      DialogContent,
      DialogDescription,
      DialogHeader,
      DialogTitle,
    } from "@/components/ui/dialog"
    
    function Command({
      className,
      ...props
    }: React.ComponentProps<typeof CommandPrimitive>) {
      return (
        <CommandPrimitive
          data-slot="command"
          className={cn(
            "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
            className
          )}
          {...props}
        />
      )
    }
    
    function CommandDialog({
      title = "Command Palette",
      description = "Search for a command to run...",
      children,
      className,
      showCloseButton = true,
      ...props
    }: React.ComponentProps<typeof Dialog> & {
      title?: string
      description?: string
      className?: string
      showCloseButton?: boolean
    }) {
      return (
        <Dialog {...props}>
          <DialogHeader className="sr-only">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <DialogContent
            className={cn("overflow-hidden p-0", className)}
            showCloseButton={showCloseButton}
          >
            <Command className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
              {children}
            </Command>
          </DialogContent>
        </Dialog>
      )
    }
    
    function CommandInput({
      className,
      ...props
    }: React.ComponentProps<typeof CommandPrimitive.Input>) {
      return (
        <div
          data-slot="command-input-wrapper"
          className="flex h-9 items-center gap-2 border-b px-3"
        >
          <SearchIcon className="size-4 shrink-0 opacity-50" />
          <CommandPrimitive.Input
            data-slot="command-input"
            className={cn(
              "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            {...props}
          />
        </div>
      )
    }
    
    function CommandList({
      className,
      ...props
    }: React.ComponentProps<typeof CommandPrimitive.List>) {
      return (
        <CommandPrimitive.List
          data-slot="command-list"
          className={cn(
            "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
            className
          )}
          {...props}
        />
      )
    }
    
    function CommandEmpty({
      ...props
    }: React.ComponentProps<typeof CommandPrimitive.Empty>) {
      return (
        <CommandPrimitive.Empty
          data-slot="command-empty"
          className="py-6 text-center text-sm"
          {...props}
        />
      )
    }
    
    function CommandGroup({
      className,
      ...props
    }: React.ComponentProps<typeof CommandPrimitive.Group>) {
      return (
        <CommandPrimitive.Group
          data-slot="command-group"
          className={cn(
            "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
            className
          )}
          {...props}
        />
      )
    }
    
    function CommandSeparator({
      className,
      ...props
    }: React.ComponentProps<typeof CommandPrimitive.Separator>) {
      return (
        <CommandPrimitive.Separator
          data-slot="command-separator"
          className={cn("bg-border -mx-1 h-px", className)}
          {...props}
        />
      )
    }
    
    function CommandItem({
      className,
      ...props
    }: React.ComponentProps<typeof CommandPrimitive.Item>) {
      return (
        <CommandPrimitive.Item
          data-slot="command-item"
          className={cn(
            "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            className
          )}
          {...props}
        />
      )
    }
    
    function CommandShortcut({
      className,
      ...props
    }: React.ComponentProps<"span">) {
      return (
        <span
          data-slot="command-shortcut"
          className={cn(
            "text-muted-foreground ml-auto text-xs tracking-widest",
            className
          )}
          {...props}
        />
      )
    }
    
    export {
      Command,
      CommandDialog,
      CommandInput,
      CommandList,
      CommandEmpty,
      CommandGroup,
      CommandItem,
      CommandShortcut,
      CommandSeparator,
    }
    `,
  '/src/components/ui/context-menu.tsx': `"use client"
    
    import * as React from "react"
    import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
    import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"
    
    import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
    
    function ContextMenu({
      ...props
    }: React.ComponentProps<typeof ContextMenuPrimitive.Root>) {
      return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />
    }
    
    function ContextMenuTrigger({
      ...props
    }: React.ComponentProps<typeof ContextMenuPrimitive.Trigger>) {
      return (
        <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />
      )
    }
    
    function ContextMenuGroup({
      ...props
    }: React.ComponentProps<typeof ContextMenuPrimitive.Group>) {
      return (
        <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
      )
    }
    
    function ContextMenuPortal({
      ...props
    }: React.ComponentProps<typeof ContextMenuPrimitive.Portal>) {
      return (
        <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
      )
    }
    
    function ContextMenuSub({
      ...props
    }: React.ComponentProps<typeof ContextMenuPrimitive.Sub>) {
      return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />
    }
    
    function ContextMenuRadioGroup({
      ...props
    }: React.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>) {
      return (
        <ContextMenuPrimitive.RadioGroup
          data-slot="context-menu-radio-group"
          {...props}
        />
      )
    }
    
    function ContextMenuSubTrigger({
      className,
      inset,
      children,
      ...props
    }: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
      inset?: boolean
    }) {
      return (
        <ContextMenuPrimitive.SubTrigger
          data-slot="context-menu-sub-trigger"
          data-inset={inset}
          className={cn(
            "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            className
          )}
          {...props}
        >
          {children}
          <ChevronRightIcon className="ml-auto" />
        </ContextMenuPrimitive.SubTrigger>
      )
    }
    
    function ContextMenuSubContent({
      className,
      ...props
    }: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) {
      return (
        <ContextMenuPrimitive.SubContent
          data-slot="context-menu-sub-content"
          className={cn(
            "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
            className
          )}
          {...props}
        />
      )
    }
    
    function ContextMenuContent({
      className,
      ...props
    }: React.ComponentProps<typeof ContextMenuPrimitive.Content>) {
      return (
        <ContextMenuPrimitive.Portal>
          <ContextMenuPrimitive.Content
            data-slot="context-menu-content"
            className={cn(
              "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-context-menu-content-available-height) min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
              className
            )}
            {...props}
          />
        </ContextMenuPrimitive.Portal>
      )
    }
    
    function ContextMenuItem({
      className,
      inset,
      variant = "default",
      ...props
    }: React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
      inset?: boolean
      variant?: "default" | "destructive"
    }) {
      return (
        <ContextMenuPrimitive.Item
          data-slot="context-menu-item"
          data-inset={inset}
          data-variant={variant}
          className={cn(
            "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            className
          )}
          {...props}
        />
      )
    }
    
    function ContextMenuCheckboxItem({
      className,
      children,
      checked,
      ...props
    }: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) {
      return (
        <ContextMenuPrimitive.CheckboxItem
          data-slot="context-menu-checkbox-item"
          className={cn(
            "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            className
          )}
          checked={checked}
          {...props}
        >
          <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
            <ContextMenuPrimitive.ItemIndicator>
              <CheckIcon className="size-4" />
            </ContextMenuPrimitive.ItemIndicator>
          </span>
          {children}
        </ContextMenuPrimitive.CheckboxItem>
      )
    }
    
    function ContextMenuRadioItem({
      className,
      children,
      ...props
    }: React.ComponentProps<typeof ContextMenuPrimitive.RadioItem>) {
      return (
        <ContextMenuPrimitive.RadioItem
          data-slot="context-menu-radio-item"
          className={cn(
            "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            className
          )}
          {...props}
        >
          <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
            <ContextMenuPrimitive.ItemIndicator>
              <CircleIcon className="size-2 fill-current" />
            </ContextMenuPrimitive.ItemIndicator>
          </span>
          {children}
        </ContextMenuPrimitive.RadioItem>
      )
    }
    
    function ContextMenuLabel({
      className,
      inset,
      ...props
    }: React.ComponentProps<typeof ContextMenuPrimitive.Label> & {
      inset?: boolean
    }) {
      return (
        <ContextMenuPrimitive.Label
          data-slot="context-menu-label"
          data-inset={inset}
          className={cn(
            "text-foreground px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
            className
          )}
          {...props}
        />
      )
    }
    
    function ContextMenuSeparator({
      className,
      ...props
    }: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) {
      return (
        <ContextMenuPrimitive.Separator
          data-slot="context-menu-separator"
          className={cn("bg-border -mx-1 my-1 h-px", className)}
          {...props}
        />
      )
    }
    
    function ContextMenuShortcut({
      className,
      ...props
    }: React.ComponentProps<"span">) {
      return (
        <span
          data-slot="context-menu-shortcut"
          className={cn(
            "text-muted-foreground ml-auto text-xs tracking-widest",
            className
          )}
          {...props}
        />
      )
    }
    
    export {
      ContextMenu,
      ContextMenuTrigger,
      ContextMenuContent,
      ContextMenuItem,
      ContextMenuCheckboxItem,
      ContextMenuRadioItem,
      ContextMenuLabel,
      ContextMenuSeparator,
      ContextMenuShortcut,
      ContextMenuGroup,
      ContextMenuPortal,
      ContextMenuSub,
      ContextMenuSubContent,
      ContextMenuSubTrigger,
      ContextMenuRadioGroup,
    }
    `,
  '/src/components/ui/dialog.tsx': `import * as React from "react"
    import * as DialogPrimitive from "@radix-ui/react-dialog"
    import { XIcon } from "lucide-react"
    
    import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
    
    function Dialog({
      ...props
    }: React.ComponentProps<typeof DialogPrimitive.Root>) {
      return <DialogPrimitive.Root data-slot="dialog" {...props} />
    }
    
    function DialogTrigger({
      ...props
    }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
      return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
    }
    
    function DialogPortal({
      ...props
    }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
      return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
    }
    
    function DialogClose({
      ...props
    }: React.ComponentProps<typeof DialogPrimitive.Close>) {
      return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
    }
    
    function DialogOverlay({
      className,
      ...props
    }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
      return (
        <DialogPrimitive.Overlay
          data-slot="dialog-overlay"
          className={cn(
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
            className
          )}
          {...props}
        />
      )
    }
    
    function DialogContent({
      className,
      children,
      showCloseButton = true,
      ...props
    }: React.ComponentProps<typeof DialogPrimitive.Content> & {
      showCloseButton?: boolean
    }) {
      return (
        <DialogPortal data-slot="dialog-portal">
          <DialogOverlay />
          <DialogPrimitive.Content
            data-slot="dialog-content"
            className={cn(
              "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
              className
            )}
            {...props}
          >
            {children}
            {showCloseButton && (
              <DialogPrimitive.Close
                data-slot="dialog-close"
                className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
              >
                <XIcon />
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
            )}
          </DialogPrimitive.Content>
        </DialogPortal>
      )
    }
    
    function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
      return (
        <div
          data-slot="dialog-header"
          className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
          {...props}
        />
      )
    }
    
    function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
      return (
        <div
          data-slot="dialog-footer"
          className={cn(
            "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
            className
          )}
          {...props}
        />
      )
    }
    
    function DialogTitle({
      className,
      ...props
    }: React.ComponentProps<typeof DialogPrimitive.Title>) {
      return (
        <DialogPrimitive.Title
          data-slot="dialog-title"
          className={cn("text-lg leading-none font-semibold", className)}
          {...props}
        />
      )
    }
    
    function DialogDescription({
      className,
      ...props
    }: React.ComponentProps<typeof DialogPrimitive.Description>) {
      return (
        <DialogPrimitive.Description
          data-slot="dialog-description"
          className={cn("text-muted-foreground text-sm", className)}
          {...props}
        />
      )
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
    }
    `,
  '/src/components/ui/drawer.tsx': `import * as React from "react"
    import { Drawer as DrawerPrimitive } from "vaul"
    
    import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
    
    function Drawer({
      ...props
    }: React.ComponentProps<typeof DrawerPrimitive.Root>) {
      return <DrawerPrimitive.Root data-slot="drawer" {...props} />
    }
    
    function DrawerTrigger({
      ...props
    }: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
      return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
    }
    
    function DrawerPortal({
      ...props
    }: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
      return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
    }
    
    function DrawerClose({
      ...props
    }: React.ComponentProps<typeof DrawerPrimitive.Close>) {
      return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
    }
    
    function DrawerOverlay({
      className,
      ...props
    }: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
      return (
        <DrawerPrimitive.Overlay
          data-slot="drawer-overlay"
          className={cn(
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
            className
          )}
          {...props}
        />
      )
    }
    
    function DrawerContent({
      className,
      children,
      ...props
    }: React.ComponentProps<typeof DrawerPrimitive.Content>) {
      return (
        <DrawerPortal data-slot="drawer-portal">
          <DrawerOverlay />
          <DrawerPrimitive.Content
            data-slot="drawer-content"
            className={cn(
              "group/drawer-content bg-background fixed z-50 flex h-auto flex-col",
              "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b",
              "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t",
              "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm",
              "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm",
              className
            )}
            {...props}
          >
            <div className="bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
            {children}
          </DrawerPrimitive.Content>
        </DrawerPortal>
      )
    }
    
    function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
      return (
        <div
          data-slot="drawer-header"
          className={cn(
            "flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left",
            className
          )}
          {...props}
        />
      )
    }
    
    function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
      return (
        <div
          data-slot="drawer-footer"
          className={cn("mt-auto flex flex-col gap-2 p-4", className)}
          {...props}
        />
      )
    }
    
    function DrawerTitle({
      className,
      ...props
    }: React.ComponentProps<typeof DrawerPrimitive.Title>) {
      return (
        <DrawerPrimitive.Title
          data-slot="drawer-title"
          className={cn("text-foreground font-semibold", className)}
          {...props}
        />
      )
    }
    
    function DrawerDescription({
      className,
      ...props
    }: React.ComponentProps<typeof DrawerPrimitive.Description>) {
      return (
        <DrawerPrimitive.Description
          data-slot="drawer-description"
          className={cn("text-muted-foreground text-sm", className)}
          {...props}
        />
      )
    }
    
    export {
      Drawer,
      DrawerPortal,
      DrawerOverlay,
      DrawerTrigger,
      DrawerClose,
      DrawerContent,
      DrawerHeader,
      DrawerFooter,
      DrawerTitle,
      DrawerDescription,
    }
    `,
  '/src/components/ui/dropdown-menu.tsx': `"use client"
    
    import * as React from "react"
    import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
    import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"
    
    import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
    
    function DropdownMenu({
      ...props
    }: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
      return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
    }
    
    function DropdownMenuPortal({
      ...props
    }: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
      return (
        <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
      )
    }
    
    function DropdownMenuTrigger({
      ...props
    }: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
      return (
        <DropdownMenuPrimitive.Trigger
          data-slot="dropdown-menu-trigger"
          {...props}
        />
      )
    }
    
    function DropdownMenuContent({
      className,
      sideOffset = 4,
      ...props
    }: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
      return (
        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content
            data-slot="dropdown-menu-content"
            sideOffset={sideOffset}
            className={cn(
              "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
              className
            )}
            {...props}
          />
        </DropdownMenuPrimitive.Portal>
      )
    }
    
    function DropdownMenuGroup({
      ...props
    }: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
      return (
        <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
      )
    }
    
    function DropdownMenuItem({
      className,
      inset,
      variant = "default",
      ...props
    }: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
      inset?: boolean
      variant?: "default" | "destructive"
    }) {
      return (
        <DropdownMenuPrimitive.Item
          data-slot="dropdown-menu-item"
          data-inset={inset}
          data-variant={variant}
          className={cn(
            "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            className
          )}
          {...props}
        />
      )
    }
    
    function DropdownMenuCheckboxItem({
      className,
      children,
      checked,
      ...props
    }: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
      return (
        <DropdownMenuPrimitive.CheckboxItem
          data-slot="dropdown-menu-checkbox-item"
          className={cn(
            "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            className
          )}
          checked={checked}
          {...props}
        >
          <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
            <DropdownMenuPrimitive.ItemIndicator>
              <CheckIcon className="size-4" />
            </DropdownMenuPrimitive.ItemIndicator>
          </span>
          {children}
        </DropdownMenuPrimitive.CheckboxItem>
      )
    }
    
    function DropdownMenuRadioGroup({
      ...props
    }: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
      return (
        <DropdownMenuPrimitive.RadioGroup
          data-slot="dropdown-menu-radio-group"
          {...props}
        />
      )
    }
    
    function DropdownMenuRadioItem({
      className,
      children,
      ...props
    }: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
      return (
        <DropdownMenuPrimitive.RadioItem
          data-slot="dropdown-menu-radio-item"
          className={cn(
            "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            className
          )}
          {...props}
        >
          <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
            <DropdownMenuPrimitive.ItemIndicator>
              <CircleIcon className="size-2 fill-current" />
            </DropdownMenuPrimitive.ItemIndicator>
          </span>
          {children}
        </DropdownMenuPrimitive.RadioItem>
      )
    }
    
    function DropdownMenuLabel({
      className,
      inset,
      ...props
    }: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
      inset?: boolean
    }) {
      return (
        <DropdownMenuPrimitive.Label
          data-slot="dropdown-menu-label"
          data-inset={inset}
          className={cn(
            "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
            className
          )}
          {...props}
        />
      )
    }
    
    function DropdownMenuSeparator({
      className,
      ...props
    }: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
      return (
        <DropdownMenuPrimitive.Separator
          data-slot="dropdown-menu-separator"
          className={cn("bg-border -mx-1 my-1 h-px", className)}
          {...props}
        />
      )
    }
    
    function DropdownMenuShortcut({
      className,
      ...props
    }: React.ComponentProps<"span">) {
      return (
        <span
          data-slot="dropdown-menu-shortcut"
          className={cn(
            "text-muted-foreground ml-auto text-xs tracking-widest",
            className
          )}
          {...props}
        />
      )
    }
    
    function DropdownMenuSub({
      ...props
    }: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
      return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
    }
    
    function DropdownMenuSubTrigger({
      className,
      inset,
      children,
      ...props
    }: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
      inset?: boolean
    }) {
      return (
        <DropdownMenuPrimitive.SubTrigger
          data-slot="dropdown-menu-sub-trigger"
          data-inset={inset}
          className={cn(
            "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8",
            className
          )}
          {...props}
        >
          {children}
          <ChevronRightIcon className="ml-auto size-4" />
        </DropdownMenuPrimitive.SubTrigger>
      )
    }
    
    function DropdownMenuSubContent({
      className,
      ...props
    }: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
      return (
        <DropdownMenuPrimitive.SubContent
          data-slot="dropdown-menu-sub-content"
          className={cn(
            "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
            className
          )}
          {...props}
        />
      )
    }
    
    export {
      DropdownMenu,
      DropdownMenuPortal,
      DropdownMenuTrigger,
      DropdownMenuContent,
      DropdownMenuGroup,
      DropdownMenuLabel,
      DropdownMenuItem,
      DropdownMenuCheckboxItem,
      DropdownMenuRadioGroup,
      DropdownMenuRadioItem,
      DropdownMenuSeparator,
      DropdownMenuShortcut,
      DropdownMenuSub,
      DropdownMenuSubTrigger,
      DropdownMenuSubContent,
    }
    `,
  '/src/components/ui/form.tsx': `import * as React from "react"
    import * as LabelPrimitive from "@radix-ui/react-label"
    import { Slot } from "@radix-ui/react-slot"
    import {
      Controller,
      FormProvider,
      useFormContext,
      useFormState,
      type ControllerProps,
      type FieldPath,
      type FieldValues,
    } from "react-hook-form"
    
    import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
    import { Label } from "@/components/ui/label"
    
    const Form = FormProvider
    
    type FormFieldContextValue<
      TFieldValues extends FieldValues = FieldValues,
      TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    > = {
      name: TName
    }
    
    const FormFieldContext = React.createContext<FormFieldContextValue>(
      {} as FormFieldContextValue
    )
    
    const FormField = <
      TFieldValues extends FieldValues = FieldValues,
      TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    >({
      ...props
    }: ControllerProps<TFieldValues, TName>) => {
      return (
        <FormFieldContext.Provider value={{ name: props.name }}>
          <Controller {...props} />
        </FormFieldContext.Provider>
      )
    }
    
    const useFormField = () => {
      const fieldContext = React.useContext(FormFieldContext)
      const itemContext = React.useContext(FormItemContext)
      const { getFieldState } = useFormContext()
      const formState = useFormState({ name: fieldContext.name })
      const fieldState = getFieldState(fieldContext.name, formState)
    
      if (!fieldContext) {
        throw new Error("useFormField should be used within <FormField>")
      }
    
      const { id } = itemContext
    
      return {
        id,
        name: fieldContext.name,
        formItemId: \`\${id}-form-item\`,
        formDescriptionId: \`\${id}-form-item-description\`,
        formMessageId: \`\${id}-form-item-message\`,
        ...fieldState,
      }
    }
    
    type FormItemContextValue = {
      id: string
    }
    
    const FormItemContext = React.createContext<FormItemContextValue>(
      {} as FormItemContextValue
    )
    
    function FormItem({ className, ...props }: React.ComponentProps<"div">) {
      const id = React.useId()
    
      return (
        <FormItemContext.Provider value={{ id }}>
          <div
            data-slot="form-item"
            className={cn("grid gap-2", className)}
            {...props}
          />
        </FormItemContext.Provider>
      )
    }
    
    function FormLabel({
      className,
      ...props
    }: React.ComponentProps<typeof LabelPrimitive.Root>) {
      const { error, formItemId } = useFormField()
    
      return (
        <Label
          data-slot="form-label"
          data-error={!!error}
          className={cn("data-[error=true]:text-destructive", className)}
          htmlFor={formItemId}
          {...props}
        />
      )
    }
    
    function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
      const { error, formItemId, formDescriptionId, formMessageId } = useFormField()
    
      return (
        <Slot
          data-slot="form-control"
          id={formItemId}
          aria-describedby={
            !error
              ? \`\${formDescriptionId}\`
              : \`\${formDescriptionId} \${formMessageId}\`
          }
          aria-invalid={!!error}
          {...props}
        />
      )
    }
    
    function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
      const { formDescriptionId } = useFormField()
    
      return (
        <p
          data-slot="form-description"
          id={formDescriptionId}
          className={cn("text-muted-foreground text-sm", className)}
          {...props}
        />
      )
    }
    
    function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
      const { error, formMessageId } = useFormField()
      const body = error ? String(error?.message ?? "") : props.children
    
      if (!body) {
        return null
      }
    
      return (
        <p
          data-slot="form-message"
          id={formMessageId}
          className={cn("text-destructive text-sm", className)}
          {...props}
        >
          {body}
        </p>
      )
    }
    
    export {
      useFormField,
      Form,
      FormItem,
      FormLabel,
      FormControl,
      FormDescription,
      FormMessage,
      FormField,
    }
    `,
  '/src/components/ui/hover-card.tsx': `import * as React from "react"
    import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
    
    import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
    
    function HoverCard({
      ...props
    }: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
      return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />
    }
    
    function HoverCardTrigger({
      ...props
    }: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
      return (
        <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
      )
    }
    
    function HoverCardContent({
      className,
      align = "center",
      sideOffset = 4,
      ...props
    }: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
      return (
        <HoverCardPrimitive.Portal data-slot="hover-card-portal">
          <HoverCardPrimitive.Content
            data-slot="hover-card-content"
            align={align}
            sideOffset={sideOffset}
            className={cn(
              "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
              className
            )}
            {...props}
          />
        </HoverCardPrimitive.Portal>
      )
    }
    
    export { HoverCard, HoverCardTrigger, HoverCardContent }
    `,
  '/src/components/ui/input-otp.tsx': `"use client"
    
    import * as React from "react"
    import { OTPInput, OTPInputContext } from "input-otp"
    import { MinusIcon } from "lucide-react"
    
    import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
    
    function InputOTP({
      className,
      containerClassName,
      ...props
    }: React.ComponentProps<typeof OTPInput> & {
      containerClassName?: string
    }) {
      return (
        <OTPInput
          data-slot="input-otp"
          containerClassName={cn(
            "flex items-center gap-2 has-disabled:opacity-50",
            containerClassName
          )}
          className={cn("disabled:cursor-not-allowed", className)}
          {...props}
        />
      )
    }
    
    function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
      return (
        <div
          data-slot="input-otp-group"
          className={cn("flex items-center", className)}
          {...props}
        />
      )
    }
    
    function InputOTPSlot({
      index,
      className,
      ...props
    }: React.ComponentProps<"div"> & {
      index: number
    }) {
      const inputOTPContext = React.useContext(OTPInputContext)
      const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}
    
      return (
        <div
          data-slot="input-otp-slot"
          data-active={isActive}
          className={cn(
            "data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",
            className
          )}
          {...props}
        >
          {char}
          {hasFakeCaret && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
            </div>
          )}
        </div>
      )
    }
    
    function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
      return (
        <div data-slot="input-otp-separator" role="separator" {...props}>
          <MinusIcon />
        </div>
      )
    }
    
    export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
    `,
  '/src/components/ui/input.tsx': `import * as React from "react"
    
    import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
    
    function Input({ className, type, ...props }: React.ComponentProps<"input">) {
      return (
        <input
          type={type}
          data-slot="input"
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className
          )}
          {...props}
        />
      )
    }
    
    export { Input }
    `,
  '/src/components/ui/label.tsx': `"use client"
    
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
  '/src/components/ui/menubar.tsx': `import * as React from "react"
    import * as MenubarPrimitive from "@radix-ui/react-menubar"
    import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"
    
    import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
    
    function Menubar({
      className,
      ...props
    }: React.ComponentProps<typeof MenubarPrimitive.Root>) {
      return (
        <MenubarPrimitive.Root
          data-slot="menubar"
          className={cn(
            "bg-background flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs",
            className
          )}
          {...props}
        />
      )
    }
    
    function MenubarMenu({
      ...props
    }: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
      return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />
    }
    
    function MenubarGroup({
      ...props
    }: React.ComponentProps<typeof MenubarPrimitive.Group>) {
      return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />
    }
    
    function MenubarPortal({
      ...props
    }: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
      return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />
    }
    
    function MenubarRadioGroup({
      ...props
    }: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
      return (
        <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
      )
    }
    
    function MenubarTrigger({
      className,
      ...props
    }: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
      return (
        <MenubarPrimitive.Trigger
          data-slot="menubar-trigger"
          className={cn(
            "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none",
            className
          )}
          {...props}
        />
      )
    }
    
    function MenubarContent({
      className,
      align = "start",
      alignOffset = -4,
      sideOffset = 8,
      ...props
    }: React.ComponentProps<typeof MenubarPrimitive.Content>) {
      return (
        <MenubarPortal>
          <MenubarPrimitive.Content
            data-slot="menubar-content"
            align={align}
            alignOffset={alignOffset}
            sideOffset={sideOffset}
            className={cn(
              "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-md",
              className
            )}
            {...props}
          />
        </MenubarPortal>
      )
    }
    
    function MenubarItem({
      className,
      inset,
      variant = "default",
      ...props
    }: React.ComponentProps<typeof MenubarPrimitive.Item> & {
      inset?: boolean
      variant?: "default" | "destructive"
    }) {
      return (
        <MenubarPrimitive.Item
          data-slot="menubar-item"
          data-inset={inset}
          data-variant={variant}
          className={cn(
            "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            className
          )}
          {...props}
        />
      )
    }
    
    function MenubarCheckboxItem({
      className,
      children,
      checked,
      ...props
    }: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>) {
      return (
        <MenubarPrimitive.CheckboxItem
          data-slot="menubar-checkbox-item"
          className={cn(
            "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            className
          )}
          checked={checked}
          {...props}
        >
          <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
            <MenubarPrimitive.ItemIndicator>
              <CheckIcon className="size-4" />
            </MenubarPrimitive.ItemIndicator>
          </span>
          {children}
        </MenubarPrimitive.CheckboxItem>
      )
    }
    
    function MenubarRadioItem({
      className,
      children,
      ...props
    }: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) {
      return (
        <MenubarPrimitive.RadioItem
          data-slot="menubar-radio-item"
          className={cn(
            "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            className
          )}
          {...props}
        >
          <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
            <MenubarPrimitive.ItemIndicator>
              <CircleIcon className="size-2 fill-current" />
            </MenubarPrimitive.ItemIndicator>
          </span>
          {children}
        </MenubarPrimitive.RadioItem>
      )
    }
    
    function MenubarLabel({
      className,
      inset,
      ...props
    }: React.ComponentProps<typeof MenubarPrimitive.Label> & {
      inset?: boolean
    }) {
      return (
        <MenubarPrimitive.Label
          data-slot="menubar-label"
          data-inset={inset}
          className={cn(
            "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
            className
          )}
          {...props}
        />
      )
    }
    
    function MenubarSeparator({
      className,
      ...props
    }: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
      return (
        <MenubarPrimitive.Separator
          data-slot="menubar-separator"
          className={cn("bg-border -mx-1 my-1 h-px", className)}
          {...props}
        />
      )
    }
    
    function MenubarShortcut({
      className,
      ...props
    }: React.ComponentProps<"span">) {
      return (
        <span
          data-slot="menubar-shortcut"
          className={cn(
            "text-muted-foreground ml-auto text-xs tracking-widest",
            className
          )}
          {...props}
        />
      )
    }
    
    function MenubarSub({
      ...props
    }: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
      return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
    }
    
    function MenubarSubTrigger({
      className,
      inset,
      children,
      ...props
    }: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
      inset?: boolean
    }) {
      return (
        <MenubarPrimitive.SubTrigger
          data-slot="menubar-sub-trigger"
          data-inset={inset}
          className={cn(
            "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[inset]:pl-8",
            className
          )}
          {...props}
        >
          {children}
          <ChevronRightIcon className="ml-auto h-4 w-4" />
        </MenubarPrimitive.SubTrigger>
      )
    }
    
    function MenubarSubContent({
      className,
      ...props
    }: React.ComponentProps<typeof MenubarPrimitive.SubContent>) {
      return (
        <MenubarPrimitive.SubContent
          data-slot="menubar-sub-content"
          className={cn(
            "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
            className
          )}
          {...props}
        />
      )
    }
    
    export {
      Menubar,
      MenubarPortal,
      MenubarMenu,
      MenubarTrigger,
      MenubarContent,
      MenubarGroup,
      MenubarSeparator,
      MenubarLabel,
      MenubarItem,
      MenubarShortcut,
      MenubarCheckboxItem,
      MenubarRadioGroup,
      MenubarRadioItem,
      MenubarSub,
      MenubarSubTrigger,
      MenubarSubContent,
    }
    `,
  '/src/components/ui/navigation-menu.tsx': `import * as React from "react"
    import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
    import { cva } from "class-variance-authority"
    import { ChevronDownIcon } from "lucide-react"
    
    import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
    
    function NavigationMenu({
      className,
      children,
      viewport = true,
      ...props
    }: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
      viewport?: boolean
    }) {
      return (
        <NavigationMenuPrimitive.Root
          data-slot="navigation-menu"
          data-viewport={viewport}
          className={cn(
            "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
            className
          )}
          {...props}
        >
          {children}
          {viewport && <NavigationMenuViewport />}
        </NavigationMenuPrimitive.Root>
      )
    }
    
    function NavigationMenuList({
      className,
      ...props
    }: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
      return (
        <NavigationMenuPrimitive.List
          data-slot="navigation-menu-list"
          className={cn(
            "group flex flex-1 list-none items-center justify-center gap-1",
            className
          )}
          {...props}
        />
      )
    }
    
    function NavigationMenuItem({
      className,
      ...props
    }: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
      return (
        <NavigationMenuPrimitive.Item
          data-slot="navigation-menu-item"
          className={cn("relative", className)}
          {...props}
        />
      )
    }
    
    const navigationMenuTriggerStyle = cva(
      "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1"
    )
    
    function NavigationMenuTrigger({
      className,
      children,
      ...props
    }: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
      return (
        <NavigationMenuPrimitive.Trigger
          data-slot="navigation-menu-trigger"
          className={cn(navigationMenuTriggerStyle(), "group", className)}
          {...props}
        >
          {children}{" "}
          <ChevronDownIcon
            className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
            aria-hidden="true"
          />
        </NavigationMenuPrimitive.Trigger>
      )
    }
    
    function NavigationMenuContent({
      className,
      ...props
    }: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
      return (
        <NavigationMenuPrimitive.Content
          data-slot="navigation-menu-content"
          className={cn(
            "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto",
            "group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
            className
          )}
          {...props}
        />
      )
    }
    
    function NavigationMenuViewport({
      className,
      ...props
    }: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
      return (
        <div
          className={cn(
            "absolute top-full left-0 isolate z-50 flex justify-center"
          )}
        >
          <NavigationMenuPrimitive.Viewport
            data-slot="navigation-menu-viewport"
            className={cn(
              "origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]",
              className
            )}
            {...props}
          />
        </div>
      )
    }
    
    function NavigationMenuLink({
      className,
      ...props
    }: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
      return (
        <NavigationMenuPrimitive.Link
          data-slot="navigation-menu-link"
          className={cn(
            "data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
            className
          )}
          {...props}
        />
      )
    }
    
    function NavigationMenuIndicator({
      className,
      ...props
    }: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
      return (
        <NavigationMenuPrimitive.Indicator
          data-slot="navigation-menu-indicator"
          className={cn(
            "data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
            className
          )}
          {...props}
        >
          <div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
        </NavigationMenuPrimitive.Indicator>
      )
    }
    
    export {
      NavigationMenu,
      NavigationMenuList,
      NavigationMenuItem,
      NavigationMenuContent,
      NavigationMenuTrigger,
      NavigationMenuLink,
      NavigationMenuIndicator,
      NavigationMenuViewport,
      navigationMenuTriggerStyle,
    }
    `,
  '/src/components/ui/pagination.tsx': `import * as React from "react"
    import {
      ChevronLeftIcon,
      ChevronRightIcon,
      MoreHorizontalIcon,
    } from "lucide-react"
    
    import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
    import { Button, buttonVariants } from "@/components/ui/button"
    
    function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
      return (
        <nav
          role="navigation"
          aria-label="pagination"
          data-slot="pagination"
          className={cn("mx-auto flex w-full justify-center", className)}
          {...props}
        />
      )
    }
    
    function PaginationContent({
      className,
      ...props
    }: React.ComponentProps<"ul">) {
      return (
        <ul
          data-slot="pagination-content"
          className={cn("flex flex-row items-center gap-1", className)}
          {...props}
        />
      )
    }
    
    function PaginationItem({ ...props }: React.ComponentProps<"li">) {
      return <li data-slot="pagination-item" {...props} />
    }
    
    type PaginationLinkProps = {
      isActive?: boolean
    } & Pick<React.ComponentProps<typeof Button>, "size"> &
      React.ComponentProps<"a">
    
    function PaginationLink({
      className,
      isActive,
      size = "icon",
      ...props
    }: PaginationLinkProps) {
      return (
        <a
          aria-current={isActive ? "page" : undefined}
          data-slot="pagination-link"
          data-active={isActive}
          className={cn(
            buttonVariants({
              variant: isActive ? "outline" : "ghost",
              size,
            }),
            className
          )}
          {...props}
        />
      )
    }
    
    function PaginationPrevious({
      className,
      ...props
    }: React.ComponentProps<typeof PaginationLink>) {
      return (
        <PaginationLink
          aria-label="Go to previous page"
          size="default"
          className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
          {...props}
        >
          <ChevronLeftIcon />
          <span className="hidden sm:block">Previous</span>
        </PaginationLink>
      )
    }
    
    function PaginationNext({
      className,
      ...props
    }: React.ComponentProps<typeof PaginationLink>) {
      return (
        <PaginationLink
          aria-label="Go to next page"
          size="default"
          className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
          {...props}
        >
          <span className="hidden sm:block">Next</span>
          <ChevronRightIcon />
        </PaginationLink>
      )
    }
    
    function PaginationEllipsis({
      className,
      ...props
    }: React.ComponentProps<"span">) {
      return (
        <span
          aria-hidden
          data-slot="pagination-ellipsis"
          className={cn("flex size-9 items-center justify-center", className)}
          {...props}
        >
          <MoreHorizontalIcon className="size-4" />
          <span className="sr-only">More pages</span>
        </span>
      )
    }
    
    export {
      Pagination,
      PaginationContent,
      PaginationLink,
      PaginationItem,
      PaginationPrevious,
      PaginationNext,
      PaginationEllipsis,
    }
    `,
  '/src/components/ui/popover.tsx': `"use client"
    
    import * as React from "react"
    import * as PopoverPrimitive from "@radix-ui/react-popover"
    
    import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
    
    function Popover({
      ...props
    }: React.ComponentProps<typeof PopoverPrimitive.Root>) {
      return <PopoverPrimitive.Root data-slot="popover" {...props} />
    }
    
    function PopoverTrigger({
      ...props
    }: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
      return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
    }
    
    function PopoverContent({
      className,
      align = "center",
      sideOffset = 4,
      ...props
    }: React.ComponentProps<typeof PopoverPrimitive.Content>) {
      return (
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            data-slot="popover-content"
            align={align}
            sideOffset={sideOffset}
            className={cn(
              "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
              className
            )}
            {...props}
          />
        </PopoverPrimitive.Portal>
      )
    }
    
    function PopoverAnchor({
      ...props
    }: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
      return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
    }
    
    export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
    `,
  '/src/components/ui/progress.tsx': `import * as React from "react"
    import * as ProgressPrimitive from "@radix-ui/react-progress"
    
    import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
    
    function Progress({
      className,
      value,
      ...props
    }: React.ComponentProps<typeof ProgressPrimitive.Root>) {
      return (
        <ProgressPrimitive.Root
          data-slot="progress"
          className={cn(
            "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
            className
          )}
          {...props}
        >
          <ProgressPrimitive.Indicator
            data-slot="progress-indicator"
            className="bg-primary h-full w-full flex-1 transition-all"
            style={{ transform: \`translateX(-\${100 - (value || 0)}%)\` }}
          />
        </ProgressPrimitive.Root>
      )
    }
    
    export { Progress }
    `,
  '/src/components/ui/radio-group.tsx': `"use client"
    
    import * as React from "react"
    import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
    import { CircleIcon } from "lucide-react"
    
    import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
    
    function RadioGroup({
      className,
      ...props
    }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
      return (
        <RadioGroupPrimitive.Root
          data-slot="radio-group"
          className={cn("grid gap-3", className)}
          {...props}
        />
      )
    }
    
    function RadioGroupItem({
      className,
      ...props
    }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
      return (
        <RadioGroupPrimitive.Item
          data-slot="radio-group-item"
          className={cn(
            "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        >
          <RadioGroupPrimitive.Indicator
            data-slot="radio-group-indicator"
            className="relative flex items-center justify-center"
          >
            <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
      )
    }
    
    export { RadioGroup, RadioGroupItem }
    `,
  '/src/components/ui/resizable.tsx': `import * as React from "react"
    import { GripVerticalIcon } from "lucide-react"
    import * as ResizablePrimitive from "react-resizable-panels"
    
    import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
    
    function ResizablePanelGroup({
      className,
      ...props
    }: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) {
      return (
        <ResizablePrimitive.PanelGroup
          data-slot="resizable-panel-group"
          className={cn(
            "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
            className
          )}
          {...props}
        />
      )
    }
    
    function ResizablePanel({
      ...props
    }: React.ComponentProps<typeof ResizablePrimitive.Panel>) {
      return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />
    }
    
    function ResizableHandle({
      withHandle,
      className,
      ...props
    }: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
      withHandle?: boolean
    }) {
      return (
        <ResizablePrimitive.PanelResizeHandle
          data-slot="resizable-handle"
          className={cn(
            "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2 [&[data-panel-group-direction=vertical]>div]:rotate-90",
            className
          )}
          {...props}
        >
          {withHandle && (
            <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
              <GripVerticalIcon className="size-2.5" />
            </div>
          )}
        </ResizablePrimitive.PanelResizeHandle>
      )
    }
    
    export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
    `,
  '/src/components/ui/scroll-area.tsx': `"use client"
    
    import * as React from "react"
    import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"
    
    import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
    
    function ScrollArea({
      className,
      children,
      ...props
    }: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
      return (
        <ScrollAreaPrimitive.Root
          data-slot="scroll-area"
          className={cn("relative", className)}
          {...props}
        >
          <ScrollAreaPrimitive.Viewport
            data-slot="scroll-area-viewport"
            className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
          >
            {children}
          </ScrollAreaPrimitive.Viewport>
          <ScrollBar />
          <ScrollAreaPrimitive.Corner />
        </ScrollAreaPrimitive.Root>
      )
    }
    
    function ScrollBar({
      className,
      orientation = "vertical",
      ...props
    }: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
      return (
        <ScrollAreaPrimitive.ScrollAreaScrollbar
          data-slot="scroll-area-scrollbar"
          orientation={orientation}
          className={cn(
            "flex touch-none p-px transition-colors select-none",
            orientation === "vertical" &&
              "h-full w-2.5 border-l border-l-transparent",
            orientation === "horizontal" &&
              "h-2.5 flex-col border-t border-t-transparent",
            className
          )}
          {...props}
        >
          <ScrollAreaPrimitive.ScrollAreaThumb
            data-slot="scroll-area-thumb"
            className="bg-border relative flex-1 rounded-full"
          />
        </ScrollAreaPrimitive.ScrollAreaScrollbar>
      )
    }
    
    export { ScrollArea, ScrollBar }
    `,
  '/src/components/ui/select.tsx': `import * as React from "react"
    import * as SelectPrimitive from "@radix-ui/react-select"
    import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"
    
    import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
    
    function Select({
      ...props
    }: React.ComponentProps<typeof SelectPrimitive.Root>) {
      return <SelectPrimitive.Root data-slot="select" {...props} />
    }
    
    function SelectGroup({
      ...props
    }: React.ComponentProps<typeof SelectPrimitive.Group>) {
      return <SelectPrimitive.Group data-slot="select-group" {...props} />
    }
    
    function SelectValue({
      ...props
    }: React.ComponentProps<typeof SelectPrimitive.Value>) {
      return <SelectPrimitive.Value data-slot="select-value" {...props} />
    }
    
    function SelectTrigger({
      className,
      size = "default",
      children,
      ...props
    }: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
      size?: "sm" | "default"
    }) {
      return (
        <SelectPrimitive.Trigger
          data-slot="select-trigger"
          data-size={size}
          className={cn(
            "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            className
          )}
          {...props}
        >
          {children}
          <SelectPrimitive.Icon asChild>
            <ChevronDownIcon className="size-4 opacity-50" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
      )
    }
    
    function SelectContent({
      className,
      children,
      position = "popper",
      ...props
    }: React.ComponentProps<typeof SelectPrimitive.Content>) {
      return (
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            data-slot="select-content"
            className={cn(
              "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
              position === "popper" &&
                "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
              className
            )}
            position={position}
            {...props}
          >
            <SelectScrollUpButton />
            <SelectPrimitive.Viewport
              className={cn(
                "p-1",
                position === "popper" &&
                  "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
              )}
            >
              {children}
            </SelectPrimitive.Viewport>
            <SelectScrollDownButton />
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      )
    }
    
    function SelectLabel({
      className,
      ...props
    }: React.ComponentProps<typeof SelectPrimitive.Label>) {
      return (
        <SelectPrimitive.Label
          data-slot="select-label"
          className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
          {...props}
        />
      )
    }
    
    function SelectItem({
      className,
      children,
      ...props
    }: React.ComponentProps<typeof SelectPrimitive.Item>) {
      return (
        <SelectPrimitive.Item
          data-slot="select-item"
          className={cn(
            "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
            className
          )}
          {...props}
        >
          <span className="absolute right-2 flex size-3.5 items-center justify-center">
            <SelectPrimitive.ItemIndicator>
              <CheckIcon className="size-4" />
            </SelectPrimitive.ItemIndicator>
          </span>
          <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        </SelectPrimitive.Item>
      )
    }
    
    function SelectSeparator({
      className,
      ...props
    }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
      return (
        <SelectPrimitive.Separator
          data-slot="select-separator"
          className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
          {...props}
        />
      )
    }
    
    function SelectScrollUpButton({
      className,
      ...props
    }: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
      return (
        <SelectPrimitive.ScrollUpButton
          data-slot="select-scroll-up-button"
          className={cn(
            "flex cursor-default items-center justify-center py-1",
            className
          )}
          {...props}
        >
          <ChevronUpIcon className="size-4" />
        </SelectPrimitive.ScrollUpButton>
      )
    }
    
    function SelectScrollDownButton({
      className,
      ...props
    }: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
      return (
        <SelectPrimitive.ScrollDownButton
          data-slot="select-scroll-down-button"
          className={cn(
            "flex cursor-default items-center justify-center py-1",
            className
          )}
          {...props}
        >
          <ChevronDownIcon className="size-4" />
        </SelectPrimitive.ScrollDownButton>
      )
    }
    
    export {
      Select,
      SelectContent,
      SelectGroup,
      SelectItem,
      SelectLabel,
      SelectScrollDownButton,
      SelectScrollUpButton,
      SelectSeparator,
      SelectTrigger,
      SelectValue,
    }
    `,
  '/src/components/ui/separator.tsx': `"use client"
    
    import * as React from "react"
    import * as SeparatorPrimitive from "@radix-ui/react-separator"
    
    import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
    
    function Separator({
      className,
      orientation = "horizontal",
      decorative = true,
      ...props
    }: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
      return (
        <SeparatorPrimitive.Root
          data-slot="separator"
          decorative={decorative}
          orientation={orientation}
          className={cn(
            "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
            className
          )}
          {...props}
        />
      )
    }
    
    export { Separator }
    `,
  '/src/components/ui/sheet.tsx': `import * as React from "react"
    import * as SheetPrimitive from "@radix-ui/react-dialog"
    import { XIcon } from "lucide-react"
    
    import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
    
    function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
      return <SheetPrimitive.Root data-slot="sheet" {...props} />
    }
    
    function SheetTrigger({
      ...props
    }: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
      return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
    }
    
    function SheetClose({
      ...props
    }: React.ComponentProps<typeof SheetPrimitive.Close>) {
      return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
    }
    
    function SheetPortal({
      ...props
    }: React.ComponentProps<typeof SheetPrimitive.Portal>) {
      return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
    }
    
    function SheetOverlay({
      className,
      ...props
    }: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
      return (
        <SheetPrimitive.Overlay
          data-slot="sheet-overlay"
          className={cn(
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
            className
          )}
          {...props}
        />
      )
    }
    
    function SheetContent({
      className,
      children,
      side = "right",
      ...props
    }: React.ComponentProps<typeof SheetPrimitive.Content> & {
      side?: "top" | "right" | "bottom" | "left"
    }) {
      return (
        <SheetPortal>
          <SheetOverlay />
          <SheetPrimitive.Content
            data-slot="sheet-content"
            className={cn(
              "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
              side === "right" &&
                "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
              side === "left" &&
                "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
              side === "top" &&
                "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
              side === "bottom" &&
                "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
              className
            )}
            {...props}
          >
            {children}
            <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
              <XIcon className="size-4" />
              <span className="sr-only">Close</span>
            </SheetPrimitive.Close>
          </SheetPrimitive.Content>
        </SheetPortal>
      )
    }
    
    function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
      return (
        <div
          data-slot="sheet-header"
          className={cn("flex flex-col gap-1.5 p-4", className)}
          {...props}
        />
      )
    }
    
    function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
      return (
        <div
          data-slot="sheet-footer"
          className={cn("mt-auto flex flex-col gap-2 p-4", className)}
          {...props}
        />
      )
    }
    
    function SheetTitle({
      className,
      ...props
    }: React.ComponentProps<typeof SheetPrimitive.Title>) {
      return (
        <SheetPrimitive.Title
          data-slot="sheet-title"
          className={cn("text-foreground font-semibold", className)}
          {...props}
        />
      )
    }
    
    function SheetDescription({
      className,
      ...props
    }: React.ComponentProps<typeof SheetPrimitive.Description>) {
      return (
        <SheetPrimitive.Description
          data-slot="sheet-description"
          className={cn("text-muted-foreground text-sm", className)}
          {...props}
        />
      )
    }
    
    export {
      Sheet,
      SheetTrigger,
      SheetClose,
      SheetContent,
      SheetHeader,
      SheetFooter,
      SheetTitle,
      SheetDescription,
    }
    `,
  '/src/components/ui/sidebar.tsx': `"use client"
    
    import * as React from "react"
    import { Slot } from "@radix-ui/react-slot"
    import { cva, VariantProps } from "class-variance-authority"
    import { PanelLeftIcon } from "lucide-react"
    
    import { useIsMobile } from "@/hooks/use-mobile"
    import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
    import { Button } from "@/components/ui/button"
    import { Input } from "@/components/ui/input"
    import { Separator } from "@/components/ui/separator"
    import {
      Sheet,
      SheetContent,
      SheetDescription,
      SheetHeader,
      SheetTitle,
    } from "@/components/ui/sheet"
    import { Skeleton } from "@/components/ui/skeleton"
    import {
      Tooltip,
      TooltipContent,
      TooltipProvider,
      TooltipTrigger,
    } from "@/components/ui/tooltip"
    
    const SIDEBAR_COOKIE_NAME = "sidebar_state"
    const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
    const SIDEBAR_WIDTH = "16rem"
    const SIDEBAR_WIDTH_MOBILE = "18rem"
    const SIDEBAR_WIDTH_ICON = "3rem"
    const SIDEBAR_KEYBOARD_SHORTCUT = "b"
    
    type SidebarContextProps = {
      state: "expanded" | "collapsed"
      open: boolean
      setOpen: (open: boolean) => void
      openMobile: boolean
      setOpenMobile: (open: boolean) => void
      isMobile: boolean
      toggleSidebar: () => void
    }
    
    const SidebarContext = React.createContext<SidebarContextProps | null>(null)
    
    function useSidebar() {
      const context = React.useContext(SidebarContext)
      if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider.")
      }
    
      return context
    }
    
    function SidebarProvider({
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    }: React.ComponentProps<"div"> & {
      defaultOpen?: boolean
      open?: boolean
      onOpenChange?: (open: boolean) => void
    }) {
      const isMobile = useIsMobile()
      const [openMobile, setOpenMobile] = React.useState(false)
    
      // This is the internal state of the sidebar.
      // We use openProp and setOpenProp for control from outside the component.
      const [_open, _setOpen] = React.useState(defaultOpen)
      const open = openProp ?? _open
      const setOpen = React.useCallback(
        (value: boolean | ((value: boolean) => boolean)) => {
          const openState = typeof value === "function" ? value(open) : value
          if (setOpenProp) {
            setOpenProp(openState)
          } else {
            _setOpen(openState)
          }
    
          // This sets the cookie to keep the sidebar state.
          document.cookie = \`\${SIDEBAR_COOKIE_NAME}=\${openState}; path=/; max-age=\${SIDEBAR_COOKIE_MAX_AGE}\`
        },
        [setOpenProp, open]
      )
    
      // Helper to toggle the sidebar.
      const toggleSidebar = React.useCallback(() => {
        return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
      }, [isMobile, setOpen, setOpenMobile])
    
      // Adds a keyboard shortcut to toggle the sidebar.
      React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          if (
            event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
            (event.metaKey || event.ctrlKey)
          ) {
            event.preventDefault()
            toggleSidebar()
          }
        }
    
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
      }, [toggleSidebar])
    
      // We add a state so that we can do data-state="expanded" or "collapsed".
      // This makes it easier to style the sidebar with Tailwind classes.
      const state = open ? "expanded" : "collapsed"
    
      const contextValue = React.useMemo<SidebarContextProps>(
        () => ({
          state,
          open,
          setOpen,
          isMobile,
          openMobile,
          setOpenMobile,
          toggleSidebar,
        }),
        [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
      )
    
      return (
        <SidebarContext.Provider value={contextValue}>
          <TooltipProvider delayDuration={0}>
            <div
              data-slot="sidebar-wrapper"
              style={
                {
                  "--sidebar-width": SIDEBAR_WIDTH,
                  "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                  ...style,
                } as React.CSSProperties
              }
              className={cn(
                "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
                className
              )}
              {...props}
            >
              {children}
            </div>
          </TooltipProvider>
        </SidebarContext.Provider>
      )
    }
    
    function Sidebar({
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      ...props
    }: React.ComponentProps<"div"> & {
      side?: "left" | "right"
      variant?: "sidebar" | "floating" | "inset"
      collapsible?: "offcanvas" | "icon" | "none"
    }) {
      const { isMobile, state, openMobile, setOpenMobile } = useSidebar()
    
      if (collapsible === "none") {
        return (
          <div
            data-slot="sidebar"
            className={cn(
              "bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",
              className
            )}
            {...props}
          >
            {children}
          </div>
        )
      }
    
      if (isMobile) {
        return (
          <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
            <SheetContent
              data-sidebar="sidebar"
              data-slot="sidebar"
              data-mobile="true"
              className="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden"
              style={
                {
                  "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
                } as React.CSSProperties
              }
              side={side}
            >
              <SheetHeader className="sr-only">
                <SheetTitle>Sidebar</SheetTitle>
                <SheetDescription>Displays the mobile sidebar.</SheetDescription>
              </SheetHeader>
              <div className="flex h-full w-full flex-col">{children}</div>
            </SheetContent>
          </Sheet>
        )
      }
    
      return (
        <div
          className="group peer text-sidebar-foreground hidden md:block"
          data-state={state}
          data-collapsible={state === "collapsed" ? collapsible : ""}
          data-variant={variant}
          data-side={side}
          data-slot="sidebar"
        >
          {/* This is what handles the sidebar gap on desktop */}
          <div
            data-slot="sidebar-gap"
            className={cn(
              "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
              "group-data-[collapsible=offcanvas]:w-0",
              "group-data-[side=right]:rotate-180",
              variant === "floating" || variant === "inset"
                ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
                : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
            )}
          />
          <div
            data-slot="sidebar-container"
            className={cn(
              "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
              side === "left"
                ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
                : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              variant === "floating" || variant === "inset"
                ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
                : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
              className
            )}
            {...props}
          >
            <div
              data-sidebar="sidebar"
              data-slot="sidebar-inner"
              className="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
            >
              {children}
            </div>
          </div>
        </div>
      )
    }
    
    function SidebarTrigger({
      className,
      onClick,
      ...props
    }: React.ComponentProps<typeof Button>) {
      const { toggleSidebar } = useSidebar()
    
      return (
        <Button
          data-sidebar="trigger"
          data-slot="sidebar-trigger"
          variant="ghost"
          size="icon"
          className={cn("size-7", className)}
          onClick={(event) => {
            onClick?.(event)
            toggleSidebar()
          }}
          {...props}
        >
          <PanelLeftIcon />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      )
    }
    
    function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
      const { toggleSidebar } = useSidebar()
    
      return (
        <button
          data-sidebar="rail"
          data-slot="sidebar-rail"
          aria-label="Toggle Sidebar"
          tabIndex={-1}
          onClick={toggleSidebar}
          title="Toggle Sidebar"
          className={cn(
            "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
            "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
            "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
            "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
            "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
            "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
            className
          )}
          {...props}
        />
      )
    }
    
    function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
      return (
        <main
          data-slot="sidebar-inset"
          className={cn(
            "bg-background relative flex w-full flex-1 flex-col",
            "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
            className
          )}
          {...props}
        />
      )
    }
    
    function SidebarInput({
      className,
      ...props
    }: React.ComponentProps<typeof Input>) {
      return (
        <Input
          data-slot="sidebar-input"
          data-sidebar="input"
          className={cn("bg-background h-8 w-full shadow-none", className)}
          {...props}
        />
      )
    }
    
    function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
      return (
        <div
          data-slot="sidebar-header"
          data-sidebar="header"
          className={cn("flex flex-col gap-2 p-2", className)}
          {...props}
        />
      )
    }
    
    function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
      return (
        <div
          data-slot="sidebar-footer"
          data-sidebar="footer"
          className={cn("flex flex-col gap-2 p-2", className)}
          {...props}
        />
      )
    }
    
    function SidebarSeparator({
      className,
      ...props
    }: React.ComponentProps<typeof Separator>) {
      return (
        <Separator
          data-slot="sidebar-separator"
          data-sidebar="separator"
          className={cn("bg-sidebar-border mx-2 w-auto", className)}
          {...props}
        />
      )
    }
    
    function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
      return (
        <div
          data-slot="sidebar-content"
          data-sidebar="content"
          className={cn(
            "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
            className
          )}
          {...props}
        />
      )
    }
    
    function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
      return (
        <div
          data-slot="sidebar-group"
          data-sidebar="group"
          className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
          {...props}
        />
      )
    }
    
    function SidebarGroupLabel({
      className,
      asChild = false,
      ...props
    }: React.ComponentProps<"div"> & { asChild?: boolean }) {
      const Comp = asChild ? Slot : "div"
    
      return (
        <Comp
          data-slot="sidebar-group-label"
          data-sidebar="group-label"
          className={cn(
            "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
            "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
            className
          )}
          {...props}
        />
      )
    }
    
    function SidebarGroupAction({
      className,
      asChild = false,
      ...props
    }: React.ComponentProps<"button"> & { asChild?: boolean }) {
      const Comp = asChild ? Slot : "button"
    
      return (
        <Comp
          data-slot="sidebar-group-action"
          data-sidebar="group-action"
          className={cn(
            "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
            // Increases the hit area of the button on mobile.
            "after:absolute after:-inset-2 md:after:hidden",
            "group-data-[collapsible=icon]:hidden",
            className
          )}
          {...props}
        />
      )
    }
    
    function SidebarGroupContent({
      className,
      ...props
    }: React.ComponentProps<"div">) {
      return (
        <div
          data-slot="sidebar-group-content"
          data-sidebar="group-content"
          className={cn("w-full text-sm", className)}
          {...props}
        />
      )
    }
    
    function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
      return (
        <ul
          data-slot="sidebar-menu"
          data-sidebar="menu"
          className={cn("flex w-full min-w-0 flex-col gap-1", className)}
          {...props}
        />
      )
    }
    
    function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
      return (
        <li
          data-slot="sidebar-menu-item"
          data-sidebar="menu-item"
          className={cn("group/menu-item relative", className)}
          {...props}
        />
      )
    }
    
    const sidebarMenuButtonVariants = cva(
      "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
      {
        variants: {
          variant: {
            default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            outline:
              "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
          },
          size: {
            default: "h-8 text-sm",
            sm: "h-7 text-xs",
            lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
          },
        },
        defaultVariants: {
          variant: "default",
          size: "default",
        },
      }
    )
    
    function SidebarMenuButton({
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className,
      ...props
    }: React.ComponentProps<"button"> & {
      asChild?: boolean
      isActive?: boolean
      tooltip?: string | React.ComponentProps<typeof TooltipContent>
    } & VariantProps<typeof sidebarMenuButtonVariants>) {
      const Comp = asChild ? Slot : "button"
      const { isMobile, state } = useSidebar()
    
      const button = (
        <Comp
          data-slot="sidebar-menu-button"
          data-sidebar="menu-button"
          data-size={size}
          data-active={isActive}
          className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
          {...props}
        />
      )
    
      if (!tooltip) {
        return button
      }
    
      if (typeof tooltip === "string") {
        tooltip = {
          children: tooltip,
        }
      }
    
      return (
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent
            side="right"
            align="center"
            hidden={state !== "collapsed" || isMobile}
            {...tooltip}
          />
        </Tooltip>
      )
    }
    
    function SidebarMenuAction({
      className,
      asChild = false,
      showOnHover = false,
      ...props
    }: React.ComponentProps<"button"> & {
      asChild?: boolean
      showOnHover?: boolean
    }) {
      const Comp = asChild ? Slot : "button"
    
      return (
        <Comp
          data-slot="sidebar-menu-action"
          data-sidebar="menu-action"
          className={cn(
            "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
            // Increases the hit area of the button on mobile.
            "after:absolute after:-inset-2 md:after:hidden",
            "peer-data-[size=sm]/menu-button:top-1",
            "peer-data-[size=default]/menu-button:top-1.5",
            "peer-data-[size=lg]/menu-button:top-2.5",
            "group-data-[collapsible=icon]:hidden",
            showOnHover &&
              "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
            className
          )}
          {...props}
        />
      )
    }
    
    function SidebarMenuBadge({
      className,
      ...props
    }: React.ComponentProps<"div">) {
      return (
        <div
          data-slot="sidebar-menu-badge"
          data-sidebar="menu-badge"
          className={cn(
            "text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none",
            "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
            "peer-data-[size=sm]/menu-button:top-1",
            "peer-data-[size=default]/menu-button:top-1.5",
            "peer-data-[size=lg]/menu-button:top-2.5",
            "group-data-[collapsible=icon]:hidden",
            className
          )}
          {...props}
        />
      )
    }
    
    function SidebarMenuSkeleton({
      className,
      showIcon = false,
      ...props
    }: React.ComponentProps<"div"> & {
      showIcon?: boolean
    }) {
      // Random width between 50 to 90%.
      const width = React.useMemo(() => {
        return \`\${Math.floor(Math.random() * 40) + 50}%\`
      }, [])
    
      return (
        <div
          data-slot="sidebar-menu-skeleton"
          data-sidebar="menu-skeleton"
          className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
          {...props}
        >
          {showIcon && (
            <Skeleton
              className="size-4 rounded-md"
              data-sidebar="menu-skeleton-icon"
            />
          )}
          <Skeleton
            className="h-4 max-w-(--skeleton-width) flex-1"
            data-sidebar="menu-skeleton-text"
            style={
              {
                "--skeleton-width": width,
              } as React.CSSProperties
            }
          />
        </div>
      )
    }
    
    function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
      return (
        <ul
          data-slot="sidebar-menu-sub"
          data-sidebar="menu-sub"
          className={cn(
            "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
            "group-data-[collapsible=icon]:hidden",
            className
          )}
          {...props}
        />
      )
    }
    
    function SidebarMenuSubItem({
      className,
      ...props
    }: React.ComponentProps<"li">) {
      return (
        <li
          data-slot="sidebar-menu-sub-item"
          data-sidebar="menu-sub-item"
          className={cn("group/menu-sub-item relative", className)}
          {...props}
        />
      )
    }
    
    function SidebarMenuSubButton({
      asChild = false,
      size = "md",
      isActive = false,
      className,
      ...props
    }: React.ComponentProps<"a"> & {
      asChild?: boolean
      size?: "sm" | "md"
      isActive?: boolean
    }) {
      const Comp = asChild ? Slot : "a"
    
      return (
        <Comp
          data-slot="sidebar-menu-sub-button"
          data-sidebar="menu-sub-button"
          data-size={size}
          data-active={isActive}
          className={cn(
            "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
            "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
            size === "sm" && "text-xs",
            size === "md" && "text-sm",
            "group-data-[collapsible=icon]:hidden",
            className
          )}
          {...props}
        />
      )
    }
    
    export {
      Sidebar,
      SidebarContent,
      SidebarFooter,
      SidebarGroup,
      SidebarGroupAction,
      SidebarGroupContent,
      SidebarGroupLabel,
      SidebarHeader,
      SidebarInput,
      SidebarInset,
      SidebarMenu,
      SidebarMenuAction,
      SidebarMenuBadge,
      SidebarMenuButton,
      SidebarMenuItem,
      SidebarMenuSkeleton,
      SidebarMenuSub,
      SidebarMenuSubButton,
      SidebarMenuSubItem,
      SidebarProvider,
      SidebarRail,
      SidebarSeparator,
      SidebarTrigger,
      useSidebar,
    }
    `,
  '/src/components/ui/skeleton.tsx': `import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
    
    function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
      return (
        <div
          data-slot="skeleton"
          className={cn("bg-accent animate-pulse rounded-md", className)}
          {...props}
        />
      )
    }
    
    export { Skeleton }
    `,
  '/src/components/ui/slider.tsx': `"use client"
    
    import * as React from "react"
    import * as SliderPrimitive from "@radix-ui/react-slider"
    
    import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
    
    function Slider({
      className,
      defaultValue,
      value,
      min = 0,
      max = 100,
      ...props
    }: React.ComponentProps<typeof SliderPrimitive.Root>) {
      const _values = React.useMemo(
        () =>
          Array.isArray(value)
            ? value
            : Array.isArray(defaultValue)
              ? defaultValue
              : [min, max],
        [value, defaultValue, min, max]
      )
    
      return (
        <SliderPrimitive.Root
          data-slot="slider"
          defaultValue={defaultValue}
          value={value}
          min={min}
          max={max}
          className={cn(
            "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
            className
          )}
          {...props}
        >
          <SliderPrimitive.Track
            data-slot="slider-track"
            className={cn(
              "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
            )}
          >
            <SliderPrimitive.Range
              data-slot="slider-range"
              className={cn(
                "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
              )}
            />
          </SliderPrimitive.Track>
          {Array.from({ length: _values.length }, (_, index) => (
            <SliderPrimitive.Thumb
              data-slot="slider-thumb"
              key={index}
              className="border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
            />
          ))}
        </SliderPrimitive.Root>
      )
    }
    
    export { Slider }
    `,
  '/src/components/ui/sonner.tsx': `import { useTheme } from "next-themes"
    import { Toaster as Sonner, ToasterProps } from "sonner"
    
    const Toaster = ({ ...props }: ToasterProps) => {
      const { theme = "system" } = useTheme()
    
      return (
        <Sonner
          theme={theme as ToasterProps["theme"]}
          className="toaster group"
          style={
            {
              "--normal-bg": "var(--popover)",
              "--normal-text": "var(--popover-foreground)",
              "--normal-border": "var(--border)",
            } as React.CSSProperties
          }
          {...props}
        />
      )
    }
    
    export { Toaster }
    `,
  '/src/components/ui/switch.tsx': `"use client"
    
    import * as React from "react"
    import * as SwitchPrimitive from "@radix-ui/react-switch"
    
    import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
    
    function Switch({
      className,
      ...props
    }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
      return (
        <SwitchPrimitive.Root
          data-slot="switch"
          className={cn(
            "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        >
          <SwitchPrimitive.Thumb
            data-slot="switch-thumb"
            className={cn(
              "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
            )}
          />
        </SwitchPrimitive.Root>
      )
    }
    
    export { Switch }
    `,
  '/src/components/ui/table.tsx': `import * as React from "react"
    
    import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
    
    function Table({ className, ...props }: React.ComponentProps<"table">) {
      return (
        <div
          data-slot="table-container"
          className="relative w-full overflow-x-auto"
        >
          <table
            data-slot="table"
            className={cn("w-full caption-bottom text-sm", className)}
            {...props}
          />
        </div>
      )
    }
    
    function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
      return (
        <thead
          data-slot="table-header"
          className={cn("[&_tr]:border-b", className)}
          {...props}
        />
      )
    }
    
    function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
      return (
        <tbody
          data-slot="table-body"
          className={cn("[&_tr:last-child]:border-0", className)}
          {...props}
        />
      )
    }
    
    function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
      return (
        <tfoot
          data-slot="table-footer"
          className={cn(
            "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
            className
          )}
          {...props}
        />
      )
    }
    
    function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
      return (
        <tr
          data-slot="table-row"
          className={cn(
            "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
            className
          )}
          {...props}
        />
      )
    }
    
    function TableHead({ className, ...props }: React.ComponentProps<"th">) {
      return (
        <th
          data-slot="table-head"
          className={cn(
            "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
            className
          )}
          {...props}
        />
      )
    }
    
    function TableCell({ className, ...props }: React.ComponentProps<"td">) {
      return (
        <td
          data-slot="table-cell"
          className={cn(
            "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
            className
          )}
          {...props}
        />
      )
    }
    
    function TableCaption({
      className,
      ...props
    }: React.ComponentProps<"caption">) {
      return (
        <caption
          data-slot="table-caption"
          className={cn("text-muted-foreground mt-4 text-sm", className)}
          {...props}
        />
      )
    }
    
    export {
      Table,
      TableHeader,
      TableBody,
      TableFooter,
      TableHead,
      TableRow,
      TableCell,
      TableCaption,
    }
    `,
  '/src/components/ui/tabs.tsx': `"use client"
    
    import * as React from "react"
    import * as TabsPrimitive from "@radix-ui/react-tabs"
    
    import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
    
    function Tabs({
      className,
      ...props
    }: React.ComponentProps<typeof TabsPrimitive.Root>) {
      return (
        <TabsPrimitive.Root
          data-slot="tabs"
          className={cn("flex flex-col gap-2", className)}
          {...props}
        />
      )
    }
    
    function TabsList({
      className,
      ...props
    }: React.ComponentProps<typeof TabsPrimitive.List>) {
      return (
        <TabsPrimitive.List
          data-slot="tabs-list"
          className={cn(
            "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
            className
          )}
          {...props}
        />
      )
    }
    
    function TabsTrigger({
      className,
      ...props
    }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
      return (
        <TabsPrimitive.Trigger
          data-slot="tabs-trigger"
          className={cn(
            "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            className
          )}
          {...props}
        />
      )
    }
    
    function TabsContent({
      className,
      ...props
    }: React.ComponentProps<typeof TabsPrimitive.Content>) {
      return (
        <TabsPrimitive.Content
          data-slot="tabs-content"
          className={cn("flex-1 outline-none", className)}
          {...props}
        />
      )
    }
    
    export { Tabs, TabsList, TabsTrigger, TabsContent }
    `,
  '/src/components/ui/textarea.tsx': `import * as React from "react"
    
    import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
    
    function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
      return (
        <textarea
          data-slot="textarea"
          className={cn(
            "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          {...props}
        />
      )
    }
    
    export { Textarea }
    `,
  '/src/components/ui/toggle-group.tsx': `"use client"
    
    import * as React from "react"
    import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
    import { type VariantProps } from "class-variance-authority"
    
    import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
      
  function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
  }
      
    import { toggleVariants } from "@/components/ui/toggle"
    
    const ToggleGroupContext = React.createContext<
      VariantProps<typeof toggleVariants>
    >({
      size: "default",
      variant: "default",
    })
    
    function ToggleGroup({
      className,
      variant,
      size,
      children,
      ...props
    }: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
      VariantProps<typeof toggleVariants>) {
      return (
        <ToggleGroupPrimitive.Root
          data-slot="toggle-group"
          data-variant={variant}
          data-size={size}
          className={cn(
            "group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs",
            className
          )}
          {...props}
        >
          <ToggleGroupContext.Provider value={{ variant, size }}>
            {children}
          </ToggleGroupContext.Provider>
        </ToggleGroupPrimitive.Root>
      )
    }
    
    function ToggleGroupItem({
      className,
      children,
      variant,
      size,
      ...props
    }: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
      VariantProps<typeof toggleVariants>) {
      const context = React.useContext(ToggleGroupContext)
    
      return (
        <ToggleGroupPrimitive.Item
          data-slot="toggle-group-item"
          data-variant={context.variant || variant}
          data-size={context.size || size}
          className={cn(
            toggleVariants({
              variant: context.variant || variant,
              size: context.size || size,
            }),
            "min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l",
            className
          )}
          {...props}
        >
          {children}
        </ToggleGroupPrimitive.Item>
      )
    }
    
    export { ToggleGroup, ToggleGroupItem }
    `,
  '/src/components/ui/toggle.tsx': `import * as React from "react"
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
  '/src/components/ui/tooltip.tsx': `import * as React from "react"
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
  '/src/hooks/use-mobile.ts': `import * as React from "react"
    
    const MOBILE_BREAKPOINT = 768
    
    export function useIsMobile() {
      const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)
    
      React.useEffect(() => {
        const mql = window.matchMedia(\`(max-width: \${MOBILE_BREAKPOINT - 1}px)\`)
        const onChange = () => {
          setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
        }
        mql.addEventListener("change", onChange)
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
        return () => mql.removeEventListener("change", onChange)
      }, [])
    
      return !!isMobile
    }
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
      <title>Obby Dev Generation</title>
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
      name: 'obby-dev-project',
      private: true,
      version: '0.1.0',
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
  '/src/pages/Index.tsx': `import { useState } from 'react'
import { Button } from "@/components/ui/button"

function Index() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex flex-col min-h-screen items-center justify-center gap-y-8'>
      <h1 className='font-bold font-mono text-2xl'>ObbyDev</h1>
      <div className='flex flex-col gap-y-4'>
        <Button onClick={() => setCount((count) => count + 1)}>
          {count === 0 ? 'Click to count' : \`Count is \${count}\`}
        </Button>
        <p className='font-medium text-lg'>
          Start prompting
        </p>
      </div>
      
    </div>
  )
}

export default Index`,
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

  '/src/index.css': `:root {
    --background: oklch(0.9900 0 0);
    --foreground: oklch(0 0 0);
    --card: oklch(1 0 0);
    --card-foreground: oklch(0 0 0);
    --popover: oklch(0.9900 0 0);
    --popover-foreground: oklch(0 0 0);
    --primary: oklch(0 0 0);
    --primary-foreground: oklch(1 0 0);
    --secondary: oklch(0.9400 0 0);
    --secondary-foreground: oklch(0 0 0);
    --muted: oklch(0.9700 0 0);
    --muted-foreground: oklch(0.4400 0 0);
    --accent: oklch(0.9400 0 0);
    --accent-foreground: oklch(0 0 0);
    --destructive: oklch(0.6300 0.1900 23.0300);
    --destructive-foreground: oklch(1 0 0);
    --border: oklch(0.9200 0 0);
    --input: oklch(0.9400 0 0);
    --ring: oklch(0 0 0);
    --chart-1: oklch(0.8100 0.1700 75.3500);
    --chart-2: oklch(0.5500 0.2200 264.5300);
    --chart-3: oklch(0.7200 0 0);
    --chart-4: oklch(0.9200 0 0);
    --chart-5: oklch(0.5600 0 0);
    --sidebar: oklch(0.9900 0 0);
    --sidebar-foreground: oklch(0 0 0);
    --sidebar-primary: oklch(0 0 0);
    --sidebar-primary-foreground: oklch(1 0 0);
    --sidebar-accent: oklch(0.9400 0 0);
    --sidebar-accent-foreground: oklch(0 0 0);
    --sidebar-border: oklch(0.9400 0 0);
    --sidebar-ring: oklch(0 0 0);
    --font-sans: Geist, sans-serif;
    --font-serif: Georgia, serif;
    --font-mono: Geist Mono, monospace;
    --radius: 0.5rem;
    --shadow-2xs: 0px 1px 2px 0px hsl(0 0% 0% / 0.09);
    --shadow-xs: 0px 1px 2px 0px hsl(0 0% 0% / 0.09);
    --shadow-sm: 0px 1px 2px 0px hsl(0 0% 0% / 0.18), 0px 1px 2px -1px hsl(0 0% 0% / 0.18);
    --shadow: 0px 1px 2px 0px hsl(0 0% 0% / 0.18), 0px 1px 2px -1px hsl(0 0% 0% / 0.18);
    --shadow-md: 0px 1px 2px 0px hsl(0 0% 0% / 0.18), 0px 2px 4px -1px hsl(0 0% 0% / 0.18);
    --shadow-lg: 0px 1px 2px 0px hsl(0 0% 0% / 0.18), 0px 4px 6px -1px hsl(0 0% 0% / 0.18);
    --shadow-xl: 0px 1px 2px 0px hsl(0 0% 0% / 0.18), 0px 8px 10px -1px hsl(0 0% 0% / 0.18);
    --shadow-2xl: 0px 1px 2px 0px hsl(0 0% 0% / 0.45);
  }
  
  .dark {
    --background: oklch(0 0 0);
    --foreground: oklch(1 0 0);
    --card: oklch(0.1400 0 0);
    --card-foreground: oklch(1 0 0);
    --popover: oklch(0.1800 0 0);
    --popover-foreground: oklch(1 0 0);
    --primary: oklch(1 0 0);
    --primary-foreground: oklch(0 0 0);
    --secondary: oklch(0.2500 0 0);
    --secondary-foreground: oklch(1 0 0);
    --muted: oklch(0.2300 0 0);
    --muted-foreground: oklch(0.7200 0 0);
    --accent: oklch(0.3200 0 0);
    --accent-foreground: oklch(1 0 0);
    --destructive: oklch(0.6900 0.2000 23.9100);
    --destructive-foreground: oklch(0 0 0);
    --border: oklch(0.2600 0 0);
    --input: oklch(0.3200 0 0);
    --ring: oklch(0.7200 0 0);
    --chart-1: oklch(0.8100 0.1700 75.3500);
    --chart-2: oklch(0.5800 0.2100 260.8400);
    --chart-3: oklch(0.5600 0 0);
    --chart-4: oklch(0.4400 0 0);
    --chart-5: oklch(0.9200 0 0);
    --sidebar: oklch(0.1800 0 0);
    --sidebar-foreground: oklch(1 0 0);
    --sidebar-primary: oklch(1 0 0);
    --sidebar-primary-foreground: oklch(0 0 0);
    --sidebar-accent: oklch(0.3200 0 0);
    --sidebar-accent-foreground: oklch(1 0 0);
    --sidebar-border: oklch(0.3200 0 0);
    --sidebar-ring: oklch(0.7200 0 0);
    --font-sans: Geist, sans-serif;
    --font-serif: Georgia, serif;
    --font-mono: Geist Mono, monospace;
    --radius: 0.5rem;
    --shadow-2xs: 0px 1px 2px 0px hsl(0 0% 0% / 0.09);
    --shadow-xs: 0px 1px 2px 0px hsl(0 0% 0% / 0.09);
    --shadow-sm: 0px 1px 2px 0px hsl(0 0% 0% / 0.18), 0px 1px 2px -1px hsl(0 0% 0% / 0.18);
    --shadow: 0px 1px 2px 0px hsl(0 0% 0% / 0.18), 0px 1px 2px -1px hsl(0 0% 0% / 0.18);
    --shadow-md: 0px 1px 2px 0px hsl(0 0% 0% / 0.18), 0px 2px 4px -1px hsl(0 0% 0% / 0.18);
    --shadow-lg: 0px 1px 2px 0px hsl(0 0% 0% / 0.18), 0px 4px 6px -1px hsl(0 0% 0% / 0.18);
    --shadow-xl: 0px 1px 2px 0px hsl(0 0% 0% / 0.18), 0px 8px 10px -1px hsl(0 0% 0% / 0.18);
    --shadow-2xl: 0px 1px 2px 0px hsl(0 0% 0% / 0.45);
  }
  
  @theme inline {
    --color-background: var(--background);
    --color-foreground: var(--foreground);
    --color-card: var(--card);
    --color-card-foreground: var(--card-foreground);
    --color-popover: var(--popover);
    --color-popover-foreground: var(--popover-foreground);
    --color-primary: var(--primary);
    --color-primary-foreground: var(--primary-foreground);
    --color-secondary: var(--secondary);
    --color-secondary-foreground: var(--secondary-foreground);
    --color-muted: var(--muted);
    --color-muted-foreground: var(--muted-foreground);
    --color-accent: var(--accent);
    --color-accent-foreground: var(--accent-foreground);
    --color-destructive: var(--destructive);
    --color-destructive-foreground: var(--destructive-foreground);
    --color-border: var(--border);
    --color-input: var(--input);
    --color-ring: var(--ring);
    --color-chart-1: var(--chart-1);
    --color-chart-2: var(--chart-2);
    --color-chart-3: var(--chart-3);
    --color-chart-4: var(--chart-4);
    --color-chart-5: var(--chart-5);
    --color-sidebar: var(--sidebar);
    --color-sidebar-foreground: var(--sidebar-foreground);
    --color-sidebar-primary: var(--sidebar-primary);
    --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
    --color-sidebar-accent: var(--sidebar-accent);
    --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
    --color-sidebar-border: var(--sidebar-border);
    --color-sidebar-ring: var(--sidebar-ring);
  
    --font-sans: var(--font-sans);
    --font-mono: var(--font-mono);
    --font-serif: var(--font-serif);
  
    --radius-sm: calc(var(--radius) - 4px);
    --radius-md: calc(var(--radius) - 2px);
    --radius-lg: var(--radius);
    --radius-xl: calc(var(--radius) + 4px);
  
    --shadow-2xs: var(--shadow-2xs);
    --shadow-xs: var(--shadow-xs);
    --shadow-sm: var(--shadow-sm);
    --shadow: var(--shadow);
    --shadow-md: var(--shadow-md);
    --shadow-lg: var(--shadow-lg);
    --shadow-xl: var(--shadow-xl);
    --shadow-2xl: var(--shadow-2xl);
  }
    `,
  '/src/main.tsx': `
import App from './App.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <div>
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
          '@/*': ['src/*'],
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
  # Generated by (Obby.dev)[https://obby.dev]
  `.trim(),
  '/src/lib/utils.ts': ` 
  import { type ClassValue, clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
  
  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
  `,
};
