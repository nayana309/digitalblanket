"use client"

import { useState } from "react"
import {
  ArrowUpDown,
  MoreHorizontal,
  Pencil,
  Trash2,
  LightbulbIcon,
  MonitorSmartphone,
  WashingMachine,
  Tv,
} from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface Appliance {
  id: number
  name: string
  usage: number
  percentage: number
  status: string
  location?: string
  lastUpdated?: string
}

interface AppliancesTableProps {
  appliances: Appliance[]
  onAddClick: () => void
  onEditClick: (appliance: Appliance) => void
  onDeleteClick: (id: number) => void
}

export default function AppliancesTable({ appliances, onAddClick, onEditClick, onDeleteClick }: AppliancesTableProps) {
  const [sortColumn, setSortColumn] = useState<keyof Appliance>("usage")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [searchTerm, setSearchTerm] = useState("")

  const handleSort = (column: keyof Appliance) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedAppliances = [...appliances]
    .filter((appliance) => appliance.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const aValue = a[sortColumn]
      const bValue = b[sortColumn]

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      return 0
    })

  // Add some additional data for the table
  const enhancedAppliances = sortedAppliances.map((appliance) => ({
    ...appliance,
    location:
      appliance.location ||
      (appliance.name === "Refrigerator"
        ? "Kitchen"
        : appliance.name === "HVAC"
          ? "Whole House"
          : appliance.name === "Washing Machine"
            ? "Laundry Room"
            : appliance.name === "TV"
              ? "Living Room"
              : appliance.name === "Lights"
                ? "Whole House"
                : "Unknown"),
    lastUpdated: appliance.lastUpdated || "Today, 2:30 PM",
  }))

  const getApplianceIcon = (name: string) => {
    switch (name) {
      case "Refrigerator":
        return <MonitorSmartphone className="h-5 w-5 text-blue-500" />
      case "HVAC":
        return <LightbulbIcon className="h-5 w-5 text-yellow-500" />
      case "Washing Machine":
        return <WashingMachine className="h-5 w-5 text-green-500" />
      case "TV":
        return <Tv className="h-5 w-5 text-purple-500" />
      case "Lights":
        return <LightbulbIcon className="h-5 w-5 text-orange-500" />
      default:
        return <LightbulbIcon className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search appliances..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={onAddClick}>Add Appliance</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Appliance</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("usage")}
                  className="flex items-center gap-1 p-0 h-auto font-medium"
                >
                  Usage (kWh)
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("percentage")}
                  className="flex items-center gap-1 p-0 h-auto font-medium"
                >
                  % of Total
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("status")}
                  className="flex items-center gap-1 p-0 h-auto font-medium"
                >
                  Status
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enhancedAppliances.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No appliances found
                </TableCell>
              </TableRow>
            ) : (
              enhancedAppliances.map((appliance) => (
                <TableRow key={appliance.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {getApplianceIcon(appliance.name)}
                      {appliance.name}
                    </div>
                  </TableCell>
                  <TableCell>{appliance.location}</TableCell>
                  <TableCell>{appliance.usage} kWh</TableCell>
                  <TableCell>{appliance.percentage}%</TableCell>
                  <TableCell>
                    {appliance.status === "high" && <Badge variant="destructive">High Usage</Badge>}
                    {appliance.status === "normal" && <Badge variant="outline">Normal</Badge>}
                    {appliance.status === "low" && <Badge variant="secondary">Efficient</Badge>}
                  </TableCell>
                  <TableCell>{appliance.lastUpdated}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => onEditClick(appliance)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={() => onDeleteClick(appliance.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

