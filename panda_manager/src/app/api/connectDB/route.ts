import { NextResponse } from 'next/server';
import { Client, QueryResult } from 'pg';

interface InventoryItem {
  // Define the structure of your inventory item here
  // For example:
    id: number;
    name: string;
    quantity: number;
  // Add other fields as necessary
}

export async function GET(): Promise<NextResponse> {
    const connectionString = process.env.DATABASE_URL;
    
    if (!connectionString) {
        console.error("DATABASE_URL is not defined in environment variables");
        return NextResponse.json({ message: "Database configuration error" }, { status: 500 });
    }

    const client = new Client({ connectionString });

    try {
        // Connect to the database
        await client.connect();
        console.log("Successfully connected to the database!");

        // Execute a query to get all records from the INVENTORY table
        const result: QueryResult<InventoryItem> = await client.query("SELECT * FROM INVENTORY");

        // Log the query result (useful for debugging)
        console.log("Query Result:", result.rows);

        // Return the result as JSON
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error("Database query failed:", error);
        return NextResponse.json(
            { message: "Failed to fetch data from database", error: (error as Error).message },
            { status: 500 }
        );
    } finally {
        // Ensure the client is closed when done
        await client.end();
    }
}