import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeStyles = {
  green: "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200",
  blue: "bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  pink: "bg-pink-200 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  purple: "bg-purple-200 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  red: "bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200",
  yellow: "bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  gray: "bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  orange: "bg-orange-200 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  teal: "bg-teal-200 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
  cyan: "bg-cyan-200 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
  indigo: "bg-indigo-200 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
  lime: "bg-lime-200 text-lime-800 dark:bg-lime-900 dark:text-lime-200",
  amber: "bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  emerald: "bg-emerald-200 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  rose: "bg-rose-200 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
  slate: "bg-slate-200 text-slate-800 dark:bg-slate-900 dark:text-slate-200",
};

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
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
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
  color,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button"

  if (props.onClick) {
    className += " hover:brightness-130"
  }

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className, badgeStyles[color as keyof typeof badgeStyles])}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
