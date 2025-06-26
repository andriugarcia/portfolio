import * as React from "react"

import { cn } from "@/lib/utils"

const cardStyles = {
  green: "bg-green-800/30 dark:bg-green-950/10 dark:text-green-50",
  blue: "bg-blue-800/30 dark:bg-blue-950/10 dark:text-blue-50",
  pink: "bg-pink-800/30 dark:bg-pink-950/10 dark:text-pink-50",
  purple: "bg-purple-800/30 dark:bg-purple-950/10 dark:text-purple-50",
  red: "bg-red-800/30 dark:bg-red-950/10 dark:text-red-50",
  yellow: "bg-yellow-800/30 dark:bg-yellow-950/10 dark:text-yellow-50",
  gray: "bg-gray-800/30 dark:bg-gray-950/10 dark:text-gray-50",
  orange: "bg-orange-800/30 dark:bg-orange-950/10 dark:text-orange-50",
  teal: "bg-teal-800/30 dark:bg-teal-950/10 dark:text-teal-50",
  cyan: "bg-cyan-800/30 dark:bg-cyan-950/10 dark:text-cyan-50",
  indigo: "bg-indigo-800/30 dark:bg-indigo-950/10 dark:text-indigo-50",
  lime: "bg-lime-800/30 dark:bg-lime-950/10 dark:text-lime-50",
  amber: "bg-amber-800/30 dark:bg-amber-950/10 dark:text-amber-50",
  emerald: "bg-emerald-800/30 dark:bg-emerald-950/10 dark:text-emerald-50",
  rose: "bg-rose-800/30 dark:bg-rose-950/10 dark:text-rose-50",
  slate: "bg-slate-800/30 dark:bg-slate-950/10 dark:text-slate-50",
};

function Card({ className, color, ...props }: React.ComponentProps<"div">) {
  const colorClass = color ? cardStyles[color] : "bg-stone-800/30";
  return (
    <div
      data-slot="card"
      className={cn(
        colorClass,
        "backdrop-blur text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
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
