'use client';
import React from 'react'
import CardSwap, { Card } from '../ui/CardSwap'
import { BarChart3, MessageSquare, Shield, Ticket, TrendingUp, Zap } from 'lucide-react';
import SmartTicketManagement from '../../assets/Smart_Ticket_Management.jpeg'
import AdvancedAnalytics from '../../assets/Advanced_Analytics.jpg'
import EnterpriseSecurity from '../../assets/Enterprise_Security.jpg'
import LightningFast from '../../assets/LightningFast.jpg'
import OmnichannelSupport from '../../assets/OmnichannelSupport.jpg'
import AIPoweredInsights from '../../assets/AIPoweredInsights.jpg'

const features = [
  {
    icon: <Ticket className="w-8 h-8" />,
    title: "Smart Ticket Management",
    description: "Intelligent routing and prioritization keeps your team focused on what matters most.",
    background: SmartTicketManagement.src
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "Advanced Analytics",
    description: "Real-time insights and performance metrics to optimize your support operations.",
    background: AdvancedAnalytics.src
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Enterprise Security",
    description: "Bank-grade security with SSO, role-based access, and comprehensive audit logs.",
    background: EnterpriseSecurity.src
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Lightning Fast",
    description: "Sub-second response times with modern architecture built for scale.",
    background: LightningFast.src
  },
  {
    icon: <MessageSquare className="w-8 h-8" />,
    title: "Omnichannel Support",
    description: "Unified inbox for email, chat, phone, and social media interactions.",
    background: OmnichannelSupport.src
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "AI-Powered Insights",
    description: "Machine learning algorithms that learn from your data to improve efficiency.",
    background: AIPoweredInsights.src
  }
]

const Features = () => {
  return (
    <div className="relative min-h-screen max-w-screen flex items-center justify-between bg-soft-cyan-lime px-8 lg:px-20 py-20 gap-10 flex-col lg:flex-row overflow-hidden">
      
      {/* Left Text Section */}
      <div className="flex-1 max-w-2xl">
        <h1 className="text-dark-cyan font-bold text-4xl lg:text-6xl mb-6">
          Everything You Need <br /> to Excel
        </h1>
        <h3 className="text-dark-gray font-semibold text-xl lg:text-2xl">
          Comprehensive tools designed for <br /> modern support teams
        </h3>
      </div>

      {/* Right Cards Section */}
      <div className="flex-1 relative h-[420px] w-full max-w-lg text-white">
        <CardSwap
          cardDistance={60}
          verticalDistance={70}
          delay={5000}
          pauseOnHover={false}
        >
          {features.map((feature, index) => (
            <Card key={index}>
              <div className="relative h-full w-full rounded-xl overflow-hidden shadow-lg">
                
                {/* Background image with gradient */}
                {feature.background && (
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${feature.background})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-cyan/80 via-dark-cyan/60 to-transparent"></div>
                  </div>
                )}

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-end h-full p-6 text-white">
                  
                  {/* Icon */}
                  <div className="flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                    {feature.icon}
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold mb-3">{feature.title}</h2>

                  {/* Description */}
                  <p className="text-lg leading-relaxed opacity-90">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </CardSwap>
      </div>
    </div>
  )
}

export default Features
