'use client'

import React, { useState } from 'react'
import { 
  Users, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Lock, 
  Unlock,
  ArrowLeft,
  Mail,
  Calendar,
  Shield,
  UserCheck,
  UserX
} from 'lucide-react'
import Link from 'next/link'

// Mock editor data
const mockEditors = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@coddesscookie.com',
    role: 'Senior Editor',
    status: 'active',
    joinedAt: '2023-06-15',
    lastActive: '2024-01-20',
    postsCount: 24,
    permissions: ['create', 'edit', 'publish', 'delete'],
    avatar: 'SJ'
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@coddesscookie.com',
    role: 'Editor',
    status: 'active',
    joinedAt: '2023-08-22',
    lastActive: '2024-01-19',
    postsCount: 18,
    permissions: ['create', 'edit'],
    avatar: 'MC'
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    email: 'emma.rodriguez@coddesscookie.com',
    role: 'Editor',
    status: 'active',
    joinedAt: '2023-09-10',
    lastActive: '2024-01-18',
    postsCount: 15,
    permissions: ['create', 'edit'],
    avatar: 'ER'
  },
  {
    id: 4,
    name: 'David Thompson',
    email: 'david.thompson@coddesscookie.com',
    role: 'Junior Editor',
    status: 'inactive',
    joinedAt: '2023-11-05',
    lastActive: '2024-01-05',
    postsCount: 8,
    permissions: ['create'],
    avatar: 'DT'
  },
  {
    id: 5,
    name: 'Lisa Wang',
    email: 'lisa.wang@coddesscookie.com',
    role: 'Editor',
    status: 'active',
    joinedAt: '2023-07-18',
    lastActive: '2024-01-17',
    postsCount: 22,
    permissions: ['create', 'edit', 'publish'],
    avatar: 'LW'
  }
]

const roles = [
  'Junior Editor',
  'Editor', 
  'Senior Editor',
  'Managing Editor'
]

const permissions = [
  { key: 'create', label: 'Create Posts', description: 'Can create new blog posts' },
  { key: 'edit', label: 'Edit Posts', description: 'Can edit existing posts' },
  { key: 'publish', label: 'Publish Posts', description: 'Can publish posts without review' },
  { key: 'delete', label: 'Delete Posts', description: 'Can delete posts' },
  { key: 'manage_editors', label: 'Manage Editors', description: 'Can add/remove other editors' }
]

export default function EditorsPage() {
  const [editors, setEditors] = useState(mockEditors)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showAddEditor, setShowAddEditor] = useState(false)
  const [editingEditor, setEditingEditor] = useState<any>(null)
  const [newEditor, setNewEditor] = useState({
    name: '',
    email: '',
    role: 'Editor',
    permissions: ['create', 'edit']
  })

  const filteredEditors = editors.filter(editor => {
    const matchesSearch = editor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         editor.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || editor.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleAddEditor = () => {
    if (!newEditor.name.trim() || !newEditor.email.trim()) {
      alert('Please fill in all required fields.')
      return
    }

    const editor = {
      id: Date.now(),
      ...newEditor,
      status: 'active',
      joinedAt: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().split('T')[0],
      postsCount: 0,
      avatar: newEditor.name.split(' ').map(n => n[0]).join('')
    }

    setEditors(prev => [...prev, editor])
    setNewEditor({ name: '', email: '', role: 'Editor', permissions: ['create', 'edit'] })
    setShowAddEditor(false)
  }

  const handleEditEditor = (editor: any) => {
    setEditingEditor(editor)
  }

  const handleUpdateEditor = () => {
    if (!editingEditor.name.trim() || !editingEditor.email.trim()) {
      alert('Please fill in all required fields.')
      return
    }

    setEditors(prev => prev.map(editor => 
      editor.id === editingEditor.id ? editingEditor : editor
    ))
    setEditingEditor(null)
  }

  const handleDeleteEditor = (id: number) => {
    if (confirm('Are you sure you want to remove this editor?')) {
      setEditors(prev => prev.filter(editor => editor.id !== id))
    }
  }

  const handleToggleStatus = (id: number) => {
    setEditors(prev => prev.map(editor => 
      editor.id === id 
        ? { ...editor, status: editor.status === 'active' ? 'inactive' : 'active' }
        : editor
    ))
  }

  const handlePermissionChange = (editorId: number, permission: string) => {
    setEditors(prev => prev.map(editor => {
      if (editor.id === editorId) {
        const permissions = editor.permissions.includes(permission)
          ? editor.permissions.filter(p => p !== permission)
          : [...editor.permissions, permission]
        return { ...editor, permissions }
      }
      return editor
    }))
  }

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800'
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Managing Editor': return 'bg-purple-100 text-purple-800'
      case 'Senior Editor': return 'bg-blue-100 text-blue-800'
      case 'Editor': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
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
                <h1 className="text-xl font-bold text-gray-900">Editor Management</h1>
              </div>
            </div>
            
            <button
              onClick={() => setShowAddEditor(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
            >
              <Plus className="w-4 h-4 inline mr-2" />
              Add Editor
            </button>
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
                <p className="text-sm font-medium text-gray-600">Total Editors</p>
                <p className="text-2xl font-bold text-gray-900">{editors.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Editors</p>
                <p className="text-2xl font-bold text-gray-900">
                  {editors.filter(editor => editor.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Posts</p>
                <p className="text-2xl font-bold text-gray-900">
                  {editors.reduce((sum, editor) => sum + editor.postsCount, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inactive Editors</p>
                <p className="text-2xl font-bold text-gray-900">
                  {editors.filter(editor => editor.status === 'inactive').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <UserX className="w-6 h-6 text-gray-600" />
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
                  placeholder="Search editors..."
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
          </div>
        </div>

        {/* Editors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEditors.map((editor) => (
            <div key={editor.id} className="bg-white rounded-xl shadow-sm p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {editor.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{editor.name}</h3>
                    <p className="text-sm text-gray-500">{editor.email}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditEditor(editor)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-300"
                    title="Edit Editor"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteEditor(editor.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-300"
                    title="Remove Editor"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Role:</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(editor.role)}`}>
                    {editor.role}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(editor.status)}`}>
                    {editor.status}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Posts:</span>
                  <span className="text-sm font-medium text-gray-900">{editor.postsCount}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Joined:</span>
                  <span className="text-sm text-gray-900">{editor.joinedAt}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Active:</span>
                  <span className="text-sm text-gray-900">{editor.lastActive}</span>
                </div>
              </div>

              {/* Permissions */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Permissions</h4>
                <div className="space-y-2">
                  {permissions.map((permission) => (
                    <label key={permission.key} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editor.permissions.includes(permission.key)}
                        onChange={() => handlePermissionChange(editor.id, permission.key)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-xs text-gray-600">{permission.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleToggleStatus(editor.id)}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                    editor.status === 'active'
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {editor.status === 'active' ? (
                    <>
                      <Lock className="w-3 h-3 inline mr-1" />
                      Deactivate
                    </>
                  ) : (
                    <>
                      <Unlock className="w-3 h-3 inline mr-1" />
                      Activate
                    </>
                  )}
                </button>
                
                <button className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors duration-300">
                  <Mail className="w-3 h-3 inline mr-1" />
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Add Editor Modal */}
      {showAddEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Editor</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={newEditor.name}
                  onChange={(e) => setNewEditor(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Editor name..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={newEditor.email}
                  onChange={(e) => setNewEditor(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="editor@coddesscookie.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select
                  value={newEditor.role}
                  onChange={(e) => setNewEditor(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                <div className="space-y-2">
                  {permissions.slice(0, 3).map((permission) => (
                    <label key={permission.key} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newEditor.permissions.includes(permission.key)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewEditor(prev => ({ 
                              ...prev, 
                              permissions: [...prev.permissions, permission.key] 
                            }))
                          } else {
                            setNewEditor(prev => ({ 
                              ...prev, 
                              permissions: prev.permissions.filter(p => p !== permission.key) 
                            }))
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-600">{permission.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddEditor(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEditor}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Add Editor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Editor Modal */}
      {editingEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Editor</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={editingEditor.name}
                  onChange={(e) => setEditingEditor(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={editingEditor.email}
                  onChange={(e) => setEditingEditor(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select
                  value={editingEditor.role}
                  onChange={(e) => setEditingEditor(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setEditingEditor(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateEditor}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
              >
                <Edit className="w-4 h-4 inline mr-2" />
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
