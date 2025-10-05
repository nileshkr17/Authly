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
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <Button onClick={loadUsers} variant="secondary" size="sm">
            🔄 Refresh
          </Button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Users List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Users ({users.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Email</th>
                        <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Name</th>
                        <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr
                          key={user.id}
                          className={`border-b border-gray-100 hover:bg-gray-50 ${
                            selectedUser?.id === user.id ? 'bg-blue-50' : ''
                          }`}
                        >
                          <td className="py-3 px-2 text-sm">
                            <div>
                              <p className="font-medium">{user.email}</p>
                              {(user.googleId || user.githubId) && (
                                <div className="flex space-x-2 mt-1">
                                  {user.googleId && <span className="text-xs text-gray-500">🔍 Google</span>}
                                  {user.githubId && <span className="text-xs text-gray-500">🐙 GitHub</span>}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-2 text-sm">
                            {user.firstName || user.lastName
                              ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
                              : '-'}
                          </td>
                          <td className="py-3 px-2 text-sm">
                            <div className="space-y-1">
                              <span
                                className={`inline-block px-2 py-1 text-xs rounded ${
                                  user.isActive
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                }`}
                              >
                                {user.isActive ? 'Active' : 'Inactive'}
                              </span>
                              {user.isEmailVerified && (
                                <span className="block text-xs text-gray-500">✓ Verified</span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-2 text-sm">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => setSelectedUser(user)}
                                className="text-blue-600 hover:underline text-xs"
                              >
                                View
                              </button>
                              {currentUser.id !== user.id && (
                                <button
                                  onClick={() => setDeleteConfirm(user.id)}
                                  className="text-red-600 hover:underline text-xs"
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
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>User Details</CardTitle>
                    <button
                      onClick={() => setSelectedUser(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-medium text-sm">{selectedUser.email}</p>
                    </div>
                    {(selectedUser.firstName || selectedUser.lastName) && (
                      <div>
                        <p className="text-xs text-gray-500">Name</p>
                        <p className="font-medium text-sm">
                          {`${selectedUser.firstName || ''} ${selectedUser.lastName || ''}`.trim()}
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-gray-500">User ID</p>
                      <p className="font-mono text-xs break-all">{selectedUser.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <p className="font-medium text-sm">
                        <span
                          className={
                            selectedUser.isActive ? 'text-green-600' : 'text-red-600'
                          }
                        >
                          {selectedUser.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email Verified</p>
                      <p className="font-medium text-sm">
                        {selectedUser.isEmailVerified ? '✓ Yes' : '✗ No'}
                      </p>
                    </div>
                    {selectedUser.googleId && (
                      <div>
                        <p className="text-xs text-gray-500">Google Connected</p>
                        <p className="font-medium text-sm">✓ Yes</p>
                      </div>
                    )}
                    {selectedUser.githubId && (
                      <div>
                        <p className="text-xs text-gray-500">GitHub Connected</p>
                        <p className="font-medium text-sm">✓ Yes</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-gray-500">Created</p>
                      <p className="text-sm">{new Date(selectedUser.createdAt).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Last Updated</p>
                      <p className="text-sm">{new Date(selectedUser.updatedAt).toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="text-center py-8 text-gray-500">
                  Select a user to view details
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="max-w-md mx-4">
              <CardHeader>
                <CardTitle>Confirm Delete</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this user? This action cannot be undone.
                </p>
                <div className="flex space-x-3">
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteUser(deleteConfirm)}
                    className="flex-1"
                  >
                    Delete
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
