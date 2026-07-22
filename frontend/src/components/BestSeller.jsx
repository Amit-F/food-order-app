import React, { useContext, useMemo } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {

    const {meals} = useContext(ShopContext);

    const bestSeller = useMemo(() => meals.filter((item)=>(item.bestSeller)).slice(0,5), [meals]);

  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'RECOMMENDED'} text2={'MEALS'}/>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                bestSeller.map((item, index)=>(
                    <ProductItem key={index} id={item._id} name={item.name} image={item.image}/>
                ))
            }
        </div>

    </div>
  )
}

export default BestSeller