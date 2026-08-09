import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const ForgotPassword = () => {

    const { forgotPassword } = useContext(ShopContext);
    const [email, setEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        const result = await forgotPassword(email);
        setSubmitting(false);
        setMessage(result.message);
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
            <div className='inline-flex items-center gap-2 mt-10 mb-2'>
                <p className='text-3xl prata-regular'>Forgot Password</p>
                <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
            </div>

            {message
                ? <p className='w-full text-sm text-center text-gray-600'>{message}</p>
                : <>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required/>
                    <button type="submit" disabled={submitting} className='w-full px-8 py-2 mt-4 font-light text-white bg-black disabled:opacity-50'>{submitting ? 'Sending...' : 'Send Reset Link'}</button>
                </>
            }

            <Link to='/login' className='text-sm underline'>Back to Login</Link>
        </form>
    )
}

export default ForgotPassword
