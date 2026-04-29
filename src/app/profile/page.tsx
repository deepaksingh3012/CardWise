'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { mockCards } from '@/lib/mock-data';

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, updateUser } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleAddCards = () => {
    router.push('/add-card');
  };

  const handleEditProfile = () => {
    // In a real app, this would open an edit profile modal
    alert('Edit profile functionality coming soon!');
  };

  // Get user's cards
  const getUserCards = () => {
    if (!user || user.cards.length === 0) {
      return [];
    }

    return mockCards.filter(card => user.cards.includes(card.id));
  };

  const userCards = getUserCards();

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] page-container">
        <p className="text-white">Please login to view your profile</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] page-container">
      <Header
        title="My Profile"
        showBackButton
        onBackClick={() => router.push('/')}
      />

      <main className="page-content">
        {/* User Info Card */}
        <Card variant="gradient" className="mb-6 animate-scale-in" glow>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-[#F59E0B] to-[#FBBF24] rounded-full flex items-center justify-center text-4xl shadow-xl">
              {user.avatar || '👤'}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">{user.name}</h2>
              <p className="text-white/80 text-sm">{user.email}</p>
              {user.phone && (
                <p className="text-white/80 text-sm">{user.phone}</p>
              )}
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleEditProfile}
            >
              Edit
            </Button>
          </div>

          <div className="border-t border-white/20 pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">Member since</span>
              <span className="font-medium text-white">
                {new Date(user.createdAt).toLocaleDateString('en-IN', {
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>
          </div>
        </Card>

        {/* Cards Overview */}
        <div className="mb-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">
              Your Cards ({userCards.length})
            </h3>
            <Button
              variant="primary"
              size="sm"
              glow
              onClick={handleAddCards}
            >
              Add Card
            </Button>
          </div>

          {userCards.length > 0 ? (
            <div className="space-y-4">
              {userCards.map((card) => (
                <Card key={card.id} variant="gradient" className="text-white hover:scale-[1.02]" glow>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm font-semibold opacity-80">{card.bank}</p>
                      <p className="font-bold text-xl">{card.name}</p>
                    </div>
                    <span className="text-sm bg-white/20 px-3 py-1 rounded-full font-medium">
                      {card.type === 'credit' ? 'Credit' : 'Debit'}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-3 mt-4">
                    <div className="bg-white/10 rounded-xl p-3 text-center">
                      <p className="text-xs opacity-80">Dining</p>
                      <p className="font-bold text-lg">{card.rewards.dining}x</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3 text-center">
                      <p className="text-xs opacity-80">Shopping</p>
                      <p className="font-bold text-lg">{card.rewards.shopping}x</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3 text-center">
                      <p className="text-xs opacity-80">Travel</p>
                      <p className="font-bold text-lg">{card.rewards.travel}x</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3 text-center">
                      <p className="text-xs opacity-80">Fuel</p>
                      <p className="font-bold text-lg">{card.rewards.fuel}x</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card variant="glass" className="text-center py-12">
              <div className="flex justify-center mb-4">
                <svg className="w-16 h-16 text-[#6366F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2 text-xl">No cards added yet</h3>
              <p className="text-[#A1A1AA] text-sm mb-6">
                Add your cards to get personalized recommendations
              </p>
              <Button
                variant="gradient"
                size="lg"
                glow
                onClick={handleAddCards}
              >
                Add Your First Card
              </Button>
            </Card>
          )}
        </div>

        {/* Preferences */}
        <Card variant="glass" className="mb-6 animate-fade-in">
          <h3 className="text-xl font-bold text-white mb-6">
            Preferences
          </h3>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">Push Notifications</p>
                <p className="text-sm text-[#A1A1AA]">Get notified about new offers</p>
              </div>
              <div className={`w-14 h-7 rounded-full p-1 cursor-pointer transition-all ${
                user.preferences.notifications ? 'bg-[#6366F1]' : 'bg-[#2A2A2A]'
              }`} onClick={() => updateUser({
                preferences: {
                  ...user.preferences,
                  notifications: !user.preferences.notifications
                }
              })}>
                <div className={`w-5 h-5 rounded-full bg-white shadow-lg transition-transform ${
                  user.preferences.notifications ? 'translate-x-7' : 'translate-x-0'
                }`} />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">Email Updates</p>
                <p className="text-sm text-[#A1A1AA]">Receive offer updates via email</p>
              </div>
              <div className={`w-14 h-7 rounded-full p-1 cursor-pointer transition-all ${
                user.preferences.emailUpdates ? 'bg-[#6366F1]' : 'bg-[#2A2A2A]'
              }`} onClick={() => updateUser({
                preferences: {
                  ...user.preferences,
                  emailUpdates: !user.preferences.emailUpdates
                }
              })}>
                <div className={`w-5 h-5 rounded-full bg-white shadow-lg transition-transform ${
                  user.preferences.emailUpdates ? 'translate-x-7' : 'translate-x-0'
                }`} />
              </div>
            </div>
          </div>
        </Card>

        {/* Logout Button */}
        <Button
          variant="secondary"
          size="lg"
          fullWidth
          onClick={handleLogout}
          className="border-[rgba(239,68,68,0.3)] text-[#EF4444] hover:bg-[rgba(239,68,68,0.1)]"
        >
          Logout
        </Button>
      </main>
    </div>
  );
}