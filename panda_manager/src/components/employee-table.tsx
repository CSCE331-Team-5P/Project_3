"use client"

import { useState, useMemo, useEffect } from "react"
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
    idemployee: string
    firstnameemployee: string
    lastnameemployee: string
    datebirth: string
    roleemployee: string
    wageemployee: number
    statusemployee: string
}

export function EmployeeTable() {
    const [employees, setEmployees] = useState<Employee[]>([])

    const [newEmployee, setNewEmployee] = useState<Employee>({
        idemployee: "",
        firstnameemployee: "",
        lastnameemployee: "",
        datebirth: "",
        roleemployee: "",
        wageemployee: 0,
        statusemployee: "",
    })

    const [filters, setFilters] = useState({
        name: "",
        job: "",
        status: "",
    })
    
    useEffect(() => {
        async function fetchEmployees() {
            try {
                const response = await fetch('/api/employee'); // Ensure endpoint matches your API
                const data = await response.json();
    
                console.log('Fetched employees:', data); // Debugging log
    
                if (Array.isArray(data) && data.length > 0) {
                    // Map data to align with the Employee interface
                    
                    const mapped_employees = data.map((employee: any) => ({
                        idemployee: employee.idemployee, // Adjust to match actual API field
                        firstnameemployee: employee.firstnameemployee, // Adjust to match actual API field
                        lastnameemployee: employee.lastnameemployee,
                        datebirth: employee.datebirth,
                        roleemployee: employee.roleemployee,
                        wageemployee: employee.wageemployee,
                        statusemployee: employee.statusemployee,
                    }));
                    setEmployees(mapped_employees); 

                } else {
                    console.error('Employee data is not an array:', data);
                }
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        }
    
        fetchEmployees();
    }, []);
    

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setNewEmployee((prev) => ({ ...prev, [name]: name === "hourlyWage" ? parseFloat(value) : value }))
    }

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFilters((prev) => ({ ...prev, [name]: value }))
    }
    
    const addEmployee = () => {
        if (newEmployee.firstnameemployee && newEmployee.lastnameemployee) {
            const newId = `EMP${(employees.length + 1).toString().padStart(3, '0')}`
            setEmployees((prev) => [...prev, { ...newEmployee, idemployee: newId }])
            setNewEmployee({
                idemployee: "",
                firstnameemployee: "",
                lastnameemployee: "",
                datebirth: "",
                roleemployee: "",
                wageemployee: 0,
                statusemployee: "",
            })
        }
    }
    
    const removeEmployee = (id: string) => {
        setEmployees((prev) => prev.filter((employee) => employee.idemployee !== id))
    }

    const filteredEmployees = useMemo(() => {
        return employees.filter((employee) => {
            const nameMatch =
                filters.name === "" ||
                `${employee.firstnameemployee || ""} ${employee.lastnameemployee || ""}`.toLowerCase().includes(filters.name.toLowerCase());
    
            const jobMatch =
                filters.job === "" ||
                (employee.roleemployee?.toLowerCase() || "").includes(filters.job.toLowerCase());
    
            const statusMatch =
                filters.status === "" ||
                (employee.statusemployee?.toLowerCase() || "").includes(filters.status.toLowerCase());
    
            return nameMatch && jobMatch && statusMatch;
        });
    }, [employees, filters]);
    

    return (
        <div className="space-y-4">
            <div className="mb-12 grid grid-cols-3 gap-4">
                <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                        id="firstName"
                        name="firstName"
                        value={newEmployee.firstnameemployee}
                        onChange={handleInputChange}
                        placeholder="Enter first name"
                    />
                </div>
                <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                        id="lastName"
                        name="lastName"
                        value={newEmployee.lastnameemployee}
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
                        value={newEmployee.datebirth}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <Label htmlFor="job">Job</Label>
                    <Input
                        id="job"
                        name="job"
                        value={newEmployee.roleemployee}
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
                        value={newEmployee.wageemployee.toString()}
                        onChange={handleInputChange}
                        placeholder="Enter hourly wage"
                    />
                </div>
                <div>
                    <Label htmlFor="status">Status</Label>
                    <Input
                        id="status"
                        name="status"
                        value={newEmployee.statusemployee}
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
                        <TableRow key={employee.idemployee}>
                        <TableCell className="font-medium">{employee.idemployee}</TableCell>
                        <TableCell>{employee.firstnameemployee}</TableCell>
                        <TableCell>{employee.lastnameemployee}</TableCell>
                        <TableCell>{employee.datebirth}</TableCell>
                        <TableCell>{employee.roleemployee}</TableCell>
                        <TableCell>${employee.wageemployee}</TableCell>
                        <TableCell>{employee.statusemployee}</TableCell>
                        <TableCell>
                            <Button variant="destructive" onClick={() => removeEmployee(employee.idemployee)}>
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