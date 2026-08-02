import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import MealForm from '../components/MealForm'

const EditMeal = () => {

    const { mealId } = useParams();
    const { meals, updateMeal, user, navigate } = useContext(ShopContext);

    if (!user) {
        return <p className='pt-14 text-center'>Please log in as a cook to edit meals.</p>
    }

    if (user.role !== 'cook') {
        return <p className='pt-14 text-center'>Only the cook can edit meals.</p>
    }

    const meal = meals.find((m) => m._id === mealId);

    if (!meal) {
        return <p className='pt-14 text-center'>Meal not found.</p>
    }

    const handleSubmit = async (formData) => {
        const success = await updateMeal(mealId, formData);
        if (success) {
            navigate(`/product/${mealId}`);
        }
    }

    return (
        <MealForm
            key={mealId}
            initialMeal={meal}
            title="Edit Meal"
            submitLabel="Save Changes"
            submittingLabel="Saving..."
            onSubmit={handleSubmit}
        />
    )
}

export default EditMeal
