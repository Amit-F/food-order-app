import React, { useContext, useEffect, useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import ReviewForm from '../components/ReviewForm';

const Product = () => {

  const {productId} = useParams();
  const {meals, mealsLoaded, addToCart, user, favoriteMealIds, toggleFavorite, backendUrl, token, removeReview} = useContext(ShopContext);
  const [productData,setProductData] = useState(false);
  const [image,setImage] = useState('');
  const [servingAmount,setServingAmount] = useState('');
  const [reviews, setReviews] = useState([]);

  const fetchProductData = async () => {

    meals.map((item)=>{
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    })
  }

  useEffect(()=> {
    fetchProductData();
  },[productId, meals])

  const fetchReviews = useCallback(async () => {
    try {
      const response = await axios.get(backendUrl + '/api/review/meal/' + productId, { headers: { Authorization: `Bearer ${token}` } });
      if (response.data.success) {
        setReviews(response.data.reviews);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [backendUrl, token, productId])

  useEffect(() => {
    if (token && productId) {
      fetchReviews();
    }
  }, [token, productId, fetchReviews])

  const handleRemoveReview = async (id) => {
    const success = await removeReview(id);
    if (success) fetchReviews();
  }

  const averageRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
  const roundedStars = Math.round(averageRating);

  return productData ? (
    <div className='pt-10 transition-opacity duration-500 ease-in border-t-2 opacity-100'>
      {/* ------- Product Data ------- */}
      <div className='flex flex-col gap-12 sm:gap-12 sm:flex-row'>
        {/* ------- Product Images ------- */}
        <div className='flex flex-col-reverse flex-1 gap-3 sm:flex-row'>
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
            <div className='flex items-center justify-between'>
              <h1 className='mt-2 text-2xl font-medium'>{productData.name}</h1>
              <div className='flex items-center gap-4'>
                {user && (
                  <button
                    onClick={()=>toggleFavorite(productData._id)}
                    className='text-2xl leading-none text-red-500'
                    aria-label={favoriteMealIds.includes(productData._id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    {favoriteMealIds.includes(productData._id) ? '♥' : '♡'}
                  </button>
                )}
                {user?.role === 'cook' && <Link to={`/edit-meal/${productData._id}`} className='text-sm underline'>Edit Meal</Link>}
              </div>
            </div>
            <div className='flex items-center gap-1 mt-2'>
              {reviews.length === 0 ? (
                <p className='text-sm text-gray-500'>No reviews yet</p>
              ) : (
                <>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <img key={star} src={star <= roundedStars ? assets.star_icon : assets.star_dull_icon} alt="" className="w-3 5" />
                  ))}
                  <p className='pl-2'>{averageRating.toFixed(1)} ({reviews.length})</p>
                </>
              )}
            </div>
            <p className='mt-1 text-sm font-medium'>[{productData.category.join(", ")} | {productData.subCategory.join(", ")}]</p>
            <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
            <p className='mt-2 text-sm text-gray-500'>Prep time: {productData.timeToPrepare} minutes{productData.additionalPrepTime ? ' (plus additional prep time, e.g. marinating/resting)' : ''}</p>
            <div className='flex flex-col gap-1 my-8'>
              <p>Select Amount of Servings:</p>
              <div className='flex gap-2'>
                {productData.servingsOptions.map((item,index)=>(
                  <button onClick={()=>setServingAmount(item)} className={`border py-2 px-4 bg-gray-100 ${item === servingAmount ? 'border-orange-500' : ''}`} key={index}>{item}</button>
                ))}
              </div>
            </div>
            <button onClick={()=>addToCart(productData._id,servingAmount)} className='px-8 py-3 text-sm text-white bg-black active:bg-gray-700'>ADD TO ORDER</button>
        </div>
      </div>

      {/* ------- Ingredients ------- */}

      <div className='mt-20'>
        <div className='flex'>
          <b className='px-5 py-3 text-sm border'>Ingredients (per serving)</b>
        </div>
        <div className='flex flex-col gap-2 px-6 py-6 text-sm text-gray-500 border'>
         {productData.ingredients.length === 0
           ? <p className='italic'>No ingredients added yet{user?.role === 'cook' && <> — <Link to={`/edit-meal/${productData._id}`} className='underline'>add some</Link></>}.</p>
           : productData.ingredients.map((ingredient, index) => (
             <p key={index}>
               {ingredient.quantity} {ingredient.unit} {ingredient.name}
               {ingredient.allergens?.length > 0 && (
                 <span className='ml-2 text-xs text-red-600'>⚠ Contains: {ingredient.allergens.join(', ')}</span>
               )}
             </p>
           ))
         }
        </div>
      </div>

      {/* ------- Reviews ------- */}

      <div className='mt-10'>
        <div className='flex'>
          <b className='px-5 py-3 text-sm border'>Reviews</b>
        </div>
        <div className='flex flex-col gap-4 px-6 py-6 border'>
          {user && (
            <ReviewForm mealId={productData._id} onSubmitted={fetchReviews} />
          )}
          {reviews.length === 0
            ? <p className='text-sm italic text-gray-500'>No reviews yet.</p>
            : reviews.map((review) => (
              <div key={review._id} className='flex flex-col gap-2 pb-4 border-b last:border-b-0'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm font-medium'>{review.userId?.name || 'Someone'}</span>
                    <div className='flex gap-0.5'>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <img key={star} src={star <= review.rating ? assets.star_icon : assets.star_dull_icon} alt="" className="w-3 h-3" />
                      ))}
                    </div>
                  </div>
                  {user && review.userId?._id === user._id && (
                    <button onClick={() => handleRemoveReview(review._id)} className='text-xs text-gray-500 underline'>Delete</button>
                  )}
                </div>
                <p className='text-sm text-gray-600'>{review.text}</p>
                {review.photos?.length > 0 && (
                  <div className='flex gap-2'>
                    {review.photos.map((url, index) => (
                      <img key={index} src={url} className='object-cover w-20 h-20 border' alt="" />
                    ))}
                  </div>
                )}
              </div>
            ))
          }
        </div>
      </div>

      {/* ------- Display Related Products ------- */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} _id={productData._id}/>

    </div>
  ) : (mealsLoaded ? <p className='pt-14 text-center text-gray-500'>Meal not found.</p> : <div className='opacity-0'></div>)
}

export default Product