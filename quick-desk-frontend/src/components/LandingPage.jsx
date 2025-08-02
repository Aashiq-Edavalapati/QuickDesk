// components/LandingPage.jsx
'use client';
import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Bell,
  Search,
  Plus,
  MessageCircle,
  ThumbsUp,
  Eye,
  User,
  Tag,
  LayoutGrid,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BarChart2,
  Menu,
  X,
  FlaskConical,
  ArrowUpDown,
  ChevronDown
} from 'lucide-react';

const LandingPage = ({ user, userRole = 'Admin', onNavigate, onLogout }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Default');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filterRef = useRef(null);
  const sortRef = useRef(null);
  
  const questionsPerPage = 5;

  // Mock questions data with new statuses
  const allQuestions = [
    { id: 1, title: "Is it a good practice to use AI for hackathons?", author: "Mitchell Admin", authorRole: "Admin", category: "AI", timeAgo: "2 hours ago", status: "Open", votes: 15, replies: 21, views: 156 },
    { id: 2, title: "Best practices for database indexing in large-scale applications?", author: "Sarah Developer", authorRole: "Support Agent", category: "Development", timeAgo: "5 hours ago", status: "In Progress", votes: 45, replies: 12, views: 320 },
    { id: 3, title: "How to implement secure authentication with Next.js and JWT?", author: "John Smith", authorRole: "End User", category: "Technical", timeAgo: "1 day ago", status: "Resolved", votes: 120, replies: 35, views: 1200 },
    { id: 4, title: "What are the key differences between REST and GraphQL?", author: "Jane Doe", authorRole: "End User", category: "Development", timeAgo: "2 days ago", status: "Open", votes: 78, replies: 18, views: 850 },
    { id: 5, title: "Effective state management strategies in complex React apps", author: "Emily White", authorRole: "Support Agent", category: "Technical", timeAgo: "3 days ago", status: "In Progress", votes: 95, replies: 25, views: 1500 },
    { id: 6, title: "Getting started with Docker and containerization", author: "Michael Brown", authorRole: "End User", category: "Development", timeAgo: "4 days ago", status: "Closed", votes: 60, replies: 15, views: 950 },
    { id: 7, title: "How to optimize web performance and Core Web Vitals?", author: "Chris Green", authorRole: "Admin", category: "Technical", timeAgo: "5 days ago", status: "Resolved", votes: 110, replies: 30, views: 2200 }
  ];

  // Combined filtering and sorting logic using useMemo for efficiency
  const processedQuestions = useMemo(() => {
    let filtered = allQuestions;
    if (activeFilter !== 'All') {
      filtered = allQuestions.filter(q => q.status === activeFilter);
    }

    let sorted = [...filtered];
    if (sortBy === 'Most Upvotes') {
      sorted.sort((a, b) => b.votes - a.votes);
    } else if (sortBy === 'Most Comments') {
      sorted.sort((a, b) => b.replies - a.replies);
    }
    // 'Default' case doesn't require sorting as it's the original order

    return sorted;
  }, [activeFilter, sortBy]);


  // Pagination logic
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = processedQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);
  const totalPages = Math.ceil(processedQuestions.length / questionsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const handleQuestionClick = (questionId) => {
    onNavigate('question', questionId);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const Sidebar = () => (
    <>
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`} onClick={() => setIsSidebarOpen(false)}></div>
      <aside className={`fixed top-0 left-0 h-full w-64 bg-gray-800 border-r border-gray-700/50 flex flex-col z-40 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">Q</span>
                </div>
                <h1 className="text-xl font-bold text-white">Q&A Platform</h1>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="p-1 text-gray-400 hover:text-white lg:hidden"><X size={24} /></button>
        </div>
        <nav className="flex-1 px-4 py-2">
            <a href="#" onClick={() => onNavigate('landing')} className="flex items-center gap-3 px-4 py-3 bg-green-600/20 text-green-300 rounded-lg"><LayoutGrid size={20} /><span>Questions</span></a>
            <a href="#" onClick={() => onNavigate('dashboard')} className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-700/50 hover:text-white rounded-lg transition-colors mt-2"><BarChart2 size={20} /><span>Dashboard</span></a>
            <a href="#" onClick={() => onNavigate('profile')} className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-700/50 hover:text-white rounded-lg transition-colors mt-2"><User size={20} /><span>Profile</span></a>
            {userRole === 'Admin' && (<a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-700/50 hover:text-white rounded-lg transition-colors mt-2"><Users size={20} /><span>Users</span></a>)}
            <a href="#" onClick={() => onNavigate('settings')} className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-700/50 hover:text-white rounded-lg transition-colors mt-2"><Settings size={20} /><span>Settings</span></a>
        </nav>
        <div className="p-4 border-t border-gray-700/50"><button onClick={onLogout} className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors"><LogOut size={20} /><span>Logout</span></button></div>
    </aside>
    </>
  );

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Open': return 'bg-green-500/10 text-green-400 border border-green-500/30';
      case 'Closed': return 'bg-red-500/10 text-red-400 border border-red-500/30';
      case 'Resolved': return 'bg-blue-500/10 text-blue-400 border border-blue-500/30';
      case 'In Progress': return 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30';
      default: return 'bg-gray-500/10 text-gray-400 border border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center p-4 lg:p-8 border-b border-gray-700/50">
            <div className="flex items-center gap-4">
                <button onClick={() => setIsSidebarOpen(true)} className="p-1 text-gray-400 hover:text-white lg:hidden"><Menu size={24} /></button>
                <div>
                    <h1 className="text-xl lg:text-3xl font-bold">Welcome back, {user}!</h1>
                    <p className="text-gray-400 text-sm hidden sm:block">Here's what's happening today.</p>
                </div>
            </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative hidden md:block"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} /><input type="text" placeholder="Search..." className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" /></div>
            <button className="p-3 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors"><Bell size={20} /></button>
            <button onClick={() => onNavigate('ask')} className="flex items-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"><Plus size={20} className="hidden sm:block" /><span className="text-sm sm:text-base">Ask</span></button>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg">
                <div className="p-4 lg:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-700/50">
                    <h2 className="text-xl font-semibold">Questions</h2>
                    <div className="flex items-center gap-2">
                        {/* Filter Dropdown */}
                        <div className="relative" ref={filterRef}>
                            <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
                                <FlaskConical size={16} className="text-gray-400" />
                                <span>Filter: {activeFilter}</span>
                                <ChevronDown size={16} className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isFilterOpen && (
                                <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
                                    {['All', 'Open', 'In Progress', 'Resolved', 'Closed'].map(filter => (
                                        <button key={filter} onClick={() => { setActiveFilter(filter); setCurrentPage(1); setIsFilterOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg">
                                            {filter}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Sort Dropdown */}
                         <div className="relative" ref={sortRef}>
                            <button onClick={() => setIsSortOpen(!isSortOpen)} className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
                                <ArrowUpDown size={16} className="text-gray-400" />
                                <span>Sort By: {sortBy}</span>
                                <ChevronDown size={16} className={`transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isSortOpen && (
                                <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
                                    {['Default', 'Most Upvotes', 'Most Comments'].map(sort => (
                                        <button key={sort} onClick={() => { setSortBy(sort); setCurrentPage(1); setIsSortOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg">
                                            {sort}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto hidden lg:block">
                    <table className="w-full text-left">
                        <thead className="border-b border-gray-700/50">
                            <tr>
                                <th className="p-4 text-sm font-semibold text-gray-400">Question</th>
                                <th className="p-4 text-sm font-semibold text-gray-400">Author</th>
                                <th className="p-4 text-sm font-semibold text-gray-400">Stats</th>
                                <th className="p-4 text-sm font-semibold text-gray-400">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentQuestions.map(q => (
                                <tr key={q.id} onClick={() => handleQuestionClick(q.id)} className="border-b border-gray-700/50 hover:bg-gray-800 cursor-pointer transition-colors">
                                    <td className="p-4 align-top"><p className="font-semibold text-white mb-1">{q.title}</p><div className="flex items-center gap-2 text-sm text-gray-400"><Tag size={14} /><span>{q.category}</span></div></td>
                                    <td className="p-4 align-top"><div className="flex items-center gap-2"><div className={`w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0 ${q.authorRole === 'Admin' ? 'bg-red-500' : q.authorRole === 'Support Agent' ? 'bg-blue-500' : 'bg-gray-600'}`}><User size={16} /></div><div><p className="font-medium text-white">{q.author}</p><p className="text-sm text-gray-400">{q.authorRole}</p></div></div></td>
                                    <td className="p-4 align-top"><div className="flex items-center gap-4 text-sm text-gray-300"><div className="flex items-center gap-1" title="Votes"><ThumbsUp size={14} /> {q.votes}</div><div className="flex items-center gap-1" title="Replies"><MessageCircle size={14} /> {q.replies}</div><div className="flex items-center gap-1" title="Views"><Eye size={14} /> {q.views}</div></div></td>
                                    <td className="p-4 align-top"><span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(q.status)}`}>{q.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="lg:hidden">
                    {currentQuestions.map(q => (
                        <div key={q.id} onClick={() => handleQuestionClick(q.id)} className="p-4 border-b border-gray-700/50 cursor-pointer hover:bg-gray-800">
                            <div className="flex justify-between items-start mb-2"><div className="flex items-center gap-2 text-sm text-gray-400"><Tag size={14} /><span>{q.category}</span></div><span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(q.status)}`}>{q.status}</span></div>
                            <p className="font-semibold text-white mb-3">{q.title}</p>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                <div className="flex items-center gap-2"><div className={`w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0 ${q.authorRole === 'Admin' ? 'bg-red-500' : q.authorRole === 'Support Agent' ? 'bg-blue-500' : 'bg-gray-600'}`}><User size={16} /></div><div><p className="font-medium text-white text-sm">{q.author}</p><p className="text-xs text-gray-400">{q.authorRole}</p></div></div>
                                <div className="flex items-center gap-4 text-sm text-gray-300"><div className="flex items-center gap-1" title="Votes"><ThumbsUp size={14} /> {q.votes}</div><div className="flex items-center gap-1" title="Replies"><MessageCircle size={14} /> {q.replies}</div><div className="flex items-center gap-1" title="Views"><Eye size={14} /> {q.views}</div></div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <span className="text-sm text-gray-400">Showing {processedQuestions.length > 0 ? indexOfFirstQuestion + 1 : 0} to {Math.min(indexOfLastQuestion, processedQuestions.length)} of {processedQuestions.length} results</span>
                    <div className="flex items-center gap-2">
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><ChevronLeft size={20} /></button>
                        <span className="text-sm font-medium">Page {currentPage} of {totalPages || 1}</span>
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0} className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><ChevronRight size={20} /></button>
                    </div>
                </div>
            </div>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;
