import React, { useContext, useMemo } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {

  const { meals, cartItems, updateQuantity, navigateAndScroll} = useContext(ShopContext);

  const cartData = useMemo(() => {
    const tempData = [];
    for(const items in cartItems){
      for(const item in cartItems[items]){
        if (cartItems[items][item] > 0){
          tempData.push({
            _id: items,
            servingAmount: item,
            quantity: cartItems[items][item]
          })
        }
      }
    }
    return tempData;
  }, [cartItems])




  return (
    <div className='border-t pt-14'>

      <div className='mb-3 text-2xl'>
        <Title text1={'YOUR'} text2={'ORDER'}/>
      </div>

      {
        cartData.length === 0
        ? <p className='py-8 text-gray-500'>Your order is empty. Browse the collection and add some meals.</p>
        : <div >
          {
            cartData.map((item,index)=>{
              const mealData = meals.find((meal)=> meal._id === item._id);
              if (!mealData) return null;

              return (
                <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                  <div className='flex items-start gap-6'>
                    <img src={mealData.image[0]} className='w-16 sm:w-20' alt="" />
                    <div>
                      <p className='text-xs sm:text-lg font-m'>{mealData.name}</p>
                      <div className='flex items-center gap-5 mt-2'>
                        <p className='px-2 border sm:px-3 sm:py-1 bg-slate-50'>Servings: {item.servingAmount}</p>
                        <p>Batches: </p>
                        <input
                          className='px-1 py-1 border max-w-10 sm:max-w-20 sm:px-2'
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) => {
                            const nextQty = Math.max(1, Number(e.target.value) || 1);
                            updateQuantity(item._id, item.servingAmount, nextQty);
                            }}
                        />
                      </div>
                    </div>
                  </div>
                  <p>Total Servings: {item.servingAmount * item.quantity}</p>
                  <img onClick={()=>updateQuantity(item._id, item.servingAmount, 0)} className='w-4 mr-4 cursor-pointer sm:w-5' src={assets.bin_icon} alt="" />
                </div>
              )
            })
          }
        </div>
      }

      {cartData.length > 0 && (
        <div className='flex justify-end my-20'>
          <div className='w-full sm:w-[450px]'>
            <CartTotal />
            <div className='w-full text-end'>
              <button onClick={()=>navigateAndScroll('/place-order')} className='px-8 py-3 my-8 text-sm text-white bg-black'>REVIEW ORDER</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Cart
