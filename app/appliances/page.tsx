"use client"

import { useState } from "react"
import AppliancesTable from "@/components/appliances-table"
import AddApplianceDialog from "@/components/add-appliance-dialog"
import { applianceData as initialApplianceData } from "@/data/energy-data"

export default function AppliancesPage() {
  const [applianceData, setApplianceData] = useState(initialApplianceData)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingAppliance, setEditingAppliance] = useState<any | null>(null)

  const handleAddAppliance = (newAppliance: any) => {
    setApplianceData([
      ...applianceData,
      {
        ...newAppliance,
        id: applianceData.length + 1,
      },
    ])
  }

  const handleEditAppliance = (updatedAppliance: any) => {
    setApplianceData(
      applianceData.map((appliance) => (appliance.id === updatedAppliance.id ? updatedAppliance : appliance)),
    )
    setEditingAppliance(null)
  }

  const handleDeleteAppliance = (id: number) => {
    setApplianceData(applianceData.filter((appliance) => appliance.id !== id))
  }

  return (
    <>
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:gap-6 lg:h-[60px] lg:px-6 ml-16 md:ml-52">
        <h1 className="text-xl font-semibold">Appliances</h1>
      </header>

      <main className="flex-1 overflow-auto p-4 md:p-6 ml-16 md:ml-52">
        <AppliancesTable
          appliances={applianceData}
          onAddClick={() => setIsAddDialogOpen(true)}
          onEditClick={setEditingAppliance}
          onDeleteClick={handleDeleteAppliance}
        />

        <AddApplianceDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onAdd={handleAddAppliance}
          editingAppliance={null}
        />

        {editingAppliance && (
          <AddApplianceDialog
            open={!!editingAppliance}
            onOpenChange={() => setEditingAppliance(null)}
            onAdd={handleEditAppliance}
            editingAppliance={editingAppliance}
          />
        )}
      </main>
    </>
  )
}

