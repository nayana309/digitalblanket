export const alertsData = [
  {
    id: 1,
    timestamp: "Mar 20, 2024 - 2:30 PM",
    title: "Energy Budget Exceeded",
    description:
      "Your monthly energy budget of $250 has been exceeded. Current usage is $288.50.<br><br>Consider adjusting your energy consumption or increasing your budget for the remainder of the month.",
    type: "critical",
    isRead: false,
    appliance: "All Appliances",
  },
  {
    id: 2,
    timestamp: "Mar 20, 2024 - 11:45 AM",
    title: "HVAC High Energy Usage",
    description:
      "Your HVAC system is consuming more energy than usual (18.2 kWh today).<br><br>This is 25% higher than your average daily usage. Consider checking your thermostat settings or scheduling maintenance.",
    type: "warning",
    isRead: false,
    appliance: "HVAC",
  },
  {
    id: 3,
    timestamp: "Mar 19, 2024 - 4:15 PM",
    title: "Peak Energy Hours",
    description:
      "You're currently in peak energy hours (4:00 PM - 7:00 PM).<br><br>Energy costs are higher during this time. Consider postponing high-energy activities like laundry or dishwashing until off-peak hours.",
    type: "info",
    isRead: true,
  },
  {
    id: 4,
    timestamp: "Mar 18, 2024 - 9:30 AM",
    title: "85% of Budget Reached",
    description:
      "You've reached 85% of your monthly energy budget.<br><br>At your current rate of consumption, you're projected to exceed your budget by the end of the month. Consider reducing usage where possible.",
    type: "warning",
    isRead: true,
  },
  {
    id: 5,
    timestamp: "Mar 17, 2024 - 3:20 PM",
    title: "Refrigerator Energy Spike",
    description:
      "Your refrigerator showed an unusual energy spike between 2:00 PM and 3:00 PM.<br><br>This could indicate the door was left open or the appliance is working harder than usual to maintain temperature. Check if the seals are working properly.",
    type: "warning",
    isRead: true,
    appliance: "Refrigerator",
  },
  {
    id: 6,
    timestamp: "Mar 16, 2024 - 10:15 AM",
    title: "System Update Available",
    description:
      "A new system update (v2.1.0) is available for your energy dashboard.<br><br>This update includes improved energy forecasting and new alert options. The update will be automatically installed during low-usage hours.",
    type: "info",
    isRead: true,
  },
  {
    id: 7,
    timestamp: "Mar 15, 2024 - 5:45 PM",
    title: "Energy Saving Opportunity",
    description:
      "We've detected that your lights are frequently left on in unoccupied rooms.<br><br>Installing motion sensors or smart switches could help reduce your energy consumption by an estimated 8-12% monthly.",
    type: "info",
    isRead: true,
    appliance: "Lights",
  },
  {
    id: 8,
    timestamp: "Mar 14, 2024 - 1:30 PM",
    title: "Daily Energy Threshold Exceeded",
    description:
      "Your energy usage today (45.2 kWh) has exceeded your daily threshold of 40 kWh.<br><br>This is the third time this week. Consider reviewing your energy consumption patterns or adjusting your threshold.",
    type: "critical",
    isRead: true,
  },
  {
    id: 9,
    timestamp: "Mar 13, 2024 - 11:20 AM",
    title: "Washing Machine Inefficient Cycle",
    description:
      "Your washing machine ran on a high-temperature cycle yesterday.<br><br>Using cold water for washing can reduce the energy used by up to 90%. Consider switching to cold water cycles when possible.",
    type: "warning",
    isRead: true,
    appliance: "Washing Machine",
  },
  {
    id: 10,
    timestamp: "Mar 12, 2024 - 9:10 AM",
    title: "Monthly Energy Report Available",
    description:
      "Your February energy report is now available.<br><br>Last month, you used 1,180 kWh, which is 5% less than January. Your biggest energy consumers were HVAC (36%) and Refrigerator (25%).",
    type: "info",
    isRead: true,
  },
]

