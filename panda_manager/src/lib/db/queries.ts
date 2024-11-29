import { query } from './client';

export const fetchInventory = async () => {
    const result = await query('SELECT * FROM inventory ORDER BY idinventory ASC'); // Replace with your actual inventory table name
    return result.rows; // Return the result rows
};

//^ //////////////////////////////////////////
//^ Home Page Queries
//^ //////////////////////////////////////////

//^ Get Monthly Revenue
