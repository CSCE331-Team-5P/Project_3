"use client"

import { useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"
import { Check, ChevronsUpDown, TrendingUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const employees = [
  { name: "John Doe", value: "john" },
  { name: "Jane Smith", value: "jane" },
  { name: "Bob Johnson", value: "bob" },
]


const generateRandomHours = (weeks: number) => {
  return Array.from({ length: weeks }, (_, i) => ({
    week: `Week ${i + 1}`,
    hours: Math.floor(Math.random() * 20) + 20, // Random hours between 20 and 40
  }))
}

export default function EmployeeHoursChart() {
  const [open, setOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null)
  const [pastWeeksData, setPastWeeksData] = useState<{ week: string; hours: number }[]>([])
  const [currentWeekHours, setCurrentWeekHours] = useState(0)

  const emps = [
    { name: "John Doe", value: "john" },
    { name: "Jane Smith", value: "jane" },
    { name: "Bob Johnson", value: "bob" },
  ]

  const handleEmployeeSelect = (employee: string) => {
    setSelectedEmployee(employee)
    setOpen(false)
    // Generate random data for the selected employee
    setPastWeeksData(generateRandomHours(5))
    setCurrentWeekHours(Math.floor(Math.random() * 30) + 10) // Random hours between 10 and 40 for current week
  }

  const chartConfig = {
    hours: {
      label: "Hours",
      color: "hsl(var(--chart-1))",
    },
  }

  return (
    <div className="w-full mx-auto space-y-8">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedEmployee
              ? employees.find((employee) => employee.value === selectedEmployee)?.name
              : "Select employee..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search employee..." />
            <CommandEmpty>No employee found.</CommandEmpty>
            <CommandGroup>
              <CommandList>
                  {employees.map((employee) => (
                    <CommandItem
                      key={employee.value}
                      onSelect={(currentValue) => {
                        handleEmployeeSelect(currentValue)
                        setOpen(false)
                      }}
                      value={employee.value}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedEmployee === employee.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {employee.name}
                    </CommandItem>
                  ))}
              </CommandList>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedEmployee && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Past 5 Weeks Hours</CardTitle>
              <CardDescription>Weekly hours worked by the employee</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pastWeeksData}>
                    <XAxis dataKey="week" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="hours" fill="var(--color-hours)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex items-center gap-2 font-medium leading-none">
                Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total hours for the last 5 weeks
              </div>
            </CardFooter>
          </Card>

          <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
              <CardTitle>Current Week Hours</CardTitle>
              <CardDescription>Hours worked this week</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <RadialBarChart
                  data={[{ hours: currentWeekHours }]}
                  startAngle={0}
                  endAngle={250}
                  innerRadius={80}
                  outerRadius={110}
                >
                  <PolarGrid
                    gridType="circle"
                    radialLines={false}
                    stroke="none"
                    className="first:fill-muted last:fill-background"
                    polarRadius={[86, 74]}
                  />
                  <RadialBar dataKey="hours" background cornerRadius={10} />
                  <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-4xl font-bold"
                              >
                                {currentWeekHours.toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                Hours
                              </tspan>
                            </text>
                          )
                        }
                      }}
                    />
                  </PolarRadiusAxis>
                </RadialBarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 font-medium leading-none">
                Trending up by 3.1% this week <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total hours for the current week
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}