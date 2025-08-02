// components/MobileDashboard.js
'use client';
import { useState } from 'react';
import { Search, Menu, X, Bell, Plus, MessageCircle, Eye, ThumbsUp, User } from 'lucide-react';

const MobileDashboard = ({ user, userRole = 'Admin', onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Mock questions data
  const questions = [
    {
      id: 1,
      title: "Is it good things to use AI for hackathon?",
      author: "odoo IN pvt. ltd.",
      timeAgo: "1 second ago",
      status: "Open",
      votes: 0,
      replies: 21,
      views: 156
    },
    {
      id: 2,
      title: "Best practices for React optimization?",
      author: "Sarah Developer",
      timeAgo: "5 minutes ago",
      status: "Open",
      votes: 3,
      replies: 8,
      views: 89
    },
    {
      id: 3,
      title: "How to implement Next.js authentication?",
      author: "John Smith",
      timeAgo: "1 hour ago",
      status: "Open",
      votes: 5,
      replies: 12,
      views: 234
    }
  ];

  const handleQuestionClick = (questionId) => {
    onNavigate('question', questionId);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Mobile Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              userRole === 'Admin' 
                ? 'bg-red-600 text-white' 
                : userRole === 'Support Agent'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-600 text-white'
            }`}>
              {userRole}
            </span>
            <Bell size={20} className="text-gray-300" />
          </div>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-300 hover:text-white transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-gray-800 border-b border-gray-700 z-50">
            <div className="p-4 space-y-3">
              <button
                onClick={() => {
                  onNavigate('dashboard');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  onNavigate('profile');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                Profile
              </button>
              <button
                onClick={() => {
                  onNavigate('login');
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </header>

      <div className="p-4">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search questions..."
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Add Question Button */}
        <button
          onClick={() => onNavigate('ask')}
          className="w-full mb-6 px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Ask Question
        </button>

        {/* Questions List */}
        <div className="space-y-4 mb-6">
          {questions.map((question) => (
            <div
              key={question.id}
              onClick={() => handleQuestionClick(question.id)}
              className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors cursor-pointer"
            >
              {/* Question Header */}
              <div className="flex justify-between items-start mb-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  question.status === 'Open' 
                    ? 'bg-orange-100 text-orange-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {question.status}
                </span>
              </div>

              {/* Question Title */}
              <h3 className="text-white font-medium mb-2 line-clamp-2">
                {question.title}
              </h3>

              {/* Question Meta */}
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                <div className="flex items-center gap-1">
                  <User size={14} />
                  <span className="truncate">{question.author}</span>
                </div>
                <span>{question.timeAgo}</span>
              </div>

              {/* Question Stats */}
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <ThumbsUp size={14} />
                    <span>{question.votes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle size={14} />
                    <span>{question.replies}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye size={14} />
                    <span>{question.views}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Pagination */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              className="px-3 py-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ←
            </button>
            
            {[1, 2, 3, 4, '...', 11].map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && setCurrentPage(page)}
                className={`px-3 py-2 rounded-lg transition-colors text-sm ${
                  page === currentPage
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                } ${page === '...' ? 'cursor-default' : ''}`}
                disabled={page === '...'}
              >
                {page}
              </button>
            ))}
            
            <button
              disabled={currentPage === 11}
              className="px-3 py-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDashboard;