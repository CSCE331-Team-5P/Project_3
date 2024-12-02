"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const fields = [
  { value: "nameitem", label: "Item Name" },
  { value: "status", label: "Status" },
  { value: "priceitem", label: "Price" },
  { value: "categoryitem", label: "Category" },
  { value: "restocktime", label: "Restock Time" },
  { value: "quantityitem", label: "Quantity" },
]

export function InventoryUpdateForm() {
  const [inventoryId, setInventoryId] = useState("")
  const [selectedField, setSelectedField] = useState("")
  const [newValue, setNewValue] = useState("")

  const handleUpdate = async () => {
    // Implement the update logic here
    console.log("Updating:", { inventoryId, field: selectedField, value: newValue })
    // You would typically make an API call here to update the inventory item
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Update Inventory Item</h2>
      <div className="grid grid-cols-4 gap-4 items-end">
        <div>
          <Label htmlFor="inventoryId">Inventory ID</Label>
          <Input
            id="inventoryId"
            value={inventoryId}
            onChange={(e) => setInventoryId(e.target.value)}
            placeholder="Enter Inventory ID"
          />
        </div>
        <div>
          <Label htmlFor="field">Field to Update</Label>
          <Select onValueChange={setSelectedField}>
            <SelectTrigger>
              <SelectValue placeholder="Select field" />
            </SelectTrigger>
            <SelectContent>
              {fields.map((field) => (
                <SelectItem key={field.value} value={field.value}>
                  {field.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="newValue">New Value</Label>
          <Input
            id="newValue"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Enter new value"
          />
        </div>
        <Button
          className="bg-red-700 hover:bg-red-400"
          onClick={handleUpdate}
        >
          Update Item
        </Button>
      </div>
    </div>
  )
}

