"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

// ── Context ───────────────────────────────────────────────────────────────────
interface AccordionContextValue {
  value: string | string[]
  onToggle: (itemValue: string) => void
  multiple?: boolean
}

const AccordionContext = React.createContext<AccordionContextValue>({
  value: [],
  onToggle: () => {},
})

interface AccordionItemContextValue {
  itemValue: string
  isOpen: boolean
}

const AccordionItemContext = React.createContext<AccordionItemContextValue>({
  itemValue: "",
  isOpen: false,
})

// ── Root ──────────────────────────────────────────────────────────────────────
interface AccordionProps extends React.ComponentProps<"div"> {
  value?: string | string[]
  defaultValue?: string | string[]
  onValueChange?: (value: string | string[]) => void
  multiple?: boolean
}

function Accordion({
  className,
  value,
  defaultValue,
  onValueChange,
  multiple = false,
  children,
  ...props
}: AccordionProps) {
  const [internalValue, setInternalValue] = React.useState<string | string[]>(
    defaultValue ?? (multiple ? [] : "")
  )

  const controlled = value !== undefined
  const currentValue = controlled ? value! : internalValue

  const onToggle = React.useCallback(
    (itemValue: string) => {
      let next: string | string[]
      if (multiple) {
        const arr = Array.isArray(currentValue) ? currentValue : []
        next = arr.includes(itemValue)
          ? arr.filter((v) => v !== itemValue)
          : [...arr, itemValue]
      } else {
        next = currentValue === itemValue ? "" : itemValue
      }
      if (!controlled) setInternalValue(next)
      onValueChange?.(next)
    },
    [currentValue, multiple, controlled, onValueChange]
  )

  return (
    <AccordionContext.Provider value={{ value: currentValue, onToggle, multiple }}>
      <div
        data-slot="accordion"
        className={cn("flex w-full flex-col", className)}
        {...props}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

// ── Item ──────────────────────────────────────────────────────────────────────
interface AccordionItemProps extends React.ComponentProps<"div"> {
  value: string
}

function AccordionItem({ className, value: itemValue, ...props }: AccordionItemProps) {
  const { value } = React.useContext(AccordionContext)
  const isOpen = Array.isArray(value)
    ? value.includes(itemValue)
    : value === itemValue

  return (
    <AccordionItemContext.Provider value={{ itemValue, isOpen }}>
      <div
        data-slot="accordion-item"
        data-state={isOpen ? "open" : "closed"}
        className={cn("not-last:border-b", className)}
        {...props}
      />
    </AccordionItemContext.Provider>
  )
}

// ── Trigger ───────────────────────────────────────────────────────────────────
function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) {
  const { onToggle } = React.useContext(AccordionContext)
  const { itemValue, isOpen } = React.useContext(AccordionItemContext)

  return (
    <div className="flex">
      <button
        data-slot="accordion-trigger"
        aria-expanded={isOpen}
        onClick={() => onToggle(itemValue)}
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-center justify-between rounded-lg border border-transparent py-2.5 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          data-slot="accordion-trigger-icon"
          className={cn(
            "pointer-events-none ml-auto size-4 shrink-0 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
    </div>
  )
}

// ── Content ───────────────────────────────────────────────────────────────────
function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const { isOpen } = React.useContext(AccordionItemContext)

  return (
    <div
      data-slot="accordion-content"
      data-state={isOpen ? "open" : "closed"}
      className={cn(
        "overflow-hidden text-sm transition-all duration-200",
        isOpen ? "max-h-screen" : "max-h-0"
      )}
      {...props}
    >
      <div
        className={cn(
          "pt-0 pb-2.5 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
