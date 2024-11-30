import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchInventory, addInventoryItem} from '@/lib/db/inventory_queries'; // Import the fetchInventory function

// This API handler fetches the inventory from the database
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'GET') {
            // Handle fetching inventory
            const inventory = await fetchInventory();
            res.status(200).json(inventory);
        } else if (req.method === 'POST') {
            // Handle adding a new inventory item
            const newItem = req.body;

            // Validate the input data
            if (
                !newItem.nameitem ||
                newItem.quantityitem === undefined || 
                !newItem.priceitem ||
                !newItem.categoryitem ||
                !newItem.restocktime ||
                !newItem.status
            ) {
                res.status(400).json({ error: 'Missing required fields' });
                return;
            }

            const insertedItem = await addInventoryItem(newItem);
            res.status(201).json(insertedItem);
        } else {
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
