// app/page.js - Main Application Component
'use client';
import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import components with loading fallbacks to prevent import errors
const Login = dynamic(() => import('../components/Login').catch(() => () => <MockLogin />), {
  loading: () => <LoadingSpinner message="Loading login..." />
});

const Profile = dynamic(() => import('../components/Profile').catch(() => () => <Profile />), {
  loading: () => <LoadingSpinner message="Loading profile..." />
});

const LandingPage = dynamic(() => import('../components/LandingPage').catch(() => () => <LandingPage />), {
  loading: () => <LoadingSpinner message="Loading landing page..." />
});

const Dashboard = dynamic(() => import('../components/Dashboard').catch(() => <Dashboard />), {
    loading: () => <LoadingSpinner message="Loading dashboard..." />
})

const AskQuestion = dynamic(() => import('../components/AskQuestion').catch(() => () => <MockAskQuestion />), {
  loading: () => <LoadingSpinner message="Loading..." />
});

const QuestionDetail = dynamic(() => import('../components/QuestionDetail').catch(() => () => <MockQuestionDetail />), {
  loading: () => <LoadingSpinner message="Loading question..." />
});

const MobileDashboard = dynamic(() => import('../components/MobileDashboard').catch(() => () => <MockDashboard />), {
  loading: () => <LoadingSpinner message="Loading mobile dashboard..." />
});

// Mock components for development
const MockLogin = ({ onLogin, error, onClearError }) => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>
      {error && (
        <div className="bg-red-600 text-white p-3 rounded mb-4 flex justify-between items-center">
          <span>{error}</span>
          <button onClick={onClearError} className="text-red-200 hover:text-white">×</button>
        </div>
      )}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Username (try: admin, support, or user)"
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          id="username"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          id="password"
        />
        <button
          onClick={() => {
            const username = document.getElementById('username').value || 'user';
            const password = document.getElementById('password').value || 'password';
            onLogin(username, password);
          }}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Login
        </button>
      </div>
      <p className="text-gray-400 text-sm mt-4 text-center">
        Mock component - Create ../components/Login.js to replace this
      </p>
    </div>
  </div>
);

const MockProfile = ({ user, userRole, onNavigate, onLogout }) => (
  <div className="min-h-screen bg-gray-900 p-4">
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Profile</h1>
          <button
            onClick={() => onNavigate('dashboard')}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-gray-400">Username:</label>
            <p className="text-white text-lg">{user}</p>
          </div>
          <div>
            <label className="text-gray-400">Role:</label>
            <p className="text-white text-lg">{userRole}</p>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
        <p className="text-gray-400 text-sm mt-6">
          Mock component - Create ../components/Profile.js to replace this
        </p>
      </div>
    </div>
  </div>
);

const MockDashboard = ({ user, userRole, onNavigate, onLogout }) => (
  <div className="min-h-screen bg-gray-900 p-4">
    <div className="max-w-6xl mx-auto">
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400">Welcome back, {user} ({userRole})</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => onNavigate('profile')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
            >
              Profile
            </button>
            <button
              onClick={() => onNavigate('ask')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg"
            >
              Ask Question
            </button>
            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-white font-semibold mb-2">Recent Questions</h3>
            <p className="text-gray-400">5 new questions today</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-white font-semibold mb-2">Pending Answers</h3>
            <p className="text-gray-400">12 questions waiting</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-white font-semibold mb-2">Resolved Today</h3>
            <p className="text-gray-400">8 questions resolved</p>
          </div>
        </div>
        
        <p className="text-gray-400 text-sm mt-6">
          Mock component - Create ../components/Dashboard.js to replace this
        </p>
      </div>
    </div>
  </div>
);

const MockAskQuestion = ({ user, userRole, onNavigate }) => (
  <div className="min-h-screen bg-gray-900 p-4">
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Ask a Question</h1>
          <button
            onClick={() => onNavigate('dashboard')}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-2">Question Title</label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter your question title..."
            />
          </div>
          
          <div>
            <label className="block text-gray-400 mb-2">Question Details</label>
            <textarea
              rows="6"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Describe your question in detail..."
            ></textarea>
          </div>
          
          <div className="flex space-x-4">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg">
              Submit Question
            </button>
            <button 
              onClick={() => onNavigate('dashboard')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
        
        <p className="text-gray-400 text-sm mt-6">
          Mock component - Create ../components/AskQuestion.js to replace this
        </p>
      </div>
    </div>
  </div>
);

const MockQuestionDetail = ({ questionId, user, userRole, onNavigate }) => (
  <div className="min-h-screen bg-gray-900 p-4">
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Question Details</h1>
          <button
            onClick={() => onNavigate('dashboard')}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-xl text-white mb-2">Sample Question Title</h2>
            <p className="text-gray-400">Question ID: {questionId}</p>
            <p className="text-gray-300 mt-4">
              This is a sample question detail view. The actual question content would be loaded here.
            </p>
          </div>
          
          <div className="border-t border-gray-600 pt-6">
            <h3 className="text-lg text-white mb-4">Answers</h3>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-300">No answers yet. Be the first to answer!</p>
            </div>
          </div>
        </div>
        
        <p className="text-gray-400 text-sm mt-6">
          Mock component - Create ../components/QuestionDetail.js to replace this
        </p>
      </div>
    </div>
  </div>
);

// Loading Spinner Component
const LoadingSpinner = ({ message = "Loading..." }) => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mb-4"></div>
      <p className="text-gray-400 text-lg">{message}</p>
    </div>
  </div>
);

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
            <p className="text-gray-400 mb-6">
              We encountered an unexpected error. Please refresh the page and try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const App = () => {
  const [currentView, setCurrentView] = useState('login');
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState('End User');
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check for mobile device with debouncing
  useEffect(() => {
    let timeoutId;
    
    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 100);
    };
    
    // Initial check
    checkMobile();
    
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timeoutId);
    };
  }, []);

  // Navigation handler with loading state
  const handleNavigation = useCallback(async (view, data = null) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call delay for demonstration
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setCurrentView(view);
      if (view === 'question' && data) {
        setSelectedQuestionId(data);
      }
    } catch (err) {
      setError('Navigation failed. Please try again.');
      console.error('Navigation error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Login handler with API integration ready
  const handleLogin = useCallback(async (username, password) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // TODO: Replace with actual API call to Express backend
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ username, password })
      // });
      // const userData = await response.json();
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user role determination
      let role = 'End User';
      if (username.toLowerCase().includes('admin')) {
        role = 'Admin';
      } else if (username.toLowerCase().includes('support')) {
        role = 'Support Agent';
      }
      
      setUser(username);
      setUserRole(role);
      setCurrentView('landing');
      
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout handler with cleanup
  const handleLogout = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // TODO: Call logout API
      // await fetch('/api/auth/logout', { method: 'POST' });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUser(null);
      setUserRole('End User');
      setSelectedQuestionId(null);
      setCurrentView('login');
      setError(null);
      
    } catch (err) {
      setError('Logout failed. Please try again.');
      console.error('Logout error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Clear error handler
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Render appropriate component based on current view
  const renderCurrentView = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    switch (currentView) {
      case 'landing':
        return(
            <LandingPage 
                onLogin={handleLogin}
                error={error}
                onClearError={clearError}
                onNavigate={handleNavigation}
            />
        )

      case 'login':
        return (
          <Login 
            onLogin={handleLogin}
            error={error}
            onClearError={clearError}
          />
        );
        
      case 'profile':
        return (
          <Profile 
            user={user} 
            userRole={userRole}
            onNavigate={handleNavigation}
            onLogout={handleLogout}
          />
        );
        
      case 'dashboard':
        const DashboardComponent = isMobile ? MobileDashboard : Dashboard;
        return (
          <DashboardComponent 
            user={user}
            userRole={userRole}
            onNavigate={handleNavigation}
            onLogout={handleLogout}
          />
        );
        
      case 'ask':
        return (
          <AskQuestion 
            user={user}
            userRole={userRole}
            onNavigate={handleNavigation}
          />
        );
        
      case 'question':
        return (
          <QuestionDetail 
            questionId={selectedQuestionId}
            user={user}
            userRole={userRole}
            onNavigate={handleNavigation}
          />
        );
        
      default:
        return (
          <Login 
            onLogin={handleLogin}
            error={error}
            onClearError={clearError}
          />
        );
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-900 text-white">
        {renderCurrentView()}
        
        {/* Error notification */}
        {error && (
          <div className="fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in-right">
            <div className="flex items-center justify-between">
              <span>{error}</span>
              <button
                onClick={clearError}
                className="ml-4 text-red-200 hover:text-white focus:outline-none"
                aria-label="Close error"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default App;