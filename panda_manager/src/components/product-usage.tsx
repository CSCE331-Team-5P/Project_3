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
  idInventory: number
  itemName: string
  totalUsed: number
}

export function ProductUsage() {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [itemSales, setItemSales] = useState<ItemSale[]>([])
  const [loading, setLoading] = useState(false)
const [error, setError] = useState<string | null>(null)


  const fetchItemSales = async (start: Date, end: Date) => {
    // This would be replaced with an actual API call
    try {
      setLoading(true)
      setError(null)

      console.log("Fetching item sales with dates:", {
        start: start.toISOString(),
        end: end.toISOString(),
      });
  
      const response = await fetch(
        `/api/item_usage?startDate=${start.toISOString()}&endDate=${end.toISOString()}`
      )
      
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`)
      }
  
      const data: ItemSale[] = await response.json()

      console.log("API Response Data:", data);
      
      setItemSales(
        data.map(item => ({
          idInventory: item.idInventory,
          itemName: item.itemName,
          totalUsed: item.totalUsed,// Convert 'totalUsed' string to a number
        }))
      )
      
      
      
    } catch (error: any) {
      console.error("Error fetching item usage:", error)
      setError(error.message || "Failed to fetch data")
    } finally {
      setLoading(false)
    }
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
                <TableRow key={item.idInventory}>
                  <TableCell>{item.itemName}</TableCell>
                  <TableCell className="text-right">{item.totalUsed}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

