import React from 'react';
import { colors, borderRadius, spacing, shadows, glassmorphism, animation, card, touchTargets } from '@/lib/design-system';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'highlighted' | 'success' | 'glass' | 'gradient' | 'white';
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  variant = 'default',
  glow = false,
}) => {
  const baseStyles = `
    rounded-2xl p-5 transition-all duration-200
    ${animation.transitions.default}
  `;

  const variantStyles = {
    default: `
      bg-[#1C1C1E] border border-[rgba(255,255,255,0.08)]
      hover:border-[rgba(255,255,255,0.12)] hover:shadow-lg
      ${glow ? shadows.glow.primary : ''}
    `,
    highlighted: `
      bg-gradient-to-br from-[#6366F1] to-[#8B5CF6]
      text-white shadow-lg border border-[rgba(255,255,255,0.15)]
      ${glow ? shadows.glow.primary : ''}
    `,
    success: `
      bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)]
      text-[#10B981]
    `,
    glass: `
      ${glassmorphism.base}
      border border-[rgba(255,255,255,0.08)]
      hover:bg-[rgba(28,28,30,0.9)] hover:border-[rgba(255,255,255,0.12)]
      ${glow ? shadows.glow.primary : ''}
    `,
    gradient: `
      bg-gradient-to-br from-[#6366F1] via-[#8B5CF6] to-[#A855F7]
      text-white shadow-lg border border-[rgba(255,255,255,0.15)]
      ${glow ? shadows.glow.secondary : ''}
    `,
    white: `
      bg-white border border-[rgba(0,0,0,0.08)]
      hover:border-[rgba(0,0,0,0.12)] hover:shadow-lg
      ${glow ? shadows.glow.primary : ''}
    `,
  };

  const interactiveStyle = onClick ? 'cursor-pointer hover:scale-[1.01] active:scale-[0.99]' : '';

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${interactiveStyle} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      style={onClick ? { minHeight: touchTargets.comfortable } : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {children}
    </div>
  );
};