import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from '../reducer/cartReducer'




const CartContext = createContext();
const getLocalCartData = () => {
    let localCartData = localStorage.getItem("CartData");
    // if (localCartData === []) {
    //     return []
    // }
    // else {
    //     return JSON.parse(localCartData)
    // }

    const parseData = JSON.parse(localCartData);
    if (!Array.isArray(parseData)) return [];
    return parseData;
}


const intialState = {
    // cart: [],
    cart: getLocalCartData(),
    total_item: "",
    total_price: "",
    shipping_fee: 50000,
}

const CartProvider = ({ children }) => {


    const [state, dispatch] = useReducer(reducer, intialState);
    const addToCart = (id, color, product, amount) => {
        dispatch({ type: "ADD_TO_CART", payload: { id, color, product, amount } })
    }

    // Increment and decrement of Cart amount 
    const setDecrease = (id) => {
        dispatch({ type: "SET_DECREMENT", payload: id })
    }
    const setIncrease = (id) => {
        dispatch({ type: "SET_INCREMENT", payload: id })
    }

    const removeItem = (id) => {
        dispatch({ type: "REMOVE_ITEM", payload: id })
    }

    // clear Cart 
    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" })
    }

    // To add data in localStorage 
    useEffect(() => {
        dispatch({ type: "CART_TOTAL_ITEM_PRICE" })
        localStorage.setItem("CartData", JSON.stringify(state.cart))
    }, [state.cart])


    return (
        <CartContext.Provider value={{ ...state, addToCart, removeItem, clearCart, setDecrease, setIncrease }}>
            {children}
        </CartContext.Provider>
    )


}

const useCartContext = () => {
    return useContext(CartContext)
}

export { CartProvider, useCartContext };