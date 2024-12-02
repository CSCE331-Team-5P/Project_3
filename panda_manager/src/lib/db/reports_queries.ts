import { query } from './client';

//^ //////////////////////////////////////////
//^ Reports Queries
//^ //////////////////////////////////////////

//X-Table Reports page queries
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


//Z-Table Reports page queries
export const sumTransactionsByDay = async (date: string) => {
    try {
        const result = await query(
            `SELECT 
                SUM(CASE WHEN methodPayment = 'Cash' THEN 1 END) AS "cashCount",
                SUM(CASE WHEN methodPayment = 'Card' THEN 1 END) AS "cardCount",
                SUM(CASE WHEN methodPayment = 'Dining Dollars' THEN 1 END) AS "diningDollarsCount",
                SUM(CASE WHEN methodPayment = 'Meal Swipe' THEN 1 END) AS "mealSwipeCount",
                SUM(amountTotal) AS "totalSales"
             FROM transactions
             WHERE dateTransaction::date = $1`,
            [date]
        );

        // Return the first row, as it aggregates the entire day
        const row = result.rows[0];
        return {
            cashCount: row.cashCount || 0,
            cardCount: row.cardCount || 0,
            diningDollarsCount: row.diningDollarsCount || 0,
            mealSwipeCount: row.mealSwipeCount || 0,
            totalSales: parseFloat(row.totalSales || 0),
        };
    } catch (error) {
        console.error('Error summing daily transactions:', error);
        throw error;
    }
};

//Inventory Usage table summary
export const getItemUsageBetweenDates = async (startDate: string, endDate: string) => {
    try {
      const result = await query(
        `SELECT i.idinventory, i.nameitem, COUNT(*) AS "totalUsed"
         FROM transactions t
         JOIN orders o ON t.idtransaction = o.idtransaction
         JOIN inventory i ON o.idinventory = i.idinventory
         WHERE t.datetransaction BETWEEN $1 AND $2
         GROUP BY i.idinventory, i.nameitem
         ORDER BY i.idinventory`,
        [startDate, endDate] // Use parameterized queries for security
      );
  
      return result.rows.map((row) => ({
        idInventory: row.idinventory,
        itemName: row.nameitem,
        totalUsed: row.totalUsed,
      }));
    } catch (error) {
      console.error("Error fetching item usage between dates:", error);
      throw error;
    }
  };
  