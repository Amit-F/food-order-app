import React, { useContext, useMemo } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({category, subCategory, _id}) => {

    const { meals } = useContext(ShopContext);

    const related = useMemo(() => {
        if (meals.length === 0) return [];

        return meals
            .filter((item)=>category.some(cat => item.category.includes(cat)) && item._id !== _id)
            .filter((item)=>subCategory.some(sub => item.subCategory.includes(sub)) && item._id !== _id)
            .slice(0,5);
    }, [meals, category, subCategory, _id])

  return (
    <div className='my-24'>
        <div className='text-center text-3xl py-2'>
            <Title text1={'RELATED'} text2={'MEALS'}/>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {related.map((item,index)=>(
                <ProductItem key={index} id={item._id} name={item.name} image={item.image}/>
            ))}
        </div>
    </div>
  )
}

export default RelatedProducts