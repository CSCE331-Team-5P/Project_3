import { query } from './client';

//^ Example Query w/ Parameters
export async function getUserById(id: number) {
    const result = await query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
}

//^ //////////////////////////////////////////
//^ Home Page Queries
//^ //////////////////////////////////////////

//^ Get Monthly Revenue
export const fetchMonthlyRevenue = async (): Promise<number> => {
    const result = await query(`
        SELECT SUM(amountTotal) AS totalRevenue
        FROM Transactions
        WHERE DATE_PART('month', dateTransaction) = DATE_PART('month', CURRENT_DATE)
        AND DATE_PART('year', dateTransaction) = DATE_PART('year', CURRENT_DATE);
    `);

    // Ensure type safety when accessing result rows
    return result.rows[0]?.totalRevenue ?? 0; // Return totalRevenue or 0 if no rows exist
};

//^ Get Percent Change in Monthly Revenue
export const fetchMonthlyRevenueChange = async (): Promise<number> => {
    const result = await query(`
        SELECT 
            SUM(CASE 
                WHEN DATE_PART('month', dateTransaction) = DATE_PART('month', CURRENT_DATE) 
                    AND DATE_PART('year', dateTransaction) = DATE_PART('year', CURRENT_DATE)
                THEN amountTotal 
                ELSE 0 
            END) AS currentMonthRevenue,
            SUM(CASE 
                WHEN DATE_PART('month', dateTransaction) = DATE_PART('month', CURRENT_DATE - INTERVAL '1 month') 
                    AND DATE_PART('year', dateTransaction) = DATE_PART('year', CURRENT_DATE - INTERVAL '1 month')
                THEN amountTotal 
                ELSE 0 
            END) AS previousMonthRevenue
        FROM Transactions;
    `);

    const { currentMonthRevenue = 0, previousMonthRevenue = 0 } = result.rows[0];

    if (previousMonthRevenue === 0) {
        // Avoid division by zero; return 100% change if there was no revenue last month
        return currentMonthRevenue > 0 ? 100 : 0;
    }

    const percentChange = ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100;
    return percentChange;
};

//^ Get Monthly Sales Count
export const fetchMonthlyOrderCount = async (): Promise<number> => {
    const result = await query(`
        SELECT COUNT(*) AS orderCount
        FROM Orders
        WHERE DATE_PART('month', (SELECT dateTransaction FROM Transactions WHERE Orders.idTransaction = Transactions.idTransaction)) = DATE_PART('month', CURRENT_DATE)
        AND DATE_PART('year', (SELECT dateTransaction FROM Transactions WHERE Orders.idTransaction = Transactions.idTransaction)) = DATE_PART('year', CURRENT_DATE);
    `);

    return result.rows[0]?.orderCount ?? 0; // Return the order count or 0 if no rows
};

//^ Get Percent Change in Monthly Sales Count
export const fetchMonthlyOrderCountChange = async (): Promise<number> => {
    const result = await query(`
        SELECT 
            COUNT(CASE 
                WHEN DATE_PART('month', t.dateTransaction) = DATE_PART('month', CURRENT_DATE) 
                    AND DATE_PART('year', t.dateTransaction) = DATE_PART('year', CURRENT_DATE)
                THEN o.idOrderItem
                END) AS currentMonthOrders,
            COUNT(CASE 
                WHEN DATE_PART('month', t.dateTransaction) = DATE_PART('month', CURRENT_DATE - INTERVAL '1 month') 
                    AND DATE_PART('year', t.dateTransaction) = DATE_PART('year', CURRENT_DATE - INTERVAL '1 month')
                THEN o.idOrderItem
                END) AS previousMonthOrders
        FROM Orders o
        JOIN Transactions t ON o.idTransaction = t.idTransaction;
    `);

    const { currentMonthOrders = 0, previousMonthOrders = 0 } = result.rows[0];

    if (previousMonthOrders === 0) {
        // Avoid division by zero; return 100% change if there were no orders last month
        return currentMonthOrders > 0 ? 100 : 0;
    }

    const percentChange = ((currentMonthOrders - previousMonthOrders) / previousMonthOrders) * 100;
    return percentChange;
};


//^ Most Popular Item
export const fetchMostPopularOrderItem = async (): Promise<{ itemName: string; orderCount: number } | null> => {
    const result = await query(`
        SELECT 
            i.nameItem AS itemName,
            COUNT(o.idOrderItem) AS orderCount
        FROM Orders o
        JOIN Inventory i ON o.idInventory = i.idInventory
        JOIN Transactions t ON o.idTransaction = t.idTransaction
        WHERE DATE_PART('month', t.dateTransaction) = DATE_PART('month', CURRENT_DATE)
            AND DATE_PART('year', t.dateTransaction) = DATE_PART('year', CURRENT_DATE)
        GROUP BY i.nameItem
        ORDER BY orderCount DESC
        LIMIT 1;
    `);

    return result.rows[0] ?? null; // Return the most popular item or null if no data
};

//^ Orders per Day
export const fetchOrdersPerDay = async (): Promise<
    { date: string; desktop: number; mobile: number }[]
> => {
    const result = await query(`
        SELECT 
            TO_CHAR(o.created_at, 'YYYY-MM-DD') AS date,
            o.device_type AS deviceType,
            COUNT(o.idOrder) AS totalOrders
        FROM Orders o
        WHERE DATE_PART('month', o.created_at) = DATE_PART('month', CURRENT_DATE)
            AND DATE_PART('year', o.created_at) = DATE_PART('year', CURRENT_DATE)
        GROUP BY date, o.device_type
        ORDER BY date;
    `);

    // Transform the result into the required format
    const dataMap: { [date: string]: { desktop: number; mobile: number } } = {};

    result.rows.forEach((row: { date: string; devicetype: 'desktop' | 'mobile'; totalorders: string }) => {
        const { date, devicetype, totalorders } = row; // Use column names from the query
        if (!dataMap[date]) {
        dataMap[date] = { desktop: 0, mobile: 0 };
        }
        dataMap[date][devicetype] += parseInt(totalorders, 10);
    });

    // Convert the map into an array format
    return Object.entries(dataMap).map(([date, { desktop, mobile }]) => ({
        date,
        desktop,
        mobile,
    }));
};

//^ Number of Active Employees
export const fetchActiveEmployeeCount = async (): Promise<number> => {
    const result = await query(`
        SELECT COUNT(*) AS activeEmployeeCount
        FROM Staff
        WHERE statusEmployee = 'active'; -- Adjust the status value as per your data
    `);

    return result.rows[0]?.activeEmployeeCount ?? 0; // Return the count or 0 if no active employees
};

//^ 5 Most Recent Transactions
export const fetchRecentTransactions = async (): Promise<
    { idTransaction: number; idEmployee: number; dateTransaction: Date; amountTotal: number; methodPayment: string }[]
> => {
    const result = await query(`
        SELECT 
            idTransaction,
            idEmployee,
            dateTransaction,
            amountTotal,
            methodPayment
        FROM Transactions
        ORDER BY dateTransaction DESC
        LIMIT 5;
    `);

    return result.rows; // Return the most recent 5 transactions
};
