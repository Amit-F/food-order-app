import React, { useContext, useMemo, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(true);

  const [category, setCategory] = useState([]);
  const [subCategory, setSubcategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) => prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]);
  }


  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubcategory((prev) => prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]);
  }
  

  const filteredAndSortedProducts = useMemo(() => {

    let list = products.slice();

    // Search filter
    if (showSearch && search) {
      const q = search.toLowerCase();
      list = list.filter((item) => item.name.toLowerCase().includes(q)); 
    }

    // Category overlap filter
    if (category.length > 0) {
      list = list.filter((item) => item.category?.some((cat) => category.includes(cat)));
    }

    // Subcategory overlap filter
    if (subCategory.length > 0) {
      list = list.filter((item) => item.subCategory?.some((sub) => subCategory.includes(sub)));
    }

    // Sorting
    if (sortType === 'low-high') {
      list.sort((a, b) => a.price - b.price);
    }
    else if (sortType === 'high-low') {
      list.sort((a, b) => b.price - a.price);
    }
    // 'relevant keeps original order

    return list;

  },[products, search, showSearch, category, subCategory, sortType])


  return (
    <div className='flex flex-col gap-1 pt-10 border-t sm:flex-row sm:gap-10'>
      
      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='flex items-center gap-2 my-2 text-xl cursor-pointer'>FILTERS
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
              <input className='w-3' type="checkbox" value={'Main'} onChange={toggleSubCategory} /> Main Course
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Dessert'} onChange={toggleSubCategory}/> Dessert
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
        <div className='flex justify-between mb-4 text-base sm:text-2xl'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* Product Sort */}
          <select onChange={(e)=>setSortType(e.target.value)} value={sortType} className='px-2 text-sm border-2 border-gray-300' name="sort" id="sort">
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high"> Price: Low to High</option>
            <option value="high-low"> Price: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 gap-y-6'>
          {
            filteredAndSortedProducts.map((item)=>(
              <ProductItem key={item._id} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection