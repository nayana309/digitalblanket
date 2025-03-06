"use client"

import { useState } from "react"
import { BellRing, Calendar, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Alert {
  id: number
  timestamp: string
  title: string
  description: string
  type: "warning" | "critical" | "info"
  isRead: boolean
  appliance?: string
}

interface AlertsListProps {
  alerts: Alert[]
}

export default function AlertsList({ alerts }: AlertsListProps) {
  const [selectedTab, setSelectedTab] = useState("recent")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [alertTypeFilter, setAlertTypeFilter] = useState<string>("all")
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)

  const filteredAlerts = alerts.filter((alert) => {
    // Filter by tab
    if (selectedTab === "recent" && new Date(alert.timestamp) < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
      return false
    }

    // Filter by date
    if (
      date &&
      !alert.timestamp.includes(
        date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      )
    ) {
      return false
    }

    // Filter by alert type
    if (alertTypeFilter !== "all" && alert.type !== alertTypeFilter) {
      return false
    }

    // Filter by read status
    if (showUnreadOnly && alert.isRead) {
      return false
    }

    return true
  })

  const getAlertBadge = (type: string) => {
    switch (type) {
      case "warning":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Warning
          </Badge>
        )
      case "critical":
        return <Badge variant="destructive">Critical</Badge>
      case "info":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Info
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const markAsRead = (id: number) => {
    // In a real app, this would update the database
    console.log(`Marking alert ${id} as read`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="recent">Recent Alerts</TabsTrigger>
            <TabsTrigger value="all">All Alerts</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-wrap gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <Calendar className="mr-2 h-4 w-4" />
                {date ? date.toDateString() : "Filter by date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>

          <Select value={alertTypeFilter} onValueChange={setAlertTypeFilter}>
            <SelectTrigger className="w-[180px] h-8">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="info">Info</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant={showUnreadOnly ? "default" : "outline"}
            size="sm"
            className="h-8"
            onClick={() => setShowUnreadOnly(!showUnreadOnly)}
          >
            <BellRing className="mr-2 h-4 w-4" />
            {showUnreadOnly ? "Showing Unread" : "Show Unread Only"}
          </Button>

          {(date || alertTypeFilter !== "all" || showUnreadOnly) && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8"
              onClick={() => {
                setDate(undefined)
                setAlertTypeFilter("all")
                setShowUnreadOnly(false)
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-4">
        {filteredAlerts.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              No alerts found matching your filters
            </CardContent>
          </Card>
        ) : (
          filteredAlerts.map((alert) => (
            <Card key={alert.id} className={!alert.isRead ? "border-l-4 border-l-blue-500" : ""}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {alert.title}
                      {getAlertBadge(alert.type)}
                    </CardTitle>
                    <CardDescription>{alert.timestamp}</CardDescription>
                  </div>
                  {!alert.isRead && (
                    <Button variant="ghost" size="sm" className="h-8" onClick={() => markAsRead(alert.id)}>
                      <Check className="mr-2 h-4 w-4" />
                      Mark as Read
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: alert.description }} />
              </CardContent>
              {alert.appliance && (
                <CardFooter className="pt-0 text-sm text-muted-foreground">Related to: {alert.appliance}</CardFooter>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

