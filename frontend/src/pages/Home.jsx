import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import HowItWorks from '../components/HowItWorks'
import SuggestionBox from '../components/SuggestionBox'

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection/>
      <BestSeller/>
      <HowItWorks/>
      <SuggestionBox/>
    </div>
  )
}

export default Home