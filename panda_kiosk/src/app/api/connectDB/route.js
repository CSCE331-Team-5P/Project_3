// panda_kiosk/src/app/api/connectDB/route.js

import { NextResponse } from 'next/server';
import { Client } from 'pg';


export async function POST(request) {
    const connectionString = process.env.DATABASE_URL;
    const client = new Client({ connectionString });

    try {
        // Parse the request body to get selectedItemIds and itemQuantities
        const { selectedItemIds, numSelectedItemIds, itemQuantities, total, employeeId, paymentMethod } = await request.json();

        if (!selectedItemIds || !itemQuantities || selectedItemIds.length !== itemQuantities.length) {
            return NextResponse.json(
                { success: false, message: "Invalid input: selectedItemIds and itemQuantities are required and must have the same length." },
                { status: 400 }
            );
        }

        await client.connect();
        console.log("Database connection established");
        //GET TRANSACTION ID
            // Fetch new transaction ID
        const transactionResult = await client.query(
            'SELECT COALESCE(MAX(idTransaction), 0) + 1 AS newTransactionId FROM TRANSACTIONS'
        );
        const newTransactionId = transactionResult.rows[0]?.newtransactionid;
        if (!newTransactionId) {
            throw new Error("Unable to determine new transaction ID");
        }
        console.log(`New transaction ID:`, newTransactionId);

        // Fetch new order ID
        const orderResult = await client.query(
            'SELECT COALESCE(MAX(idOrderItem), 0) + 1 AS newOrderId FROM ORDERS'
        );
        const newOrderId = orderResult.rows[0]?.neworderid;
        if (!newOrderId) {
            throw new Error("Unable to determine new order ID");
        }
        console.log(`Starting Order ID:`, newOrderId);

        // Initialize orderId for incrementing within the loop
        let currentOrderId = newOrderId;
        // Loop through selectedItemIds and update the quantity for each
        //Insert into TRANSACTIONS TABLE
        // let idEmp = employeeId;
        let amtTotal = total;
        const getTimestamp = () => {
            return new Date().toISOString().replace('T', ' ').slice(0, 19);
          };
          
        console.log(getTimestamp()); // Outputs: YYYY-MM-DD HH:mm:ss
        const transactionInsert = await client.query(
            "INSERT INTO TRANSACTIONS (idTransaction, idEmployee, dateTransaction, amountTotal, methodPayment) VALUES ($1, $2, $3, $4, $5)",
            [newTransactionId, employeeId, getTimestamp(), amtTotal, paymentMethod]
        );

        console.log(
            `Inserted into TRANSACTIONS. Transaction ID: ${newTransactionId}, Payment Method: "CASH"`
        );
        
        for (let i = 0; i < selectedItemIds.length; i++) {
            console.log(selectedItemIds);
            console.log(currentOrderId);
            const itemId = selectedItemIds[i];
            const quantityToDecrement = itemQuantities[i];

            // Fetch the idInventory from the INVENTORY table using the item name
            // const sanitizedItemId = itemId.replace(/'/g, "''");
            // console.log(sanitizedItemId);
            // // Fetch the idInventory using string interpolation
            // const inventoryQuery = `SELECT idInventory FROM INVENTORY WHERE nameItem = '$'`;
            // console.log(`Executing query: ${inventoryQuery}`);
            
            const inventoryResult = await client.query(
                'SELECT idInventory FROM INVENTORY WHERE nameItem = $1',
                [itemId]
            );
            
            //console.log(inventoryResult);
            if (!inventoryResult.rows.length) {
                throw new Error(`idInventory not found for item name: ${itemId}`);
            }
            const idInventory = inventoryResult.rows[0]?.idinventory;
            
            console.log(`idInventory for item "${itemId}":`, idInventory);
            // // Perform the update query
            const result = await client.query(
                'UPDATE INVENTORY SET quantityItem = quantityItem - $1 WHERE nameItem = $2',
                [quantityToDecrement, itemId]
            );

            console.log(
                `Updated item "${itemId}": decremented by ${quantityToDecrement}. Rows affected: ${result.rowCount}`
            );
            
            let description;

            switch (numSelectedItemIds) {
            case 1:
                description = "A la carte";
                break;
            case 2:
                description = "Bowl";
                break;
            case 3:
                description = "Plate";
                break;
            case 4:
                description = "Bigger Plate";
                break;
            default:
                description = "Invalid selection";
                break;
            }

            //need a for loop for the corresponding idInventory 
            //for element in itemQuantities[idInventory], continue to insert into orders
            for (let i = 0; i < quantityToDecrement; i++) {
                const orderInsert = await client.query(
                    "INSERT INTO ORDERS (idOrderItem, idInventory, idTransaction, typeMeal) VALUES ($1, $2, $3, $4)",
                    [currentOrderId, idInventory, newTransactionId, description]
                );
    
                console.log(
                    `Inserted into ORDERS. Order ID: ${currentOrderId}, Transaction ID: ${newTransactionId}, Item ID: ${itemId}, Meal Type: ${description}`
                );
            
                // Increment newOrderId for the next item
                currentOrderId++;
            }

            // const orderInsert = await client.query(
            //     "INSERT INTO ORDERS (idOrderItem, idInventory, idTransaction, typeMeal) VALUES ($1, $2, $3, $4)",
            //     [currentOrderId, idInventory, newTransactionId, description]
            // );

            // console.log(
            //     `Inserted into ORDERS. Order ID: ${currentOrderId}, Transaction ID: ${newTransactionId}, Item ID: ${itemId}, Meal Type: ${description}`
            // );
        
            // // Increment newOrderId for the next item
            // currentOrderId++;
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
export async function GET() {
    const connectionString = process.env.DATABASE_URL; 
    const client = new Client({ connectionString });

    try {
        await client.connect();

        const query = `
            SELECT idInventory AS id, nameItem AS name, CAST(priceItem AS FLOAT) AS price, categoryItem as category
            FROM INVENTORY
            WHERE status = 'ACTIVE'
        `;
        const result = await client.query(query);
        //Test for a force push
        
        console.log("result", result);

        if (!result.rows.length) {
            return NextResponse.json(
                { success: false, message: "No items found in the inventory" },
                { status: 404 }
            );
        }

        const formattedItems = result.rows.map(item => ({
            name: item.name,
            price: item.price,
            category: item.category || 'uncategorized', // Default category if not available
        }));

        return NextResponse.json({
            success: true,
            menuItems: formattedItems,
        });

    } catch (error) {
        console.error("Error fetching menu items:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch menu items", error: error.message },
            { status: 500 }
        );
    } finally {
        await client.end();
    }
}