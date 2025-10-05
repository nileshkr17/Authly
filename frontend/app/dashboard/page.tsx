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
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Welcome Back! 👋</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                You're successfully logged in to Authly.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-semibold ${user.isActive ? 'text-green-600' : 'text-red-600'}`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email Verified:</span>
                  <span className={`font-semibold ${user.isEmailVerified ? 'text-green-600' : 'text-yellow-600'}`}>
                    {user.isEmailVerified ? 'Yes' : 'Pending'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="border-b border-gray-200 pb-3">
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              {(user.firstName || user.lastName) && (
                <div className="border-b border-gray-200 pb-3">
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{`${user.firstName || ''} ${user.lastName || ''}`.trim()}</p>
                </div>
              )}
              <div className="border-b border-gray-200 pb-3">
                <p className="text-sm text-gray-500">User ID</p>
                <p className="font-medium font-mono text-sm">{user.id}</p>
              </div>
              {user.googleId && (
                <div className="border-b border-gray-200 pb-3">
                  <p className="text-sm text-gray-500">Google Account</p>
                  <p className="font-medium">✓ Connected</p>
                </div>
              )}
              {user.githubId && (
                <div className="border-b border-gray-200 pb-3">
                  <p className="text-sm text-gray-500">GitHub Account</p>
                  <p className="font-medium">✓ Connected</p>
                </div>
              )}
              <div className="border-b border-gray-200 pb-3">
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="font-medium">{new Date(user.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
