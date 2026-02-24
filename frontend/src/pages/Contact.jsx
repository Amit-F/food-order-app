import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='pt-10 text-2xl text-center border-t'>
        <Title text1={'CONTACT'} text2={'ME'} />
      </div>
      <div className='flex flex-col justify-center gap-10 my-10 md:flex-row mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col items-start justify-center gap-6'>
          <p className='text-xl font-semibold text-gray-600'>Looking Forward To Hearing From You!</p>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              Phone Number:{" "}
              <a
                href="tel:+972586291144"
                className="text-blue-600 hover:underline"
              >
                058-629-1144
              </a>
            </p>

            <p>
              Email:{" "}
              <a
                href="mailto:amitfink@gmail.com?subject=We'd Like To Hire You!"
                className="text-blue-600 hover:underline"
              >
                amitfink@gmail.com
              </a>
            </p>

            <p>
              LinkedIn:{" "}
              <a
                href="https://www.linkedin.com/in/amit-fink/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                linkedin.com/in/amit-fink
              </a>
            </p>

            <p>
              GitHub:{" "}
              <a
                href="https://github.com/Amit-F"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                github.com/Amit-F
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact