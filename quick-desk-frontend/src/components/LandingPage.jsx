// components/Dashboard.js
'use client';
import { useState, useMemo, useEffect } from 'react';
import { Bell, Search, Filter, ThumbsUp, ThumbsDown, MessageCircle, Eye, Users, BarChart3, TrendingUp } from 'lucide-react';

  const Dashboard = ({ user, onNavigate, userRole = 'End User' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('most_comment');
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;


 useEffect(() => {
  setCurrentPage(1);
}, [searchQuery, selectedCategory, selectedStatus, sortBy]);


  // Mock questions data
  const questions = [
    {
      id: 1,
      title: "Is it good things to use AI for hackathon?",
      description: "I am participating in odoo IN hackathon - 2025",
      author: "Mitchell Admin",
      timeAgo: "1 second ago",
      tags: ["Technical", "AI"],
      category: "Technical",
      status: "Open",
      votes: 0,
      replies: 21,
      views: 156
    },
    {
      id: 2,
      title: "Best practices for React component optimization?",
      description: "Looking for ways to improve performance in large React applications",
      author: "Sarah Dev",
      timeAgo: "5 minutes ago",
      tags: ["Development", "React"],
      category: "Development",
      status: "Open",
      votes: 3,
      replies: 8,
      views: 89
    },
    {
      id: 3,
      title: "How to implement authentication in Next.js?",
      description: "Need guidance on setting up secure authentication",
      author: "John Smith",
      timeAgo: "1 hour ago",
      tags: ["NextJS", "Security"],
      category: "Development",
      status: "Closed",
      votes: 5,
      replies: 12,
      views: 234
    }
      
    ];

    




    const [voteCounts, setVoteCounts] = useState(() => {
      const initialVotes = {};
      questions.forEach(q => {
      initialVotes[q.id] = q.votes ?? 0;
    });
    return initialVotes;
});


  const [viewCounts, setViewCounts] = useState(() => {
  const initialViews = {};
  questions.forEach(q => {
    initialViews[q.id] = q.views ?? 0;
  });
  return initialViews;
});
  
  useEffect(() => {
    
  const stored = JSON.parse(localStorage.getItem('viewCounts') || '{}');
  const initialViews = {};
  questions.forEach(q => {
    initialViews[q.id] = stored[q.id] ?? q.views ?? 0;
  });
  setViewCounts(initialViews);
}, []);


  const categories = ['all', 'Technical', 'Development', 'AI', 'Business'];
  const statuses = ['all', 'Open', 'Closed','Resolved','In Progress'];

  // Dashboard stats
  const stats = {
    totalQuestions: 145,
    totalAnswers: 523,
    activeUsers: 89,
    resolvedQuestions: 98
  };

  // Filter questions
  const filteredQuestions = useMemo(() => {
    return questions.filter(question => {
      const matchesSearch = question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           question.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || question.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || question.status === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, selectedCategory, selectedStatus]);

  // Sort questions
  const sortedQuestions = useMemo(() => {
    const sorted = [...filteredQuestions];
    switch (sortBy) {
      case 'most_comment':
        return sorted.sort((a, b) => b.replies - a.replies);
      case 'most_upvote':
        return sorted.sort((a, b) => b.votes - a.votes);
      case 'newest':
        return sorted.sort((a, b) => new Date(b.timeAgo) - new Date(a.timeAgo));
      default:
        return sorted;
    }
  }, [filteredQuestions, sortBy]);

    const totalPages = useMemo(() => {
  return Math.ceil(sortedQuestions.length / itemsPerPage);
}, [sortedQuestions, itemsPerPage]);

const startIndex = (currentPage - 1) * itemsPerPage;

const paginatedQuestions = sortedQuestions.slice(
  startIndex,
  startIndex + itemsPerPage
);

const pages = useMemo(() => {
  return Array.from({ length: totalPages }, (_, i) => i + 1);
}, [totalPages]);



  const handleVote = (questionId, type) => {
  setVoteCounts(prev => ({
    ...prev,
    [questionId]: type === 'up'
      ? prev[questionId] + 1
      : Math.max(prev[questionId] - 1, 0)
  }));
};



  const handleQuestionClick = (questionId) => {
  setViewCounts(prev => {
    const updated = {
      ...prev,
      [questionId]: (prev[questionId] ?? 0) + 1
    };
    console.log('Updated views:', updated);
    return updated;
  });

  onNavigate('question', questionId);
};



  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-white">Q&A Platform</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-300 hover:text-white transition-colors"
              >
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-3">Notifications</h3>
                    <div className="space-y-2">
                      <div className="p-3 bg-gray-700 rounded-lg">
                        <p className="text-gray-300 text-sm">New reply on your question</p>
                        <p className="text-gray-500 text-xs">2 minutes ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Dashboard
            </button>
            
            <button
              onClick={() => onNavigate('login')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-green-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Total Questions</p>
                <p className="text-2xl font-bold">{stats.totalQuestions}</p>
              </div>
              <MessageCircle size={32} className="text-green-200" />
            </div>
          </div>
          
          <div className="bg-blue-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Answers</p>
                <p className="text-2xl font-bold">{stats.totalAnswers}</p>
              </div>
              <BarChart3 size={32} className="text-blue-200" />
            </div>
          </div>
          
          <div className="bg-purple-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Active Users</p>
                <p className="text-2xl font-bold">{stats.activeUsers}</p>
              </div>
              <Users size={32} className="text-purple-200" />
            </div>
          </div>
          
          <div className="bg-orange-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Resolved</p>
                <p className="text-2xl font-bold">{stats.resolvedQuestions}</p>
              </div>
              <TrendingUp size={32} className="text-orange-200" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              {/* Ask Button */}
              <button
                onClick={() => onNavigate('ask')}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors whitespace-nowrap"
              >
                Ask Question
              </button>
            </div>
            
            {/* Filters */}
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Status' : status}
                  </option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="most_comment">Most Comments</option>
                <option value="most_upvote">Most Upvoted</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4 mb-6">
          {paginatedQuestions.map((question) => (
            <div
              key={question.id}
              className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors cursor-pointer"
              onClick={() => handleQuestionClick(question.id)}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-white hover:text-green-400 transition-colors">
                  {question.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    question.status === 'Open' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {question.status}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4">{question.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {question.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-blue-600 text-blue-100 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVote(question.id, 'up');
                      }}
                      className="p-1 hover:text-green-400 transition-colors"
                    >
                      <ThumbsUp size={16} />
                    </button>
                    <span>{voteCounts[question.id] ?? 0}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVote(question.id, 'down');
                      }}
                      className="p-1 hover:text-red-400 transition-colors"
                    >
                      <ThumbsDown size={16} />
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <MessageCircle size={16} />
                    <span>{question.replies}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Eye size={16} />
                    <span>{viewCounts[question.id] ?? 0}</span>
                  </div>
                </div>

                <div>
                  Posted by {question.author} • {question.timeAgo}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <div className="flex flex-wrap justify-center items-center gap-2">

            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-3 py-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ←
            </button>

            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-lg transition-colors text-sm sm:text-base
                  ${page === currentPage
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'}
                `}
              >
                {page}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}

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

export default Dashboard;