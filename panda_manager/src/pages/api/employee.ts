import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchEmployees } from '@/lib/db/queries'; // Adjust path as needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const employees = await fetchEmployees(); // Fetch employees data
        res.status(200).json(employees); // Send the data as JSON response
    
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Error fetching employees' });
    }
}
