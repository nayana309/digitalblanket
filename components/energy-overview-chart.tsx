"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface EnergyOverviewChartProps {
  data: any[]
  period: string
}

export default function EnergyOverviewChart({ data, period }: EnergyOverviewChartProps) {
  // Filter data based on period
  const filteredData = period === "day" ? data.slice(0, 1) : period === "week" ? data.slice(0, 7) : data

  return (
    <ChartContainer
      config={{
        total: {
          label: "Total Energy",
          color: "hsl(var(--chart-1))",
        },
        budget: {
          label: "Budget",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-full w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={filteredData}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tickFormatter={(value) => {
              // Format date based on period
              if (period === "day") {
                return value.split(" ")[1] // Return only time part
              }
              return value.split(" ")[0] // Return only date part
            }}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={10} tickFormatter={(value) => `${value} kWh`} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="total"
            strokeWidth={2}
            activeDot={{
              r: 6,
              style: { fill: "var(--color-total)", opacity: 0.8 },
            }}
            style={{
              stroke: "var(--color-total)",
            }}
          />
          <Line
            type="monotone"
            dataKey="budget"
            strokeWidth={2}
            strokeDasharray="4 4"
            style={{
              stroke: "var(--color-budget)",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

