// SalesList.tsx

import React from "react";

interface Sale {
  transactionNumber: string;
  date: string;
  amount: string;
}

const salesData: Sale[] = [
  { transactionNumber: "TXN001", date: "2024-11-01", amount: "+$1,999.00" },
  { transactionNumber: "TXN002", date: "2024-11-02", amount: "+$39.00" },
  { transactionNumber: "TXN003", date: "2024-11-03", amount: "+$299.00" },
  { transactionNumber: "TXN004", date: "2024-11-04", amount: "+$99.00" },
  { transactionNumber: "TXN005", date: "2024-11-05", amount: "+$39.00" },
];

export default function SalesList() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-1/2">
      <h2 className="text-xl font-semibold">Recent Sales</h2>
      <p className="text-gray-500 mb-4">You made 265 sales this month.</p>
      <div className="space-y-4">
        {salesData.map((sale, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex flex-col">
              <p className="font-medium">Transaction #{sale.transactionNumber}</p>
              <p className="text-sm text-gray-500">{sale.date}</p>
            </div>
            <p className="font-medium text-gray-800">{sale.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
