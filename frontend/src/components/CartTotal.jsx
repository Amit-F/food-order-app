import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {

    const { cartItems } = useContext(ShopContext);

    let totalMeals = 0;
    let totalServings = 0;

    for (const mealId in cartItems) {
        let hasAny = false;
        for (const servingAmount in cartItems[mealId]) {
            const quantity = cartItems[mealId][servingAmount];
            if (quantity > 0) {
                hasAny = true;
                totalServings += Number(servingAmount) * quantity;
            }
        }
        if (hasAny) totalMeals += 1;
    }

  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1={'ORDER'} text2={'SUMMARY'} />
        </div>

        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
                <p>Meals</p>
                <p>{totalMeals}</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <b>Total Servings</b>
                <b>{totalServings}</b>
            </div>
        </div>
    </div>
  )
}

export default CartTotal
