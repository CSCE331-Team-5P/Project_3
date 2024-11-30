import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchInventory} from '@/lib/db/inventory_queries'; // Import the fetchInventory function

// This API handler fetches the inventory from the database
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Fetch data from the database
        const inventory = await fetchInventory();

        // Send the inventory data back as JSON
        res.status(200).json(inventory);
    } catch (error) {
        console.error('Error fetching inventory:', error);
        res.status(500).json({ error: 'Error fetching inventory' });
    }
}
