"use client"

import { useState, useMemo, useEffect } from "react"
import {fetchInventory, addInventoryItem } from '@/lib/db/inventory_queries'; // Adjust path as needed

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


interface InventoryItem {
    idinventory: string
    nameitem: string
    status: string
    priceitem: string
    categoryitem: string
    restocktime: string
    quantityitem: number
}

export function InventoryTable() {

    const [inventory, setInventory] = useState<InventoryItem[]>([])

    const [newItem, setNewItem] = useState<InventoryItem>({
        idinventory: "",
        nameitem: "",
        status: "",
        priceitem: "",
        categoryitem: "",
        restocktime: "",
        quantityitem: 0,
    })

    const [filters, setFilters] = useState({
        name: "",
        status: "",
        category: "",
    })

    useEffect(() => {
        async function fetchInventory() {
            try {
                const response = await fetch('/api/inventory', {
                    method: 'GET', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (!response.ok) {
                    throw new Error(`Error fetching inventory: ${response.statusText}`);
                }

                const data = await response.json();
    
                // Log the fetched data
                console.log('Fetched inventory:', data);  // Add this line
                
                if (Array.isArray(data)) {
                    setInventory(data);
                } else {
                    console.error('Inventory data is not an array:', data);
                }
            } catch (err) {
                console.error('Error fetching inventory:', err);
            }
        }
        fetchInventory();
    }, []);
    
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setNewItem((prev) => ({ ...prev, [name]: value }))
    }

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFilters((prev) => ({ ...prev, [name]: value }))
    }
    
    const addItem = async () => {
        if (newItem.nameitem) {
            try {
                const response = await fetch('/api/inventory', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newItem),
                });
    
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
    
                const insertedItem = await response.json();
                console.log('Inserted item:', insertedItem);
    
                // Update local state with the inserted item
                setInventory((prev) => [...prev, insertedItem]);
                setNewItem({
                    idinventory: "",
                    nameitem: "",
                    quantityitem: 0,
                    priceitem: "",
                    categoryitem: "",
                    restocktime: "",
                    status: "",
                });
            } catch (error) {
                console.error('Error adding item to inventory:', error);
            }
        } else {
            console.error('Item ID and Name are required to add an item.');
        }
    };
    
    const removeItem = (id: string) => {
        setInventory((prev) => prev.filter((item) => item.idinventory !== id))
    }

    const filteredInventory = useMemo(() => {
        if (!Array.isArray(inventory)) return [];

        return inventory.filter((item) => {
            // Filter by name, status, and category
            const nameMatch = filters.name === "" || item.nameitem?.toLowerCase().includes(filters.name.toLowerCase());
            const statusMatch = filters.status === "" || item.status?.toLowerCase().includes(filters.status.toLowerCase());
            const categoryMatch = filters.category === "" || item.categoryitem?.toLowerCase().includes(filters.category.toLowerCase());

            return nameMatch && statusMatch && categoryMatch;
        });
    }, [inventory, filters]);

    console.log('Filtered Inventory:', filteredInventory);  // Add this line

    
    return (
        <div className="space-y-4">
            <div className="mb-12 grid grid-cols-3 gap-4">
                <div>
                    <Label htmlFor="name">Item Name</Label>
                    <Input
                        id="name"
                        name="nameitem" 
                        value={newItem.nameitem}
                        onChange={handleInputChange}
                        placeholder="Enter item name"
                    />
                </div>
                <div>
                    <Label htmlFor="status">Status</Label>
                    <Input
                        id="status"
                        name="status"
                        value={newItem.status}
                        onChange={handleInputChange}
                        placeholder="Enter status"
                    />
                </div>
                <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                        id="price"
                        name="priceitem"
                        value={newItem.priceitem}
                        onChange={handleInputChange}
                        placeholder="Enter price"
                    />
                </div>
                <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                        id="category"
                        name="categoryitem"
                        value={newItem.categoryitem}
                        onChange={handleInputChange}
                        placeholder="Enter category"
                    />
                </div>
                <div>
                    <Label htmlFor="restockTime">Restock Time</Label>
                    <Input
                        id="restockTime"
                        name="restocktime"
                        type="date"
                        value={newItem.restocktime}
                        onChange={handleInputChange}
                        placeholder="Enter restock time"
                    />
                </div>
                <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                        id="quantity"
                        name="quantityitem"
                        type="number"
                        value={newItem.quantityitem}
                        onChange={handleInputChange}
                        placeholder="Enter quantity"
                    />
                </div>
                <div></div>
                <Button
                    className="bg-red-700 hover:bg-red-400 mt-6"
                    onClick={addItem}
                >
                    Add Item
                </Button>
            </div>
            <h2 className="text-lg font-normal">View Inventory</h2>
            <div className="mb-4 grid grid-cols-3 gap-4">
                <div>
                    <Label htmlFor="nameFilter">Filter by Name</Label>
                    <Input
                        id="nameFilter"
                        name="name"
                        value={filters.name}
                        onChange={handleFilterChange}
                        placeholder="Filter by name"
                    />
                </div>
                <div>
                    <Label htmlFor="statusFilter">Filter by Status</Label>
                    <Input
                        id="statusFilter"
                        name="status"
                        value={filters.status}
                        onChange={handleFilterChange}
                        placeholder="Filter by status"
                    />
                </div>
                <div>
                    <Label htmlFor="categoryFilter">Filter by Category</Label>
                    <Input
                        id="categoryFilter"
                        name="category"
                        value={filters.category}
                        onChange={handleFilterChange}
                        placeholder="Filter by category"
                    />
                </div>
            </div>
            <Table>
                <TableCaption>A display of restaurants current inventory.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Item ID</TableHead>
                        <TableHead>Item Name</TableHead>
                        <TableHead>Item Status</TableHead>
                        <TableHead>Item Price</TableHead>
                        <TableHead>Item Category</TableHead>
                        <TableHead>Restock Time</TableHead>
                        <TableHead className="text-right">Item Quantity</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredInventory.map((item) => (
                        <TableRow key={item.idinventory}>
                        <TableCell className="font-medium">{item.idinventory}</TableCell>
                        <TableCell>{item.nameitem}</TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell>${item.priceitem}</TableCell>
                        <TableCell>{item.categoryitem}</TableCell>
                        <TableCell>{item.restocktime}</TableCell>
                        <TableCell className="text-right">{item.quantityitem}</TableCell>
                        <TableCell>
                            <Button variant="destructive" onClick={() => removeItem(item.idinventory)}>
                            Remove
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>    
    )
}
