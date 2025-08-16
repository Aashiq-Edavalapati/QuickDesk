'use client'

import React from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    
    // Log error to monitoring service
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#46494F] flex items-center justify-center p-4">
          <div className="card max-w-md w-full text-center fade-in">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-[#F44336]/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-[#F44336]" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="text-[#D3D3D3] mb-6">
              We're sorry, but something unexpected happened. Please try refreshing the page or go back to home.
            </p>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-[#FFC107] hover:text-[#F57C00] mb-2">
                  Error Details (Development)
                </summary>
                <div className="bg-[#2a2d33] p-4 rounded-lg text-xs font-mono text-[#D3D3D3] overflow-auto max-h-40">
                  {this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </div>
              </details>
            )}
            
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="btn-primary flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh Page
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="btn-secondary flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Go Home
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary