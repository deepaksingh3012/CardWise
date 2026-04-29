'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { banks, cardsByBank, mockCards } from '@/lib/mock-data';

export default function AddCardPage() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  const handleCardToggle = (cardName: string) => {
    setSelectedCards(prev =>
      prev.includes(cardName)
        ? prev.filter(c => c !== cardName)
        : [...prev, cardName]
    );
  };

  const handleSaveCards = () => {
    if (!user) return;

    // Find card IDs for selected card names
    const newCardIds = selectedCards
      .map(cardName => {
        const card = mockCards.find(
          c => c.bank === selectedBank && c.name === cardName
        );
        return card?.id;
      })
      .filter((id): id is string => id !== undefined);

    // Add new cards to user's existing cards
    const updatedCards = [...new Set([...user.cards, ...newCardIds])];

    // Update user with new cards
    updateUser({ cards: updatedCards });

    // Navigate back to home
    router.push('/');
  };

  const availableCards = selectedBank ? cardsByBank[selectedBank] : [];

  // Get cards user already has from this bank
  const getUserCardsForBank = () => {
    if (!user) return [];
    return mockCards.filter(card =>
      user.cards.includes(card.id) && card.bank === selectedBank
    );
  };

  const existingCards = getUserCardsForBank();

  return (
    <div className="min-h-screen bg-[#0A0A0A] page-container">
      <Header
        title="Add Cards"
        showBackButton
        onBackClick={() => router.push('/')}
      />

      <main className="page-content">
        {/* User's Existing Cards */}
        {user && user.cards.length > 0 && (
          <div className="mb-6 animate-fade-in">
            <h3 className="text-sm font-semibold text-white mb-3">
              Your Cards ({user.cards.length})
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
              {mockCards
                .filter(card => user.cards.includes(card.id))
                .map((card) => (
                  <div
                    key={card.id}
                    className="flex-shrink-0 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-2xl p-4 text-white min-w-[140px] shadow-lg hover:scale-[1.02] transition-transform duration-200"
                  >
                    <p className="text-xs font-medium opacity-80 mb-1">{card.bank}</p>
                    <p className="font-bold text-base">{card.name}</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Bank Selection */}
        <div className="mb-6 animate-fade-in">
          <label className="block text-sm font-semibold text-white mb-3">
            Select Bank
          </label>
          <div className="relative">
            <select
              value={selectedBank}
              onChange={(e) => {
                setSelectedBank(e.target.value);
                setSelectedCards([]);
              }}
              className="w-full px-4 py-3 bg-[#1C1C1E] border border-[rgba(255,255,255,0.08)] rounded-xl text-white focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] outline-none transition-all appearance-none"
            >
              <option value="">Choose a bank</option>
              {banks.map((bank) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
              <svg className="w-5 h-5 text-[#A1A1AA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Card Selection */}
        {selectedBank && (
          <div className="mb-6 animate-slide-in">
            <label className="block text-sm font-semibold text-white mb-3">
              Select Cards
            </label>

            {/* Show existing cards for this bank */}
            {existingCards.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-[#A1A1AA] mb-3">
                  You already have {existingCards.length} card(s) from {selectedBank}:
                </p>
                <div className="space-y-2">
                  {existingCards.map((card) => (
                    <div
                      key={card.id}
                      className="bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)] rounded-xl p-3 flex items-center gap-3"
                    >
                      <svg className="w-5 h-5 text-[#10B981]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium text-[#10B981]">{card.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              {availableCards
                .filter(cardName => !existingCards.some(card => card.name === cardName))
                .map((cardName) => (
                  <Card
                    key={cardName}
                    onClick={() => handleCardToggle(cardName)}
                    variant="glass"
                    className={`cursor-pointer transition-all ${
                      selectedCards.includes(cardName)
                        ? 'border-2 border-[#6366F1] bg-[rgba(99,102,241,0.1)]'
                        : 'border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.12)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-white text-base">{cardName}</h3>
                        <p className="text-sm text-[#A1A1AA]">{selectedBank}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedCards.includes(cardName)
                          ? 'bg-[#6366F1] border-[#6366F1]'
                          : 'border-[rgba(255,255,255,0.2)]'
                      }`}>
                        {selectedCards.includes(cardName) && (
                          <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
            </div>

            {availableCards.filter(cardName => !existingCards.some(card => card.name === cardName)).length === 0 && (
              <p className="text-sm text-[#A1A1AA] text-center py-6">
                You have all available cards from {selectedBank}
              </p>
            )}
          </div>
        )}

        {/* Trust Message */}
        <Card variant="glass" className="mb-6 bg-[rgba(16,185,129,0.1)] border-[rgba(16,185,129,0.2)] animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-[#10B981]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-[#10B981] mb-1 text-sm">
                Your data is safe
              </h4>
              <p className="text-sm text-[#A1A1AA]">
                We never ask for card number, OTP, or bank access
              </p>
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <Button
          variant="gradient"
          size="md"
          fullWidth
          glow
          onClick={handleSaveCards}
          disabled={!selectedBank || selectedCards.length === 0}
        >
          Save Cards
        </Button>
      </main>
    </div>
  );
}