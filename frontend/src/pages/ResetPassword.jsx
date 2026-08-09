import React, { useContext, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopContext'

const ResetPassword = () => {

    const { token } = useParams();
    const navigate = useNavigate();
    const { resetPassword } = useContext(ShopContext);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setErrorMessage('');

        if (password.length < 8) {
            setErrorMessage('Please enter a strong password of at least 8 characters');
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        setSubmitting(true);
        const result = await resetPassword(token, password);
        setSubmitting(false);

        if (result.success) {
            toast.success(result.message);
            navigate('/login');
        } else {
            setErrorMessage(result.message);
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
            <div className='inline-flex items-center gap-2 mt-10 mb-2'>
                <p className='text-3xl prata-regular'>Reset Password</p>
                <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
            </div>

            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='New password (min 8 characters)' required/>
            <input onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Confirm new password' required/>

            {errorMessage && (
                <div className='w-full text-sm text-center text-red-600'>
                    <p>{errorMessage}</p>
                    <Link to='/forgot-password' className='underline'>Request a new reset link</Link>
                </div>
            )}

            <button type="submit" disabled={submitting} className='w-full px-8 py-2 mt-4 font-light text-white bg-black disabled:opacity-50'>{submitting ? 'Updating...' : 'Update Password'}</button>
        </form>
    )
}

export default ResetPassword
