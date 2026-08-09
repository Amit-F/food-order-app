import React from 'react'

const STEPS = [
    { title: 'Browse the Menu', text: 'Look through the meals on offer and see what sounds good this week.' },
    { title: 'Place Your Order', text: 'Pick your servings and submit — no price, no payment, just what you want to eat.' },
    { title: "I'll Handle the Rest", text: "I'll schedule the grocery run and cooking time, right on the calendar." }
]

const HowItWorks = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
        {STEPS.map((step, index) => (
            <div key={step.title}>
                <div className='flex items-center justify-center w-12 h-12 m-auto mb-5 text-lg font-medium border border-gray-400 rounded-full'>
                    {index + 1}
                </div>
                <p className='font-semibold'>{step.title}</p>
                <p className='text-gray-400'>{step.text}</p>
            </div>
        ))}
    </div>
  )
}

export default HowItWorks
