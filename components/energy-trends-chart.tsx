"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface EnergyTrendsChartProps {
  data: any[]
}

export default function EnergyTrendsChart({ data }: EnergyTrendsChartProps) {
  // Use only the last 7 days for the trends chart
  const chartData = data.slice(0, 7)

  return (
    <ChartContainer
      config={{
        total: {
          label: "Total Energy",
          color: "hsl(var(--chart-1))",
        },
        hvac: {
          label: "HVAC",
          color: "hsl(var(--chart-2))",
        },
        appliances: {
          label: "Appliances",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-full w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 20,
          }}
        >
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tickFormatter={(value) => value.split(" ")[0]}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={10} tickFormatter={(value) => `${value} kWh`} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="hvac" stackId="a" fill="var(--color-hvac)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="appliances" stackId="a" fill="var(--color-appliances)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

