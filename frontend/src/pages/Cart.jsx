import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigateAndScroll} = useContext(ShopContext);

  const [cartData,setCartData] = useState([]);

  useEffect(()=>{

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
    setCartData(tempData);
    
  },[cartItems])




  return (
    <div className='border-t pt-14'>
      
      <div className='mb-3 text-2xl'>
        <Title text1={'YOUR'} text2={'CART'}/>
      </div>

      <div >
        {
          cartData.map((item,index)=>{
            const productData = products.find((product)=> product._id === item._id);

            return (
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img src={productData.image[0]} className='w-16 sm:w-20' alt="" />
                  <div>
                    <p className='text-xs sm:text-lg font-m'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>Price Per Serving: {currency}{productData.price}</p>
                      <p className='px-2 border sm:px-3 sm:py-1 bg-slate-50'>Number of Servings: {item.servingAmount}</p>
                      <p>Quantity: </p>
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
                      {/* <p>Total Item Price: {currency}{productData.price * item.servingAmount}</p> */}
                    </div>
                  </div>
                </div>
                <p>Total Item Price: {currency}{productData.price * item.servingAmount * item.quantity}</p>
                {/* <input className='px-1 py-1 border max-w-10 sm:mx-w-20 sm:px-2' type="number" min={1} defaultValue={item.quantity}/> */}
                <img onClick={()=>updateQuantity(item._id, item.servingAmount, 0)} className='w-4 mr-4 cursor-pointer sm:w-5' src={assets.bin_icon} alt="" />
              </div>
            )
          })
        }
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button onClick={()=> cartData.length > 0 ? navigateAndScroll('/place-order') : null} className='px-8 py-3 my-8 text-sm text-white bg-black'>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cart