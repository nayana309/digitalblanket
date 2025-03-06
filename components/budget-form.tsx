"use client"

import type React from "react"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"

interface BudgetFormProps {
  currentBudget: number
  onBudgetChange: (budget: number) => void
}

const alertThresholds = [
  { value: "75", label: "75% of budget" },
  { value: "85", label: "85% of budget" },
  { value: "95", label: "95% of budget" },
  { value: "100", label: "At budget" },
]

export default function BudgetForm({ currentBudget, onBudgetChange }: BudgetFormProps) {
  const [budget, setBudget] = useState(currentBudget.toString())
  const [open, setOpen] = useState(false)
  const [alertThreshold, setAlertThreshold] = useState("85")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onBudgetChange(Number(budget))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="budget">Monthly Budget ($)</Label>
        <Input id="budget" type="number" value={budget} onChange={(e) => setBudget(e.target.value)} min="1" step="1" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="alert-threshold">Alert Threshold</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
              {alertThresholds.find((threshold) => threshold.value === alertThreshold)?.label || "Select threshold"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search threshold..." />
              <CommandList>
                <CommandEmpty>No threshold found.</CommandEmpty>
                <CommandGroup>
                  {alertThresholds.map((threshold) => (
                    <CommandItem
                      key={threshold.value}
                      value={threshold.value}
                      onSelect={(currentValue) => {
                        setAlertThreshold(currentValue)
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn("mr-2 h-4 w-4", alertThreshold === threshold.value ? "opacity-100" : "opacity-0")}
                      />
                      {threshold.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <Button type="submit" className="w-full">
        Update Budget
      </Button>
    </form>
  )
}

