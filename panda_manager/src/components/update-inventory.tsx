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
  { value: "status", label: "Status" },
  { value: "priceItem", label: "Price" },
  { value: "categoryItem", label: "Category" },
  { value: "quantityItem", label: "Quantity" },
]

export function InventoryUpdateForm() {
  const [inventoryId, setInventoryId] = useState("")
  const [selectedField, setSelectedField] = useState("")
  const [newValue, setNewValue] = useState("")

  const handleUpdate = async () => {
    if (!inventoryId || !selectedField || !newValue) {
        alert('Please fill out all fields before updating.');
        return;
    }

    const payload = {
        idinventory: inventoryId,
        field: selectedField,
        value: selectedField === 'priceitem' || selectedField === 'quantityitem' 
               ? Number(newValue) 
               : newValue,
    };

    try {
        const response = await fetch('/api/inventory', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const error = await response.json();
            alert(`Error updating inventory item: ${error.error}`);
            return;
        }

        const updatedItem = await response.json();
        console.log('Updated item:', updatedItem);
        alert('Inventory item updated successfully!');
    } catch (error) {
        console.error('Error updating inventory item:', error);
        alert('An error occurred while updating the item.');
    }
  };


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

