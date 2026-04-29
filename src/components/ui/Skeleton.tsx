import React from 'react';
import { colors, borderRadius, animation } from '@/lib/design-system';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: true | false;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  width,
  height,
  animation = true,
}) => {
  const baseStyles = 'bg-[#2C2C2E]';

  const variantStyles = {
    text: 'h-4 rounded-md',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const animationStyle = animation
    ? 'animate-pulse'
    : '';

  const style = {
    width: width !== undefined ? width : undefined,
    height: height !== undefined ? height : undefined,
  };

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${animationStyle} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
};

// Pre-built skeleton components for common use cases
export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-[#1C1C1E] border border-[rgba(255,255,255,0.08)] rounded-2xl p-5 ${className}`}>
    <div className="flex items-start justify-between mb-3">
      <div className="flex-1">
        <Skeleton width="60%" height={20} className="mb-2" />
        <Skeleton width="40%" height={16} />
      </div>
      <Skeleton variant="circular" width={32} height={32} />
    </div>
    <div className="flex items-center gap-2 mb-3">
      <Skeleton variant="rectangular" width={100} height={24} />
    </div>
    <div className="flex items-center justify-between">
      <Skeleton width={80} height={14} />
      <Skeleton variant="rectangular" width={80} height={32} />
    </div>
  </div>
);

export const SkeletonButton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <Skeleton
    variant="rectangular"
    height={44}
    className={`rounded-xl ${className}`}
  />
);

export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({
  lines = 3,
  className = '',
}) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        width={i === lines - 1 ? '60%' : '100%'}
        height={16}
      />
    ))}
  </div>
);