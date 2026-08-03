import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';

const STATUS_LABELS = {
  pending: 'Waiting for review',
  shopping_scheduled: 'Shopping scheduled',
  shopping_done: 'Shopping done',
  cook_scheduled: 'Cooking scheduled',
  completed: 'Completed',
  cancelled: 'Cancelled'
};

const AdminDashboard = () => {

  const {
    user, householdOrders, fetchHouseholdOrders,
    calendarConnected, connectCalendar,
    scheduleShopping, markShoppingDone, scheduleCooking, markCookingDone, cancelOrder
  } = useContext(ShopContext);

  const [openSchedule, setOpenSchedule] = useState(null); // { orderId, type: 'shopping' | 'cooking' } | null
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(()=>{
    if (user?.role === 'cook') {
      fetchHouseholdOrders();
    }
  },[user])

  if (!user) {
    return <p className='pt-14 text-center'>Please log in as a cook to review orders.</p>
  }

  if (user.role !== 'cook') {
    return <p className='pt-14 text-center'>Only the cook can review orders.</p>
  }

  const startScheduling = (orderId, type) => {
    setOpenSchedule({ orderId, type });
    setDate('');
    setTime('');
  }

  const cancelScheduling = () => setOpenSchedule(null);

  const confirmScheduling = async () => {
    if (!date || !time) return;
    setSubmitting(true);
    const action = openSchedule.type === 'shopping' ? scheduleShopping : scheduleCooking;
    const success = await action(openSchedule.orderId, date, time);
    setSubmitting(false);
    if (success) setOpenSchedule(null);
  }

  return (
    <div className='pt-16 border-t'>
      <div className='text-2xl'>
        <Title text1={'ORDER'} text2={'REVIEW'}/>
      </div>

      {!calendarConnected && (
        <div className='flex items-center justify-between p-4 mt-4 bg-gray-100'>
          <p className='text-sm'>Connect Google Calendar to schedule shopping and cooking events.</p>
          <button onClick={connectCalendar} className='px-4 py-2 text-sm text-white bg-black whitespace-nowrap'>Connect Google Calendar</button>
        </div>
      )}

      <div>
        {
          householdOrders.length === 0
          ? <p className='py-8 text-gray-500'>No orders yet.</p>
          : householdOrders.map((order)=>(
            <div key={order._id} className='py-4 text-gray-700 border-t border-b'>
              <div className='flex items-center justify-between mb-2'>
                <p className='font-medium'>{order.ordererId?.name || 'Unknown'} · <span className='text-sm text-gray-500'>{new Date(order.createdAt).toLocaleDateString()}</span></p>
                <div className='flex items-center gap-2'>
                  <p className={`h-2 rounded-full min-w-2 ${order.status === 'cancelled' ? 'bg-gray-400' : 'bg-green-500'}`}></p>
                  <p className='text-sm md:text-base'>{STATUS_LABELS[order.status] || order.status}</p>
                </div>
              </div>
              <div className='flex flex-col gap-3'>
                {order.items.map((item, index)=>(
                  <div key={index} className='flex items-center gap-4 text-sm'>
                    <img className='w-12 h-12 object-cover' src={item.mealId?.image?.[0]} alt="" />
                    <p className='font-medium'>{item.mealId?.name || 'Meal no longer available'}</p>
                    <p className='text-gray-500'>{item.servings} servings</p>
                    {item.notes && <p className='italic text-gray-400'>"{item.notes}"</p>}
                  </div>
                ))}
              </div>

              {/* Scheduling actions */}
              <div className='mt-3'>
                {order.status === 'pending' && openSchedule?.orderId !== order._id && (
                  <div className='flex items-center gap-3'>
                    <button disabled={!calendarConnected} onClick={()=>startScheduling(order._id, 'shopping')} className='px-4 py-2 text-sm text-white bg-black disabled:opacity-40'>Schedule Shopping</button>
                    <button onClick={()=>cancelOrder(order._id)} className='px-4 py-2 text-sm border border-gray-400 hover:border-black'>Cancel Order</button>
                  </div>
                )}

                {order.status === 'shopping_scheduled' && (
                  <div className='flex items-center gap-3'>
                    <p className='text-sm text-gray-500'>Shopping: {order.shoppingCalendar?.scheduledFor ? new Date(order.shoppingCalendar.scheduledFor).toLocaleString() : ''}</p>
                    <button onClick={()=>markShoppingDone(order._id)} className='px-4 py-2 text-sm text-white bg-black'>Mark Shopping Done</button>
                  </div>
                )}

                {order.status === 'shopping_done' && openSchedule?.orderId !== order._id && (
                  <button disabled={!calendarConnected} onClick={()=>startScheduling(order._id, 'cooking')} className='px-4 py-2 text-sm text-white bg-black disabled:opacity-40'>Schedule Cooking</button>
                )}

                {order.status === 'cook_scheduled' && (
                  <div className='flex items-center gap-3'>
                    <p className='text-sm text-gray-500'>Cooking: {order.cookCalendar?.scheduledFor ? new Date(order.cookCalendar.scheduledFor).toLocaleString() : ''}</p>
                    <button onClick={()=>markCookingDone(order._id)} className='px-4 py-2 text-sm text-white bg-black'>Mark Cooking Done</button>
                  </div>
                )}

                {openSchedule?.orderId === order._id && (
                  <div className='flex flex-wrap items-center gap-2 mt-2'>
                    <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className='px-2 py-1 border border-gray-300' />
                    <input type="time" value={time} onChange={(e)=>setTime(e.target.value)} className='px-2 py-1 border border-gray-300' />
                    <button disabled={submitting || !date || !time} onClick={confirmScheduling} className='px-4 py-1 text-sm text-white bg-black disabled:opacity-40'>{submitting ? 'Scheduling...' : 'Confirm'}</button>
                    <button onClick={cancelScheduling} className='px-4 py-1 text-sm border'>Cancel</button>
                  </div>
                )}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default AdminDashboard
