import { Pool } from 'pg';

// Load environment variables from .env or .env.local
console.log('Loading environment variables...');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Function to query the database
export const query = async (text: string, params?: unknown[]) => {
    try {
        const result = await pool.query(text, params);
        return result;
    } catch (err) {
        console.error('Database query error:', err);
        throw err; // Re-throw error to handle it in calling functions
    }
};


// Exporting the pool for direct usage (if needed)
export default pool;
