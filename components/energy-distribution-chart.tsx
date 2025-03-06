"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface EnergyDistributionChartProps {
  data: any[]
}

export default function EnergyDistributionChart({ data }: EnergyDistributionChartProps) {
  // Transform data for pie chart
  const chartData = data.map((item) => ({
    name: item.name,
    value: item.usage,
  }))

  // Custom colors for each appliance
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

  return (
    <ChartContainer
      config={{
        Refrigerator: {
          label: "Refrigerator",
          color: "#0088FE",
        },
        HVAC: {
          label: "HVAC",
          color: "#00C49F",
        },
        "Washing Machine": {
          label: "Washing Machine",
          color: "#FFBB28",
        },
        TV: {
          label: "TV",
          color: "#FF8042",
        },
        Lights: {
          label: "Lights",
          color: "#8884d8",
        },
      }}
      className="h-full w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

