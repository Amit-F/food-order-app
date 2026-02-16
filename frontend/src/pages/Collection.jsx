import React, { use, useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubcategory] = useState([]);

  const toggleCategory = (e) => {

    if (category.includes(e.target.value)) {
      setCategory(prev=>prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev => [...prev, e.target.value])
    }
  }


  const toggleSubCategory = (e) => {

    if (subCategory.includes(e.target.value)) {
      setSubcategory(prev=>prev.filter(item => item !== e.target.value))
    }
    else{
      setSubcategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {

    let productsCopy = products.slice();

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => item.category.some(cat => category.includes(cat)));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => item.subCategory.some(sub => subCategory.includes(sub)));
    }

    setFilterProducts(productsCopy);
  }


  // useEffect(()=>{
  //   setFilterProducts(products);
  // },[])

  useEffect(()=>{
    applyFilter();
  }, [category, subCategory])

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
              <input className='w-3' type="checkbox" value={'Breakfast'} onChange={toggleCategory}/> Breakfast
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Lunch'} onChange={toggleCategory}/> Lunch
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Dinner'} onChange={toggleCategory}/> Dinner
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Snack'} onChange={toggleCategory}/> Snack
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Dessert'} onChange={toggleCategory}/> Dessert
            </p>
          </div>
        </div>
        {/* Subcategory Filters */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Appetizer'} onChange={toggleSubCategory} /> Appetizer
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Main Course'} onChange={toggleSubCategory} /> Main Course
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Healthy'} onChange={toggleSubCategory} /> Healthy
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Beverage'} onChange={toggleSubCategory} /> Beverage
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Cocktail'} onChange={toggleSubCategory} /> Cocktail
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Baked'} onChange={toggleSubCategory} /> Baked
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Fried'} onChange={toggleSubCategory} /> Fried
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Grilled'} onChange={toggleSubCategory} /> Grilled
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Soup'} onChange={toggleSubCategory} /> Soup
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Salad'} onChange={toggleSubCategory} /> Salad
            </p>
          </div>
        </div>        
      </div>

      {/* Right Side */}

      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'}></Title>
          {/* Product Sort */}
          <select className='border-2 border-gray-300 text-sm px-2' name="sort" id="sort">
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high"> Price: Low to High</option>
            <option value="high-low"> Price: High to Low</option>
          </select>

        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item, index)=>(
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          }

        </div>

      </div>

    </div>
  )
}

export default Collection