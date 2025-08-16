'use client'

import React, { useState, useEffect } from 'react'
import {
  Ticket,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Clock,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Users,
  MessageSquare,
  Star,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Download,
  RefreshCw,
  Bell,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown
} from 'lucide-react'
import LoadingSpinner, { SkeletonCard } from './LoadingSpinner'

const Dashboard = () => {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedTickets, setSelectedTickets] = useState([])

  // Mock data
  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setTickets([
        {
          id: 'TK-001',
          title: 'Login page not loading properly',
          customer: 'John Smith',
          email: 'john@example.com',
          status: 'open',
          priority: 'high',
          category: 'Technical',
          created: '2024-01-15T10:30:00Z',
          updated: '2024-01-15T14:20:00Z',
          assignee: 'Sarah Johnson',
          description: 'Users are unable to access the login page. Getting 500 error.',
          tags: ['login', 'error', 'urgent']
        },
        {
          id: 'TK-002',
          title: 'Feature request: Dark mode support',
          customer: 'Emily Davis',
          email: 'emily@company.com',
          status: 'in-progress',
          priority: 'medium',
          category: 'Feature Request',
          created: '2024-01-14T16:45:00Z',
          updated: '2024-01-15T09:15:00Z',
          assignee: 'Mike Chen',
          description: 'Would like to see dark mode option in the application.',
          tags: ['feature', 'ui', 'enhancement']
        },
        {
          id: 'TK-003',
          title: 'Billing inquiry about recent charges',
          customer: 'Robert Wilson',
          email: 'robert@business.com',
          status: 'pending',
          priority: 'low',
          category: 'Billing',
          created: '2024-01-14T09:20:00Z',
          updated: '2024-01-14T11:30:00Z',
          assignee: 'Anna Martinez',
          description: 'Customer has questions about charges on their recent invoice.',
          tags: ['billing', 'inquiry']
        },
        {
          id: 'TK-004',
          title: 'Data export functionality not working',
          customer: 'Lisa Anderson',
          email: 'lisa@startup.io',
          status: 'closed',
          priority: 'high',
          category: 'Technical',
          created: '2024-01-13T14:10:00Z',
          updated: '2024-01-14T16:45:00Z',
          assignee: 'David Kim',
          description: 'Export feature returns empty files when trying to download data.',
          tags: ['export', 'data', 'bug']
        },
        {
          id: 'TK-005',
          title: 'Password reset email not received',
          customer: 'Mark Thompson',
          email: 'mark@agency.com',
          status: 'open',
          priority: 'medium',
          category: 'Account',
          created: '2024-01-15T11:20:00Z',
          updated: '2024-01-15T11:20:00Z',
          assignee: 'Sarah Johnson',
          description: 'User not receiving password reset emails after multiple attempts.',
          tags: ['password', 'email', 'account']
        }
      ])
      setLoading(false)
    }

    fetchData()
  }, [])

  const stats = [
    {
      title: 'Total Tickets',
      value: '1,247',
      change: '+12%',
      icon: <Ticket className="w-6 h-6" />,
      color: 'text-[#2196F3]',
      bgColor: 'bg-[#2196F3]/20'
    },
    {
      title: 'Open Tickets',
      value: '324',
      change: '+8%',
      icon: <AlertCircle className="w-6 h-6" />,
      color: 'text-[#FFC107]',
      bgColor: 'bg-[#FFC107]/20'
    },
    {
      title: 'Resolved Today',
      value: '89',
      change: '+15%',
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'text-[#4CAF50]',
      bgColor: 'bg-[#4CAF50]/20'
    },
    {
      title: 'Avg. Response Time',
      value: '2.3h',
      change: '-23%',
      icon: <Clock className="w-6 h-6" />,
      color: 'text-[#4CAF50]',
      bgColor: 'bg-[#4CAF50]/20'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'status-open'
      case 'in-progress': return 'status-in-progress'
      case 'pending': return 'status-pending'
      case 'closed': return 'status-closed'
      default: return 'status-open'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high'
      case 'medium': return 'priority-medium'
      case 'low': return 'priority-low'
      default: return 'priority-medium'
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleSelectTicket = (ticketId) => {
    setSelectedTickets(prev => 
      prev.includes(ticketId) 
        ? prev.filter(id => id !== ticketId)
        : [...prev, ticketId]
    )
  }

  const handleSelectAll = () => {
    if (selectedTickets.length === filteredTickets.length) {
      setSelectedTickets([])
    } else {
      setSelectedTickets(filteredTickets.map(ticket => ticket.id))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#46494F] p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="flex justify-between items-center mb-8">
            <div className="skeleton h-8 w-48"></div>
            <div className="skeleton h-10 w-32"></div>
          </div>

          {/* Stats Skeleton */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">
            {[1,2,3,4].map(i => (
              <div key={i} className="card">
                <div className="skeleton h-12 w-12 rounded-lg mb-4"></div>
                <div className="skeleton h-6 w-20 mb-2"></div>
                <div className="skeleton h-4 w-16"></div>
              </div>
            ))}
          </div>

          {/* Table Skeleton */}
          <div className="card">
            <div className="skeleton h-8 w-32 mb-4"></div>
            <div className="space-y-3">
              {[1,2,3,4,5].map(i => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#46494F]">
      {/* Header */}
      <header className="bg-[#3a3d43] border-b border-[#5a5d63] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#4CAF50] to-[#2196F3] rounded-lg flex items-center justify-center">
                  <Ticket className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold gradient-text">QuickDesk</h1>
              </div>
              
              <nav className="hidden md:flex items-center gap-6 ml-8">
                <a href="#" className="text-white font-medium">Dashboard</a>
                <a href="#" className="text-[#D3D3D3] hover:text-white transition-colors">Tickets</a>
                <a href="#" className="text-[#D3D3D3] hover:text-white transition-colors">Customers</a>
                <a href="#" className="text-[#D3D3D3] hover:text-white transition-colors">Reports</a>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 text-[#D3D3D3] hover:text-white hover:bg-[#5a5d63] rounded-lg transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#F44336] rounded-full"></span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-3 p-2 text-[#D3D3D3] hover:text-white hover:bg-[#5a5d63] rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-[#4CAF50] rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden md:block">John Doe</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showUserDropdown && (
                  <div className="absolute right-0 top-12 bg-[#3a3d43] border border-[#5a5d63] rounded-lg shadow-lg py-2 w-48 z-50">
                    <a href="#" className="flex items-center gap-3 px-4 py-2 text-[#D3D3D3] hover:text-white hover:bg-[#5a5d63] transition-colors">
                      <User className="w-4 h-4" />
                      Profile
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-2 text-[#D3D3D3] hover:text-white hover:bg-[#5a5d63] transition-colors">
                      <Settings className="w-4 h-4" />
                      Settings
                    </a>
                    <hr className="border-[#5a5d63] my-2" />
                    <button className="flex items-center gap-3 px-4 py-2 text-[#F44336] hover:bg-[#5a5d63] transition-colors w-full text-left">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 text-[#D3D3D3] hover:text-white hover:bg-[#5a5d63] rounded-lg transition-colors"
              >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden mt-4 pt-4 border-t border-[#5a5d63]">
              <nav className="space-y-2">
                <a href="#" className="block py-2 text-white font-medium">Dashboard</a>
                <a href="#" className="block py-2 text-[#D3D3D3] hover:text-white transition-colors">Tickets</a>
                <a href="#" className="block py-2 text-[#D3D3D3] hover:text-white transition-colors">Customers</a>
                <a href="#" className="block py-2 text-[#D3D3D3] hover:text-white transition-colors">Reports</a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h2>
            <p className="text-[#D3D3D3]">Here's what's happening with your support tickets today.</p>
          </div>
          
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <button className="btn-secondary flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button className="btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Ticket
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="card card-hover">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <div className={stat.color}>
                    {stat.icon}
                  </div>
                </div>
                <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                  stat.change.startsWith('+') ? 'text-[#4CAF50] bg-[#4CAF50]/20' : 'text-[#4CAF50] bg-[#4CAF50]/20'
                }`}>
                  {stat.change}
                </div>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-[#D3D3D3] text-sm">{stat.title}</div>
            </div>
          ))}
        </div>

        {/* Tickets Section */}
        <div className="card">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h3 className="text-xl font-semibold">Recent Tickets</h3>
            
            {/* Search and Filters */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#D3D3D3]" />
                <input
                  type="text"
                  placeholder="Search tickets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-10 w-full"
                />
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-[#5a5d63] hover:bg-[#6a6d73] text-white px-4 py-3 rounded-lg transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-[#2a2d33] p-4 rounded-lg mb-6 border border-[#5a5d63]">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="input-field w-full"
                  >
                    <option value="all">All Statuses</option>
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="pending">Pending</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Priority</label>
                  <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="input-field w-full"
                  >
                    <option value="all">All Priorities</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setFilterStatus('all')
                      setFilterPriority('all')
                      setSearchQuery('')
                    }}
                    className="w-full bg-[#5a5d63] hover:bg-[#6a6d73] text-white py-3 px-4 rounded-lg transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tickets Table */}
          <div className="overflow-x-auto">
            {filteredTickets.length === 0 ? (
              <div className="text-center py-12">
                <Ticket className="w-12 h-12 text-[#5a5d63] mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No tickets found</h3>
                <p className="text-[#D3D3D3] mb-4">Try adjusting your search or filters</p>
                <button className="btn-primary">Create New Ticket</button>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#5a5d63]">
                    <th className="text-left py-3 px-4 font-medium text-[#D3D3D3]">
                      <input
                        type="checkbox"
                        checked={selectedTickets.length === filteredTickets.length}
                        onChange={handleSelectAll}
                        className="w-4 h-4 text-[#4CAF50] bg-[#5a5d63] border-[#5a5d63] rounded focus:ring-[#4CAF50]"
                      />
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-[#D3D3D3]">Ticket</th>
                    <th className="text-left py-3 px-4 font-medium text-[#D3D3D3]">Customer</th>
                    <th className="text-left py-3 px-4 font-medium text-[#D3D3D3]">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-[#D3D3D3]">Priority</th>
                    <th className="text-left py-3 px-4 font-medium text-[#D3D3D3]">Assignee</th>
                    <th className="text-left py-3 px-4 font-medium text-[#D3D3D3]">Updated</th>
                    <th className="text-left py-3 px-4 font-medium text-[#D3D3D3]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.map((ticket) => (
                    <tr 
                      key={ticket.id} 
                      className="border-b border-[#5a5d63] hover:bg-[#2a2d33] transition-colors"
                    >
                      <td className="py-4 px-4">
                        <input
                          type="checkbox"
                          checked={selectedTickets.includes(ticket.id)}
                          onChange={() => handleSelectTicket(ticket.id)}
                          className="w-4 h-4 text-[#4CAF50] bg-[#5a5d63] border-[#5a5d63] rounded focus:ring-[#4CAF50]"
                        />
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-white mb-1">{ticket.id}</div>
                          <div className="text-sm text-[#D3D3D3] truncate max-w-xs">
                            {ticket.title}
                          </div>
                          <div className="flex gap-1 mt-2">
                            {ticket.tags.map((tag, index) => (
                              <span 
                                key={index}
                                className="px-2 py-1 bg-[#5a5d63] text-xs rounded text-[#D3D3D3]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-white">{ticket.customer}</div>
                          <div className="text-sm text-[#D3D3D3]">{ticket.email}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ticket.status)}`}>
                          {ticket.status.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-[#4CAF50] rounded-full flex items-center justify-center">
                            <span className="text-xs text-white font-medium">
                              {ticket.assignee?.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="text-sm text-white">{ticket.assignee}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-[#D3D3D3]">
                          {formatDate(ticket.updated)}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1 text-[#D3D3D3] hover:text-white hover:bg-[#5a5d63] rounded transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-[#D3D3D3] hover:text-white hover:bg-[#5a5d63] rounded transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <div className="relative">
                            <button className="p-1 text-[#D3D3D3] hover:text-white hover:bg-[#5a5d63] rounded transition-colors">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Bulk Actions */}
          {selectedTickets.length > 0 && (
            <div className="mt-4 p-4 bg-[#2a2d33] rounded-lg border border-[#5a5d63] flex items-center justify-between">
              <div className="text-sm text-[#D3D3D3]">
                {selectedTickets.length} ticket{selectedTickets.length > 1 ? 's' : ''} selected
              </div>
              <div className="flex items-center gap-3">
                <button className="text-sm text-[#2196F3] hover:text-[#1976D2] transition-colors">
                  Assign
                </button>
                <button className="text-sm text-[#4CAF50] hover:text-[#45a049] transition-colors">
                  Close
                </button>
                <button className="text-sm text-[#F44336] hover:text-[#D32F2F] transition-colors">
                  Delete
                </button>
                <button className="text-sm text-[#D3D3D3] hover:text-white transition-colors flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          )}

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-[#D3D3D3]">
              Showing {filteredTickets.length} of {tickets.length} tickets
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-2 text-sm bg-[#5a5d63] hover:bg-[#6a6d73] text-white rounded transition-colors">
                Previous
              </button>
              <button className="px-3 py-2 text-sm bg-[#4CAF50] text-white rounded">
                1
              </button>
              <button className="px-3 py-2 text-sm bg-[#5a5d63] hover:bg-[#6a6d73] text-white rounded transition-colors">
                2
              </button>
              <button className="px-3 py-2 text-sm bg-[#5a5d63] hover:bg-[#6a6d73] text-white rounded transition-colors">
                3
              </button>
              <button className="px-3 py-2 text-sm bg-[#5a5d63] hover:bg-[#6a6d73] text-white rounded transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard