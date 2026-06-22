import React from "react";
import { cn } from "@/lib/utils";

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-xl border border-slate-800 bg-[#111218]", className)} {...props} />
))
Card.displayName = "Card"

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

export const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("font-bold text-white leading-none tracking-tight", className)} {...props} />
))
CardTitle.displayName = "CardTitle"

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

export const Badge = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'danger' | 'warning' | 'success' | 'outline' }>(({ className, variant = 'default', ...props }, ref) => {
  const variants = {
    default: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    danger: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    warning: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    outline: "text-slate-400 border-slate-700 bg-slate-800/50"
  };
  return (
    <div ref={ref} className={cn("inline-flex items-center rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border", variants[variant], className)} {...props} />
  )
})
Badge.displayName = "Badge"

export const Progress = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value: number; indicatorClass?: string }>(({ className, value, indicatorClass, ...props }, ref) => (
  <div ref={ref} className={cn("relative h-1.5 w-full overflow-hidden rounded bg-slate-800", className)} {...props}>
    <div className={cn("h-full w-full flex-1 bg-cyan-500 transition-all rounded", indicatorClass)} style={{ transform: `translateX(-${100 - (value || 0)}%)` }} />
  </div>
))
Progress.displayName = "Progress"

export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' | 'ghost' | 'danger' }>(({ className, variant = 'default', ...props }, ref) => {
  const variants = {
    default: "bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]",
    outline: "border border-slate-700 text-slate-300 hover:bg-slate-800",
    ghost: "hover:bg-slate-800 text-slate-300",
    danger: "bg-rose-500/20 text-rose-500 border border-rose-500/50 hover:bg-rose-500/30"
  };
  return (
    <button ref={ref} className={cn("inline-flex items-center justify-center rounded-md px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50", variants[variant], className)} {...props} />
  )
})
Button.displayName = "Button"
