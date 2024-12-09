"use client";

import React from 'react';
import Navbar from "@/components/Navbar";
import { ZReport } from '@/components/z-report';
import { XReport } from '@/components/x-report';
import { ProductUsage } from '@/components/product-usage';

export default function Inventory() {


    return (
        <div className="p-12">
            <Navbar />
            <h1 className="text-4xl font-medium pb-6"> Franchise Reports </h1>
            <div className="flex flex-row mb-10">
                <XReport />
                <ProductUsage />
            </div>
            <ZReport />
        </div>
    )
}