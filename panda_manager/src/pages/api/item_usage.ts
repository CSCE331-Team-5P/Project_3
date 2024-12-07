import type { NextApiRequest, NextApiResponse } from "next";
import { getItemUsageBetweenDates } from "@/lib/db/reports_queries"; // Update the path to match your project structure

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} not allowed`);
  }

  const { startDate, endDate } = req.query;

  if (
    !startDate ||
    !endDate ||
    typeof startDate !== "string" ||
    typeof endDate !== "string"
  ) {
    return res.status(400).json({ error: "Valid 'startDate' and 'endDate' parameters are required." });
  }

  try {
    const itemUsage = await getItemUsageBetweenDates(startDate, endDate);
    return res.status(200).json(itemUsage);
  } catch (error) {
    console.error("Error fetching item usage summary:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
