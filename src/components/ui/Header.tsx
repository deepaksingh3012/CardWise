'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { colors, typography, spacing, glassmorphism, animation } from '@/lib/design-system';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  showProfileButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBackButton = false,
  onBackClick,
  showProfileButton = true,
}) => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const handleProfileClick = () => {
    router.push('/profile');
  };

  return (
    <div className="sticky top-0 z-20 backdrop-blur-xl bg-[rgba(10,10,10,0.8)] border-b border-[rgba(255,255,255,0.08)]">
      <div className="max-w-lg mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {showBackButton && (
            <button
              onClick={onBackClick}
              className="p-2 -ml-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-all duration-200"
              aria-label="Go back"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          <div className={showBackButton ? 'flex-1 text-center' : 'w-full text-center'}>
            <h1 className="text-xl font-bold text-white">{title}</h1>
            {subtitle && (
              <p className="text-sm text-[#A1A1AA] mt-0.5">{subtitle}</p>
            )}
          </div>

          {showProfileButton && isAuthenticated && user && (
            <button
              onClick={handleProfileClick}
              className="p-2 -mr-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-all duration-200"
              aria-label="Profile"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-full flex items-center justify-center text-white text-sm font-bold">
                {user.avatar || user.name.charAt(0)}
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};