import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import upload_area from '../assets/forever/admin_assets/upload_area.png'

const ReviewForm = ({ mealId, onSubmitted }) => {

    const { addReview } = useContext(ShopContext);

    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [text, setText] = useState('');
    const [photos, setPhotos] = useState([null, null]);
    const [submitting, setSubmitting] = useState(false);

    const setPhotoAt = (index, file) => {
        setPhotos((prev) => {
            const next = [...prev];
            next[index] = file;
            return next;
        })
    }

    const resetForm = () => {
        setRating(0);
        setText('');
        setPhotos([null, null]);
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (rating < 1) {
            toast.error('Pick a star rating');
            return;
        }
        if (!text.trim()) {
            toast.error('Write a few words for your review');
            return;
        }

        const formData = new FormData();
        formData.append('mealId', mealId);
        formData.append('rating', rating);
        formData.append('text', text);
        photos.forEach((file, index) => { if (file) formData.append(`photo${index + 1}`, file) });

        setSubmitting(true);
        const success = await addReview(formData);
        setSubmitting(false);

        if (success) {
            resetForm();
            onSubmitted();
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col gap-3 p-4 border bg-gray-50'>
            <p className='font-medium'>Write a review</p>

            <div className='flex gap-1'>
                {[1, 2, 3, 4, 5].map((star) => (
                    <img
                        key={star}
                        src={star <= (hoverRating || rating) ? assets.star_icon : assets.star_dull_icon}
                        alt={`${star} star`}
                        className='w-5 h-5 cursor-pointer'
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                    />
                ))}
            </div>

            <textarea
                onChange={(e) => setText(e.target.value)}
                value={text}
                className='w-full px-3 py-2 border border-gray-300'
                rows={3}
                placeholder="How was it? Anything worth knowing for next time."
            />

            <div>
                <p className='mb-1 text-xs text-gray-500'>Photos (optional, up to 2)</p>
                <div className='flex gap-2'>
                    {photos.map((photo, index) => (
                        <label key={index} htmlFor={`review-photo${index}`}>
                            <img
                                className='object-cover w-16 h-16 border border-gray-300 cursor-pointer'
                                src={photo ? URL.createObjectURL(photo) : upload_area}
                                alt=""
                            />
                            <input onChange={(e) => setPhotoAt(index, e.target.files[0])} type="file" id={`review-photo${index}`} accept="image/*" hidden />
                        </label>
                    ))}
                </div>
            </div>

            <button type="submit" disabled={submitting} className='self-start px-6 py-2 text-sm text-white bg-black disabled:opacity-50'>
                {submitting ? 'Posting...' : 'Post Review'}
            </button>
        </form>
    )
}

export default ReviewForm
