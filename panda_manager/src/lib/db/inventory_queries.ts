import { query } from './client';

//^ //////////////////////////////////////////
//^ Inventory Queries
//^ //////////////////////////////////////////

export const fetchInventory = async () => {
    const result = await query('SELECT * FROM inventory ORDER BY idinventory ASC'); // Replace with your actual inventory table name
    return result.rows; // Return the result rows
};

// Insert a new inventory item
export const addInventoryItem = async (item: {
    idinventory: string;
    nameitem: string;
    quantityitem: number;
    priceitem: string;
    categoryitem: string;
    restocktime: string;
    status: string;
}) => {
    const maxIdResult = await query(`SELECT MAX(idinventory) AS max_id FROM inventory`);
    const maxId = maxIdResult.rows[0]?.max_id || 0; // Default to 0 if no rows exist

    // Generate the new idinventory by incrementing the max_id
    const newId = maxId + 1;

    const result = await query(
        `INSERT INTO inventory (idInventory, nameItem, quantityItem, priceItem, categoryItem, restockTime, status) 
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [
            newId,
            item.nameitem,
            item.quantityitem,
            item.priceitem,
            item.categoryitem,
            item.restocktime,
            item.status,
        ]
    );
    return result.rows[0]; // Return the inserted row
};

// Update the status of an item to "inactive"
export const removeInventoryItem = async (id: string) => {
    const result = await query(
        `UPDATE inventory SET status = 'INACTIVE' WHERE idinventory = $1 RETURNING *`,
        [id]
    );

    return result.rows[0]; // Return the updated row
};