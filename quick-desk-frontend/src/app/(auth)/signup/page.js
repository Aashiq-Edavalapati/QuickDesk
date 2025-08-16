import Signup from '@/components/auth/Signup';
import Image from 'next/image';
import logo from './image.png'; // Make sure this path is correct

export default function SignUpPage() {
  return (
    <main className="relative bg-[#05192d] min-h-screen w-full flex flex-col items-center justify-center overflow-hidden p-4 sm:p-6 md:p-8">
      {/* Background shapes - Hidden on mobile, visible on larger screens */}
      {/* Top-left diagonal shapes */}
      <div className="hidden md:block absolute top-0 left-0 w-[37.5rem] h-[25rem] bg-[#7933ff] rotate-[-25deg] -translate-x-1/2 -translate-y-1/2"></div>
      <div className="hidden md:block absolute top-0 left-0 w-[37.5rem] h-[9.375rem] bg-[#06bdfc] rotate-[-25deg] -translate-x-[30%] -translate-y-[60%]"></div>
      <div className="hidden md:block absolute top-0 left-0 w-[37.5rem] h-[12.5rem] bg-[#60e7ff] rotate-[-25deg] -translate-x-[5%] -translate-y-[75%]"></div>

      {/* Top-right diagonal shapes */}
      <div className="hidden lg:block absolute top-0 right-0 w-[43.75rem] h-[15.625rem] bg-[#06bdfc] rotate-[25deg] translate-x-1/2 -translate-y-1/2"></div>
      <div className="hidden lg:block absolute top-0 right-0 w-[43.75rem] h-[12.5rem] bg-[#60e7ff] rotate-[25deg] translate-x-[30%] -translate-y-[65%]"></div>

      {/* Bottom-left overlapping circles */}
      <div className="hidden sm:block absolute bottom-[-80px] left-[-80px] flex items-center">
        <div className="w-64 h-64 bg-[#06bdfc] rounded-full"></div>
        <div className="w-52 h-52 bg-[#7933ff] rounded-full -translate-x-20 translate-y-2"></div>
      </div>

      {/* Bottom-right diagonal accent */}
      <div className="hidden sm:block absolute bottom-0 right-0 w-[400px] h-[150px] bg-[#60e7ff] rotate-[35deg] translate-x-1/3 translate-y-1/3"></div>

      {/* Soft gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent pointer-events-none"></div>
      
      {/* Logo - Placed in the normal document flow for responsiveness */}
      <div className="relative z-10 mb-8">
        <Image src={logo} alt="QuickDesk" width={200} height={50} /> {/* It's good practice to add width/height */}
      </div>

      {/* Signup card */}
      <div className="relative z-10 w-full flex justify-center">
        <Signup />
      </div>
    </main>
  );
}