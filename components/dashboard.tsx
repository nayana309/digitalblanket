"use client"

import { useState } from "react"
import {
  BarChart,
  BellRing,
  Calendar,
  LightbulbIcon,
  MonitorSmartphone,
  Settings,
  Tv,
  WashingMachine,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

import EnergyOverviewChart from "@/components/energy-overview-chart"
import EnergyDistributionChart from "@/components/energy-distribution-chart"
import EnergyTrendsChart from "@/components/energy-trends-chart"
import BudgetForm from "@/components/budget-form"
import { energyData, applianceData } from "@/data/energy-data"

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")
  const [budget, setBudget] = useState(250)
  const [showAlert, setShowAlert] = useState(true)

  const totalUsage = energyData.reduce((acc, day) => acc + day.total, 0)
  const percentOfBudget = Math.round((totalUsage / budget) * 100)
  const overBudget = totalUsage > budget

  return (
    <>
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:gap-6 lg:h-[60px] lg:px-6 ml-16 md:ml-52">
        <h1 className="text-xl font-semibold">Energy Dashboard</h1>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            March 2024
          </Button>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-4 md:p-6 ml-16 md:ml-52">
        {/* Budget Alert */}
        {showAlert && overBudget && (
          <Alert variant="destructive" className="mb-6">
            <BellRing className="h-4 w-4" />
            <AlertTitle>Energy Budget Alert</AlertTitle>
            <AlertDescription>
              You have exceeded your energy budget of ${budget}. Current usage is ${totalUsage.toFixed(2)}.
            </AlertDescription>
            <Button variant="outline" size="sm" className="ml-auto mt-2" onClick={() => setShowAlert(false)}>
              Dismiss
            </Button>
          </Alert>
        )}

        {/* Budget Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsage.toFixed(2)} kWh</div>
              <p className="text-xs text-muted-foreground">+2.5% from last {selectedPeriod}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Budget</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${budget}</div>
              <Progress
                value={percentOfBudget}
                className="mt-2"
                indicatorClassName={overBudget ? "bg-destructive" : undefined}
              />
              <p className="text-xs text-muted-foreground mt-2">{percentOfBudget}% of budget used</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Peak Usage</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6:00 PM</div>
              <p className="text-xs text-muted-foreground">8.2 kWh during peak hours</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CO₂ Saved</CardTitle>
              <LightbulbIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.5 kg</div>
              <p className="text-xs text-muted-foreground">-8% from last {selectedPeriod}</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="overview" className="mb-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Energy Usage Overview</CardTitle>
                <CardDescription>Your energy consumption over the past {selectedPeriod}</CardDescription>
                <div className="flex gap-2">
                  <Button
                    variant={selectedPeriod === "day" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPeriod("day")}
                  >
                    Day
                  </Button>
                  <Button
                    variant={selectedPeriod === "week" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPeriod("week")}
                  >
                    Week
                  </Button>
                  <Button
                    variant={selectedPeriod === "month" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPeriod("month")}
                  >
                    Month
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="h-[300px]">
                <EnergyOverviewChart data={energyData} period={selectedPeriod} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="distribution" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Energy Distribution by Appliance</CardTitle>
                <CardDescription>How your energy is being used across different appliances</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <EnergyDistributionChart data={applianceData} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="trends" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Energy Usage Trends</CardTitle>
                <CardDescription>Compare your energy usage across different time periods</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <EnergyTrendsChart data={energyData} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Appliances and Budget */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Appliances */}
          <Card>
            <CardHeader>
              <CardTitle>Appliance Usage</CardTitle>
              <CardDescription>Energy consumption by appliance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applianceData.map((appliance) => (
                  <div key={appliance.id} className="flex items-center">
                    <div className="mr-4">
                      {appliance.name === "Refrigerator" && <MonitorSmartphone className="h-8 w-8 text-blue-500" />}
                      {appliance.name === "HVAC" && <LightbulbIcon className="h-8 w-8 text-yellow-500" />}
                      {appliance.name === "Washing Machine" && <WashingMachine className="h-8 w-8 text-green-500" />}
                      {appliance.name === "TV" && <Tv className="h-8 w-8 text-purple-500" />}
                      {appliance.name === "Lights" && <LightbulbIcon className="h-8 w-8 text-orange-500" />}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{appliance.name}</p>
                        <span className="text-sm">{appliance.usage} kWh</span>
                      </div>
                      <Progress value={appliance.percentage} className="h-2" />
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{appliance.percentage}% of total</span>
                        {appliance.status === "high" && (
                          <Badge variant="destructive" className="text-xs">
                            High Usage
                          </Badge>
                        )}
                        {appliance.status === "normal" && (
                          <Badge variant="outline" className="text-xs">
                            Normal
                          </Badge>
                        )}
                        {appliance.status === "low" && (
                          <Badge variant="secondary" className="text-xs">
                            Efficient
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Budget Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Energy Budget</CardTitle>
              <CardDescription>Set and manage your energy budget</CardDescription>
            </CardHeader>
            <CardContent>
              <BudgetForm currentBudget={budget} onBudgetChange={setBudget} />
              <Separator className="my-4" />
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Budget Breakdown</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Current Usage:</div>
                    <div className="text-right font-medium">${totalUsage.toFixed(2)}</div>
                    <div>Budget:</div>
                    <div className="text-right font-medium">${budget}</div>
                    <div>Remaining:</div>
                    <div className={`text-right font-medium ${overBudget ? "text-destructive" : ""}`}>
                      ${(budget - totalUsage).toFixed(2)}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Tips to Save Energy</h4>
                  <ul className="text-sm space-y-1 list-disc pl-4">
                    <li>Turn off lights when not in use</li>
                    <li>Adjust thermostat by 1-2 degrees</li>
                    <li>Use washing machine during off-peak hours</li>
                    <li>Unplug devices when not in use</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}

