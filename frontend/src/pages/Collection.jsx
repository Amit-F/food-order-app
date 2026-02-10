import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'

const Collection = () => {

  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      
      {/* Filter Options */}
      <div className='min-w-60'>
        <p className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS</p>
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
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
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


    </div>
  )
}

export default Collection