import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeStyles = {
  green: {
    filled: "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200",
    outline: "border-green-300 text-green-700 dark:border-green-700 dark:text-green-300",
    ghost: "text-green-700 dark:text-green-300"
  },
  blue: {
    filled: "bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    outline: "border-blue-300 text-blue-700 dark:border-blue-700 dark:text-blue-300",
    ghost: "text-blue-700 dark:text-blue-300"
  },
  pink: {
    filled: "bg-pink-200 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    outline: "border-pink-300 text-pink-700 dark:border-pink-700 dark:text-pink-300",
    ghost: "text-pink-700 dark:text-pink-300"
  },
  purple: {
    filled: "bg-purple-200 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    outline: "border-purple-300 text-purple-700 dark:border-purple-700 dark:text-purple-300",
    ghost: "text-purple-700 dark:text-purple-300"
  },
  red: {
    filled: "bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200",
    outline: "border-red-300 text-red-700 dark:border-red-700 dark:text-red-300",
    ghost: "text-red-700 dark:text-red-300"
  },
  yellow: {
    filled: "bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    outline: "border-yellow-300 text-yellow-700 dark:border-yellow-700 dark:text-yellow-300",
    ghost: "text-yellow-700 dark:text-yellow-300"
  },
  gray: {
    filled: "bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    outline: "border-gray-300 text-gray-700 dark:border-gray-700 dark:text-gray-300",
    ghost: "text-gray-700 dark:text-gray-300"
  },
  orange: {
    filled: "bg-orange-200 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    outline: "border-orange-300 text-orange-700 dark:border-orange-700 dark:text-orange-300",
    ghost: "text-orange-700 dark:text-orange-300"
  },
  teal: {
    filled: "bg-teal-200 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
    outline: "border-teal-300 text-teal-700 dark:border-teal-700 dark:text-teal-300",
    ghost: "text-teal-700 dark:text-teal-300"
  },
  cyan: {
    filled: "bg-cyan-200 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
    outline: "border-cyan-300 text-cyan-700 dark:border-cyan-700 dark:text-cyan-300",
    ghost: "text-cyan-700 dark:text-cyan-300"
  },
  indigo: {
    filled: "bg-indigo-200 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    outline: "border-indigo-300 text-indigo-700 dark:border-indigo-700 dark:text-indigo-300",
    ghost: "text-indigo-700 dark:text-indigo-300"
  },
  lime: {
    filled: "bg-lime-200 text-lime-800 dark:bg-lime-900 dark:text-lime-200",
    outline: "border-lime-300 text-lime-700 dark:border-lime-700 dark:text-lime-300",
    ghost: "text-lime-700 dark:text-lime-300"
  },
  amber: {
    filled: "bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    outline: "border-amber-300 text-amber-700 dark:border-amber-700 dark:text-amber-300",
    ghost: "text-amber-700 dark:text-amber-300"
  },
  emerald: {
    filled: "bg-emerald-200 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
    outline: "border-emerald-300 text-emerald-700 dark:border-emerald-700 dark:text-emerald-300",
    ghost: "text-emerald-700 dark:text-emerald-300"
  },
  rose: {
    filled: "bg-rose-200 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
    outline: "border-rose-300 text-rose-700 dark:border-rose-700 dark:text-rose-300",
    ghost: "text-rose-700 dark:text-rose-300"
  },
  slate: {
    filled: "bg-slate-200 text-slate-800 dark:bg-slate-900 dark:text-slate-200",
    outline: "border-slate-300 text-slate-700 dark:border-slate-700 dark:text-slate-300",
    ghost: "text-slate-700 dark:text-slate-300"
  },
  stone: {
    filled: "bg-stone-200 text-stone-800 dark:bg-stone-900 dark:text-stone-200",
    outline: "border-stone-300 text-stone-700 dark:border-stone-700 dark:text-stone-300",
    ghost: "text-stone-700 dark:text-stone-300"
  },
  brown: {
    filled: "bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    outline: "border-amber-300 text-amber-700 dark:border-amber-700 dark:text-amber-300",
    ghost: "text-amber-700 dark:text-amber-300"
  },
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
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        ghost:
          "border-transparent bg-transparent [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
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

  // Get the appropriate color style based on variant
  const getColorStyle = () => {
    if (!color || !(color in badgeStyles)) return "";
    
    const colorStyles = badgeStyles[color as keyof typeof badgeStyles];
    if (variant === "outline") {
      return colorStyles.outline;
    } else if (variant === "ghost") {
      return colorStyles.ghost;
    } else {
      return colorStyles.filled;
    }
  };

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className, getColorStyle())}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
