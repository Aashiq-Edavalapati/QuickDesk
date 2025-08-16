'use client'

import React from 'react'
import { Loader2 } from 'lucide-react'

const LoadingSpinner = ({ 
  size = 'md', 
  text = 'Loading...', 
  fullScreen = false,
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  const LoadingContent = () => (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <div className="relative">
        <Loader2 
          className={`${sizeClasses[size]} animate-spin text-[#4CAF50]`} 
        />
        <div className={`absolute inset-0 ${sizeClasses[size]} animate-ping border-2 border-[#4CAF50] rounded-full opacity-20`}></div>
      </div>
      
      {text && (
        <p className={`${textSizeClasses[size]} text-[#D3D3D3] animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-[#46494F] flex items-center justify-center z-50">
        <div className="bg-[#3a3d43] rounded-xl p-8 shadow-2xl border border-[#5a5d63]">
          <LoadingContent />
        </div>
      </div>
    )
  }

  return <LoadingContent />
}

// Skeleton loader for cards
export const SkeletonCard = () => (
  <div className="card animate-pulse">
    <div className="flex justify-between items-start mb-4">
      <div className="skeleton h-6 w-3/4 mb-2"></div>
      <div className="skeleton h-6 w-16 rounded-full"></div>
    </div>
    <div className="skeleton h-4 w-full mb-2"></div>
    <div className="skeleton h-4 w-2/3 mb-4"></div>
    <div className="flex justify-between items-center">
      <div className="skeleton h-5 w-24 rounded-full"></div>
      <div className="skeleton h-4 w-32"></div>
    </div>
  </div>
)

// Skeleton loader for table rows
export const SkeletonTable = ({ rows = 5, columns = 4 }) => (
  <div className="space-y-2">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex gap-4 p-4 bg-[#3a3d43] rounded-lg">
        {Array.from({ length: columns }).map((_, j) => (
          <div key={j} className="skeleton h-4 flex-1"></div>
        ))}
      </div>
    ))}
  </div>
)

// Page loading with progress
export const PageLoading = ({ progress = null }) => (
  <div className="min-h-screen bg-[#46494F] flex items-center justify-center">
    <div className="card max-w-md w-full text-center">
      <LoadingSpinner size="xl" text="Loading QuickDesk..." />
      
      {progress && (
        <div className="mt-6">
          <div className="w-full bg-[#5a5d63] rounded-full h-2">
            <div 
              className="bg-[#4CAF50] h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-[#D3D3D3] text-sm mt-2">{progress}% Complete</p>
        </div>
      )}
    </div>
  </div>
)

// Button loading state
export const ButtonLoading = ({ children, loading = false, ...props }) => (
  <button 
    disabled={loading} 
    className={`${props.className} ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
    {...props}
  >
    <div className="flex items-center gap-2">
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </div>
  </button>
)

export default LoadingSpinner