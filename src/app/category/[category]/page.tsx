'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/ui/Header';
import { RecommendationCard } from '@/components/features/RecommendationCard';
import { OfferCard } from '@/components/features/OfferCard';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockCards, mockOffers, categories } from '@/lib/mock-data';
import { CardRecommendation, Card as CardType } from '@/types';

export default function CategoryPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const categoryId = params.category as string;

  const category = categories.find(c => c.id === categoryId);

  // Get user's cards
  const getUserCards = () => {
    if (!user || user.cards.length === 0) {
      return [];
    }

    return mockCards.filter(card => user.cards.includes(card.id));
  };

  const userCards = getUserCards();

  // Get card recommendations based on rewards (only user's cards)
  const getRecommendations = (): CardRecommendation[] => {
    if (userCards.length === 0) {
      return [];
    }

    const rewardKey = categoryId as keyof CardType['rewards'];
    const sortedCards = [...userCards].sort((a, b) =>
      b.rewards[rewardKey] - a.rewards[rewardKey]
    );

    return sortedCards.map((card, index) => ({
      card,
      reason: getReasonForCard(card, categoryId),
      isBest: index === 0,
    }));
  };

  const getReasonForCard = (card: any, category: string): string => {
    const reasons: Record<string, string> = {
      food: `Best rewards for dining with ${card.rewards.dining}x points`,
      shopping: `Great for shopping with ${card.rewards.shopping}x points`,
      travel: `Excellent for travel with ${card.rewards.travel}x points`,
      fuel: `Good for fuel with ${card.rewards.fuel}x points`,
    };
    return reasons[category] || 'Good choice for this category';
  };

  // Get offers for user's cards only
  const getUserOffers = () => {
    if (userCards.length === 0) {
      return [];
    }

    const userCardIds = userCards.map(card => card.id);
    return mockOffers.filter(offer =>
      offer.category === categoryId &&
      offer.eligibleCards.some(cardId => userCardIds.includes(cardId))
    );
  };

  const recommendations = getRecommendations();
  const bestCard = recommendations[0];
  const backupCards = recommendations.slice(1, 3);
  const userOffers = getUserOffers();

  const handleViewOffer = (offerId: string) => {
    router.push(`/offer/${offerId}`);
  };

  const handleAddCards = () => {
    router.push('/add-card');
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] page-container">
        <p className="text-white">Category not found</p>
      </div>
    );
  }

  // Show empty state if user has no cards
  if (userCards.length === 0) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] page-container">
        <Header
          title={category.name}
          subtitle={category.icon}
          showBackButton
          onBackClick={() => router.push('/')}
        />

        <main className="page-content">
          <Card variant="glass" className="text-center py-16 animate-scale-in">
            <div className="flex justify-center mb-6">
              <svg className="w-20 h-20 text-[#6366F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-3">
              No cards added yet
            </h2>
            <p className="text-[#A1A1AA] mb-8 text-base">
              Add your cards to see personalized recommendations for {category.name}
            </p>
            <Button
              variant="gradient"
              size="md"
              glow
              onClick={handleAddCards}
            >
              Add Your Cards
            </Button>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] page-container">
      <Header
        title={category.name}
        subtitle={category.icon}
        showBackButton
        onBackClick={() => router.push('/')}
      />

      <main className="page-content">
        {/* Best Card Section */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-lg font-semibold text-white mb-4">
            Best Card for {category.name}
          </h2>
          {bestCard && (
            <RecommendationCard recommendation={bestCard} />
          )}
        </div>

        {/* Backup Cards Section */}
        {backupCards.length > 0 && (
          <div className="mb-8 animate-slide-in">
            <h2 className="text-lg font-semibold text-white mb-4">
              Other Good Options
            </h2>
            {backupCards.map((recommendation) => (
              <RecommendationCard
                key={recommendation.card.id}
                recommendation={recommendation}
              />
            ))}
          </div>
        )}

        {/* Offers Section */}
        {userOffers.length > 0 && (
          <div className="mb-8 animate-fade-in">
            <h2 className="text-lg font-semibold text-white mb-4">
              Available Offers
            </h2>
            {userOffers.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                onViewOffer={handleViewOffer}
              />
            ))}
          </div>
        )}

        {/* Why Section */}
        <Card variant="glass" className="mb-6 bg-[rgba(99,102,241,0.1)] border-[rgba(99,102,241,0.2)] animate-scale-in">
          <h3 className="font-semibold text-[#818CF8] mb-2 text-base">
            Why this card?
          </h3>
          <p className="text-sm text-[#A1A1AA]">
            {bestCard?.reason || 'This card offers the best rewards for your ' + category.name + ' purchases.'}
          </p>
        </Card>
      </main>
    </div>
  );
}