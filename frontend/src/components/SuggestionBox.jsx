import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'

const SuggestionBox = () => {

    const { user, addSuggestion } = useContext(ShopContext);
    const [text, setText] = useState('');
    const [submitting, setSubmitting] = useState(false);

    if (!user) {
        return null;
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (!text.trim()) return;

        setSubmitting(true);
        const success = await addSuggestion(text);
        setSubmitting(false);

        if (success) setText('');
    }

    return (
        <div className='text-center'>
            <p className='text-2xl font-medium text-gray-800'>Got an idea?</p>
            <p className='mt-3 text-gray-400'>
                Send a suggestion straight to the developer.
            </p>
            <form onSubmit={onSubmitHandler} className='flex items-center w-full gap-3 pl-3 mx-auto my-6 border sm:w-1/2'>
                <input
                    className='w-full outline-none sm:flex-1'
                    type="text"
                    placeholder='What would make this app better?'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                />
                <button type='submit' disabled={submitting} className='px-10 py-4 text-xs text-white bg-black disabled:opacity-50'>SEND</button>
            </form>
        </div>
    )
}

export default SuggestionBox
