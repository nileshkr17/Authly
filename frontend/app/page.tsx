'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/Card';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to Authly 🔐
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Plug-and-Play Authentication Microservice
          </p>
          {!user && (
            <div className="flex justify-center space-x-4">
              <Link
                href="/login"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/signup"
                className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent>
              <div className="text-4xl mb-4">🔑</div>
              <h3 className="text-xl font-semibold mb-2">JWT Authentication</h3>
              <p className="text-gray-600">
                Secure token-based authentication with automatic refresh
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-semibold mb-2">OAuth Integration</h3>
              <p className="text-gray-600">
                Login seamlessly with Google and GitHub
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="text-4xl mb-4">✉️</div>
              <h3 className="text-xl font-semibold mb-2">Magic Links</h3>
              <p className="text-gray-600">
                Passwordless authentication via email
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Authentication Methods */}
        <Card>
          <CardContent>
            <h2 className="text-2xl font-bold mb-4">Authentication Methods</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-green-600 font-bold">✓</span>
                <div>
                  <h4 className="font-semibold">Email/Password Login</h4>
                  <p className="text-gray-600">Traditional signup and login with secure password hashing</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-600 font-bold">✓</span>
                <div>
                  <h4 className="font-semibold">OAuth Providers</h4>
                  <p className="text-gray-600">Google and GitHub OAuth integration</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-600 font-bold">✓</span>
                <div>
                  <h4 className="font-semibold">Passwordless Magic Links</h4>
                  <p className="text-gray-600">Email-based authentication without passwords</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-600 font-bold">✓</span>
                <div>
                  <h4 className="font-semibold">Admin Panel</h4>
                  <p className="text-gray-600">User management and role administration</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
