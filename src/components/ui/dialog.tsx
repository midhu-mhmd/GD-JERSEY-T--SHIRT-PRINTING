"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// ── Context ──────────────────────────────────────────────────────────────────
interface DialogContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DialogContext = React.createContext<DialogContextValue>({
  open: false,
  onOpenChange: () => {},
})

// ── Root ─────────────────────────────────────────────────────────────────────
interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

function Dialog({ open = false, onOpenChange = () => {}, children }: DialogProps) {
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  )
}

// ── Trigger ───────────────────────────────────────────────────────────────────
function DialogTrigger({ children, ...props }: React.ComponentProps<"button">) {
  const { onOpenChange } = React.useContext(DialogContext)
  return (
    <button
      data-slot="dialog-trigger"
      onClick={() => onOpenChange(true)}
      {...props}
    >
      {children}
    </button>
  )
}

// ── Portal ────────────────────────────────────────────────────────────────────
function DialogPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  if (!mounted) return null
  return createPortal(children, document.body)
}

// ── Overlay ───────────────────────────────────────────────────────────────────
function DialogOverlay({ className, ...props }: React.ComponentProps<"div">) {
  const { onOpenChange } = React.useContext(DialogContext)
  return (
    <div
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-black/50 backdrop-blur-sm",
        className
      )}
      onClick={() => onOpenChange(false)}
      {...props}
    />
  )
}

// ── Close ─────────────────────────────────────────────────────────────────────
function DialogClose({ children, ...props }: React.ComponentProps<"button">) {
  const { onOpenChange } = React.useContext(DialogContext)
  return (
    <button
      data-slot="dialog-close"
      onClick={() => onOpenChange(false)}
      {...props}
    >
      {children}
    </button>
  )
}

// ── Content ───────────────────────────────────────────────────────────────────
interface DialogContentProps extends React.ComponentProps<"div"> {
  showCloseButton?: boolean
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogContentProps) {
  const { open, onOpenChange } = React.useContext(DialogContext)

  // Close on Escape key
  React.useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false)
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <DialogPortal>
      <DialogOverlay />
      <div
        role="dialog"
        aria-modal="true"
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 outline-none sm:max-w-sm animate-in fade-in-0 zoom-in-95",
          className
        )}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
        {showCloseButton && (
          <Button
            variant="ghost"
            size="icon-sm"
            className="absolute top-2 right-2"
            onClick={() => onOpenChange(false)}
            aria-label="Close"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </Button>
        )}
      </div>
    </DialogPortal>
  )
}

// ── Header ────────────────────────────────────────────────────────────────────
function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────
interface DialogFooterProps extends React.ComponentProps<"div"> {
  showCloseButton?: boolean
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: DialogFooterProps) {
  const { onOpenChange } = React.useContext(DialogContext)
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Close
        </Button>
      )}
    </div>
  )
}

// ── Title ─────────────────────────────────────────────────────────────────────
function DialogTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="dialog-title"
      className={cn(
        "font-heading text-base leading-none font-medium",
        className
      )}
      {...props}
    />
  )
}

// ── Description ───────────────────────────────────────────────────────────────
function DialogDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="dialog-description"
      className={cn("text-sm text-muted-foreground", className)}
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
