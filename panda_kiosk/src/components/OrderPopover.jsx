"use client"

import { useState, useEffect } from 'react'
import { ShoppingCart, X, Minus, Plus } from 'lucide-react'
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { Button } from "@/components/ui/button"
// GSP imports 
import { useGlobalState } from "@/components/GlobalStateProvider";
// import {menuItems} from "@/app/checkout/"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

import { useRouter } from "next/navigation"; 


export default function OrderPopover() {
  const { selectedItemIds, clearSelectedItems, addItemToSelection, removeItemFromSelection } = useGlobalState();

  // const [orderItems, setOrderItems] = useState([
  //   { id: 1, name: "Orange Chicken", quantity: 1 },
  //   { id: 2, name: "Beijing Beef", quantity: 1 },
  //   { id: 3, name: "Chow Mein", quantity: 1 },
  //   { id: 4, name: "Medium Drink", quantity: 1 },
  // ])

  const itemsMap = {};
  let uniqueId = 1;

  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const itemsMap = {};
    let uniqueId = 1;
  
    selectedItemIds.forEach(itemName => {
      if (itemsMap[itemName]) {
        // If the item already exists, increment its quantity
        itemsMap[itemName].quantity += 1;
      } else {
        // Otherwise, create a new entry with a unique ID
        itemsMap[itemName] = {
          id: uniqueId++,
          name: itemName,
          quantity: 1,
        };
      }
    });
  
    // Convert the itemsMap into an array of objects and set it to orderItems
    setOrderItems(Object.values(itemsMap));
  }, [selectedItemIds]);
  
  const updateQuantity = (id, change) => {
    setOrderItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    )
  }

  const totalItems = orderItems.reduce((sum, item) => sum + item.quantity, 0)

  const router = useRouter();

  return (
    <Sheet>
      <SheetTrigger asChild>
          <ShoppingCartRoundedIcon fontSize='large' />
          {/* {totalItems > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center"
            >
              {totalItems}
            </Badge>
          )} */}
          {/* <span className="sr-only">Open order details</span> */}
        {/* <Button size="icon" className="relative bg-red-700">
        </Button> */}
      </SheetTrigger>
      <SheetContent className="w-[300px] bg-white sm:w-[350px]">
        <SheetHeader className="relative pb-4 mb-4 border-b">
          <SheetTitle className="text-center">Current Order</SheetTitle>
        </SheetHeader>
          <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-4 border-b last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                    <div className="h-4 w-4 rounded-full bg-yellow-400" />
                  </div>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    <Minus className="h-4 w-4" />
                    <span className="sr-only">Decrease quantity of {item.name}</span>
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Increase quantity of {item.name}</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {orderItems.length === 0 && (
            <p className="text-center text-gray-500 mt-8">Your order is empty</p>
          )}
          <div className="absolute bottom-6 left-6 right-6">
            <Button 
              onClick = {() => router.push("/checkout")}
              className="w-full bg-red-600 hover:bg-red-700 text-white">
              Checkout
            </Button>
          </div>
      </SheetContent>
    </Sheet>
  )
}