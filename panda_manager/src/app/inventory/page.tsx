"use client";

import React from 'react';
import Navbar from "@/components/Navbar";
import { InventoryTable } from "@/components/inventory-table";

export default function Inventory() {


    return (
        <div>
            <Navbar />
            <h1 className="text-4xl font-medium mx-12 my-8"> Franchise Inventory </h1>
            <h2 className="text-lg font-normal mx-12"> Insert Inventory Item </h2>
            <div className="px-12 pt-4 pb-12">
                <InventoryTable />
            </div>
        </div>
    )
}