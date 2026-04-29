import React from 'react';
import { CardRecommendation } from '@/types';
import { Card } from '@/components/ui/Card';

interface RecommendationCardProps {
  recommendation: CardRecommendation;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
}) => {
  const { card, reason, isBest } = recommendation;

  return (
    <Card
      variant={isBest ? 'gradient' : 'glass'}
      className="mb-4 hover:scale-[1.01]"
      glow={isBest}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-lg text-white">
              {card.bank} {card.name}
            </h3>
            {isBest && (
              <span className="bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] text-[#0A0A0A] text-xs font-bold px-2.5 py-1 rounded-full">
                BEST
              </span>
            )}
          </div>
          <p className={`text-sm ${isBest ? 'text-white/80' : 'text-[#A1A1AA]'}`}>
            {reason}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <div className={`text-center p-2.5 rounded-lg ${isBest ? 'bg-white/10' : 'bg-[rgba(255,255,255,0.05)]'}`}>
          <p className={`text-xs ${isBest ? 'text-white/70' : 'text-[#A1A1AA]'}`}>Dining</p>
          <p className={`font-bold text-base ${isBest ? 'text-white' : 'text-white'}`}>
            {card.rewards.dining}x
          </p>
        </div>
        <div className={`text-center p-2.5 rounded-lg ${isBest ? 'bg-white/10' : 'bg-[rgba(255,255,255,0.05)]'}`}>
          <p className={`text-xs ${isBest ? 'text-white/70' : 'text-[#A1A1AA]'}`}>Shopping</p>
          <p className={`font-bold text-base ${isBest ? 'text-white' : 'text-white'}`}>
            {card.rewards.shopping}x
          </p>
        </div>
        <div className={`text-center p-2.5 rounded-lg ${isBest ? 'bg-white/10' : 'bg-[rgba(255,255,255,0.05)]'}`}>
          <p className={`text-xs ${isBest ? 'text-white/70' : 'text-[#A1A1AA]'}`}>Travel</p>
          <p className={`font-bold text-base ${isBest ? 'text-white' : 'text-white'}`}>
            {card.rewards.travel}x
          </p>
        </div>
        <div className={`text-center p-2.5 rounded-lg ${isBest ? 'bg-white/10' : 'bg-[rgba(255,255,255,0.05)]'}`}>
          <p className={`text-xs ${isBest ? 'text-white/70' : 'text-[#A1A1AA]'}`}>Fuel</p>
          <p className={`font-bold text-base ${isBest ? 'text-white' : 'text-white'}`}>
            {card.rewards.fuel}x
          </p>
        </div>
      </div>
    </Card>
  );
};