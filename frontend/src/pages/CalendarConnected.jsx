import React, { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const CalendarConnected = () => {

    const [searchParams] = useSearchParams();
    const error = searchParams.get('error');
    const { fetchCalendarStatus, navigate } = useContext(ShopContext);

    useEffect(()=>{
        if (!error) {
            fetchCalendarStatus();
        }
    },[])

    return (
        <div className='flex flex-col items-center gap-4 pt-14 text-center'>
            {error ? (
                <>
                    <p className='text-2xl prata-regular'>Something went wrong</p>
                    <p className='text-gray-500'>Google Calendar didn't connect. Try again from the admin dashboard.</p>
                </>
            ) : (
                <>
                    <p className='text-2xl prata-regular'>Google Calendar connected!</p>
                    <p className='text-gray-500'>You can now schedule shopping and cooking events straight from your order reviews.</p>
                </>
            )}
            <button onClick={()=>navigate('/admin/orders')} className='px-8 py-2 mt-2 text-white bg-black'>Back to Orders</button>
        </div>
    )
}

export default CalendarConnected
