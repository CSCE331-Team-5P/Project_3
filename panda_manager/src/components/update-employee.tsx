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
  { value: "firstNameEmployee", label: "First Name" },
  { value: "lastNameEmployee", label: "Last Name" },
  { value: "roleEmployee", label: "Job Title" },
  { value: "wageEmployee", label: "Wage" },
  { value: "statusEmployee", label: "Status"}
]

export function EmployeeUpdateForm() {
  const [employeeID, setEmployeeID] = useState("")
  const [selectedField, setSelectedField] = useState("")
  const [newValue, setNewValue] = useState("")

  const handleUpdate = async () => {
    if (!employeeID || (!selectedField && !newValue)) {
        alert("All fields are required.");
        return;
    }

    const payload: any = { id: employeeID };

    if (selectedField && newValue) {
        payload.field = selectedField;
        payload.value = selectedField === 'wageEmployee' ? parseFloat(newValue) : newValue;
    } else {
        payload.status = newValue; // For status updates
    }

    try {
        const response = await fetch("/api/employee", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert(`Error updating employee: ${errorData.error}`);
            return;
        }

        const updatedEmployee = await response.json();
        console.log("Employee updated successfully:", updatedEmployee);
        alert("Employee updated successfully!");

        // Optionally update local state in EmployeeTable if needed
        // setEmployees((prev) =>
        //     prev.map((emp) =>
        //         emp.idemployee === updatedEmployee.idemployee ? updatedEmployee : emp
        //     )
        // );
    } catch (err) {
        console.error("Error updating employee:", err);
        alert("An error occurred while updating the employee.");
    }
  };


  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Update Employee Information</h2>
      <div className="grid grid-cols-4 gap-4 items-end">
        <div>
          <Label htmlFor="employeeID">Employee ID</Label>
          <Input
            id="employeeID"
            value={employeeID}
            onChange={(e) => setEmployeeID(e.target.value)}
            placeholder="Enter Employee ID"
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

