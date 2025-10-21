'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';
import { apiService } from '@/lib/api';
import { User } from '@/types';

export default function AdminPage() {
  const router = useRouter();
  const { user: currentUser, loading: authLoading } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !currentUser) {
      router.push('/login');
    }
  }, [currentUser, authLoading, router]);

  useEffect(() => {
    if (currentUser) {
      loadUsers();
    }
  }, [currentUser]);

  const loadUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await apiService.getAllUsers();
      setUsers(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await apiService.deleteUser(userId);
      setUsers(users.filter(u => u.id !== userId));
      setDeleteConfirm(null);
      if (selectedUser?.id === userId) {
        setSelectedUser(null);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete user');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3">
            <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-600 font-medium">Loading admin panel...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12 animate-fadeIn">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <Button onClick={loadUsers} variant="secondary" size="sm">
            <span className="flex items-center space-x-2">
              <span>🔄</span>
              <span>Refresh</span>
            </span>
          </Button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 text-red-700 rounded-xl flex items-start space-x-3 animate-slideIn">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
            </svg>
            <span>{error}</span>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Users List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>Users</span>
                  <span className="text-base font-normal text-gray-500">({users.length} total)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-4 px-3 text-sm font-bold text-gray-700">Email</th>
                        <th className="text-left py-4 px-3 text-sm font-bold text-gray-700">Name</th>
                        <th className="text-left py-4 px-3 text-sm font-bold text-gray-700">Status</th>
                        <th className="text-left py-4 px-3 text-sm font-bold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr
                          key={user.id}
                          className={`border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-colors ${
                            selectedUser?.id === user.id ? 'bg-gradient-to-r from-blue-50 to-purple-50' : ''
                          }`}
                        >
                          <td className="py-4 px-3 text-sm">
                            <div>
                              <p className="font-semibold text-gray-900">{user.email}</p>
                              {(user.googleId || user.githubId) && (
                                <div className="flex space-x-2 mt-1">
                                  {user.googleId && <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full">🔍 Google</span>}
                                  {user.githubId && <span className="text-xs px-2 py-0.5 bg-gray-800 text-white rounded-full">🐙 GitHub</span>}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-3 text-sm text-gray-700 font-medium">
                            {user.firstName || user.lastName
                              ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
                              : '-'}
                          </td>
                          <td className="py-4 px-3 text-sm">
                            <div className="space-y-1">
                              <span
                                className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                                  user.isActive
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                }`}
                              >
                                {user.isActive ? '✓ Active' : '✗ Inactive'}
                              </span>
                              {user.isEmailVerified && (
                                <span className="block text-xs text-green-600 font-semibold">✓ Verified</span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-3 text-sm">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => setSelectedUser(user)}
                                className="px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg text-xs font-semibold transition-colors"
                              >
                                View
                              </button>
                              {currentUser.id !== user.id && (
                                <button
                                  onClick={() => setDeleteConfirm(user.id)}
                                  className="px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg text-xs font-semibold transition-colors"
                                >
                                  Delete
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Details Sidebar */}
          <div>
            {selectedUser ? (
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>User Details</CardTitle>
                    <button
                      onClick={() => setSelectedUser(null)}
                      className="text-gray-400 hover:text-gray-600 font-bold text-xl transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-3 shadow-sm">
                      <p className="text-xs text-gray-500 font-semibold mb-1">Email</p>
                      <p className="font-semibold text-sm text-gray-900">{selectedUser.email}</p>
                    </div>
                    {(selectedUser.firstName || selectedUser.lastName) && (
                      <div className="bg-white rounded-xl p-3 shadow-sm">
                        <p className="text-xs text-gray-500 font-semibold mb-1">Name</p>
                        <p className="font-semibold text-sm text-gray-900">
                          {`${selectedUser.firstName || ''} ${selectedUser.lastName || ''}`.trim()}
                        </p>
                      </div>
                    )}
                    <div className="bg-white rounded-xl p-3 shadow-sm">
                      <p className="text-xs text-gray-500 font-semibold mb-1">User ID</p>
                      <p className="font-mono text-xs text-gray-900 break-all">{selectedUser.id}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 shadow-sm">
                      <p className="text-xs text-gray-500 font-semibold mb-1">Status</p>
                      <span
                        className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                          selectedUser.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {selectedUser.isActive ? '✓ Active' : '✗ Inactive'}
                      </span>
                    </div>
                    <div className="bg-white rounded-xl p-3 shadow-sm">
                      <p className="text-xs text-gray-500 font-semibold mb-1">Email Verified</p>
                      <p className="font-semibold text-sm text-gray-900">
                        {selectedUser.isEmailVerified ? '✓ Yes' : '✗ No'}
                      </p>
                    </div>
                    {(selectedUser.googleId || selectedUser.githubId) && (
                      <div className="bg-white rounded-xl p-3 shadow-sm">
                        <p className="text-xs text-gray-500 font-semibold mb-2">Connected Accounts</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedUser.googleId && (
                            <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                              🔍 Google
                            </span>
                          )}
                          {selectedUser.githubId && (
                            <span className="px-2 py-1 bg-gray-800 text-white rounded-full text-xs font-semibold">
                              🐙 GitHub
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="bg-white rounded-xl p-3 shadow-sm">
                      <p className="text-xs text-gray-500 font-semibold mb-1">Created</p>
                      <p className="text-sm text-gray-900">{new Date(selectedUser.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3 shadow-sm">
                      <p className="text-xs text-gray-500 font-semibold mb-1">Last Updated</p>
                      <p className="text-sm text-gray-900">{new Date(selectedUser.updatedAt).toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gradient-to-br from-gray-50 to-gray-100">
                <CardContent className="text-center py-12">
                  <div className="text-6xl mb-4 opacity-50">👤</div>
                  <p className="text-gray-500 font-medium">Select a user to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
            <Card className="max-w-md mx-4">
              <CardHeader>
                <CardTitle className="text-red-600">⚠️ Confirm Delete</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Are you sure you want to delete this user? This action cannot be undone and will permanently remove all user data.
                </p>
                <div className="flex space-x-3">
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteUser(deleteConfirm)}
                    className="flex-1"
                  >
                    Delete User
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
