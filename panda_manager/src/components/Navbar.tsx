"use client";

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    LogOut,
    Settings,
    User,
} from "lucide-react"

export default function Home() {
const router = useRouter();
const pathname = usePathname(); //^ Get the current path

const handleNavigation = (path: string) => {
    router.push(path); //^ Navigate to the specified path
};

return (
    <div className="flex w-full pb-12">
        <div className="flex flex-row w-full">
            <div className="flex flex-row items-center space-x-20">
            <h1
                onClick={() => handleNavigation('/home')}
                className="text-4xl font-bold cursor-pointer hover:text-red-700"
            >
                Manager Dashboard
            </h1>
            <div className="flex items-center space-x-8">
                <div 
                onClick={() => handleNavigation('/inventory')} 
                className={`font-medium cursor-pointer hover:text-red-700 ${pathname === '/inventory' ? 'underline' : ''}`}
                >
                Inventory
                </div>
                <div 
                onClick={() => handleNavigation('/employee')} 
                className={`font-medium cursor-pointer hover:text-red-700 ${pathname === '/employee' ? 'underline' : ''}`}
                >
                Employee
                </div>
                <div 
                onClick={() => handleNavigation('/reports')} 
                className={`font-medium cursor-pointer hover:text-red-700 ${pathname === '/reports' ? 'underline' : ''}`}
                >
                Reports
                </div>
            </div>
            </div>
            <div className="mr-20 ml-auto">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                    <User />
                    <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                    <Settings />
                    <span>Settings</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogOut />
                    <span>Log out</span>
                </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </div>
        </div>
        </div>
    )
}
