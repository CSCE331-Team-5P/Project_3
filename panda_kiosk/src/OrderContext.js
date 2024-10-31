// OrderContext.js
import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
    const [drinkQuantities, setDrinkQuantities] = useState({
        small: 0,
        medium: 0,
        large: 0,
        bottled: 0,
    });

        return (
            <OrderContext.Provider value={{ drinkQuantities, setDrinkQuantities }}>
            {children}
            </OrderContext.Provider>
        );
    }

    export function useOrder() {
    return useContext(OrderContext);
}