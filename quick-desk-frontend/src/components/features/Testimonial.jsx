'use client'
import React, { useEffect, useState } from 'react'
import { Star, StarHalf, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

const mockTestimonialData = [
  {
    id: 1,
    rating: 4.5,
    review: 'QuickDesk transformed our support workflow. Response times improved by 70% and customer satisfaction is at an all-time high.',
    reviewer: 'Rangiku Matsumoto',
    designation: 'Lieutenant of Squad 10 at Gotei 13'
  },
  {
    id: 2,
    rating: 5,
    review: 'Absolutely essential for any modern business. The integration was seamless and the features are incredibly intuitive. A 5-star product!',
    reviewer: 'Kisuke Urahara',
    designation: 'Owner of Urahara Shop'
  },
  {
    id: 3,
    rating: 3,
    review: 'A solid tool that gets the job done. It has a few learning curves, but overall it has been a positive addition to our tech stack.',
    reviewer: 'Tōshirō Hitsugaya',
    designation: 'Captain of Squad 10 at Gotei 13'
  }
];

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="relative flex justify-center mb-[10px]">
      <div>
        {/* Background Gray Stars (5 total) */}
        <div className="flex">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={`gray-${i}`} fill="#111" strokeWidth={0} size={26} />
          ))}
        </div>

        {/* Foreground Yellow Stars (overlay) */}
        <div className="absolute top-0 flex">
          {Array.from({ length: fullStars }, (_, i) => (
            <Star key={`gold-${i}`} fill="#ffc106" strokeWidth={0} size={26} />
          ))}
          {hasHalfStar ? <StarHalf fill="#ffc106" strokeWidth={0} size={26} /> : <div></div>}
        </div>
      </div>
    </div>
  );
};

const variants = {
  enter: (direction) => ({
    x: direction === "next" ? 300 : -300,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeInOut" }
  },
  exit: (direction) => ({
    x: direction === "next" ? -300 : 300,
    opacity: 0,
    transition: { duration: 0.6, ease: "easeInOut" }
  }),
};

const Testimonial = () => {
  const [ currTestimonialIndex, setCurrTestimonialIndex ] = useState(0);
  const [ direction, setDirection ] = useState("next");

  const handlePrev = () => {
    setDirection("prev");
    setCurrTestimonialIndex((prev) => (prev - 1 + mockTestimonialData.length) % mockTestimonialData.length);
  }

  const handleNext = () => {
    setDirection("next");
    setCurrTestimonialIndex((prev) => (prev + 1) % mockTestimonialData.length);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currTestimonialIndex]);

  return (
    <div className='relative flex flex-col items-center justify-center h-screen bg-light-mint'>
      <h2 className='font-bold text-dark-cyan text-5xl'>Trusted by Thousands</h2>
      <h3 className='font-bold text-[#7C7C7C] text-2xl mt-[15px]'>See what industry leaders say about QuickDesk</h3>

      {/* Testimonial box */}
      <div className='bg-dark-cyan w-[60rem]  mt-[35px] rounded-2xl py-[25px]'>
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={mockTestimonialData[currTestimonialIndex].id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="top-0 left-0 w-full h-full flex flex-col items-center justify-center px-[50px]"
          >
            {/* Stars */}
            <StarRating rating={mockTestimonialData[currTestimonialIndex].rating} />
            
            {/* Review */}
            <div className='relative flex w-[100%] justify-center items-center text-white text-[20px] text-center px-[50px]'>
              "{mockTestimonialData[currTestimonialIndex].review}"
            </div>

            {/* Name */}
            <div className='relative flex w-[100%] justify-center font-bold text-white text-[22px] mt-[10px]'>
              {mockTestimonialData[currTestimonialIndex].reviewer}
            </div>

            {/* Designation */}
            <div className='relative flex w-[100%] justify-center text-[#D3D3D3] font-bold text-[20px] mt-[10px]'>
              {mockTestimonialData[currTestimonialIndex].designation}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className='relative flex justify-center w-[100%] mt-[20px]'>
        <button 
          onClick={handlePrev} 
          className="bg-white/50 hover:bg-white p-2 rounded-full transition-colors mr-[80px]"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="text-dark-cyan" size={30} />
        </button>
        <button 
          onClick={handleNext} 
          className="bg-white/50 hover:bg-white p-2 rounded-full transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="text-dark-cyan" size={30} />
        </button>
      </div>
    </div>
  )
}

export default Testimonial;