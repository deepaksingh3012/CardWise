'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      await login({ email: username, password });
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#6366F1] to-[#4F46E5] text-white">

      {/* Logo */}
      <div className="text-center mb-8">
        <div className="w-14 h-14 mx-auto mb-3 flex items-center justify-center rounded-xl bg-white/20 text-2xl">
          💳
        </div>
        <h1 className="text-2xl font-semibold">CardWise</h1>
        <p className="text-sm text-white/80">Smart credit card recommendations</p>
      </div>

      {/* Card */}
      <div className="bg-gray-100 text-gray-800 w-[360px] rounded-2xl shadow-xl p-8">
        <h2 className="text-xl font-semibold mb-1">Welcome back</h2>
        <p className="text-sm text-gray-500 mb-5">Sign in to continue</p>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (error) setError('');
              }}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting || isLoading}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting || isLoading}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="w-full py-3 rounded-lg text-white font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#6366F1' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4F46E5'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6366F1'}
          >
            {isSubmitting || isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 bg-gray-200 rounded-lg p-4 text-sm text-gray-700">
          <p className="font-medium mb-1 text-center">Demo Credentials</p>
          <p>Username: rahul@example.com</p>
          <p>Password: demo123</p>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 text-xs text-white/80">
        © 2026 CardWise. All rights reserved.
      </div>

    </div>
  );
}