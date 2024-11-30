import { query } from './client';

export const fetchInventory = async () => {
    const result = await query('SELECT * FROM inventory ORDER BY idinventory ASC'); // Replace with your actual inventory table name
    return result.rows; // Return the result rows
};


export const fetchEmployees = async () => {
    try {
        const result = await query("SELECT * FROM STAFF ORDER BY idEmployee ASC"); // Adjust query as needed
        return result.rows; // Ensure rows are returned
    } catch (error) {
        console.error("Database query error:", error);
        throw error; // Re-throw error to be caught in the API handler
    }
};

//^ //////////////////////////////////////////
//^ Home Page Queries
//^ //////////////////////////////////////////

//^ Get Monthly Revenue
