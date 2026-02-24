import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const Searchbar = () => {

    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible,setVisible] = useState(false);
    const location = useLocation();


    useEffect(()=>{
        if (location.pathname.includes('collection')) {
            setVisible(true);
        }
        else {
            setVisible(false);
        }
    },[location])


  return showSearch && visible ? (
    <div className='text-center border-t border-b bg-gray-50'>
        <div className='inline-flex items-center justify-center w-3/4 px-5 py-2 mx-3 my-5 border border-gray-400 rounded-full sm:w-1/2 '>
            <input className='flex-1 text-sm outline-none bg-inherit' value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search' />
            <img src={assets.search_icon} className='w-4' alt="" />
        </div>
        <img src={assets.cross_icon} className='inline w-3 cursor-pointer' onClick={()=>setShowSearch(false)} alt="" />
        
    </div>
  ) : null
}

export default Searchbar