import React, { useContext, useMemo } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

    const { meals } = useContext(ShopContext);

    const latestMeals = useMemo(() => meals.slice(0,10), [meals]);

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'MEALS'}/>
        </div>

        {/* Rendering Meals */}

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                latestMeals.map((item, index)=>(
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name}/>
                ))
            }
        </div>

    </div>
  )
}

export default LatestCollection