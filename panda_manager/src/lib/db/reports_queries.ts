import { query } from './client';

//^ //////////////////////////////////////////
//^ Reports Queries
//^ //////////////////////////////////////////

export const getHourlyTransactionSummary = async (date: string) => {
    try {
        const result = await query(
            `SELECT DATE_TRUNC('hour', dateTransaction) AS hour,
                COUNT(CASE WHEN methodPayment = 'Cash' THEN 1 END) AS "cashCount",
                COUNT(CASE WHEN methodPayment = 'Card' THEN 1 END) AS "cardCount",
                COUNT(CASE WHEN methodPayment = 'Dining Dollars' THEN 1 END) AS "diningDollarsCount",
                COUNT(CASE WHEN methodPayment = 'Meal Swipe' THEN 1 END) AS "mealSwipeCount",
                SUM(amountTotal) AS "totalSales"
             FROM transactions
             WHERE dateTransaction::date = $1
             GROUP BY hour
             ORDER BY hour DESC`,
            [date] // Use parameterized queries for security
        );

        // Map the results into a structured format
        return result.rows.map((row) => ({
            hour: row.hour,
            cashCount: row.cashCount,
            cardCount: row.cardCount,
            diningDollarsCount: row.diningDollarsCount,
            mealSwipeCount: row.mealSwipeCount,
            totalSales: parseFloat(row.totalSales),
        }));
    } catch (error) {
        console.error('Error fetching daily transaction summary:', error);
        throw error;
    }
};