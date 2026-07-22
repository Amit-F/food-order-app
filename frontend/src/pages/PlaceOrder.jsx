import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/ShopContext'

const PlaceOrder = () => {

  const { meals, cartItems, submitOrder, navigate } = useContext(ShopContext);
  const [notes, setNotes] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const lines = [];
  for (const mealId in cartItems) {
    for (const servingAmount in cartItems[mealId]) {
      const quantity = cartItems[mealId][servingAmount];
      if (quantity > 0) {
        lines.push({ mealId, servingAmount, quantity });
      }
    }
  }

  const lineKey = (mealId, servingAmount) => `${mealId}-${servingAmount}`;

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const items = [];
    lines.forEach(({ mealId, servingAmount, quantity }) => {
      for (let i = 0; i < quantity; i++) {
        items.push({ mealId, servings: Number(servingAmount), notes: notes[lineKey(mealId, servingAmount)] || '' });
      }
    })

    setSubmitting(true);
    const success = await submitOrder(items);
    setSubmitting(false);

    if (success) {
      navigate('/orders');
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className='my-3 text-xl sm:text-2xl'>
        <Title text1={'REVIEW'} text2={'ORDER'}/>
      </div>

      <div className='flex flex-col gap-4'>
        {
          lines.length === 0
          ? <p className='text-gray-500'>Your order is empty. Go back and add some meals.</p>
          : lines.map(({mealId, servingAmount, quantity}) => {
            const meal = meals.find((m) => m._id === mealId);
            if (!meal) return null;
            return (
              <div key={lineKey(mealId, servingAmount)} className='flex flex-col gap-2 py-3 border-b sm:flex-row sm:items-center sm:justify-between'>
                <div>
                  <p className='font-medium'>{meal.name}</p>
                  <p className='text-sm text-gray-500'>{servingAmount} servings × {quantity} {quantity === 1 ? 'batch' : 'batches'}</p>
                </div>
                <input
                  className='px-3 py-2 border border-gray-300 sm:w-64'
                  type="text"
                  placeholder="Notes (optional, e.g. extra spicy)"
                  value={notes[lineKey(mealId, servingAmount)] || ''}
                  onChange={(e)=> setNotes((prev)=>({...prev, [lineKey(mealId, servingAmount)]: e.target.value}))}
                />
              </div>
            )
          })
        }
      </div>

      <div className='self-end mt-8 min-w-80'>
        <CartTotal />
        <div className='w-full mt-8 text-end'>
          <button type="submit" disabled={submitting || lines.length === 0} className='px-16 py-3 text-sm text-white bg-black disabled:opacity-50'>
            {submitting ? 'Submitting...' : 'SUBMIT ORDER'}
          </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
