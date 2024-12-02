import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchEmployees, addEmployee, updateEmployeeStatus  } from '@/lib/db/staff_queries'; // Adjust path as needed

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
        } else if (req.method === 'PATCH') {
            const { id, status } = req.body;

            if (!id || !status) {
                res.status(400).json({ error: 'Missing required fields' });
                return;
            }

            const updatedEmployee = await updateEmployeeStatus(id, status);
            res.status(200).json(updatedEmployee);
        } else {
            res.setHeader('Allow', ['GET', 'POST', 'PATCH']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}