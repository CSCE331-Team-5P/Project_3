// panda_kiosk/src/app/api/connectDB/route.js

import { NextResponse } from 'next/server';
import { Client } from 'pg';

export async function GET() {
    // Get the database URL from the environment variable
    const connectionString = process.env.DATABASE_URL;

    // Create a new PostgreSQL client
    const client = new Client({ connectionString });

    try {
        // Attempt to connect to the database
        await client.connect();
        console.log("Successfully connected to the database!"); // Log success message

        return NextResponse.json({ message: "Connected to the database successfully!" });
    } catch (error) {
        console.error("Database connection failed:", error); // Log error message
        return NextResponse.json({ message: "Failed to connect to the database", error: error.message }, { status: 500 });
    } finally {
        // Ensure the client is closed when done
        await client.end();
    }
}
