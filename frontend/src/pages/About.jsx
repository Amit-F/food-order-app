import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const About = () => {

    const aboutMeText = `Hey! I'm Amit!
      I'm a Computer Science graduate from Tel Aviv University (born and raised in Boston!) who loves turning everyday problems into software solutions — ideally ones involving food :)
      My background combines strong algorithmic foundations with hands-on full-stack development in React, JavaScript, and modern web tooling.
      I enjoy building clean, well-structured systems, thinking through data flow and state management, and designing user experiences that feel intuitive rather than accidental.
      Whether it's optimizing a filtering algorithm, structuring a context provider, or debugging a subtle React rendering issue, I approach development with curiosity, discipline, and just enough humor to survive console.log at 2am.`;

    const projectText = `Feed Me started as a domestic efficiency experiment and evolved into a full-stack meal-planning system.
      I built it for easier meal-prep: so my girlfriend could “order” meals I've previously cooked, select the number of servings, and schedule them for a specific date and time.
      The app then converts that request into a calendar event — effectively bridging food preferences, portion planning, and time management.
      A 2-serving request becomes dinner for two; 10 servings becomes a week of structured meal-prep.
      Beyond being a fun relationship-powered feature, Feed Me also gave me the opportunity to think through state management, pricing calculations, and shared data across components in a practical setting. It turns out meal prep and clean architecture have more in common than I expected!`;

  return (
    <div className='pt-8 border-t'>
      <div className='text-2xl text-center'>
        <Title text1={'ABOUT'} text2={'ME'} />
        <div className='flex flex-col gap-8 my-10 md:flex-row'>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 text-left text-gray-600 md:w-2/4'>
            <b>About Me:</b>
            <p className='mt-1 text-sm leading-relaxed text-gray-700 whitespace-pre-line'>
              {aboutMeText}
            </p>
            <b>About Feed Me:</b>
            <p className='mt-1 text-sm leading-relaxed text-gray-700 whitespace-pre-line'>
              {projectText}
            </p>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default About