'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/Card';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-12 animate-fadeIn">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-fadeIn">
            Welcome to Authly 🔐
          </h1>
          <p className="text-2xl text-gray-600 mb-10 font-medium">
            Plug-and-Play Authentication Microservice
          </p>
          {!user && (
            <div className="flex justify-center space-x-6">
              <Link
                href="/login"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Get Started
              </Link>
              <Link
                href="/signup"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Sign Up Free
              </Link>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="transform hover:scale-105 transition-transform duration-300">
            <CardContent className="text-center">
              <div className="text-6xl mb-6 animate-pulse">🔑</div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                JWT Authentication
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Secure token-based authentication with automatic refresh and seamless user experience
              </p>
            </CardContent>
          </Card>

          <Card className="transform hover:scale-105 transition-transform duration-300">
            <CardContent className="text-center">
              <div className="text-6xl mb-6 animate-pulse">🌐</div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                OAuth Integration
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Login seamlessly with Google and GitHub for a frictionless authentication experience
              </p>
            </CardContent>
          </Card>

          <Card className="transform hover:scale-105 transition-transform duration-300">
            <CardContent className="text-center">
              <div className="text-6xl mb-6 animate-pulse">✉️</div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
                Magic Links
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Passwordless authentication via email for ultimate convenience and security
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Authentication Methods */}
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-100">
          <CardContent>
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Authentication Methods
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <span className="text-green-600 font-bold text-2xl flex-shrink-0">✓</span>
                <div>
                  <h4 className="font-bold text-lg mb-2 text-gray-900">Email/Password Login</h4>
                  <p className="text-gray-600">Traditional signup and login with secure bcrypt password hashing</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <span className="text-green-600 font-bold text-2xl flex-shrink-0">✓</span>
                <div>
                  <h4 className="font-bold text-lg mb-2 text-gray-900">OAuth Providers</h4>
                  <p className="text-gray-600">Seamless Google and GitHub OAuth 2.0 integration</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <span className="text-green-600 font-bold text-2xl flex-shrink-0">✓</span>
                <div>
                  <h4 className="font-bold text-lg mb-2 text-gray-900">Passwordless Magic Links</h4>
                  <p className="text-gray-600">Secure email-based authentication without passwords</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <span className="text-green-600 font-bold text-2xl flex-shrink-0">✓</span>
                <div>
                  <h4 className="font-bold text-lg mb-2 text-gray-900">Admin Panel</h4>
                  <p className="text-gray-600">Comprehensive user management and role administration</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
