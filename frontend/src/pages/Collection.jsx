import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(()=>{
    setFilteredProducts(products);
  },[])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      
      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} alt="" />
        </p>
        {/* Category Filters */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Breakfast'}/> Breakfast
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Lunch'}/> Lunch
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Dinner'}/> Dinner
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Snack'}/> Snack
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Dessert'}/> Dessert
            </p>
          </div>
        </div>
        {/* Subcategory Filters */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Appetizer'}/> Appetizer
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Main Course'}/> Main Course
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Healthy'}/> Healthy
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Beverage'}/> Beverage
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Cocktail'}/> Cocktail
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Baked'}/> Baked
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Fried'}/> Fried
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Grilled'}/> Grilled
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Soup'}/> Soup
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Salad'}/> Salad
            </p>
          </div>
        </div>        
      </div>

      {/* Right Side */}

      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'}></Title>
          {/* Product Sort */}
          <select className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high"> Price: Low to High</option>
            <option value="high-low"> Price: High to Low</option>
          </select>

        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filteredProducts.map((item, index)=>(
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          }

        </div>

      </div>

    </div>
  )
}

export default Collection