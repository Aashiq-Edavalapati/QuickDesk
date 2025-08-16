'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { HelpCircle, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import LoadingSpinner from '../LoadingSpinner'

export default function Login() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock authentication logic
      if (formData.email === 'admin@quickdesk.com') {
        router.push('/admin/dashboard')
      } else {
        router.push('/ask')
      }
    } catch (err) {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <Link href="/" className="inline-flex items-center justify-center mb-8">
              <HelpCircle className="h-10 w-10 text-success mr-3" />
              <span className="text-2xl font-bold text-primary-text">QuickDesk</span>
            </Link>
            <h2 className="text-3xl font-bold text-primary-text mb-2">
              Welcome back
            </h2>
            <p className="text-primary-text-muted">
              Sign in to your account to continue
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-error/10 border border-error text-error px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-primary-text mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-text-muted" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-primary-text mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-text-muted" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-10 pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-text-muted hover:text-primary-text"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-success bg-dark-200 border-dark-100 rounded focus:ring-success focus:ring-2"
                />
                <span className="ml-2 text-sm text-primary-text-muted">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-info hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 flex items-center justify-center"
            >
              {loading ? (
                <LoadingSpinner size="sm" text="" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Sign up link */}
          <div className="text-center">
            <p className="text-primary-text-muted">
              Don't have an account?{' '}
              <Link href="/signup" className="text-info hover:underline font-medium">
                Sign up for free
              </Link>
            </p>
          </div>

          {/* Demo credentials */}
          <div className="mt-8 p-4 bg-dark-400 rounded-lg">
            <p className="text-sm text-primary-text-muted mb-2 font-medium">Demo Credentials:</p>
            <div className="text-xs space-y-1 text-primary-text-muted">
              <p><strong>Admin:</strong> admin@quickdesk.com / password</p>
              <p><strong>User:</strong> user@example.com / password</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Feature Highlight */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-success/10 to-info/10">
        <div className="flex items-center justify-center p-12">
          <div className="max-w-lg text-center">
            <div className="bg-success/20 rounded-full p-6 inline-block mb-6">
              <HelpCircle className="h-16 w-16 text-success" />
            </div>
            <h3 className="text-2xl font-bold text-primary-text mb-4">
              Streamlined Support Experience
            </h3>
            <p className="text-primary-text-muted text-lg">
              Access your personalized dashboard, track ticket progress, and get instant updates 
              on your support requests.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}