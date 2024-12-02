"use client";

import React from 'react';
import Navbar from "@/components/Navbar";
import { ZReport } from '@/components/z-report';
import { XReport } from '@/components/x-report';

export default function Inventory() {


    return (
        <div className="p-12">
            <Navbar />
            <h1 className="text-4xl font-medium pb-6"> Franchise Reports </h1>
            <XReport />
            <ZReport />
        </div>
    )
}