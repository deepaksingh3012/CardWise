import React from 'react';
import { Offer } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface OfferCardProps {
  offer: Offer;
  onViewOffer?: (offerId: string) => void;
}

export const OfferCard: React.FC<OfferCardProps> = ({
  offer,
  onViewOffer,
}) => {
  return (
    <Card className="mb-4 hover:scale-[1.01]" glow>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-white mb-1">{offer.merchant}</h3>
          <p className="text-2xl font-bold bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
            {offer.discount}
          </p>
        </div>
        <div className="bg-[rgba(99,102,241,0.15)] px-3 py-1.5 rounded-full border border-[rgba(99,102,241,0.25)]">
          <span className="text-xs font-semibold text-[#818CF8]">
            {offer.category.charAt(0).toUpperCase() + offer.category.slice(1)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-2 bg-[rgba(16,185,129,0.1)] px-3 py-1.5 rounded-lg border border-[rgba(16,185,129,0.2)]">
          <svg className="w-4 h-4 text-[#10B981]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm text-[#10B981] font-medium">Works with your card</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-[#A1A1AA]">
          Expires: {new Date(offer.expiry).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })}
        </span>
        <Button
          variant="primary"
          size="sm"
          glow
          onClick={() => onViewOffer?.(offer.id)}
        >
          View Offer
        </Button>
      </div>
    </Card>
  );
};