'use client';

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { mockOffers, mockCards } from '@/lib/mock-data';

export default function OfferDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const offerId = params.offer as string;

  const offer = mockOffers.find(o => o.id === offerId);

  // Get user's cards
  const getUserCards = () => {
    if (!user || user.cards.length === 0) {
      return [];
    }

    return mockCards.filter(card => user.cards.includes(card.id));
  };

  const userCards = getUserCards();

  // Get recommended card (prefer user's card if available)
  const recommendedCard = offer?.recommendedCard && userCards.some(c => c.id === offer.recommendedCard)
    ? userCards.find(c => c.id === offer.recommendedCard)
    : userCards.length > 0
    ? userCards[0] // Default to first user card
    : null;

  // Get eligible cards from user's collection
  const eligibleCards = offer?.eligibleCards
    ? userCards.filter(c => offer.eligibleCards.includes(c.id))
    : [];

  const handleGoToMerchant = () => {
    // In a real app, this would open the merchant's website or app
    window.open('https://example.com', '_blank');
  };

  if (!offer) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] page-container">
        <p className="text-white">Offer not found</p>
      </div>
    );
  }

  // Show message if user doesn't have eligible cards
  if (userCards.length === 0 || eligibleCards.length === 0) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] page-container">
        <Header
          title="Offer Details"
          showBackButton
          onBackClick={() => router.push('/')}
        />

        <main className="page-content">
          {/* Offer Header */}
          <Card variant="glass" className="mb-6 animate-scale-in">
            <div className="text-center mb-6">
              <div className="inline-block bg-[rgba(99,102,241,0.2)] text-[#818CF8] text-sm font-semibold px-4 py-2 rounded-full mb-4 border border-[rgba(99,102,241,0.3)]">
                {offer.category.charAt(0).toUpperCase() + offer.category.slice(1)}
              </div>
              <h1 className="text-4xl font-bold text-white mb-3">
                {offer.merchant}
              </h1>
              <p className="text-5xl font-bold bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                {offer.discount}
              </p>
            </div>

            <div className="border-t border-white/10 pt-4 mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#A1A1AA]">Expires on</span>
                <span className="font-semibold text-white">
                  {new Date(offer.expiry).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </Card>

          {/* Not Eligible Message */}
          <Card variant="glass" className="text-center py-12 animate-fade-in">
            <div className="flex justify-center mb-4">
              <svg className="w-16 h-16 text-[#6366F1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="font-semibold text-white mb-3 text-xl">
              {userCards.length === 0 ? 'No cards added' : 'Card not eligible'}
            </h3>
            <p className="text-[#A1A1AA] text-sm mb-6">
              {userCards.length === 0
                ? 'Add your cards to check eligibility for this offer'
                : 'None of your cards are eligible for this offer'}
            </p>
            <Button
              variant="gradient"
              size="lg"
              glow
              onClick={() => router.push('/add-card')}
            >
              {userCards.length === 0 ? 'Add Cards' : 'Add More Cards'}
            </Button>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] page-container">
      <Header
        title="Offer Details"
        showBackButton
        onBackClick={() => router.push('/')}
      />

      <main className="page-content">
        {/* Offer Header */}
        <Card variant="glass" className="mb-6 animate-scale-in">
          <div className="text-center mb-6">
            <div className="inline-block bg-[rgba(99,102,241,0.2)] text-[#818CF8] text-sm font-semibold px-4 py-2 rounded-full mb-4 border border-[rgba(99,102,241,0.3)]">
              {offer.category.charAt(0).toUpperCase() + offer.category.slice(1)}
            </div>
            <h1 className="text-4xl font-bold text-white mb-3">
              {offer.merchant}
            </h1>
            <p className="text-5xl font-bold bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
              {offer.discount}
            </p>
          </div>

          <div className="border-t border-white/10 pt-4 mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#A1A1AA]">Expires on</span>
              <span className="font-semibold text-white">
                {new Date(offer.expiry).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>
          </div>
        </Card>

        {/* Recommendation */}
        {recommendedCard && (
          <div className="mb-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-white mb-4">
              Recommended Card
            </h2>
            <Card variant="gradient" className="mb-4 hover:scale-[1.02]" glow>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-2xl text-white">
                    {recommendedCard.bank} {recommendedCard.name}
                  </h3>
                  <p className="text-white/80 text-sm mt-2">
                    Best for this offer
                  </p>
                </div>
                <div className="bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] text-[#0F0F0F] text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                  USE THIS
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <p className="text-xs text-white/70">Dining</p>
                  <p className="font-bold text-xl text-white">{recommendedCard.rewards.dining}x</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <p className="text-xs text-white/70">Shopping</p>
                  <p className="font-bold text-xl text-white">{recommendedCard.rewards.shopping}x</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <p className="text-xs text-white/70">Travel</p>
                  <p className="font-bold text-xl text-white">{recommendedCard.rewards.travel}x</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3 text-center">
                  <p className="text-xs text-white/70">Fuel</p>
                  <p className="font-bold text-xl text-white">{recommendedCard.rewards.fuel}x</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Eligible Cards */}
        {eligibleCards.length > 0 && (
          <div className="mb-6 animate-slide-in">
            <h2 className="text-2xl font-bold text-white mb-4">
              Also Works With
            </h2>
            <div className="space-y-3">
              {eligibleCards.map((card) => (
                <Card
                  key={card.id}
                  variant="glass"
                  className={card.id === recommendedCard?.id ? 'border-2 border-[#6366F1]' : ''}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-white text-lg">
                        {card.bank} {card.name}
                      </h3>
                      <p className="text-sm text-[#A1A1AA]">
                        {card.type === 'credit' ? 'Credit Card' : 'Debit Card'}
                      </p>
                    </div>
                    {card.id === recommendedCard?.id && (
                      <div className="bg-[rgba(99,102,241,0.2)] text-[#818CF8] text-xs font-semibold px-3 py-1 rounded-full border border-[rgba(99,102,241,0.3)]">
                        Recommended
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* CTA Button */}
        <Button
          variant="gradient"
          size="lg"
          fullWidth
          glow
          onClick={handleGoToMerchant}
          className="mb-4"
        >
          Go to {offer.merchant}
        </Button>

        {/* Terms */}
        <div className="text-center">
          <p className="text-xs text-[#A1A1AA]">
            Terms and conditions apply. Offer valid until expiry date.
          </p>
        </div>
      </main>
    </div>
  );
}