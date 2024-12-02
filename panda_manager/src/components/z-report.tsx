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

interface TransactionData {
  hour: string
  cashCount: number
  cardCount: number
  diningDollarsCount: number
  mealSwipeCount: number
  totalSales: number
}

export function ZReport() {
  const [date, setDate] = useState<Date>()
  const [transactionData, setTransactionData] = useState<TransactionData[]>(
    Array.from({ length: 12 }, (_, i) => ({
      hour: `${i + 10}:00:00`,
      cashCount: 0,
      cardCount: 0,
      diningDollarsCount: 0,
      mealSwipeCount: 0,
      totalSales: 0,
    }))
  )

  // Simulated data fetch - replace with actual API call
  const fetchTransactionData = async (selectedDate: Date) => {
    // This would be replaced with an actual API call
    const mockData: TransactionData[] = Array.from({ length: 12 }, (_, i) => ({
      hour: `${i + 10}:00:00`,
      cashCount: Math.floor(Math.random() * 30) + 30,
      cardCount: Math.floor(Math.random() * 30) + 30,
      diningDollarsCount: Math.floor(Math.random() * 30) + 30,
      mealSwipeCount: Math.floor(Math.random() * 30) + 30,
      totalSales: Math.floor(Math.random() * 1000) + 2000,
    }))
    setTransactionData(mockData)
  }

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (selectedDate) {
      fetchTransactionData(selectedDate)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold">Hourly Transaction Report</h2>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Select date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <Table>
        <TableCaption>
          {date 
            ? `Transaction report for ${format(date, "MMMM d, yyyy")}`
            : "Select a date to view the transaction report"
          }
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Hour</TableHead>
            <TableHead className="text-right">Cash Count</TableHead>
            <TableHead className="text-right">Card Count</TableHead>
            <TableHead className="text-right">Dining Dollars Count</TableHead>
            <TableHead className="text-right">Meal Swipe Count</TableHead>
            <TableHead className="text-right">Total Sales</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactionData.map((row) => (
            <TableRow key={row.hour}>
              <TableCell>{row.hour}</TableCell>
              <TableCell className="text-right">{row.cashCount}</TableCell>
              <TableCell className="text-right">{row.cardCount}</TableCell>
              <TableCell className="text-right">{row.diningDollarsCount}</TableCell>
              <TableCell className="text-right">{row.mealSwipeCount}</TableCell>
              <TableCell className="text-right">${row.totalSales.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

