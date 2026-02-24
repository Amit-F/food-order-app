import React, { useState } from 'react'



const Login = () => {

    const [currentState,setCurrentState] = useState('Login');
    
    
    const onSubmitHandler = async (event) => {
      event.preventDefault(); // prevents webpage from reloading when form is submitted
    }

    // TODO implement retyping password logic
  return (
    <form onSubmit={onSubmitHandler()} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'> 
      <div className='inline-flex items-center gap-2 mt-10 mb-2'>
        <p className='text-3xl prata-regular'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>

      {currentState === 'Sign Up' ? <input type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required/> : ''}
      <input type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required/>
      {currentState === 'Sign Up' ? <input type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Enter a password' required/> : <input type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required/>}
      {currentState === 'Sign Up' ? <input type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Enter password again' required/> : ''} 
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        {
          currentState === 'Login'
          ? <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p> 
          : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
        }
      </div>
      <button className='px-8 py-2 mt-4 font-light text-white bg-black'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>


    </form>
  )
}

export default Login