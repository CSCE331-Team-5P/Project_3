import type { NextApiRequest, NextApiResponse } from 'next';
import { getHourlyTransactionSummary, sumTransactionsByDay } from '@/lib/db/reports_queries'; // Adjust the path as needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { date, summaryType } = req.query;

        if (!date || typeof date !== 'string') {
            res.status(400).json({ error: 'A valid date parameter is required.' });
            return;
        }

        try {
            if (summaryType === 'daily') {
                const summary = await sumTransactionsByDay(date);
                res.status(200).json(summary);
            } else {
                const hourlySummary = await getHourlyTransactionSummary(date);
                res.status(200).json(hourlySummary);
            }
        } catch (error) {
            console.error('Error in reports API:', error);
            res.status(500).json({ error: 'Internal server error.' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} not allowed`);
    }
}