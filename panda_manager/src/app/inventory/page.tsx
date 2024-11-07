"use client";

import React from 'react';
import Navbar from "@/components/Navbar";
import { InventoryTable } from "@/components/inventory-table";

export default function Inventory() {


    return (
        <div className="p-12">
            <Navbar />
            <h1 className="text-4xl font-medium pb-6"> Franchise Inventory </h1>
            <h2 className="text-lg font-normal pb-4"> Insert Inventory Item </h2>
            <InventoryTable />
        </div>
    )
}