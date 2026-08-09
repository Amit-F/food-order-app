import React from 'react'
import { Link } from 'react-router-dom';


const ProductItem = ({id, image, name}) => {

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
        <div className='overflow-hidden aspect-square'>
            <img src={image[0]} className='object-cover w-full h-full hover:scale-110 transition ease-in-out' alt="" />
        </div>
        <p className='pt-3 pb-1 text-sm'>{name}</p>
    </Link>
  )
}

export default ProductItem