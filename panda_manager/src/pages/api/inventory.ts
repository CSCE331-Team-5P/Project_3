import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchInventory, addInventoryItem, removeInventoryItem, updateInventoryItem } from '@/lib/db/inventory_queries'; // Import the fetchInventory function

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
        } else if (req.method === 'DELETE') {
            // Handle removing an inventory item
            const { idinventory } = req.body;

            if (idinventory < 0) {
                res.status(400).json({ error: 'Item ID is required to remove an item.' });
                return;
            }

            const updatedItem = await removeInventoryItem(idinventory);
            if (!updatedItem) {
                res.status(404).json({ error: 'Item not found.' });
                return;
            }

            res.status(200).json(updatedItem);
        } else if (req.method === 'PATCH') {
            const { idinventory, field, value } = req.body;

            if (!idinventory || !field || value === undefined) {
                res.status(400).json({ error: 'Missing required fields for update.' });
                return;
            }

            try {
                const updatedItem = await updateInventoryItem(idinventory, field, value);
                res.status(200).json(updatedItem);
            } catch (error) {
                res.status(400).json({ error: "Failed to update" });
            }
        }
        else {
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}