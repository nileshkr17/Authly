'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3">
            <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-600 font-medium">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12 animate-fadeIn">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Dashboard
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-3xl">👋</span>
                <span>Welcome Back!</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 font-medium">
                You&apos;re successfully logged in to Authly.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span className="text-3xl">📊</span>
                <span>Quick Stats</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Status:</span>
                  <span className={`font-bold px-3 py-1 rounded-full text-sm ${user.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {user.isActive ? '✓ Active' : '✗ Inactive'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Email Verified:</span>
                  <span className={`font-bold px-3 py-1 rounded-full text-sm ${user.isEmailVerified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {user.isEmailVerified ? '✓ Verified' : '⏳ Pending'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-br from-white to-gray-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-3xl">👤</span>
              <span>Your Profile</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4 border-l-4 border-blue-500 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-sm text-gray-500 font-semibold mb-1">Email</p>
                <p className="font-semibold text-gray-900">{user.email}</p>
              </div>
              {(user.firstName || user.lastName) && (
                <div className="bg-white rounded-xl p-4 border-l-4 border-purple-500 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-sm text-gray-500 font-semibold mb-1">Name</p>
                  <p className="font-semibold text-gray-900">{`${user.firstName || ''} ${user.lastName || ''}`.trim()}</p>
                </div>
              )}
              <div className="bg-white rounded-xl p-4 border-l-4 border-pink-500 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-sm text-gray-500 font-semibold mb-1">User ID</p>
                <p className="font-mono text-sm text-gray-900 break-all">{user.id}</p>
              </div>
              {(user.googleId || user.githubId) && (
                <div className="bg-white rounded-xl p-4 border-l-4 border-green-500 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-sm text-gray-500 font-semibold mb-1">Connected Accounts</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {user.googleId && (
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                        🔍 Google
                      </span>
                    )}
                    {user.githubId && (
                      <span className="px-3 py-1 bg-gray-800 text-white rounded-full text-sm font-semibold">
                        🐙 GitHub
                      </span>
                    )}
                  </div>
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 border-l-4 border-yellow-500 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-sm text-gray-500 font-semibold mb-1">Member Since</p>
                  <p className="font-semibold text-gray-900">{new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border-l-4 border-cyan-500 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-sm text-gray-500 font-semibold mb-1">Last Updated</p>
                  <p className="font-semibold text-gray-900">{new Date(user.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
