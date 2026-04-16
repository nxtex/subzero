import React from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  ArrowLeft,
  Calendar,
  Clock,
  ExternalLink,
  AlertTriangle,
  Zap,
  TrendingDown,
} from 'lucide-react';
import { subscriptions } from '../data/subscriptions';
import { Badge } from '../components/Badge';

export function SubscriptionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const sub = subscriptions.find((s) => s.id === id);

  if (!sub) {
    return (
      <div
        style={{
          padding: '56px 20px',
          color: '#FFFFFF',
          textAlign: 'center',
        }}
      >
        <p>Abonnement introuvable</p>
        <button
          onClick={() => navigate(-1)}
          style={{ marginTop: '16px', color: '#00D1FF', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Retour
        </button>
      </div>
    );
  }

  const isZombie = sub.badge === 'zombie';
  const yearlyTotal = sub.price * 12;

  return (
    <div style={{ padding: '0 0 20px' }}>
      {/* Header */}
      <div
        style={{
          padding: '56px 20px 24px',
          background: `linear-gradient(180deg, rgba(15,22,48,0.98) 0%, transparent 100%)`,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '200px',
            height: '200px',
            background: `radial-gradient(circle, ${sub.color}18 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: '#9BA3C7',
            fontSize: '14px',
            cursor: 'pointer',
            marginBottom: '24px',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <ArrowLeft size={16} />
          Retour
        </button>

        {/* Icon + Name */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '18px',
              background: `linear-gradient(135deg, ${sub.color}33, ${sub.color}66)`,
              border: `1px solid ${sub.color}55`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: 700,
              color: sub.color === '#000000' ? '#fff' : sub.color,
              boxShadow: `0 8px 24px ${sub.color}33`,
            }}
          >
            {sub.icon}
          </div>
          <div>
            <h1
              style={{
                color: '#FFFFFF',
                fontSize: '24px',
                fontWeight: 700,
                marginBottom: '4px',
              }}
            >
              {sub.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#9BA3C7', fontSize: '13px' }}>
                {sub.category}
              </span>
              {sub.badge && sub.badge === 'zombie' && (
                <Badge variant="zombie" />
              )}
              {sub.daysUntilRenewal !== null && sub.daysUntilRenewal <= 16 && sub.badge !== 'zombie' && (
                <Badge variant="days" days={sub.daysUntilRenewal} />
              )}
            </div>
          </div>
        </div>

        {/* Price display */}
        <div
          style={{
            borderRadius: '20px',
            background: 'rgba(18, 26, 58, 0.8)',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '20px',
            display: 'grid',
            gridTemplateColumns: '1fr 1px 1fr',
            gap: '0',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                color: '#00D1FF',
                fontSize: '28px',
                fontWeight: 800,
                textShadow: '0 0 20px rgba(0,209,255,0.3)',
              }}
            >
              {sub.price}€
            </div>
            <div style={{ color: '#5B638A', fontSize: '12px', marginTop: '2px' }}>
              par mois
            </div>
          </div>
          <div
            style={{ background: 'rgba(255,255,255,0.06)', width: '1px' }}
          />
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                color: '#9BA3C7',
                fontSize: '28px',
                fontWeight: 800,
              }}
            >
              {yearlyTotal}€
            </div>
            <div style={{ color: '#5B638A', fontSize: '12px', marginTop: '2px' }}>
              par an
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 20px' }}>
        {/* Renewal info */}
        <div
          style={{
            borderRadius: '16px',
            background: 'rgba(18, 26, 58, 0.6)',
            border: '1px solid rgba(255,255,255,0.06)',
            padding: '16px',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'rgba(0, 209, 255, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Calendar size={16} color="#00D1FF" />
          </div>
          <div>
            <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 600 }}>
              Prochain renouvellement
            </div>
            <div style={{ color: '#9BA3C7', fontSize: '12px' }}>
              Le {sub.renewalDate}
              {sub.daysUntilRenewal !== null && (
                <span style={{ color: sub.daysUntilRenewal <= 3 ? '#FF5A5F' : '#FF9F43', marginLeft: '6px', fontWeight: 600 }}>
                  (J-{sub.daysUntilRenewal})
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Last used */}
        {sub.lastUsed && (
          <div
            style={{
              borderRadius: '16px',
              background: isZombie
                ? 'rgba(255, 90, 95, 0.06)'
                : 'rgba(18, 26, 58, 0.6)',
              border: isZombie
                ? '1px solid rgba(255, 90, 95, 0.2)'
                : '1px solid rgba(255,255,255,0.06)',
              padding: '16px',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: isZombie
                  ? 'rgba(255, 90, 95, 0.12)'
                  : 'rgba(46, 213, 115, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Clock size={16} color={isZombie ? '#FF5A5F' : '#2ED573'} />
            </div>
            <div>
              <div
                style={{
                  color: isZombie ? '#FF5A5F' : '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                Dernière utilisation
              </div>
              <div style={{ color: '#9BA3C7', fontSize: '12px' }}>
                {sub.lastUsed}
              </div>
            </div>
          </div>
        )}

        {/* Zombie warning */}
        {isZombie && (
          <div
            style={{
              borderRadius: '16px',
              background: 'rgba(255, 90, 95, 0.08)',
              border: '1px solid rgba(255, 90, 95, 0.3)',
              padding: '16px',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '10px',
              }}
            >
              <AlertTriangle size={18} color="#FF5A5F" />
              <span
                style={{ color: '#FF5A5F', fontSize: '15px', fontWeight: 700 }}
              >
                Abonnement zombie 🧟
              </span>
            </div>
            <p style={{ color: '#9BA3C7', fontSize: '13px', lineHeight: 1.5 }}>
              Tu n'utilises pas ce service mais tu continues à payer{' '}
              <strong style={{ color: '#FF5A5F' }}>{sub.price}€/mois</strong>.
              C'est <strong style={{ color: '#FF5A5F' }}>{yearlyTotal}€</strong>{' '}
              gaspillés par an.
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            onClick={() => navigate(`/resilier/${sub.id}`)}
            style={{
              width: '100%',
              padding: '18px',
              borderRadius: '16px',
              background: isZombie
                ? 'linear-gradient(135deg, #FF5A5F, #FF3B3B)'
                : 'linear-gradient(135deg, #FF5A5F, #FF9F43)',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(255, 90, 95, 0.35)',
              fontFamily: "'Inter', sans-serif",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <Zap size={18} />
            Résilier maintenant
          </button>

          {sub.cancellationUrl && (
            <button
              onClick={() => window.open(sub.cancellationUrl, '_blank')}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '16px',
                background: 'rgba(18, 26, 58, 0.8)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#9BA3C7',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <ExternalLink size={16} />
              Voir le guide
            </button>
          )}
        </div>

        {/* Savings tip */}
        <div
          style={{
            marginTop: '20px',
            borderRadius: '16px',
            background: 'rgba(46, 213, 115, 0.06)',
            border: '1px solid rgba(46, 213, 115, 0.15)',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <TrendingDown size={16} color="#2ED573" />
          <span style={{ color: '#9BA3C7', fontSize: '12px' }}>
            En résiliants, tu économises{' '}
            <strong style={{ color: '#2ED573' }}>{yearlyTotal}€ par an</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
