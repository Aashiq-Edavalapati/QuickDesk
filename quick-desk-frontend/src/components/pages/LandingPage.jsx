import React from 'react'
import Hero from '../features/Hero'
import Features from '../features/Features'
import Testimonial from '../features/Testimonial'
import Footer from '../features/Footer'

const LandingPage = () => {
  return (
    <div className='relative h-full'>
        {/* <Hero /> */}
        <Features />
        <Testimonial />
        <Footer />
    </div>
  )
}

export default LandingPage