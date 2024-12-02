"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ItemSale {
  itemName: string
  count: number
}

export function ProductUsage() {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [itemSales, setItemSales] = useState<ItemSale[]>([])

  const fetchItemSales = async (start: Date, end: Date) => {
    // This would be replaced with an actual API call
    const mockData: ItemSale[] = [
      { itemName: "Burger", count: Math.floor(Math.random() * 100) + 50 },
      { itemName: "Pizza", count: Math.floor(Math.random() * 100) + 50 },
      { itemName: "Salad", count: Math.floor(Math.random() * 100) + 20 },
      { itemName: "Fries", count: Math.floor(Math.random() * 200) + 100 },
      { itemName: "Soda", count: Math.floor(Math.random() * 150) + 75 },
      { itemName: "Ice Cream", count: Math.floor(Math.random() * 50) + 25 },
      { itemName: "Coffee", count: Math.floor(Math.random() * 120) + 80 },
      { itemName: "Sandwich", count: Math.floor(Math.random() * 80) + 40 },
    ]
    setItemSales(mockData)
  }

  const handleSubmit = () => {
    if (startDate && endDate) {
      fetchItemSales(startDate, endDate)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Item Sales Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : "Select start date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : "Select end date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button onClick={handleSubmit} disabled={!startDate || !endDate}>
            Generate Report
          </Button>
        </div>

        {itemSales.length > 0 && (
          <Table>
            <TableCaption>
              Item sales from {startDate && format(startDate, "MMMM d, yyyy")} to {endDate && format(endDate, "MMMM d, yyyy")}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead className="text-right">Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {itemSales.map((item) => (
                <TableRow key={item.itemName}>
                  <TableCell>{item.itemName}</TableCell>
                  <TableCell className="text-right">{item.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

