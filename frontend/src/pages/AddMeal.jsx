import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopContext'
import upload_area from '../assets/forever/admin_assets/upload_area.png'

const CATEGORY_OPTIONS = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
const SUBCATEGORY_OPTIONS = ['Appetizer', 'Main', 'Dessert', 'Healthy', 'Beverage', 'Cocktail', 'Baked', 'Fried', 'Grilled', 'Soup', 'Salad'];
const SERVINGS_OPTIONS = [2, 4, 6, 8, 10];

const emptyIngredient = () => ({ name: '', quantity: '', unit: '' });

const AddMeal = () => {

    const { addMeal, user, navigate } = useContext(ShopContext);

    const [images, setImages] = useState([null, null, null, null, null]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [timeToPrepare, setTimeToPrepare] = useState('');
    const [additionalPrepTime, setAdditionalPrepTime] = useState(false);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [servingsOptions, setServingsOptions] = useState([]);
    const [ingredients, setIngredients] = useState([emptyIngredient()]);
    const [recommended, setRecommended] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const toggle = (value, list, setList) => {
        setList((prev) => prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]);
    }

    const toggleServings = (value) => {
        setServingsOptions((prev) => prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value].sort((a, b) => a - b));
    }

    const setImageAt = (index, file) => {
        setImages((prev) => {
            const next = [...prev];
            next[index] = file;
            return next;
        })
    }

    const updateIngredient = (index, field, value) => {
        setIngredients((prev) => {
            const next = [...prev];
            next[index] = { ...next[index], [field]: value };
            return next;
        })
    }

    const addIngredientRow = () => setIngredients((prev) => [...prev, emptyIngredient()]);
    const removeIngredientRow = (index) => setIngredients((prev) => prev.filter((_, i) => i !== index));

    const resetForm = () => {
        setImages([null, null, null, null, null]);
        setName('');
        setDescription('');
        setTimeToPrepare('');
        setAdditionalPrepTime(false);
        setCategory([]);
        setSubCategory([]);
        setServingsOptions([]);
        setIngredients([emptyIngredient()]);
        setRecommended(false);
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (images.every((img) => !img)) {
            toast.error('Add at least one photo of the meal');
            return;
        }
        if (category.length === 0) {
            toast.error('Pick at least one meal type (Breakfast, Lunch, ...)');
            return;
        }
        if (subCategory.length === 0) {
            toast.error('Pick at least one tag (Main, Healthy, ...)');
            return;
        }
        if (servingsOptions.length === 0) {
            toast.error('Pick at least one serving size you can prep this in');
            return;
        }
        const cleanIngredients = ingredients
            .map((ing) => ({ name: ing.name.trim(), quantity: Number(ing.quantity), unit: ing.unit.trim() }))
            .filter((ing) => ing.name && ing.unit && ing.quantity > 0);
        if (cleanIngredients.length === 0) {
            toast.error('Add at least one ingredient with a name, quantity, and unit');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('timeToPrepare', timeToPrepare);
        formData.append('additionalPrepTime', additionalPrepTime);
        formData.append('category', JSON.stringify(category));
        formData.append('subCategory', JSON.stringify(subCategory));
        formData.append('servingsOptions', JSON.stringify(servingsOptions));
        formData.append('ingredients', JSON.stringify(cleanIngredients));
        formData.append('bestSeller', recommended);
        images.forEach((img, index) => {
            if (img) formData.append(`image${index + 1}`, img);
        })

        setSubmitting(true);
        const success = await addMeal(formData);
        setSubmitting(false);

        if (success) {
            resetForm();
            navigate('/collection');
        }
    }

    if (!user) {
        return <p className='pt-14 text-center'>Please log in as a cook to add meals.</p>
    }

    if (user.role !== 'cook') {
        return <p className='pt-14 text-center'>Only the cook can add meals.</p>
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full max-w-3xl gap-6 pt-10 pb-20 m-auto'>

            <p className='text-2xl prata-regular'>Add a Meal</p>

            {/* Photos */}
            <div>
                <p className='mb-2 font-medium'>Photos <span className='font-normal text-gray-500'>(at least one)</span></p>
                <div className='flex flex-wrap gap-2'>
                    {images.map((img, index) => (
                        <label key={index} htmlFor={`image${index}`}>
                            <img
                                className='object-cover w-20 h-20 border border-gray-300 cursor-pointer'
                                src={img ? URL.createObjectURL(img) : upload_area}
                                alt=""
                            />
                            <input onChange={(e) => setImageAt(index, e.target.files[0])} type="file" id={`image${index}`} accept="image/*" hidden />
                        </label>
                    ))}
                </div>
            </div>

            {/* Basics */}
            <div className='flex flex-col gap-1'>
                <p className='font-medium'>Meal name</p>
                <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-md px-3 py-2 border border-gray-300' type="text" placeholder="e.g. Chicken Noodle Soup" required />
            </div>

            <div className='flex flex-col gap-1'>
                <p className='font-medium'>Description</p>
                <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-md px-3 py-2 border border-gray-300' rows={3} placeholder="What is this meal? Anything worth knowing before ordering it." required />
            </div>

            <div className='flex flex-wrap items-end gap-6'>
                <div className='flex flex-col gap-1'>
                    <p className='font-medium'>Time to prepare (minutes)</p>
                    <input onChange={(e) => setTimeToPrepare(e.target.value)} value={timeToPrepare} className='w-32 px-3 py-2 border border-gray-300' type="number" min="1" required />
                </div>
                <label className='flex items-center gap-2 mb-2'>
                    <input onChange={(e) => setAdditionalPrepTime(e.target.checked)} checked={additionalPrepTime} type="checkbox" />
                    Needs additional prep time (e.g. marinating, resting)
                </label>
                <label className='flex items-center gap-2 mb-2'>
                    <input onChange={(e) => setRecommended(e.target.checked)} checked={recommended} type="checkbox" />
                    Recommended
                </label>
            </div>

            {/* Category */}
            <div>
                <p className='mb-2 font-medium'>When is this eaten?</p>
                <div className='flex flex-wrap gap-3 text-sm'>
                    {CATEGORY_OPTIONS.map((option) => (
                        <label key={option} className='flex items-center gap-1 px-3 py-1 border border-gray-300 cursor-pointer'>
                            <input type="checkbox" checked={category.includes(option)} onChange={() => toggle(option, category, setCategory)} />
                            {option}
                        </label>
                    ))}
                </div>
            </div>

            {/* Subcategory */}
            <div>
                <p className='mb-2 font-medium'>Tags</p>
                <div className='flex flex-wrap gap-3 text-sm'>
                    {SUBCATEGORY_OPTIONS.map((option) => (
                        <label key={option} className='flex items-center gap-1 px-3 py-1 border border-gray-300 cursor-pointer'>
                            <input type="checkbox" checked={subCategory.includes(option)} onChange={() => toggle(option, subCategory, setSubCategory)} />
                            {option}
                        </label>
                    ))}
                </div>
            </div>

            {/* Servings */}
            <div>
                <p className='mb-2 font-medium'>Which serving sizes can you prep this in?</p>
                <p className='mb-2 text-xs text-gray-500'>Always in twos, since you're cooking for at least two people.</p>
                <div className='flex flex-wrap gap-3 text-sm'>
                    {SERVINGS_OPTIONS.map((option) => (
                        <label key={option} className='flex items-center gap-1 px-3 py-1 border border-gray-300 cursor-pointer'>
                            <input type="checkbox" checked={servingsOptions.includes(option)} onChange={() => toggleServings(option)} />
                            {option} servings
                        </label>
                    ))}
                </div>
            </div>

            {/* Ingredients */}
            <div>
                <p className='mb-1 font-medium'>Ingredients</p>
                <p className='mb-2 text-xs text-gray-500'>Enter the amount needed for a single serving — the shopping list will multiply this out automatically based on how many servings get ordered.</p>
                <div className='flex flex-col gap-2'>
                    {ingredients.map((ingredient, index) => (
                        <div key={index} className='flex items-center gap-2'>
                            <input
                                className='flex-1 px-3 py-2 border border-gray-300'
                                type="text"
                                placeholder='Ingredient (e.g. onion)'
                                value={ingredient.name}
                                onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                            />
                            <input
                                className='w-24 px-3 py-2 border border-gray-300'
                                type="number"
                                step="any"
                                min="0"
                                placeholder='Qty'
                                value={ingredient.quantity}
                                onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
                            />
                            <input
                                className='w-28 px-3 py-2 border border-gray-300'
                                type="text"
                                placeholder='Unit (e.g. g, cup)'
                                value={ingredient.unit}
                                onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
                            />
                            <button type="button" onClick={() => removeIngredientRow(index)} className='px-2 text-gray-500 hover:text-black'>✕</button>
                        </div>
                    ))}
                </div>
                <button type="button" onClick={addIngredientRow} className='mt-2 text-sm underline'>+ Add another ingredient</button>
            </div>

            <button type="submit" disabled={submitting} className='w-40 px-8 py-3 mt-4 text-white bg-black disabled:opacity-50'>
                {submitting ? 'Adding...' : 'Add Meal'}
            </button>

        </form>
    )
}

export default AddMeal
