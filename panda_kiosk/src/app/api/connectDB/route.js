// panda_kiosk/src/app/api/connectDB/route.js

import { NextResponse } from 'next/server';
import { Client } from 'pg';

export async function GET() {
    const connectionString = process.env.DATABASE_URL;
    const client = new Client({ connectionString });

    try {
        // Connect to the database
        await client.connect();
        console.log("Successfully connected to the database!");

        // Execute a query to get all records from the INVENTORY table
        const result = await client.query("SELECT * FROM INVENTORY");

        // Log the query result (useful for debugging)
        console.log("Query Result:", result.rows);

        // Return the result as JSON
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error("Database query failed:", error);
        return NextResponse.json({ message: "Failed to fetch data from database", error: error.message }, { status: 500 });
    } finally {
        // Ensure the client is closed when done
        await client.end();
    }
}
