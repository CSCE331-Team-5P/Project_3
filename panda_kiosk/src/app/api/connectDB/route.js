// panda_kiosk/src/app/api/connectDB/route.js

import { NextResponse } from 'next/server';
import { Client } from 'pg';


export async function POST(request) {
    const connectionString = process.env.DATABASE_URL;
    const client = new Client({ connectionString });

    try {
        // Parse the request body to get selectedItemIds and itemQuantities
        const { selectedItemIds, itemQuantities } = await request.json();

        if (!selectedItemIds || !itemQuantities || selectedItemIds.length !== itemQuantities.length) {
            return NextResponse.json(
                { success: false, message: "Invalid input: selectedItemIds and itemQuantities are required and must have the same length." },
                { status: 400 }
            );
        }

        await client.connect();
        console.log("Database connection established");

        // Loop through selectedItemIds and update the quantity for each
        for (let i = 0; i < selectedItemIds.length; i++) {
            const itemId = selectedItemIds[i];
            const quantityToDecrement = itemQuantities[i];

            // Perform the update query
            const result = await client.query(
                'UPDATE INVENTORY SET quantityItem = quantityItem - $1 WHERE nameItem = $2',
                [quantityToDecrement, itemId]
            );

            console.log(
                `Updated item "${itemId}": decremented by ${quantityToDecrement}. Rows affected: ${result.rowCount}`
            );
        }

        console.log("All items updated successfully");

        return NextResponse.json({ success: true, message: "Items updated successfully" });
    } catch (error) {
        console.error("Error during query execution:", error);
        return NextResponse.json(
            { success: false, message: "Failed to update items", error: error.message },
            { status: 500 }
        );
    } finally {
        await client.end();
        console.log("Database connection closed");
    }
}