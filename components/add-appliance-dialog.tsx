"use client"

import { DialogFooter } from "@/components/ui/dialog"

import type React from "react"

import { useState, useEffect } from "react"
import { LightbulbIcon, MonitorSmartphone, WashingMachine, Tv } from "lucide-react"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

interface AddApplianceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (appliance: any) => void
  editingAppliance: any | null
}

const applianceTypes = [
  { value: "Refrigerator", icon: MonitorSmartphone },
  { value: "HVAC", icon: LightbulbIcon },
  { value: "Washing Machine", icon: WashingMachine },
  { value: "TV", icon: Tv },
  { value: "Lights", icon: LightbulbIcon },
]

const locations = ["Kitchen", "Living Room", "Bedroom", "Bathroom", "Laundry Room", "Whole House", "Other"]

export default function AddApplianceDialog({ open, onOpenChange, onAdd, editingAppliance }: AddApplianceDialogProps) {
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [usage, setUsage] = useState("0")
  const [percentage, setPercentage] = useState(0)
  const [status, setStatus] = useState("normal")

  // Reset form or populate with editing data when dialog opens/closes
  useEffect(() => {
    if (editingAppliance) {
      setName(editingAppliance.name)
      setLocation(editingAppliance.location || "")
      setUsage(editingAppliance.usage.toString())
      setPercentage(editingAppliance.percentage)
      setStatus(editingAppliance.status)
    } else {
      setName("")
      setLocation("")
      setUsage("0")
      setPercentage(0)
      setStatus("normal")
    }
  }, [editingAppliance])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newAppliance = {
      id: editingAppliance?.id,
      name,
      location,
      usage: Number.parseFloat(usage),
      percentage,
      status,
      lastUpdated: new Date().toLocaleString(),
    }

    onAdd(newAppliance)
    onOpenChange(false)
  }

  // Update status based on usage
  useEffect(() => {
    const usageValue = Number.parseFloat(usage)
    if (usageValue > 15) {
      setStatus("high")
    } else if (usageValue > 8) {
      setStatus("normal")
    } else {
      setStatus("low")
    }
  }, [usage])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{editingAppliance ? "Edit Appliance" : "Add New Appliance"}</DialogTitle>
          <DialogDescription>
            {editingAppliance
              ? "Update the details of your appliance."
              : "Add a new appliance to track its energy usage."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Appliance Type</Label>
            <Select value={name} onValueChange={setName} required>
              <SelectTrigger>
                <SelectValue placeholder="Select appliance type" />
              </SelectTrigger>
              <SelectContent>
                {applianceTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center gap-2">
                      <type.icon className="h-4 w-4" />
                      <span>{type.value}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Select value={location} onValueChange={setLocation} required>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="usage">Energy Usage (kWh)</Label>
            <Input
              id="usage"
              type="number"
              value={usage}
              onChange={(e) => setUsage(e.target.value)}
              min="0"
              step="0.1"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="percentage">Percentage of Total (%)</Label>
              <span className="text-sm text-muted-foreground">{percentage}%</span>
            </div>
            <Slider
              id="percentage"
              min={0}
              max={100}
              step={1}
              value={[percentage]}
              onValueChange={(value) => setPercentage(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={status === "low" ? "default" : "outline"}
                size="sm"
                className="flex-1"
                onClick={() => setStatus("low")}
              >
                Efficient
              </Button>
              <Button
                type="button"
                variant={status === "normal" ? "default" : "outline"}
                size="sm"
                className="flex-1"
                onClick={() => setStatus("normal")}
              >
                Normal
              </Button>
              <Button
                type="button"
                variant={status === "high" ? "default" : "outline"}
                size="sm"
                className="flex-1"
                onClick={() => setStatus("high")}
              >
                High Usage
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">{editingAppliance ? "Save Changes" : "Add Appliance"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

