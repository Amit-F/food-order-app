import React, { useContext, useEffect } from 'react'
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

const Orders = () => {

  const {myOrders, fetchMyOrders, cancelOrder, reorder} = useContext(ShopContext);

  useEffect(()=>{
    fetchMyOrders();
  },[])

  return (
    <div className='pt-16 border-t'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'}/>
      </div>

      <div>
        {
          myOrders.length === 0
          ? <p className='py-8 text-gray-500'>You haven't placed any orders yet.</p>
          : myOrders.map((order)=>(
            <div key={order._id} className='py-4 text-gray-700 border-t border-b'>
              <div className='flex items-center justify-between mb-2'>
                <p className='text-sm text-gray-500'>Placed {new Date(order.createdAt).toLocaleDateString()}</p>
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
              {order.status === 'pending' && (
                <div className='mt-3'>
                  <button onClick={()=>cancelOrder(order._id)} className='px-4 py-1 text-sm border border-gray-400 hover:border-black'>Cancel Order</button>
                </div>
              )}
              {order.status === 'completed' && (
                <div className='mt-3'>
                  <button onClick={()=>reorder(order)} className='px-4 py-1 text-sm border border-gray-400 hover:border-black'>Order Again</button>
                </div>
              )}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
