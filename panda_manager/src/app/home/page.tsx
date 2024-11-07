"use client";

import React from 'react';
import Navbar from "@/components/Navbar";
import DashboardCard from '@/components/dashboard-card';
import { Activity } from "lucide-react"
import SalesList from '@/components/sales-list';
import { DashboardChart } from '@/components/dashboard-chart';

export default function Home() {


  return (
    <div className="p-12">
      <Navbar />
      <h1 className="text-3xl font-semibold pb-12"> Welcome Manager! </h1>
      <div className="flex flex-row space-x-10 pb-12">
        <DashboardCard 
          title="Total Revenue"
          value={42231.89}
          percentageChange={180.1}
          type="currency"
        />
        <DashboardCard 
          title="Sales"
          value={12234}
          percentageChange={50.4}
          type="number"
        />
        <DashboardCard 
          title="Expenses"
          value={5350}
          percentageChange={-18.7}
          type="currency"
        />
        <DashboardCard 
          title="Active Users"
          value={45}
          percentageChange={-5.3}
          type="number"
          icon={Activity}
        />
      </div>
      <div className="flex flex-row space-x-10">
        <DashboardChart />
        <SalesList />
      </div>
    </div>
  )
}
