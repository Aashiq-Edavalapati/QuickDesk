import React from 'react'
import { LoginButton } from '../ui/LoginButton'

const Hero = () => {
  return (
    <div className='relative flex max-w-screen h-screen bg-light-mint items-center'>
      <div className='absolute right-3 top-3'>
        <LoginButton />
      </div>
      <div className='relative flex flex-col mx-auto'>
        <div className='relative font-bold text-8xl text-dark-cyan'>
          Support That <br />Scales With You
        </div>
        <div className='relative text-2xl mt-[15px]'>
          Transform your customer support with intelligent ticket<br /> management, real-time analytics, and seamless team<br /> collaboration.
        </div>
      </div>
      <div className='absolute flex justify-center w-screen mx-auto mt-[400px]'>
          <button className='bg-dark-cyan rounded-2xl font-bold text-light-mint text-2xl px-[20px] py-[10px] w-[200px] cursor-pointer transition-all duration-500 hover:bg-dark-cyan/90 hover:-translate-y-1'>
            Get Started
          </button>
      </div>
    </div>
  )
}

export default Hero