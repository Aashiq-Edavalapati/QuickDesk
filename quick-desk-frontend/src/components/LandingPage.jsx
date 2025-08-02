// components/LandingPage.jsx
'use client';
import { useState } from 'react';
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
  BarChart2
} from 'lucide-react';

const LandingPage = ({ user, userRole = 'Admin', onNavigate, onLogout }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5;

  // Mock questions data
  const allQuestions = [
    {
      id: 1,
      title: "Is it a good practice to use AI for hackathons?",
      author: "Mitchell Admin",
      authorRole: "Admin",
      category: "AI",
      timeAgo: "2 hours ago",
      status: "Open",
      votes: 15,
      replies: 21,
      views: 156
    },
    {
      id: 2,
      title: "Best practices for database indexing in large-scale applications?",
      author: "Sarah Developer",
      authorRole: "Support Agent",
      category: "Development",
      timeAgo: "5 hours ago",
      status: "Open",
      votes: 45,
      replies: 12,
      views: 320
    },
    {
      id: 3,
      title: "How to implement secure authentication with Next.js and JWT?",
      author: "John Smith",
      authorRole: "End User",
      category: "Technical",
      timeAgo: "1 day ago",
      status: "Closed",
      votes: 120,
      replies: 35,
      views: 1200
    },
    {
        id: 4,
        title: "What are the key differences between REST and GraphQL?",
        author: "Jane Doe",
        authorRole: "End User",
        category: "Development",
        timeAgo: "2 days ago",
        status: "Open",
        votes: 78,
        replies: 18,
        views: 850
    },
    {
        id: 5,
        title: "Effective state management strategies in complex React apps",
        author: "Emily White",
        authorRole: "Support Agent",
        category: "Technical",
        timeAgo: "3 days ago",
        status: "Open",
        votes: 95,
        replies: 25,
        views: 1500
    },
     {
      id: 6,
      title: "Getting started with Docker and containerization",
      author: "Michael Brown",
      authorRole: "End User",
      category: "Development",
      timeAgo: "4 days ago",
      status: "Closed",
      votes: 60,
      replies: 15,
      views: 950
    },
    {
      id: 7,
      title: "How to optimize web performance and Core Web Vitals?",
      author: "Chris Green",
      authorRole: "Admin",
      category: "Technical",
      timeAgo: "5 days ago",
      status: "Open",
      votes: 110,
      replies: 30,
      views: 2200
    }
  ];

  const filteredQuestions = allQuestions.filter(q => activeFilter === 'All' || q.status === activeFilter);

  // Pagination logic
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const handleQuestionClick = (questionId) => {
    onNavigate('question', questionId);
  };

  const Sidebar = () => (
    <aside className="w-64 bg-gray-800/50 border-r border-gray-700/50 flex flex-col">
        <div className="p-6 flex items-center gap-3">
             <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">Q</span>
            </div>
            <h1 className="text-xl font-bold text-white">Q&A Platform</h1>
        </div>
        <nav className="flex-1 px-4 py-2">
            <a href="#" onClick={() => onNavigate('landing')} className="flex items-center gap-3 px-4 py-3 bg-green-600/20 text-green-300 rounded-lg">
                <LayoutGrid size={20} />
                <span>Questions</span>
            </a>
            <a href="#" onClick={() => onNavigate('dashboard')} className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-700/50 hover:text-white rounded-lg transition-colors mt-2">
                <BarChart2 size={20} />
                <span>Dashboard</span>
            </a>
            <a href="#" onClick={() => onNavigate('profile')} className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-700/50 hover:text-white rounded-lg transition-colors mt-2">
                <User size={20} />
                <span>Profile</span>
            </a>
             {userRole === 'Admin' && (
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-700/50 hover:text-white rounded-lg transition-colors mt-2">
                    <Users size={20} />
                    <span>Users</span>
                </a>
             )}
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-700/50 hover:text-white rounded-lg transition-colors mt-2">
                <Settings size={20} />
                <span>Settings</span>
            </a>
        </nav>
        <div className="p-4 border-t border-gray-700/50">
             <button onClick={onLogout} className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors">
                <LogOut size={20} />
                <span>Logout</span>
            </button>
        </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-gray-900 flex text-white">
      <Sidebar />
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user}!</h1>
            <p className="text-gray-400">Here's what's happening today.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input type="text" placeholder="Search..." className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <button className="p-3 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors">
              <Bell size={20} />
            </button>
            <button onClick={() => onNavigate('ask')} className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors">
              <Plus size={20} />
              <span>Ask Question</span>
            </button>
          </div>
        </header>

        {/* Questions List */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg">
            <div className="p-6 flex justify-between items-center border-b border-gray-700/50">
                <h2 className="text-xl font-semibold">Questions</h2>
                <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 p-1 rounded-lg">
                    {['All', 'Open', 'Closed'].map(filter => (
                        <button key={filter} onClick={() => { setActiveFilter(filter); setCurrentPage(1); }} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeFilter === filter ? 'bg-green-600 text-white' : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'}`}>
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
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
                                <td className="p-4 align-top">
                                    <p className="font-semibold text-white mb-1">{q.title}</p>
                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                        <Tag size={14} />
                                        <span>{q.category}</span>
                                    </div>
                                </td>
                                <td className="p-4 align-top">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${q.authorRole === 'Admin' ? 'bg-red-500' : q.authorRole === 'Support Agent' ? 'bg-blue-500' : 'bg-gray-600'}`}>
                                            <User size={16} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-white">{q.author}</p>
                                            <p className="text-sm text-gray-400">{q.authorRole}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 align-top">
                                    <div className="flex items-center gap-4 text-sm text-gray-300">
                                        <div className="flex items-center gap-1" title="Votes"><ThumbsUp size={14} /> {q.votes}</div>
                                        <div className="flex items-center gap-1" title="Replies"><MessageCircle size={14} /> {q.replies}</div>
                                        <div className="flex items-center gap-1" title="Views"><Eye size={14} /> {q.views}</div>
                                    </div>
                                </td>
                                <td className="p-4 align-top">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${q.status === 'Open' ? 'bg-green-500/10 text-green-400 border border-green-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'}`}>
                                        {q.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {/* Pagination */}
            <div className="p-4 flex justify-between items-center">
                <span className="text-sm text-gray-400">
                    Showing {indexOfFirstQuestion + 1} to {Math.min(indexOfLastQuestion, filteredQuestions.length)} of {filteredQuestions.length} results
                </span>
                <div className="flex items-center gap-2">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        <ChevronLeft size={20} />
                    </button>
                    <span className="text-sm font-medium">Page {currentPage} of {totalPages}</span>
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;