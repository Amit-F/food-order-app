import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'

const RelatedProducts = ({category, subCategory, _id}) => {

    const { products } = useContext(ShopContext);
    const [related,setRelated] = useState([]);

    useEffect(()=>{
        
        if (products.length > 0) {
            let productsCopy = products.slice();

            productsCopy = productsCopy.filter((item)=>category.some(cat => item.category.includes(cat)) && item._id !== _id);
            productsCopy = productsCopy.filter((item)=>subCategory.some(sub => item.subCategory.includes(sub)) && item._id !== _id);

            console.log(productsCopy.slice(0,5));
            
        }

    },[products])

  return (
    <div>
        
    </div>
  )
}

export default RelatedProducts