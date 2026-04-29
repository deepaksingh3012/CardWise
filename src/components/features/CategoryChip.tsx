import React from 'react';
import { CategoryInfo } from '@/types';

interface CategoryChipProps {
  category: CategoryInfo;
  isSelected?: boolean;
  onClick?: () => void;
}

// SVG icons for categories
const categoryIcons: Record<string, React.ReactNode> = {
  food: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  shopping: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  ),
  travel: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  ),
  fuel: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
};

export const CategoryChip: React.FC<CategoryChipProps> = ({
  category,
  isSelected = false,
  onClick,
}) => {
  const icon = categoryIcons[category.id] || categoryIcons.food;

  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center
        px-5 py-4 rounded-2xl transition-all duration-200
        relative overflow-hidden min-h-[88px]
        ${isSelected
          ? 'bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] text-white shadow-lg border border-[rgba(255,255,255,0.15)]'
          : 'bg-[#1C1C1E] text-white border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.12)] hover:bg-[#2C2C2E]'
        }
      `}
      aria-label={`${category.name} category`}
      aria-pressed={isSelected}
    >
      <div className="mb-2 relative z-10">
        {icon}
      </div>
      <span className="text-sm font-semibold relative z-10">
        {category.name}
      </span>
    </button>
  );
};