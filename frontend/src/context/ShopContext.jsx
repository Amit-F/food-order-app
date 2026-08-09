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
    const [mealsLoaded, setMealsLoaded] = useState(false);
    const [myOrders, setMyOrders] = useState([]);
    const [householdOrders, setHouseholdOrders] = useState([]);
    const [calendarConnected, setCalendarConnected] = useState(false);
    const [favoriteMealIds, setFavoriteMealIds] = useState(() => user?.favoriteMealIds || []);
    const [suggestions, setSuggestions] = useState([]);
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
        setMealsLoaded(true);
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


    const fetchCalendarStatus = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/calendar/status', authHeader());
            if (response.data.success) {
                setCalendarConnected(response.data.connected);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }


    const addSuggestion = async (text) => {
        try {
            const response = await axios.post(backendUrl + '/api/suggestion/add', { text }, authHeader());
            if (response.data.success) {
                toast.success('Thanks — sent!');
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


    const fetchSuggestions = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/suggestion/list', authHeader());
            if (response.data.success) {
                setSuggestions(response.data.suggestions);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }


    const removeSuggestion = async (id) => {
        try {
            const response = await axios.post(backendUrl + '/api/suggestion/remove', { id }, authHeader());
            if (response.data.success) {
                await fetchSuggestions();
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


    const connectCalendar = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/calendar/connect', authHeader());
            if (response.data.success) {
                window.location.href = response.data.url; // hand off to Google's real consent screen
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }


    const runOrderAction = async (endpoint, payload, successMessage) => {
        try {
            const response = await axios.post(backendUrl + endpoint, payload, authHeader());
            if (response.data.success) {
                if (successMessage) toast.success(successMessage);
                // Cancel is reachable by either role; the other three actions are cook-only,
                // so this branch is a no-op behavior change for them (user.role === 'cook' there already).
                await (user?.role === 'cook' ? fetchHouseholdOrders() : fetchMyOrders());
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

    const scheduleShopping = (orderId, date, time) => runOrderAction('/api/order/schedule-shopping', { orderId, date, time }, 'Shopping scheduled!');
    const markShoppingDone = (orderId) => runOrderAction('/api/order/mark-shopping-done', { orderId }, 'Marked as shopped!');
    const scheduleCooking = (orderId, date, time) => runOrderAction('/api/order/schedule-cooking', { orderId, date, time }, 'Cooking scheduled!');
    const markCookingDone = (orderId) => runOrderAction('/api/order/mark-cooking-done', { orderId }, 'Order completed!');
    const cancelOrder = (orderId) => runOrderAction('/api/order/cancel', { orderId }, 'Order cancelled.');


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
            if (user?.role === 'cook') {
                fetchCalendarStatus();
            }
            if (user?.isOwner) {
                fetchSuggestions();
            }
        } else {
            setMeals([]);
            setMealsLoaded(false);
            setMyOrders([]);
            setHouseholdOrders([]);
            setCalendarConnected(false);
            setSuggestions([]);
        }
    }, [token])


    const applySession = (token, user) => {
        setToken(token);
        setUser(user);
        setFavoriteMealIds(user.favoriteMealIds || []);
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


    const forgotPassword = async (email) => {
        try {
            const response = await axios.post(backendUrl + '/api/user/forgot-password', { email });
            return response.data;
        } catch (error) {
            return { success: false, message: error.message };
        }
    }


    const resetPassword = async (token, password) => {
        try {
            const response = await axios.post(backendUrl + '/api/user/reset-password', { token, password });
            return response.data;
        } catch (error) {
            return { success: false, message: error.message };
        }
    }


    const logout = () => {
        setToken('');
        setUser(null);
        setFavoriteMealIds([]);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    }


    const toggleFavorite = async (mealId) => {
        try {
            const response = await axios.post(backendUrl + '/api/user/favorite/toggle', { mealId }, authHeader());
            if (response.data.success) {
                setFavoriteMealIds(response.data.favoriteMealIds);
                // Keep localStorage's cached user object in sync too — favoriteMealIds is
                // seeded from it on every fresh page load, so without this a refresh right
                // after toggling would show stale (reverted) favorite status until next login.
                const storedUser = JSON.parse(localStorage.getItem('user'));
                storedUser.favoriteMealIds = response.data.favoriteMealIds;
                localStorage.setItem('user', JSON.stringify(storedUser));
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }


    const addReview = async (formData) => {
        try {
            const response = await axios.post(backendUrl + '/api/review/add', formData, authHeader());
            if (response.data.success) {
                toast.success('Review posted!');
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


    const removeReview = async (id) => {
        try {
            const response = await axios.post(backendUrl + '/api/review/remove', { id }, authHeader());
            if (response.data.success) {
                toast.success('Review removed.');
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


    const reorder = (order) => {
        const addable = order.items.filter((item) => item.mealId);
        if (addable.length === 0) {
            toast.error('Nothing in this order is still available');
            return;
        }
        setCartItems((prev) => {
            const next = structuredClone(prev);
            addable.forEach((item) => {
                const id = item.mealId._id || item.mealId;
                next[id] = next[id] || {};
                next[id][item.servings] = (next[id][item.servings] || 0) + 1;
            });
            return next;
        });
        toast.success('Added to your order draft!');
        navigate('/cart');
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
        mealsLoaded,
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
        forgotPassword,
        resetPassword,
        logout,
        myOrders,
        fetchMyOrders,
        householdOrders,
        fetchHouseholdOrders,
        submitOrder,
        calendarConnected,
        fetchCalendarStatus,
        connectCalendar,
        scheduleShopping,
        markShoppingDone,
        scheduleCooking,
        markCookingDone,
        cancelOrder,
        favoriteMealIds,
        toggleFavorite,
        reorder,
        addReview,
        removeReview,
        suggestions,
        addSuggestion,
        fetchSuggestions,
        removeSuggestion

    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;