'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/ui/Header';
import { CategoryChip } from '@/components/features/CategoryChip';
import { OfferCard } from '@/components/features/OfferCard';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Skeleton, SkeletonCard, SkeletonButton } from '@/components/ui/Skeleton';
import { categories, mockOffers, mockCards } from '@/lib/mock-data';
import { Category } from '@/types';

export default function HomePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleCategoryClick = (categoryId: Category) => {
    setSelectedCategory(categoryId);
    router.push(`/category/${categoryId}`);
  };

  const handleViewOffer = (offerId: string) => {
    router.push(`/offer/${offerId}`);
  };

  const handleAddCards = () => {
    router.push('/add-card');
  };

  const handleProfile = () => {
    router.push('/profile');
  };

  // Filter offers based on user's cards
  const getUserOffers = () => {
    if (!user || user.cards.length === 0) {
      return mockOffers.slice(0, 3); // Show default offers if no cards
    }

    // Filter offers that work with user's cards
    const userOffers = mockOffers.filter(offer =>
      offer.eligibleCards.some(cardId => user.cards.includes(cardId))
    );

    // If no offers for user's cards, show default offers
    return userOffers.length > 0 ? userOffers.slice(0, 3) : mockOffers.slice(0, 3);
  };

  // Get user's cards
  const getUserCards = () => {
    if (!user || user.cards.length === 0) {
      return [];
    }

    return mockCards.filter(card => user.cards.includes(card.id));
  };

  const featuredOffers = getUserOffers();
  const userCards = getUserCards();

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] page-container">
        <Header title="CardWise" />
        <main className="page-content">
          {/* Skeleton Cards */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <Skeleton width={120} height={20} />
              <Skeleton width={60} height={16} />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {[1, 2, 3].map((i) => (
                <SkeletonCard key={i} className="min-w-[140px]" />
              ))}
            </div>
          </div>

          {/* Skeleton Hero */}
          <div className="mb-8 space-y-2">
            <Skeleton width="80%" height={28} />
            <Skeleton width="60%" height={16} />
          </div>

          {/* Skeleton Categories */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} variant="rectangular" height={88} className="rounded-2xl" />
            ))}
          </div>

          {/* Skeleton Offers */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <Skeleton width={150} height={20} />
              <Skeleton width={50} height={16} />
            </div>
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} className="mb-4" />
            ))}
          </div>

          {/* Skeleton CTA */}
          <Skeleton variant="rectangular" height={120} className="rounded-2xl mb-6" />
          <SkeletonButton className="w-full" />
        </main>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] page-container">
      <Header
        title="CardWise"
        subtitle={user?.name ? `Welcome, ${user.name.split(' ')[0]}!` : undefined}
      />

      <main className="page-content">
        {/* Hero Section */}
        <div className="mb-10 animate-fade-in text-center">
          <h2 className="text-3xl font-bold text-white mb-3 leading-tight">
            What are you paying for today?
          </h2>
          <p className="text-[#A1A1AA] text-lg max-w-md mx-auto">
            Get instant recommendations for the best card to use
          </p>
        </div>

        {/* Category Chips */}
        <div className="grid grid-cols-2 gap-5 mb-10 animate-slide-in">
          {categories.map((category) => (
            <CategoryChip
              key={category.id}
              category={category}
              isSelected={selectedCategory === category.id}
              onClick={() => handleCategoryClick(category.id)}
            />
          ))}
        </div>

        {/* Offers Section */}
        <div className="mb-10 animate-fade-in">
          <div className="flex flex-col items-center mb-6">
            <h3 className="text-xl font-bold text-white mb-2">
              {userCards.length > 0 ? 'Offers for your cards' : 'Featured offers'}
            </h3>
            <button className="text-[#6366F1] text-sm font-semibold hover:text-[#818CF8] transition-colors flex items-center gap-1">
              See all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {featuredOffers.length > 0 ? (
            <div className="space-y-5">
              {featuredOffers.map((offer) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  onViewOffer={handleViewOffer}
                />
              ))}
            </div>
          ) : (
            <Card variant="glass" className="text-center py-16">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-[#6366F1]/10 rounded-2xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-[#6366F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                No offers available for your cards
              </h3>
              <p className="text-[#A1A1AA] mb-6 max-w-sm mx-auto">
                Add more cards to discover personalized offers and rewards
              </p>
              <Button
                variant="primary"
                size="lg"
                glow
                onClick={handleAddCards}
              >
                Add more cards
              </Button>
            </Card>
          )}
        </div>

        {/* Add Cards CTA */}
        <div className="text-center">
          <Button
            variant="gradient"
            size="lg"
            glow
            onClick={handleAddCards}
            className="w-full"
          >
            {userCards.length === 0 ? 'Add your first card' : 'Add more cards'}
          </Button>
        </div>
      </main>
    </div>
  );
}