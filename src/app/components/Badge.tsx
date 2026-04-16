import React from 'react';

type BadgeVariant = 'non-utilise' | 'renewal' | 'info' | 'days';

interface BadgeProps {
  variant: BadgeVariant;
  label?: string;
  days?: number;
}

export function Badge({ variant, label, days }: BadgeProps) {
  if (variant === 'non-utilise') {
    return (
      <span
        style={{
          background: 'rgba(255, 90, 95, 0.15)',
          color: '#FF5A5F',
          border: '1px solid rgba(255, 90, 95, 0.3)',
          padding: '4px 10px',
          borderRadius: '999px',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.05em',
          animation: 'pulse-non-utilise 2s infinite',
        }}
      >
        NON UTILISÉ
      </span>
    );
  }

  if (variant === 'days' && days !== undefined) {
    const isUrgent = days <= 3;
    return (
      <span
        style={{
          background: isUrgent
            ? 'rgba(255, 90, 95, 0.15)'
            : 'rgba(255, 159, 67, 0.15)',
          color: isUrgent ? '#FF5A5F' : '#FF9F43',
          border: `1px solid ${isUrgent ? 'rgba(255, 90, 95, 0.3)' : 'rgba(255, 159, 67, 0.3)'}`,
          padding: '4px 10px',
          borderRadius: '999px',
          fontSize: '11px',
          fontWeight: 600,
        }}
      >
        J-{days}
      </span>
    );
  }

  if (variant === 'info') {
    return (
      <span
        style={{
          background: 'rgba(0, 209, 255, 0.15)',
          color: '#00D1FF',
          border: '1px solid rgba(0, 209, 255, 0.3)',
          padding: '4px 10px',
          borderRadius: '999px',
          fontSize: '11px',
          fontWeight: 600,
        }}
      >
        {label || 'INFO'}
      </span>
    );
  }

  if (variant === 'renewal') {
    return (
      <span
        style={{
          background: 'rgba(255, 159, 67, 0.15)',
          color: '#FF9F43',
          border: '1px solid rgba(255, 159, 67, 0.3)',
          padding: '4px 10px',
          borderRadius: '999px',
          fontSize: '11px',
          fontWeight: 600,
        }}
      >
        {label || 'RENOUVELLEMENT'}
      </span>
    );
  }

  return null;
}
