import React from 'react';
import { useNavigate } from 'react-router';
import { Subscription } from '../data/subscriptions';
import { Badge } from './Badge';

interface SubscriptionItemProps {
  subscription: Subscription;
  showBackground?: boolean;
}

export function SubscriptionItem({
  subscription,
  showBackground = false,
}: SubscriptionItemProps) {
  const navigate = useNavigate();

  const isZombie = subscription.badge === 'zombie';
  const isDays =
    subscription.daysUntilRenewal !== null &&
    subscription.daysUntilRenewal <= 16;

  return (
    <div
      onClick={() => navigate(`/abonnement/${subscription.id}`)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '16px',
        borderRadius: '16px',
        background: isZombie
          ? 'rgba(255, 90, 95, 0.05)'
          : showBackground
            ? 'rgba(18, 26, 58, 0.6)'
            : 'transparent',
        border: isZombie
          ? '1px solid rgba(255, 90, 95, 0.15)'
          : '1px solid rgba(255,255,255,0.05)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        marginBottom: '8px',
        backdropFilter: 'blur(10px)',
      }}
      onTouchStart={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'scale(0.97)';
      }}
      onTouchEnd={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '12px',
          background: `linear-gradient(135deg, ${subscription.color}33, ${subscription.color}66)`,
          border: `1px solid ${subscription.color}44`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          fontWeight: 700,
          color: subscription.color === '#000000' ? '#fff' : subscription.color,
          flexShrink: 0,
        }}
      >
        {subscription.icon}
      </div>

      {/* Middle info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            color: '#FFFFFF',
            fontSize: '15px',
            fontWeight: 600,
            marginBottom: '2px',
          }}
        >
          {subscription.name}
        </div>
        <div
          style={{
            color: '#9BA3C7',
            fontSize: '12px',
          }}
        >
          Renouvellement le {subscription.renewalDate}
        </div>
      </div>

      {/* Right: price + badge */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '6px',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            color: '#FFFFFF',
            fontSize: '15px',
            fontWeight: 700,
          }}
        >
          {subscription.price}€
        </span>
        {isZombie && <Badge variant="zombie" />}
        {!isZombie && isDays && subscription.daysUntilRenewal !== null && (
          <Badge variant="days" days={subscription.daysUntilRenewal} />
        )}
      </div>
    </div>
  );
}
