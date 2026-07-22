import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'

const Login = () => {

    const [currentState,setCurrentState] = useState('Login');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [householdName, setHouseholdName] = useState('');

    const { login, registerCook } = useContext(ShopContext);

    const onSubmitHandler = async (event) => {
      event.preventDefault(); // prevents webpage from reloading when form is submitted

      if (currentState === 'Login') {
        await login(email, password);
      } else {
        await registerCook(name, email, password, householdName);
      }
    }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mt-10 mb-2'>
        <p className='text-3xl prata-regular'>{currentState === 'Login' ? 'Login' : 'Cook Sign Up'}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>

      {currentState === 'Sign Up' ? <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required/> : ''}
      <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required/>
      <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder={currentState === 'Sign Up' ? 'Enter a password (min 8 characters)' : 'Password'} required/>
      {currentState === 'Sign Up' ? <input onChange={(e)=>setHouseholdName(e.target.value)} value={householdName} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder="Kitchen name (optional)"/> : ''}
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p>Ordering from someone? Ask them for your invite link.</p>
      </div>
      <div className='w-full flex justify-between text-sm'>
        {
          currentState === 'Login'
          ? <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Sign up as a cook</p>
          : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
        }
      </div>
      <button type="submit" className='px-8 py-2 mt-4 font-light text-white bg-black'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>


    </form>
  )
}

export default Login
