"use client";

import React from 'react';
import Navbar from "@/components/Navbar";
import { EmployeeTable } from '@/components/employee-table';
import EmployeeHoursChart from '@/components/staff-info';

export default function Inventory() {


    return (
        <div className="p-12">
            <Navbar />
            <h1 className="text-4xl font-medium pb-6"> Franchise Staff </h1>
            <h2 className="text-lg font-normal pb-4"> Insert Inventory Item </h2>
            <EmployeeTable />
            <EmployeeHoursChart />
        </div>
    )
}