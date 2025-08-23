'use client'

import React, { useState } from 'react'
import { 
  Users, 
  Bell, 
  Mail, 
  Search, 
  Filter, 
  Plus, 
  Trash2, 
  Eye,
  Send,
  ArrowLeft,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'

// Mock subscriber data
const mockSubscribers = [
  {
    id: 1,
    email: 'john.doe@example.com',
    name: 'John Doe',
    subscribedAt: '2024-01-15',
    status: 'active',
    lastNotification: '2024-01-20',
    preferences: ['News & Updates', 'Education & Learning']
  },
  {
    id: 2,
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    subscribedAt: '2024-01-10',
    status: 'active',
    lastNotification: '2024-01-18',
    preferences: ['Acts & Rules', 'Leadership & Strategy']
  },
  {
    id: 3,
    email: 'mike.johnson@example.com',
    name: 'Mike Johnson',
    subscribedAt: '2024-01-08',
    status: 'inactive',
    lastNotification: '2024-01-05',
    preferences: ['News & Updates']
  },
  {
    id: 4,
    email: 'sarah.wilson@example.com',
    name: 'Sarah Wilson',
    subscribedAt: '2024-01-12',
    status: 'active',
    lastNotification: '2024-01-19',
    preferences: ['Education & Learning', 'Leadership & Strategy']
  },
  {
    id: 5,
    email: 'david.brown@example.com',
    name: 'David Brown',
    subscribedAt: '2024-01-06',
    status: 'active',
    lastNotification: '2024-01-17',
    preferences: ['Acts & Rules']
  }
]

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState(mockSubscribers)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedSubscribers, setSelectedSubscribers] = useState<number[]>([])
  const [showNotificationModal, setShowNotificationModal] = useState(false)
  const [notificationData, setNotificationData] = useState({
    subject: '',
    message: '',
    category: 'all'
  })

  const filteredSubscribers = subscribers.filter(subscriber => {
    const matchesSearch = subscriber.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || subscriber.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleSelectSubscriber = (id: number) => {
    setSelectedSubscribers(prev => 
      prev.includes(id) 
        ? prev.filter(subId => subId !== id)
        : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedSubscribers.length === filteredSubscribers.length) {
      setSelectedSubscribers([])
    } else {
      setSelectedSubscribers(filteredSubscribers.map(sub => sub.id))
    }
  }

  const handleDeleteSubscriber = (id: number) => {
    if (confirm('Are you sure you want to remove this subscriber?')) {
      setSubscribers(prev => prev.filter(sub => sub.id !== id))
      setSelectedSubscribers(prev => prev.filter(subId => subId !== id))
    }
  }

  const handleSendNotification = async () => {
    if (!notificationData.subject.trim() || !notificationData.message.trim()) {
      alert('Please fill in both subject and message.')
      return
    }

    if (selectedSubscribers.length === 0) {
      alert('Please select at least one subscriber.')
      return
    }

    // Simulate sending notification
    const selectedEmails = subscribers
      .filter(sub => selectedSubscribers.includes(sub.id))
      .map(sub => sub.email)
      .join(', ')

    alert(`Notification sent to ${selectedSubscribers.length} subscribers:\n${selectedEmails}`)
    
    // Update last notification date
    setSubscribers(prev => prev.map(sub => 
      selectedSubscribers.includes(sub.id) 
        ? { ...sub, lastNotification: new Date().toISOString().split('T')[0] }
        : sub
    ))

    setShowNotificationModal(false)
    setSelectedSubscribers([])
    setNotificationData({ subject: '', message: '', category: 'all' })
  }

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin"
                className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </Link>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <Users className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">Subscriber Management</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowNotificationModal(true)}
                disabled={selectedSubscribers.length === 0}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Bell className="w-4 h-4 inline mr-2" />
                Send Notification ({selectedSubscribers.length})
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
                <p className="text-2xl font-bold text-gray-900">{subscribers.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Subscribers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {subscribers.filter(sub => sub.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inactive Subscribers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {subscribers.filter(sub => sub.status === 'inactive').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Notifications Sent</p>
                <p className="text-2xl font-bold text-gray-900">
                  {subscribers.filter(sub => sub.lastNotification).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search subscribers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleSelectAll}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                {selectedSubscribers.length === filteredSubscribers.length ? 'Deselect All' : 'Select All'}
              </button>
              
              {selectedSubscribers.length > 0 && (
                <span className="text-sm text-gray-600">
                  {selectedSubscribers.length} selected
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Subscribers Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedSubscribers.length === filteredSubscribers.length && filteredSubscribers.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subscriber
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preferences
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Notification
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSubscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedSubscribers.includes(subscriber.id)}
                        onChange={() => handleSelectSubscriber(subscriber.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{subscriber.name}</div>
                        <div className="text-sm text-gray-500">{subscriber.email}</div>
                        <div className="text-xs text-gray-400">Subscribed: {subscriber.subscribedAt}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(subscriber.status)}`}>
                        {subscriber.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {subscriber.preferences.map((pref, index) => (
                          <span
                            key={index}
                            className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                          >
                            {pref}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {subscriber.lastNotification || 'Never'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteSubscriber(subscriber.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Notification Modal */}
      {showNotificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Send Notification</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={notificationData.subject}
                  onChange={(e) => setNotificationData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Notification subject..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={notificationData.message}
                  onChange={(e) => setNotificationData(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Notification message..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={notificationData.category}
                  onChange={(e) => setNotificationData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  <option value="News & Updates">News & Updates</option>
                  <option value="Acts & Rules">Acts & Rules</option>
                  <option value="Education & Learning">Education & Learning</option>
                  <option value="Leadership & Strategy">Leadership & Strategy</option>
                </select>
              </div>

              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <p>This notification will be sent to <strong>{selectedSubscribers.length}</strong> selected subscribers.</p>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowNotificationModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSendNotification}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
              >
                <Send className="w-4 h-4 inline mr-2" />
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
