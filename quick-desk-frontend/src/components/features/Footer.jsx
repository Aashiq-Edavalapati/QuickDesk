import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className='relative bg-dark-cyan flex flex-col max-w-screen h-[120px] text-white'>
      <div className='relative flex justify-between py-[20px] px-[30px]'>
        <div className='relative flex justify-end w-[110px]'>
          QUICKDESK
        </div>
        <div className='relative flex justify-around w-[350px]'>
          <Link className='relative' href='#'>Privacy</Link>
          <Link className='relative' href='#'>Terms</Link>
          <Link className='relative' href='#'>Support</Link>
          <Link className='relative' href='#'>Contact</Link>
        </div>
      </div>
      <hr className='w-[95%] mx-auto'/>
      <div className='mx-auto mt-[10px]'>
        &copy; 2024 QuickDesk. All rights reserved. Built with ❤️ for support teams.
      </div>
    </div>
  )
}

export default Footer