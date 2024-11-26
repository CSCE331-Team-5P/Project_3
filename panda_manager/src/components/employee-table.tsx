"use client"

import { useState, useMemo } from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { Separator } from "@radix-ui/react-separator"

interface Employee {
    id: string
    firstName: string
    lastName: string
    birthdate: string
    job: string
    hourlyWage: number
    status: string
}

export function EmployeeTable() {
    const [employees, setEmployees] = useState<Employee[]>([
        {
            id: "EMP001",
            firstName: "John",
            lastName: "Doe",
            birthdate: "1990-01-01",
            job: "Cashier",
            hourlyWage: 15,
            status: "Active",
        },
        {
            id: "EMP002",
            firstName: "Jane",
            lastName: "Smith",
            birthdate: "1985-05-15",
            job: "Cook",
            hourlyWage: 18,
            status: "Active",
        },
        {
            id: "EMP003",
            firstName: "Mike",
            lastName: "Johnson",
            birthdate: "1988-09-30",
            job: "Manager",
            hourlyWage: 25,
            status: "Active",
        },
    ])

    const [newEmployee, setNewEmployee] = useState<Omit<Employee, 'id'>>({
        firstName: "",
        lastName: "",
        birthdate: "",
        job: "",
        hourlyWage: 0,
        status: "",
    })

    const [filters, setFilters] = useState({
        name: "",
        job: "",
        status: "",
    })
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setNewEmployee((prev) => ({ ...prev, [name]: name === "hourlyWage" ? parseFloat(value) : value }))
    }

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFilters((prev) => ({ ...prev, [name]: value }))
    }
    
    const addEmployee = () => {
        if (newEmployee.firstName && newEmployee.lastName) {
            const newId = `EMP${(employees.length + 1).toString().padStart(3, '0')}`
            setEmployees((prev) => [...prev, { ...newEmployee, id: newId }])
            setNewEmployee({
                firstName: "",
                lastName: "",
                birthdate: "",
                job: "",
                hourlyWage: 0,
                status: "",
            })
        }
    }
    
    const removeEmployee = (id: string) => {
        setEmployees((prev) => prev.filter((employee) => employee.id !== id))
    }

    const filteredEmployees = useMemo(() => {
        return employees.filter((employee) => {
            const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase()
            return (
                fullName.includes(filters.name.toLowerCase()) &&
                employee.job.toLowerCase().includes(filters.job.toLowerCase()) &&
                employee.status.toLowerCase().includes(filters.status.toLowerCase())
            )
        })
    }, [employees, filters])

    return (
        <div className="space-y-4">
            <div className="mb-12 grid grid-cols-3 gap-4">
                <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                        id="firstName"
                        name="firstName"
                        value={newEmployee.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter first name"
                    />
                </div>
                <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                        id="lastName"
                        name="lastName"
                        value={newEmployee.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter last name"
                    />
                </div>
                <div>
                    <Label htmlFor="birthdate">Birthdate</Label>
                    <Input
                        id="birthdate"
                        name="birthdate"
                        type="date"
                        value={newEmployee.birthdate}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <Label htmlFor="job">Job</Label>
                    <Input
                        id="job"
                        name="job"
                        value={newEmployee.job}
                        onChange={handleInputChange}
                        placeholder="Enter job title"
                    />
                </div>
                <div>
                    <Label htmlFor="hourlyWage">Hourly Wage</Label>
                    <Input
                        id="hourlyWage"
                        name="hourlyWage"
                        type="number"
                        value={newEmployee.hourlyWage.toString()}
                        onChange={handleInputChange}
                        placeholder="Enter hourly wage"
                    />
                </div>
                <div>
                    <Label htmlFor="status">Status</Label>
                    <Input
                        id="status"
                        name="status"
                        value={newEmployee.status}
                        onChange={handleInputChange}
                        placeholder="Enter status"
                    />
                </div>
                <div></div>
                <Button
                    className="bg-red-700 hover:bg-red-400 mt-6"
                    onClick={addEmployee}
                >
                    Add Employee
                </Button>
            </div>
            <h2 className="text-lg font-normal">View Employees</h2>
            <div className="mb-4 grid grid-cols-3 gap-4">
                <div>
                    <Label htmlFor="nameFilter">Filter by Name</Label>
                    <Input
                        id="nameFilter"
                        name="name"
                        value={filters.name}
                        onChange={handleFilterChange}
                        placeholder="Filter by name"
                    />
                </div>
                <div>
                    <Label htmlFor="jobFilter">Filter by Job</Label>
                    <Input
                        id="jobFilter"
                        name="job"
                        value={filters.job}
                        onChange={handleFilterChange}
                        placeholder="Filter by job"
                    />
                </div>
                <div>
                    <Label htmlFor="statusFilter">Filter by Status</Label>
                    <Input
                        id="statusFilter"
                        name="status"
                        value={filters.status}
                        onChange={handleFilterChange}
                        placeholder="Filter by status"
                    />
                </div>
            </div>
            <Table>
                <TableCaption>A list of current employees.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Employee ID</TableHead>
                        <TableHead>First Name</TableHead>
                        <TableHead>Last Name</TableHead>
                        <TableHead>Birthdate</TableHead>
                        <TableHead>Job</TableHead>
                        <TableHead>Hourly Wage</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredEmployees.map((employee) => (
                        <TableRow key={employee.id}>
                        <TableCell className="font-medium">{employee.id}</TableCell>
                        <TableCell>{employee.firstName}</TableCell>
                        <TableCell>{employee.lastName}</TableCell>
                        <TableCell>{employee.birthdate}</TableCell>
                        <TableCell>{employee.job}</TableCell>
                        <TableCell>${employee.hourlyWage.toFixed(2)}</TableCell>
                        <TableCell>{employee.status}</TableCell>
                        <TableCell>
                            <Button variant="destructive" onClick={() => removeEmployee(employee.id)}>
                            Remove
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>    
    )
}