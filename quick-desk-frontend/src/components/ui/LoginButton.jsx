import { User } from 'lucide-react'
import React from 'react'

export const LoginButton = () => {
  return (
    <div className='relative flex justify-between items-center bg-dark-cyan rounded-full font-bold text-xl text-light-mint px-[20px] py-[10px] w-[120px] cursor-pointer transition-all duration-500 hover:bg-dark-cyan/90 hover:-translate-y-1'>
        <User />Login
    </div>
  )
}