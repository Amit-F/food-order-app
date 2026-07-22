import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { ShopContext } from '../context/ShopContext'

const JoinHousehold = () => {

    const { code } = useParams();
    const { backendUrl, registerOrderer } = useContext(ShopContext);

    const [status, setStatus] = useState('loading'); // loading | valid | invalid
    const [householdName, setHouseholdName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const validateInvite = async () => {
            try {
                const response = await axios.get(backendUrl + '/api/household/invite/' + code);
                if (response.data.success) {
                    setHouseholdName(response.data.householdName);
                    setStatus('valid');
                } else {
                    setErrorMessage(response.data.message);
                    setStatus('invalid');
                }
            } catch (error) {
                setErrorMessage(error.message);
                setStatus('invalid');
            }
        }
        validateInvite();
    }, [code, backendUrl])

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        await registerOrderer(name, email, password, code);
    }

    if (status === 'loading') {
        return <p className='pt-14 text-center'>Checking your invite...</p>
    }

    if (status === 'invalid') {
        return <p className='pt-14 text-center text-red-600'>{errorMessage}</p>
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
            <div className='inline-flex items-center gap-2 mt-10 mb-2'>
                <p className='text-3xl prata-regular'>Join {householdName}</p>
                <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
            </div>
            <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required/>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required/>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Enter a password (min 8 characters)' required/>
            <button type="submit" className='px-8 py-2 mt-4 font-light text-white bg-black'>Join</button>
        </form>
    )
}

export default JoinHousehold
