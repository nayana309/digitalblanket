import AlertsList from "@/components/alerts-list"
import { alertsData } from "@/data/alerts-data"

export default function AlertsPage() {
  return (
    <>
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:gap-6 lg:h-[60px] lg:px-6 ml-16 md:ml-52">
        <h1 className="text-xl font-semibold">Alerts</h1>
      </header>

      <main className="flex-1 overflow-auto p-4 md:p-6 ml-16 md:ml-52">
        <AlertsList alerts={alertsData} />
      </main>
    </>
  )
}

