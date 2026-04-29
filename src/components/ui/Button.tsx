import React from 'react';
import { colors, borderRadius, typography, spacing, shadows, animation, button, touchTargets } from '@/lib/design-system';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  glow?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  glow = false,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = `
    font-semibold rounded-xl transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0A0A0A]
    disabled:opacity-50 disabled:cursor-not-allowed
    relative overflow-hidden
    active:scale-[0.98]
    ${animation.transitions.default}
  `;

  const variantStyles = {
    primary: `
      bg-[#6366F1]
      text-white
      hover:bg-[#4F46E5]
      focus:ring-[#6366F1]
      ${glow ? shadows.glow.primary : ''}
    `,
    secondary: `
      bg-[#2C2C2E] text-white
      border border-[rgba(255,255,255,0.08)]
      hover:bg-[#3A3A3C] hover:border-[rgba(255,255,255,0.12)]
      focus:ring-[#6366F1]
    `,
    outline: `
      bg-transparent text-[#6366F1]
      border-2 border-[#6366F1]
      hover:bg-[rgba(99,102,241,0.1)]
      focus:ring-[#6366F1]
    `,
    ghost: `
      bg-transparent text-white
      hover:bg-[rgba(255,255,255,0.05)]
      focus:ring-[#6366F1]
    `,
    gradient: `
      bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]
      text-white
      hover:opacity-90
      focus:ring-[#6366F1]
      ${glow ? shadows.glow.primary : ''}
    `,
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      style={{ minHeight: touchTargets.comfortable }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};