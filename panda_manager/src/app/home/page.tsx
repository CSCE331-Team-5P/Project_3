"use client";

import React from 'react';
import Navbar from "@/components/Navbar";
import { HeroCard } from "@/components/hero-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from 'next/navigation';
import InventoryIcon from '@mui/icons-material/Inventory';
import BadgeIcon from '@mui/icons-material/Badge';
import AssessmentIcon from '@mui/icons-material/Assessment';

export default function Home() {
  const router = useRouter();

  // Map routes to icons and titles
  const menuItems = [
    { path: '/inventory', title: 'Inventory', icon: <InventoryIcon style={{ fontSize: 40 }} /> },
    { path: '/employee', title: 'Employee', icon: <BadgeIcon style={{ fontSize: 40 }} /> },
    { path: '/reports', title: 'Reports', icon: <AssessmentIcon style={{ fontSize: 40 }} /> },
  ];

  const handleNavigation = (path: string) => {
    router.push(path); // Navigate to the specified path
  };

  return (
    <div className="p-12">
      <Navbar />
      <h1 className="text-3xl font-semibold pb-12"> Welcome Manager! </h1>
      <div className="flex flex-col gap-10 items-center justify-center p-4 pb-12">
        <HeroCard />
        <h3 className="text-2xl font-bold mb-4">Quick Access Menu</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <Card key={index} className="p-6 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                {item.icon}
              </div>
              <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
              <p className="text-gray-600 mb-4">
                Access and manage your {item.title.toLowerCase()} here.
              </p>
              <Button variant="outline" onClick={() => handleNavigation(item.path)}>
                View {item.title}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
