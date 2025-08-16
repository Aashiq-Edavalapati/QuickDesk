import { Inter } from 'next/font/google'
import './globals.css'
import ErrorBoundary from '@/components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'QuickDesk - Professional Help Desk Solution',
  description: 'Streamlined ticket management and customer support platform',
  keywords: 'help desk, support, tickets, customer service',
  authors: [{ name: 'QuickDesk Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#46494F] text-white antialiased`}>
        <ErrorBoundary>
          <div className="min-h-screen bg-[#46494F]">
            {children}
          </div>
        </ErrorBoundary>
      </body>
    </html>
  )
}