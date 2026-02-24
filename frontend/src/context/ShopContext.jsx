import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '₪';
    const delivery_fee = 10;
    const [search,setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems,setCartItems] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    const addToCart = async (itemId, servingAmount) => {

        if (!servingAmount) {
            toast.error('Select Amount of Servings!');
            return;
        }

        let cartData = structuredClone(cartItems); // Creates copy of cart items object

        if (cartData[itemId]) {
            if (cartData[itemId][servingAmount]) {
                cartData[itemId][servingAmount] += 1;
            }
            else{
                cartData[itemId][servingAmount] = 1;
            }
        }
        else{
            cartData[itemId] = {}; // new entry in cart page
            cartData[itemId][servingAmount] = 1;
        }
        setCartItems(cartData);
    }

    
    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                    
                } catch (error) {
                    
                }
            }
        }
        return totalCount
    }


    const updateQuantity = async (itemId, servingAmount, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][servingAmount] = quantity;
        setCartItems(cartData);
    }


    const getCartAmount = () => {
        let totalAmount = 0;
        for(const item_id in cartItems){
            let itemInfo = products.find((product)=> product._id === item_id);
            for(const servingAmount in cartItems[item_id]){
                try {
                    let quantity = cartItems[item_id][servingAmount];
                    if(quantity > 0){                                             
                        totalAmount += itemInfo.price * servingAmount * quantity; // total amount of all the products in the cart
                    }
                } catch (error) {
                }
            }
        }
        return totalAmount;
    }


    const navigateAndScroll = (path) => {
        if (location.pathname === path) {
            window.scrollTo({ top: 0, behavior: 'smooth'});
        }
        else{
            navigate(path);
        }
    }


    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        location,
        navigateAndScroll

    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;