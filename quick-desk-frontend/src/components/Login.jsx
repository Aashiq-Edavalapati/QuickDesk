'use client'

import React, { useState } from 'react'
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Ticket,
  Github,
  Chrome
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import LoadingSpinner, { ButtonLoading } from './LoadingSpinner'

const Login = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock successful login
      setLoginSuccess(true)
      
      // Redirect after success animation
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
      
    } catch (error) {
      setErrors({ submit: 'Invalid credentials. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`)
    // Implement social login logic
  }

  if (loginSuccess) {
    return (
      <div className="min-h-screen bg-[#46494F] flex items-center justify-center p-4">
        <div className="card max-w-md w-full text-center fade-in">
          <div className="w-20 h-20 bg-[#4CAF50]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[#4CAF50]" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Welcome back!</h2>
          <p className="text-[#D3D3D3] mb-6">
            Redirecting you to your dashboard...
          </p>
          <LoadingSpinner size="md" text="" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#46494F] flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#4CAF50] to-[#2196F3] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        {/* ✅ Fixed background */}
        <div className="absolute inset-0 bg-dots"></div>
        
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <Ticket className="w-7 h-7" />
            </div>
            <span className="text-3xl font-bold">QuickDesk</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-6 leading-tight">
            Welcome back to the future of support
          </h1>
          
          <p className="text-xl opacity-90 mb-8 leading-relaxed">
            Manage tickets, collaborate with your team, and deliver exceptional customer experiences.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5" />
              <span>Real-time collaboration</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5" />
              <span>Advanced analytics dashboard</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5" />
              <span>Enterprise-grade security</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-[#4CAF50] to-[#2196F3] rounded-xl flex items-center justify-center">
              <Ticket className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">QuickDesk</span>
          </div>

          <div className="card">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Sign In</h2>
              <p className="text-[#D3D3D3]">
                Welcome back! Please sign in to your account
              </p>
            </div>

            {/* Social Login */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleSocialLogin('google')}
                className="w-full flex items-center justify-center gap-3 bg-[#5a5d63] hover:bg-[#6a6d73] text-white py-3 px-4 rounded-lg transition-colors"
              >
                <Chrome className="w-5 h-5" />
                Continue with Google
              </button>
              
              <button
                onClick={() => handleSocialLogin('github')}
                className="w-full flex items-center justify-center gap-3 bg-[#5a5d63] hover:bg-[#6a6d73] text-white py-3 px-4 rounded-lg transition-colors"
              >
                <Github className="w-5 h-5" />
                Continue with GitHub
              </button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#5a5d63]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#3a3d43] text-[#D3D3D3]">Or continue with email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.submit && (
                <div className="bg-[#F44336]/20 border border-[#F44336]/30 text-[#F44336] p-4 rounded-lg flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{errors.submit}</span>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#D3D3D3]" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`input-field pl-12 w-full ${
                      errors.email ? 'border-[#F44336] focus:border-[#F44336] focus:ring-[#F44336]/20' : ''
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="text-[#F44336] text-sm mt-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#D3D3D3]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`input-field pl-12 pr-12 w-full ${
                      errors.password ? 'border-[#F44336] focus:border-[#F44336] focus:ring-[#F44336]/20' : ''
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#D3D3D3] hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[#F44336] text-sm mt-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 text-[#4CAF50] bg-[#5a5d63] border-[#5a5d63] rounded focus:ring-[#4CAF50] focus:ring-2"
                  />
                  <span className="text-sm text-[#D3D3D3]">Remember me</span>
                </label>
                
                <button
                  type="button"
                  className="text-sm text-[#2196F3] hover:text-[#1976D2] transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <ButtonLoading
                type="submit"
                loading={loading}
                className="btn-primary w-full flex items-center justify-center gap-3"
              >
                Sign In
                <ArrowRight className="w-5 h-5" />
              </ButtonLoading>
            </form>

            <div className="text-center mt-8 pt-6 border-t border-[#5a5d63]">
              <p className="text-[#D3D3D3]">
                Don't have an account?{' '}
                <button
                  onClick={() => router.push('/signup')}
                  className="text-[#2196F3] hover:text-[#1976D2] font-medium transition-colors"
                >
                  Sign up now
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
