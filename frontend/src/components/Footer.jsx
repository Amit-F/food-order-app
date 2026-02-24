import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const Footer = () => {

    const {navigateAndScroll} = useContext(ShopContext);
    
    
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <Link to={'/'} onClick={(e)=>{
                    if (location.pathname === "/") {
                        e.preventDefault;
                        window.scrollTo({ top:0, behavior:"smooth"});
                    }
                }} ><img src={assets.logo} className='w-32 mb-5' alt="" /></Link>
            </div>

            <div>
                <p className='mb-5 text-xl font-medium'>PAGES</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li onClick={()=>navigateAndScroll('/')} className='transition cursor-pointer hover:text-blue-600'>Home</li>
                    <li onClick={()=>navigateAndScroll('/collection')} className='transition cursor-pointer hover:text-blue-600'>Collection</li>
                    <li onClick={()=>navigateAndScroll('/about')} className='transition cursor-pointer hover:text-blue-600'>About</li>
                    <li onClick={()=>navigateAndScroll('/contact')} className='transition cursor-pointer hover:text-blue-600'>Contact</li>
                </ul>
            </div>

            <div>
                <p className='mb-5 text-xl font-medium'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>
                    <a
                        href="tel:+972586291144"
                        className="transition hover:text-blue-600"
                    >
                        058-629-1144
                    </a>
                    </li>

                    <li>
                    <a
                        href="mailto:amitfink@gmail.com?subject=We'd Like To Hire You!"
                        className="transition hover:text-blue-600"
                    >
                        amitfink@gmail.com
                    </a>
                    </li>
                </ul>
            </div>
        </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright © 2026 Amit Fink. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer