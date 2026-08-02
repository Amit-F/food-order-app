import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ShopContextProvider = (props) => {

    const [search,setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems,setCartItems] = useState({});
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    });
    const [meals, setMeals] = useState([]);
    const [myOrders, setMyOrders] = useState([]);
    const [householdOrders, setHouseholdOrders] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();


    const authHeader = () => ({ headers: { Authorization: `Bearer ${token}` } });


    const fetchMeals = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/meal/list', authHeader());
            if (response.data.success) {
                setMeals(response.data.meals);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }


    const addMeal = async (formData) => {
        try {
            const response = await axios.post(backendUrl + '/api/meal/add', formData, authHeader());
            if (response.data.success) {
                toast.success('Meal added!');
                await fetchMeals();
                return true;
            } else {
                toast.error(response.data.message);
                return false;
            }
        } catch (error) {
            toast.error(error.message);
            return false;
        }
    }


    const updateMeal = async (id, formData) => {
        try {
            formData.append('id', id);
            const response = await axios.post(backendUrl + '/api/meal/update', formData, authHeader());
            if (response.data.success) {
                toast.success('Meal updated!');
                await fetchMeals();
                return true;
            } else {
                toast.error(response.data.message);
                return false;
            }
        } catch (error) {
            toast.error(error.message);
            return false;
        }
    }


    const fetchMyOrders = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/order/mine', authHeader());
            if (response.data.success) {
                setMyOrders(response.data.orders);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }


    const fetchHouseholdOrders = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/order/household', authHeader());
            if (response.data.success) {
                setHouseholdOrders(response.data.orders);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }


    const submitOrder = async (items) => {
        try {
            const response = await axios.post(backendUrl + '/api/order/submit', { items }, authHeader());
            if (response.data.success) {
                toast.success('Order submitted!');
                setCartItems({});
                await fetchMyOrders();
                return true;
            } else {
                toast.error(response.data.message);
                return false;
            }
        } catch (error) {
            toast.error(error.message);
            return false;
        }
    }


    useEffect(() => {
        if (token) {
            fetchMeals();
            fetchMyOrders();
        } else {
            setMeals([]);
            setMyOrders([]);
            setHouseholdOrders([]);
        }
    }, [token])


    const applySession = (token, user) => {
        setToken(token);
        setUser(user);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    }


    const login = async (email, password) => {
        try {
            const response = await axios.post(backendUrl + '/api/user/login', { email, password });
            if (response.data.success) {
                applySession(response.data.token, response.data.user);
                toast.success('Logged in!');
                navigate('/');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }


    const registerCook = async (name, email, password, householdName) => {
        try {
            const response = await axios.post(backendUrl + '/api/user/register-cook', { name, email, password, householdName });
            if (response.data.success) {
                applySession(response.data.token, response.data.user);
                toast.success('Account created!');
                navigate('/');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }


    const registerOrderer = async (name, email, password, inviteCode) => {
        try {
            const response = await axios.post(backendUrl + '/api/user/register-orderer', { name, email, password, inviteCode });
            if (response.data.success) {
                applySession(response.data.token, response.data.user);
                toast.success('Account created!');
                navigate('/');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }


    const logout = () => {
        setToken('');
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    }

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


    const navigateAndScroll = (path) => {
        if (location.pathname === path) {
            window.scrollTo({ top: 0, behavior: 'smooth'});
        }
        else{
            navigate(path);
        }
    }


    const value = {
        meals,
        fetchMeals,
        addMeal,
        updateMeal,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        navigate,
        location,
        navigateAndScroll,
        backendUrl,
        token,
        user,
        login,
        registerCook,
        registerOrderer,
        logout,
        myOrders,
        fetchMyOrders,
        householdOrders,
        fetchHouseholdOrders,
        submitOrder

    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;