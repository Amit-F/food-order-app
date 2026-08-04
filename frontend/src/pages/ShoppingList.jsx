import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const ShoppingList = () => {

    const { backendUrl, token, user } = useContext(ShopContext);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const authHeader = () => ({ headers: { Authorization: `Bearer ${token}` } });

    // Aggregated quantities are floating-point sums and can show noise like
    // 3.4999999999999996 — round for display/export only, never re-store.
    const formatQuantity = (quantity) => Math.round(quantity * 100) / 100;

    const fetchList = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/shopping-list', authHeader());
            if (response.data.success) {
                setItems(response.data.items);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false);
    }

    useEffect(()=>{
        if (user?.role === 'cook') {
            fetchList();
        } else {
            setLoading(false);
        }
    },[user])

    const toggleItem = async (item) => {
        // optimistic update
        setItems((prev) => prev.map((i) => i.name === item.name && i.unit === item.unit ? {...i, checked: !i.checked} : i));
        try {
            const response = await axios.post(backendUrl + '/api/shopping-list/toggle', { name: item.name, unit: item.unit }, authHeader());
            if (!response.data.success) {
                toast.error(response.data.message);
                fetchList(); // revert to server truth on failure
            }
        } catch (error) {
            toast.error(error.message);
            fetchList();
        }
    }

    if (!user) {
        return <p className='pt-14 text-center'>Please log in as a cook to view the shopping list.</p>
    }

    if (user.role !== 'cook') {
        return <p className='pt-14 text-center'>Only the cook can view the shopping list.</p>
    }

    if (loading) {
        return <p className='pt-14 text-center'>Loading...</p>
    }

    const copyToClipboard = async () => {
        const text = items.map((item) => `${formatQuantity(item.quantity)} ${item.unit} ${item.name}`).join('\n');
        try {
            await navigator.clipboard.writeText(text);
            toast.success('Shopping list copied!');
        } catch {
            toast.error('Could not copy to clipboard');
        }
    }

    return (
        <div className='pt-16 border-t'>
            <div className='flex items-center justify-between'>
                <div className='text-2xl'>
                    <Title text1={'SHOPPING'} text2={'LIST'}/>
                </div>
                <button
                    onClick={copyToClipboard}
                    disabled={items.length === 0}
                    className='px-4 py-2 text-sm text-white bg-black disabled:opacity-50'
                >
                    Copy to Clipboard
                </button>
            </div>
            <p className='mt-2 text-sm text-gray-500'>Aggregated from every order that hasn't been shopped for yet.</p>

            <div className='mt-6'>
                {
                    items.length === 0
                    ? <p className='py-8 text-gray-500'>Nothing to buy right now.</p>
                    : items.map((item, index)=>(
                        <label key={index} className='flex items-center gap-3 py-3 border-t last:border-b cursor-pointer'>
                            <input type="checkbox" checked={item.checked} onChange={()=>toggleItem(item)} />
                            <span className={item.checked ? 'line-through text-gray-400' : ''}>
                                {formatQuantity(item.quantity)} {item.unit} {item.name}
                            </span>
                        </label>
                    ))
                }
            </div>
        </div>
    )
}

export default ShoppingList
