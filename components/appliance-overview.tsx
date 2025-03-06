"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Appliance {
  id: number
  name: string
  usage: number
  percentage: number
  status: string
}

interface ApplianceOverviewProps {
  appliances: Appliance[]
}

export default function ApplianceOverview({ appliances }: ApplianceOverviewProps) {
  // Transform data for charts
  const barChartData = appliances.map((appliance) => ({
    name: appliance.name,
    usage: appliance.usage,
  }))

  // Create data for weekly usage
  const weeklyData = [
    { day: "Mon", usage: 38.5 },
    { day: "Tue", usage: 42.1 },
    { day: "Wed", usage: 39.7 },
    { day: "Thu", usage: 41.2 },
    { day: "Fri", usage: 44.8 },
    { day: "Sat", usage: 36.9 },
    { day: "Sun", usage: 35.4 },
  ]

  // Create data for monthly usage
  const monthlyData = [
    { month: "Jan", usage: 1250 },
    { month: "Feb", usage: 1180 },
    { month: "Mar", usage: 1320 },
    { month: "Apr", usage: 1450 },
    { month: "May", usage: 1520 },
    { month: "Jun", usage: 1680 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appliance Overview</CardTitle>
        <CardDescription>Energy consumption patterns for your appliances</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="appliances">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="appliances">By Appliance</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>

          <TabsContent value="appliances" className="pt-4">
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  usage: {
                    label: "Energy Usage (kWh)",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-full w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={barChartData}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 10,
                      bottom: 20,
                    }}
                  >
                    <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={10} />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={10}
                      tickFormatter={(value) => `${value} kWh`}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="usage" fill="var(--color-usage)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="pt-4">
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  usage: {
                    label: "Daily Energy Usage (kWh)",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-full w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weeklyData}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 10,
                      bottom: 20,
                    }}
                  >
                    <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={10} />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={10}
                      tickFormatter={(value) => `${value} kWh`}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="usage" fill="var(--color-usage)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>

          <TabsContent value="monthly" className="pt-4">
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  usage: {
                    label: "Monthly Energy Usage (kWh)",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-full w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyData}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 10,
                      bottom: 20,
                    }}
                  >
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={10}
                      tickFormatter={(value) => `${value} kWh`}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="usage" fill="var(--color-usage)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

