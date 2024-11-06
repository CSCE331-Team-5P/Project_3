"use client"

import { useState, useMemo } from "react"
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
    id: string
    name: string
    status: string
    price: string
    category: string
    restockTime: string
    quantity: number
}

export function InventoryTable() {

    const [inventory, setInventory] = useState<InventoryItem[]>([
        {
            id: "INV001",
            name: "Hot Ones Blazing Bourbon Chicken",
            status: "Inactive",
            price: "$3.99",
            category: "Entree",
            restockTime: "2 days",
            quantity: 10,
        },
        {
            id: "INV002",
            name: "Beyond Original Orange Chicken",
            status: "Active",
            price: "$4.99",
            category: "Entree",
            restockTime: "4 days",
            quantity: 15,
        },
        {
            id: "INV003",
            name: "The Original Orange Chicken",
            status: "Active",
            price: "$3.99",
            category: "Entree",
            restockTime: "1 days",
            quantity: 12,
        },
        {
            id: "INV004",
            name: "Black Pepper Sirloin Steak",
            status: "Active",
            price: "$2.99",
            category: "Entree",
            restockTime: "2 days",
            quantity: 21,
        },
        {
            id: "INV005",
            name: "Honey Walnut Shrimp",
            status: "Active",
            price: "$5.99",
            category: "Entree",
            restockTime: "3 days",
            quantity: 25,
        },
        {
            id: "INV006",
            name: "Grilled Teriyaki Chicken",
            status: "Active",
            price: "$3.99",
            category: "Entree",
            restockTime: "5 days",
            quantity: 11,
        },
        {
            id: "INV007",
            name: "Broccoli Beef",
            status: "Active",
            price: "$3.99",
            category: "Entree",
            restockTime: "6 days",
            quantity: 34,
        },
        {
            id: "INV008",
            name: "Kung Pao Chicken",
            status: "Active",
            price: "$2.99",
            category: "Entree",
            restockTime: "3 days",
            quantity: 23,
        },
        {
            id: "INV009",
            name: "Honey Sesame Chicken Breast",
            status: "Active",
            price: "$3.99",
            category: "Entree",
            restockTime: "4 days",
            quantity: 5,
        },
        {
            id: "INV010",
            name: "Beijing Beef",
            status: "Active",
            price: "$4.99",
            category: "Entree",
            restockTime: "8 days",
            quantity: 26,
        },
        {
            id: "INV011",
            name: "Mushroom Chicken",
            status: "Active",
            price: "$3.99",
            category: "Entree",
            restockTime: "4 days",
            quantity: 16,
        },
        {
            id: "INV012",
            name: "Sweetfire Chicken Breast",
            status: "Active",
            price: "$3.99",
            category: "Entree",
            restockTime: "5 days",
            quantity: 41,
        },
        {
            id: "INV013",
            name: "String Bean Chicken Breast",
            status: "Active",
            price: "$2.99",
            category: "Entree",
            restockTime: "2 days",
            quantity: 11,
        },
        {
            id: "INV014",
            name: "Super Greens",
            status: "Active",
            price: "$2.99",
            category: "Entree",
            restockTime: "3 days",
            quantity: 25,
        },
        {
            id: "INV015",
            name: "Chow Mein",
            status: "Active",
            price: "$3.99",
            category: "Side",
            restockTime: "2 days",
            quantity: 21,
        },
        {
            id: "INV016",
            name: "Fried Rice",
            status: "Active",
            price: "$2.99",
            category: "Side",
            restockTime: "3 days",
            quantity: 13,
        },
        {
            id: "INV017",
            name: "White Steamed Rice",
            status: "Active",
            price: "$1.99",
            category: "Side",
            restockTime: "2 days",
            quantity: 20,
        },
        {
            id: "INV018",
            name: "Super Greens",
            status: "Active",
            price: "$2.99",
            category: "Side",
            restockTime: "4 days",
            quantity: 19,
        },
    ])

    const [newItem, setNewItem] = useState<InventoryItem>({
        id: "",
        name: "",
        status: "",
        price: "",
        category: "",
        restockTime: "",
        quantity: 0,
    })

    const [filters, setFilters] = useState({
        name: "",
        status: "",
        category: "",
    })
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setNewItem((prev) => ({ ...prev, [name]: value }))
    }

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFilters((prev) => ({ ...prev, [name]: value }))
    }
    
    const addItem = () => {
        if (newItem.id && newItem.name) {
            setInventory((prev) => [...prev, newItem])
            setNewItem({
                id: "",
                name: "",
                status: "",
                price: "",
                category: "",
                restockTime: "",
                quantity: 0,
            })
        }
    }
    
    const removeItem = (id: string) => {
        setInventory((prev) => prev.filter((item) => item.id !== id))
    }

    const filteredInventory = useMemo(() => {
        return inventory.filter((item) => {
            return (
                item.name.toLowerCase().includes(filters.name.toLowerCase()) &&
                item.status.toLowerCase().includes(filters.status.toLowerCase()) &&
                item.category.toLowerCase().includes(filters.category.toLowerCase())
            )
        })
    }, [inventory, filters])

    return (
        <div className="space-y-4">
            <div className="mb-20 grid grid-cols-4 gap-4">
                <div>
                    <Label htmlFor="id">Item ID</Label>
                    <Input
                        id="id"
                        name="id"
                        value={newItem.id}
                        onChange={handleInputChange}
                        placeholder="Enter item ID"
                    />
                </div>
                <div>
                    <Label htmlFor="name">Item Name</Label>
                    <Input
                        id="name"
                        name="name"
                        value={newItem.name}
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
                        name="price"
                        value={newItem.price}
                        onChange={handleInputChange}
                        placeholder="Enter price"
                    />
                </div>
                <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                        id="category"
                        name="category"
                        value={newItem.category}
                        onChange={handleInputChange}
                        placeholder="Enter category"
                    />
                </div>
                <div>
                    <Label htmlFor="restockTime">Restock Time</Label>
                    <Input
                        id="restockTime"
                        name="restockTime"
                        value={newItem.restockTime}
                        onChange={handleInputChange}
                        placeholder="Enter restock time"
                    />
                </div>
                <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                        id="quantity"
                        name="quantity"
                        type="number"
                        value={newItem.quantity.toString()}
                        onChange={handleInputChange}
                        placeholder="Enter quantity"
                    />
                </div>
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
                        <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.restockTime}</TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell>
                            <Button variant="destructive" onClick={() => removeItem(item.id)}>
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
