import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import MealForm from '../components/MealForm'

const AddMeal = () => {

    const { addMeal, user, navigate } = useContext(ShopContext);

    if (!user) {
        return <p className='pt-14 text-center'>Please log in as a cook to add meals.</p>
    }

    if (user.role !== 'cook') {
        return <p className='pt-14 text-center'>Only the cook can add meals.</p>
    }

    const handleSubmit = async (formData) => {
        const success = await addMeal(formData);
        if (success) {
            navigate('/collection');
        }
    }

    return (
        <MealForm
            title="Add a Meal"
            submitLabel="Add Meal"
            submittingLabel="Adding..."
            onSubmit={handleSubmit}
        />
    )
}

export default AddMeal
