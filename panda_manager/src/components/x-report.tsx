"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, PlusCircle } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DailySummary {
  cashCount: number
  cardCount: number
  diningDollarsCount: number
  mealSwipeCount: number
  totalSales: number
}

export function XReport() {
  const [date, setDate] = useState<Date>()
  const [summary, setSummary] = useState<DailySummary | null>(null)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isNewDayOpen, setIsNewDayOpen] = useState(false)

  const fetchDailySummary = async (selectedDate: Date) => {
    // This would be replaced with an actual API call
    const mockSummary: DailySummary = {
      cashCount: Math.floor(Math.random() * 300) + 100,
      cardCount: Math.floor(Math.random() * 500) + 200,
      diningDollarsCount: Math.floor(Math.random() * 200) + 50,
      mealSwipeCount: Math.floor(Math.random() * 400) + 100,
      totalSales: Math.floor(Math.random() * 10000) + 5000,
    }
    setSummary(mockSummary)
  }

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    setIsConfirmOpen(true)
  }

  const handleConfirm = () => {
    setIsConfirmOpen(false)
    if (date) {
      fetchDailySummary(date)
    }
  }

  const handleNewDay = () => {
    setIsNewDayOpen(false)
    setDate(undefined)
    setSummary(null)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto bg-red-700">
      <CardHeader>
        <CardTitle className="text-white">Daily Transaction Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
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
          <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Date Selection</DialogTitle>
                <DialogDescription>
                  Are you sure you want to view the transaction summary for {date ? format(date, "MMMM d, yyyy") : ""}?
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>Cancel</Button>
                <Button onClick={handleConfirm}>Confirm</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={isNewDayOpen} onOpenChange={setIsNewDayOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Day
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Open New Day</DialogTitle>
                <DialogDescription>
                  Are you sure you want to open a new day? This will clear the current data.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsNewDayOpen(false)}>Cancel</Button>
                <Button onClick={handleNewDay}>Confirm</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {summary && date && (
          <Alert>
            <AlertTitle>Daily Summary for {format(date, "MMMM d, yyyy")}</AlertTitle>
            <AlertDescription>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Cash Transactions: {summary.cashCount}</li>
                <li>Card Transactions: {summary.cardCount}</li>
                <li>Dining Dollars Transactions: {summary.diningDollarsCount}</li>
                <li>Meal Swipe Transactions: {summary.mealSwipeCount}</li>
                <li>Total Transactions: {summary.cashCount + summary.cardCount + summary.diningDollarsCount + summary.mealSwipeCount}</li>
                <li>Total Sales: ${summary.totalSales.toFixed(2)}</li>
              </ul>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}

