import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const {productId} = useParams();
  const {products, currency} = useContext(ShopContext);
  const [productData,setProductData] = useState(false);
  const [image,setImage] = useState('');
  const [servingAmount,setServingAmount] = useState('');

  const fetchProductData = async () => {

    products.map((item)=>{
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        console.log(item);
        return null;
      }
    })
  }

  useEffect(()=> {
    fetchProductData();
  },[productId, products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* ------- Product Data ------- */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* ------- Product Images ------- */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index)=> (
                <img src={item} onClick={()=>setImage(item)} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto' alt="" />
          </div>
        </div>
        {/* ------- Product Information ------- */}
        <div className='flex-1'>
            <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
            <div className='flex items-center gap-1 mt-2'>
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_dull_icon} alt="" className="w-3 5" />
              <p className='pl-2'>(2)</p>
            </div>
            <p className='mt-1 text-sm font-medium'>[{productData.category.join(", ")} | {productData.subCategory.join(", ")}]</p>
            <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
            <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
            <div className='flex flex-col gap-1 my-8'>
              <p>Select Amount of Servings:</p>
              <div className='flex gap-2'>
                {productData.servings.map((item,index)=>(
                  <button onClick={()=>setServingAmount(item)} className={`border py-2 px-4 bg-gray-100 ${item === servingAmount ? 'border-orange-500' : ''}`} key={index}>{item}</button>
                ))}
              </div>
            </div>
            <button className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
            <hr className='mt-8 sm:w-4/5'/>
            <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
              <p>100% Original Product.</p> {/* TODO Change to make relevant */}
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>

            </div>
        </div>
      </div>

      {/* ------- Description & Review Section ------- */}

      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (2)</p> {/* TODO Hardcoded review count*/}
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
         <p>Dummy Text</p>
         <p>More dummy text in the description box</p>
        </div>
      </div>

      {/* ------- Display Related Products ------- */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} _id={productData._id}/>

    </div>
  ) : <div className='opacity-0'></div>
}

export default Product