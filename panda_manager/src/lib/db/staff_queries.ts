import { query } from './client';

//^ //////////////////////////////////////////
//^ Staff Queries
//^ //////////////////////////////////////////

export const fetchEmployees = async () => {
    try {
        const result = await query("SELECT * FROM STAFF ORDER BY idEmployee ASC"); // Adjust query as needed
        return result.rows; // Ensure rows are returned
    } catch (error) {
        console.error("Database query error:", error);
        throw error; // Re-throw error to be caught in the API handler
    }
};