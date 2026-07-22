import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';

const STATUS_LABELS = {
  pending: 'Waiting for review',
  shopping_scheduled: 'Shopping scheduled',
  shopping_done: 'Shopping done',
  cook_scheduled: 'Cooking scheduled',
  completed: 'Completed'
};

const AdminDashboard = () => {

  const {user, householdOrders, fetchHouseholdOrders} = useContext(ShopContext);

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

  return (
    <div className='pt-16 border-t'>
      <div className='text-2xl'>
        <Title text1={'ORDER'} text2={'REVIEW'}/>
      </div>

      <div>
        {
          householdOrders.length === 0
          ? <p className='py-8 text-gray-500'>No orders yet.</p>
          : householdOrders.map((order)=>(
            <div key={order._id} className='py-4 text-gray-700 border-t border-b'>
              <div className='flex items-center justify-between mb-2'>
                <p className='font-medium'>{order.ordererId?.name || 'Unknown'} · <span className='text-sm text-gray-500'>{new Date(order.createdAt).toLocaleDateString()}</span></p>
                <div className='flex items-center gap-2'>
                  <p className='h-2 bg-green-500 rounded-full min-w-2'></p>
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
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default AdminDashboard
