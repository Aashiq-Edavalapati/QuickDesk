// components/Dashboard.jsx
'use client';
import React from 'react';
import {
  Bell,
  User,
  LayoutGrid,
  Users,
  Settings,
  LogOut,
  BarChart2,
  HelpCircle,
  CheckCircle,
  PieChart as PieChartIcon,
  Archive,
  Clock,
  ThumbsUp
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = ({ user, userRole = 'Admin', onNavigate, onLogout }) => {
    
    // Mock data with all statuses for a more detailed chart
    const allQuestions = [
        { category: "AI", status: "Open" }, 
        { category: "Development", status: "In Progress" },
        { category: "Technical", status: "Closed" }, 
        { category: "Development", status: "Open" },
        { category: "Technical", status: "Resolved" }, 
        { category: "Development", status: "Closed" },
        { category: "Technical", status: "In Progress" },
        { category: "AI", status: "Open" },
        { category: "Business", status: "Resolved" }, 
        { category: "General", status: "Closed" },
        { category: "AI", status: "Resolved" },
        { category: "Development", status: "Open" },
    ];

    // Process data for charts
    const questionsByCategory = allQuestions.reduce((acc, q) => {
        acc[q.category] = (acc[q.category] || 0) + 1;
        return acc;
    }, {});

    const barChartData = Object.keys(questionsByCategory).map(key => ({
        name: key,
        questions: questionsByCategory[key]
    }));
    
    const questionsByStatus = allQuestions.reduce((acc, q) => {
        acc[q.status] = (acc[q.status] || 0) + 1;
        return acc;
    }, {});

    // Updated pie chart data to include all statuses
    const pieChartData = [
        { name: 'Open', value: questionsByStatus['Open'] || 0 },
        { name: 'In Progress', value: questionsByStatus['In Progress'] || 0 },
        { name: 'Resolved', value: questionsByStatus['Resolved'] || 0 },
        { name: 'Closed', value: questionsByStatus['Closed'] || 0 },
    ].filter(entry => entry.value > 0); // Filter out statuses with 0 questions to keep the chart clean

    // Updated colors to match all statuses
    const PIE_COLORS = {
        'Open': '#34D399',        // green-400
        'In Progress': '#FBBF24', // yellow-400
        'Resolved': '#60A5FA',    // blue-400
        'Closed': '#F87171',      // red-400
    };

    const Sidebar = () => (
        <aside className="w-64 bg-gray-800/50 border-r border-gray-700/50 flex-col hidden lg:flex">
            <div className="p-6 flex items-center gap-3">
                 <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">Q</span>
                </div>
                <h1 className="text-xl font-bold text-white">Q&A Platform</h1>
            </div>
            <nav className="flex-1 px-4 py-2">
                <a href="#" onClick={() => onNavigate('landing')} className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-700/50 hover:text-white rounded-lg transition-colors mt-2">
                    <LayoutGrid size={20} />
                    <span>Questions</span>
                </a>
                <a href="#" onClick={() => onNavigate('dashboard')} className="flex items-center gap-3 px-4 py-3 bg-green-600/20 text-green-300 rounded-lg">
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
                <a href="#" onClick={() => onNavigate('settings')} className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-700/50 hover:text-white rounded-lg transition-colors mt-2">
                    <Settings size={20} />
                    <span>Settings</span>
                </a>
            </nav>
            <div className="p-4 border-t border-gray-700/50">
                 <button onClick={() =>  {onNavigate('Login'); console.log('Logout button clicked');onLogout();}} className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors">
                        <LogOut size={20} />
                        <span>Logout</span>
</button>

            </div>
        </aside>
    );

    const tooltipStyle = {
        contentStyle: {
            backgroundColor: '#2D3748',
            border: '1px solid #4A5568',
            borderRadius: '0.5rem',
            color: '#E2E8F0'
        },
        itemStyle: { color: '#E2E8F0' },
        cursor: { fill: 'rgba(113, 128, 150, 0.1)' }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex text-white">
            <Sidebar />
            <main className="flex-1 p-4 sm:p-6 lg:p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold">Analytics Dashboard</h1>
                        <p className="text-gray-400 text-sm md:text-base">An overview of platform activity.</p>
                    </div>
                     <div className="flex items-center gap-4">
                        <button className="p-3 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors">
                          <Bell size={20} />
                        </button>
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${userRole === 'Admin' ? 'bg-red-500' : 'bg-blue-500'}`}>
                                <User size={20} />
                            </div>
                            <div>
                                <p className="font-semibold">{user}</p>
                                <p className="text-sm text-gray-400">{userRole}</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Updated Stat Cards for all statuses */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 flex items-center gap-4">
                        <div className="p-3 bg-green-500/10 rounded-lg"><CheckCircle className="text-green-400" size={24}/></div>
                        <div>
                            <h3 className="text-gray-400 text-sm font-medium">Open</h3>
                            <p className="text-2xl font-bold">{questionsByStatus['Open'] || 0}</p>
                        </div>
                    </div>
                     <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 flex items-center gap-4">
                        <div className="p-3 bg-yellow-500/10 rounded-lg"><Clock className="text-yellow-400" size={24}/></div>
                        <div>
                            <h3 className="text-gray-400 text-sm font-medium">In Progress</h3>
                            <p className="text-2xl font-bold">{questionsByStatus['In Progress'] || 0}</p>
                        </div>
                    </div>
                     <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 flex items-center gap-4">
                        <div className="p-3 bg-blue-500/10 rounded-lg"><ThumbsUp className="text-blue-400" size={24}/></div>
                        <div>
                            <h3 className="text-gray-400 text-sm font-medium">Resolved</h3>
                            <p className="text-2xl font-bold">{questionsByStatus['Resolved'] || 0}</p>
                        </div>
                    </div>
                     <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 flex items-center gap-4">
                        <div className="p-3 bg-red-500/10 rounded-lg"><Archive className="text-red-400" size={24}/></div>
                        <div>
                            <h3 className="text-gray-400 text-sm font-medium">Closed</h3>
                            <p className="text-2xl font-bold">{questionsByStatus['Closed'] || 0}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <div className="lg:col-span-3 bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Questions by Category</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={barChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                                <XAxis dataKey="name" stroke="#A0AEC0" fontSize={12} />
                                <YAxis stroke="#A0AEC0" fontSize={12} />
                                <Tooltip {...tooltipStyle} />
                                <Legend wrapperStyle={{ fontSize: '14px' }}/>
                                <Bar dataKey="questions" fill="#34D399" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="lg:col-span-2 bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                         <h3 className="text-lg font-semibold mb-4">Question Status Distribution</h3>
                         <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={PIE_COLORS[entry.name]} />
                                    ))}
                                </Pie>
                                <Tooltip {...tooltipStyle} />
                                <Legend wrapperStyle={{ fontSize: '14px' }}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
