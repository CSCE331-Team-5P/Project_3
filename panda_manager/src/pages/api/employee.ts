import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchEmployees, addEmployee, updateEmployeeStatus, updateEmployeeField   } from '@/lib/db/staff_queries'; // Adjust path as needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'GET') {
            const employees = await fetchEmployees();
            res.status(200).json(employees);
        } else if (req.method === 'POST') {
            const newEmployee = req.body;

            if (
                !newEmployee.firstnameemployee ||
                !newEmployee.lastnameemployee ||
                !newEmployee.datebirth ||
                !newEmployee.roleemployee ||
                newEmployee.wageemployee === undefined ||
                !newEmployee.statusemployee
            ) {
                res.status(400).json({ error: 'Missing required fields' });
                return;
            }

            const insertedEmployee = await addEmployee(newEmployee);
            res.status(201).json(insertedEmployee);
        }  
        else if (req.method === 'PATCH') {
            const { id, field, value, status } = req.body;
        
            if (!id) {
                res.status(400).json({ error: "Employee ID is required." });
                return;
            }
        
            try {
                let updatedEmployee;
        
                if (status) {
                    // If a status update is requested
                    updatedEmployee = await updateEmployeeStatus(id, status);
                } else if (field && value !== undefined) {
                    // If a specific field update is requested
                    updatedEmployee = await updateEmployeeField(id, field, value);
                } else {
                    res.status(400).json({ error: "Invalid update parameters." });
                    return;
                }
        
                res.status(200).json(updatedEmployee);
            } catch (error) {
                console.error("Error updating employee:", error);
                res.status(500).json({ error: "Failed to update employee." });
            }
        }
        
        else {
            res.setHeader('Allow', ['GET', 'POST', 'PATCH']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}