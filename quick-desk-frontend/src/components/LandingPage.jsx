'use client'

import React, { useState, useEffect } from 'react'
import { 
  ArrowRight, 
  Users, 
  Clock, 
  CheckCircle, 
  Star,
  Ticket,
  BarChart3,
  Shield,
  Zap,
  MessageSquare,
  TrendingUp,
  Play
} from 'lucide-react'
import { useRouter } from 'next/navigation'

const LandingPage = () => {
  const router = useRouter()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Customer Success Manager",
      company: "TechFlow Inc",
      content: "QuickDesk transformed our support workflow. Response times improved by 70% and customer satisfaction is at an all-time high.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "IT Director",
      company: "DataSync Solutions", 
      content: "The analytics dashboard gives us incredible insights. We can predict support bottlenecks before they happen.",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      role: "Support Team Lead",
      company: "CloudBase",
      content: "Our team loves the intuitive interface. Ticket resolution is faster and more organized than ever before.",
      rating: 5
    }
  ]

  const features = [
    {
      icon: <Ticket className="w-8 h-8" />,
      title: "Smart Ticket Management",
      description: "Intelligent routing and prioritization keeps your team focused on what matters most."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Advanced Analytics",
      description: "Real-time insights and performance metrics to optimize your support operations."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description: "Bank-grade security with SSO, role-based access, and comprehensive audit logs."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Sub-second response times with modern architecture built for scale."
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Omnichannel Support",
      description: "Unified inbox for email, chat, phone, and social media interactions."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "AI-Powered Insights",
      description: "Machine learning algorithms that learn from your data to improve efficiency."
    }
  ]

  const stats = [
    { label: "Response Time", value: "< 2min", icon: <Clock className="w-6 h-6" /> },
    { label: "Customer Satisfaction", value: "98.5%", icon: <Star className="w-6 h-6" /> },
    { label: "Active Users", value: "50K+", icon: <Users className="w-6 h-6" /> },
    { label: "Tickets Resolved", value: "1M+", icon: <CheckCircle className="w-6 h-6" /> }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-[#46494F] overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-50 bg-[#46494F]/95 backdrop-blur-md border-b border-[#5a5d63]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#4CAF50] to-[#2196F3] rounded-xl flex items-center justify-center">
                <Ticket className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">QuickDesk</span>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.push('/login')}
                className="text-[#D3D3D3] hover:text-white transition-colors px-4 py-2"
              >
                Login
              </button>
              <button 
                onClick={() => router.push('/signup')}
                className="btn-primary"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4CAF50]/10 via-transparent to-[#2196F3]/10"></div>
        <div className="absolute inset-0 bg-dots"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#4CAF50]/20 text-[#4CAF50] px-4 py-2 rounded-full mb-8 border border-[#4CAF50]/30">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">Now with AI-powered insights</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              Support That
              <span className="gradient-text block">Scales With You</span>
            </h1>
            
            <p className="text-xl text-[#D3D3D3] mb-12 max-w-2xl mx-auto leading-relaxed">
              Transform your customer support with intelligent ticket management, 
              real-time analytics, and seamless team collaboration.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => router.push('/signup')}
                className="btn-primary text-lg px-8 py-4 flex items-center gap-3"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="flex items-center gap-3 text-[#2196F3] hover:text-[#1976D2] transition-colors px-8 py-4">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#3a3d43] to-[#46494F]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#4CAF50]/20 rounded-2xl mb-4 group-hover:bg-[#4CAF50]/30 transition-colors">
                  <div className="text-[#4CAF50]">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-[#D3D3D3]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need to 
              <span className="gradient-text">Excel</span>
            </h2>
            <p className="text-xl text-[#D3D3D3] max-w-2xl mx-auto">
              Comprehensive tools designed for modern support teams who demand excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="card card-hover group"
              >
                <div className="text-[#4CAF50] mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-[#D3D3D3] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#3a3d43] to-[#46494F]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Trusted by <span className="gradient-text">Thousands</span>
            </h2>
            <p className="text-xl text-[#D3D3D3]">
              See what industry leaders say about QuickDesk
            </p>
          </div>

          <div className="relative">
            <div className="card text-center overflow-hidden">
              <div className="flex mb-6 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-[#FFC107] fill-current" />
                ))}
              </div>
              
              <blockquote className="text-xl mb-8 leading-relaxed">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              
              <div>
                <div className="font-semibold text-lg mb-1">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-[#D3D3D3]">
                  {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                </div>
              </div>
            </div>

            {/* Testimonial dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-[#4CAF50]' : 'bg-[#5a5d63]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your 
            <span className="gradient-text">Support?</span>
          </h2>
          <p className="text-xl text-[#D3D3D3] mb-10 max-w-2xl mx-auto">
            Join thousands of companies delivering exceptional customer experiences with QuickDesk.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => router.push('/signup')}
              className="btn-primary text-lg px-8 py-4 pulse-glow"
            >
              Start Your Free Trial
            </button>
            <button 
              onClick={() => router.push('/login')}
              className="btn-secondary text-lg px-8 py-4"
            >
              Sign In
            </button>
          </div>
          
          <p className="text-[#D3D3D3] mt-6 text-sm">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3a3d43] py-12 px-6 border-t border-[#5a5d63]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-[#4CAF50] to-[#2196F3] rounded-lg flex items-center justify-center">
                <Ticket className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold gradient-text">QuickDesk</span>
            </div>
            
            <div className="flex items-center gap-8 text-[#D3D3D3]">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
          
          <div className="border-t border-[#5a5d63] mt-8 pt-8 text-center text-[#D3D3D3]">
            <p>&copy; 2024 QuickDesk. All rights reserved. Built with ❤️ for amazing support teams.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
