import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, ShieldCheck, AlertTriangle, Zap } from 'lucide-react'

export function Overview() {
  const items = [
    {
      title: "Total Devices",
      value: "246",
      icon: Activity,
      color: "text-blue-500",
    },
    {
      title: "Protected",
      value: "235",
      icon: ShieldCheck,
      color: "text-green-500",
    },
    {
      title: "Vulnerabilities",
      value: "12",
      icon: AlertTriangle,
      color: "text-yellow-500",
    },
    {
      title: "Active Threats",
      value: "2",
      icon: Zap,
      color: "text-red-500",
    },
  ]

  return (
    <>
      {items.map((item) => (
        <Card key={item.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {item.title}
            </CardTitle>
            <item.icon className={`h-4 w-4 ${item.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

