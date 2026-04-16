import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  AlertTriangle,
  ChevronRight,
  Bell,
  Shield,
  Zap,
  TrendingUp,
} from 'lucide-react';
import {
  subscriptions,
  estimatedMonthly,
  realMonthly,
  upcomingRenewals,
  zombieSubscriptions,
} from '../data/subscriptions';
import { SubscriptionItem } from '../components/SubscriptionItem';

export function Dashboard() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(true);

  const displayedSubs = subscriptions.slice(0, 5);

  return (
    <div style={{ padding: '0 0 16px' }}>
      {/* Header */}
      <div
        style={{
          padding: '56px 20px 20px',
          background:
            'linear-gradient(180deg, rgba(15,22,48,0.95) 0%, transparent 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '12px',
                color: '#5B638A',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}
            >
              Bonjour 👋
            </div>
            <div
              style={{
                fontSize: '22px',
                fontWeight: 700,
                color: '#FFFFFF',
              }}
            >
              SubZero
            </div>
          </div>
          <button
            onClick={() => navigate('/alertes')}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'rgba(18, 26, 58, 0.8)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
            }}
          >
            <Bell size={18} color="#9BA3C7" />
            <div
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#FF5A5F',
                border: '1.5px solid #070B1A',
              }}
            />
          </button>
        </div>

        {/* MAIN CARD - Total mensuel */}
        <div
          style={{
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #1B2559 0%, #0F1630 100%)',
            border: '1px solid rgba(0, 209, 255, 0.15)',
            padding: '24px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
            marginBottom: '16px',
          }}
        >
          {/* Glow effect */}
          <div
            style={{
              position: 'absolute',
              top: '-40px',
              right: '-40px',
              width: '180px',
              height: '180px',
              background:
                'radial-gradient(circle, rgba(0,209,255,0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              fontSize: '12px',
              color: '#9BA3C7',
              fontWeight: 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}
          >
            Ce que tu paies vraiment
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
            <span
              style={{
                fontSize: '48px',
                fontWeight: 800,
                color: '#00D1FF',
                lineHeight: 1,
                textShadow: '0 0 30px rgba(0,209,255,0.4)',
              }}
            >
              {realMonthly}€
            </span>
            <span style={{ color: '#5B638A', fontSize: '14px' }}>/mois</span>
          </div>

          <div
            style={{
              color: '#9BA3C7',
              fontSize: '13px',
              marginBottom: '20px',
            }}
          >
            {subscriptions.length} abonnements actifs
          </div>

          {/* Divider */}
          <div
            style={{
              height: '1px',
              background: 'rgba(255,255,255,0.06)',
              marginBottom: '16px',
            }}
          />

          {/* Alert box */}
          {showAlert && (
            <div
              style={{
                background: 'rgba(255, 90, 95, 0.1)',
                border: '1px solid rgba(255, 90, 95, 0.25)',
                borderRadius: '12px',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <AlertTriangle size={16} color="#FF5A5F" />
              <span
                style={{
                  color: '#FF5A5F',
                  fontSize: '13px',
                  fontWeight: 500,
                  flex: 1,
                }}
              >
                Tu estimais payer {estimatedMonthly}€ — tu payes le double !
              </span>
            </div>
          )}

          {/* Progress bar comparison */}
          <div style={{ marginTop: '16px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px',
              }}
            >
              <span style={{ color: '#9BA3C7', fontSize: '12px' }}>
                Ton estimation
              </span>
              <span style={{ color: '#9BA3C7', fontSize: '12px' }}>
                Réalité
              </span>
            </div>
            <div
              style={{
                height: '6px',
                borderRadius: '999px',
                background: 'rgba(255,255,255,0.08)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: `${(estimatedMonthly / realMonthly) * 100}%`,
                  background:
                    'linear-gradient(90deg, #9BA3C7, rgba(155,163,199,0.6))',
                  borderRadius: '999px',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: '100%',
                  background: 'linear-gradient(90deg, #00D1FF, #7B61FF)',
                  borderRadius: '999px',
                  opacity: 0.7,
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '6px',
              }}
            >
              <span
                style={{
                  color: '#5B638A',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                {estimatedMonthly}€
              </span>
              <span
                style={{
                  color: '#00D1FF',
                  fontSize: '12px',
                  fontWeight: 700,
                }}
              >
                {realMonthly}€ réels
              </span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 20px' }}>
        {/* Quick Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            marginBottom: '16px',
          }}
        >
          {/* Renewals Alert */}
          <div
            onClick={() => navigate('/alertes')}
            style={{
              borderRadius: '16px',
              background: 'rgba(255, 159, 67, 0.08)',
              border: '1px solid rgba(255, 159, 67, 0.25)',
              padding: '16px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                background: 'rgba(255, 159, 67, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '10px',
              }}
            >
              <Bell size={16} color="#FF9F43" />
            </div>
            <div
              style={{
                color: '#FF9F43',
                fontSize: '22px',
                fontWeight: 800,
                lineHeight: 1,
                marginBottom: '4px',
              }}
            >
              {upcomingRenewals.length}
            </div>
            <div style={{ color: '#9BA3C7', fontSize: '12px' }}>
              Renouvellements
            </div>
            <div style={{ color: '#5B638A', fontSize: '11px' }}>cette semaine</div>
          </div>

          {/* Zombies Alert */}
          <div
            onClick={() => navigate('/abonnements')}
            style={{
              borderRadius: '16px',
              background: 'rgba(255, 90, 95, 0.08)',
              border: '1px solid rgba(255, 90, 95, 0.25)',
              padding: '16px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                background: 'rgba(255, 90, 95, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '10px',
              }}
            >
              <Zap size={16} color="#FF5A5F" />
            </div>
            <div
              style={{
                color: '#FF5A5F',
                fontSize: '22px',
                fontWeight: 800,
                lineHeight: 1,
                marginBottom: '4px',
              }}
            >
              {zombieSubscriptions.length}
            </div>
            <div style={{ color: '#9BA3C7', fontSize: '12px' }}>
              Abonnements
            </div>
            <div style={{ color: '#5B638A', fontSize: '11px' }}>zombies 🧟</div>
          </div>
        </div>

        {/* Renewal Banner */}
        {upcomingRenewals.length > 0 && (
          <div
            onClick={() => navigate('/alertes')}
            style={{
              borderRadius: '16px',
              background: 'rgba(255, 159, 67, 0.08)',
              border: '1px solid rgba(255, 159, 67, 0.2)',
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              marginBottom: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '18px' }}>⚡</span>
              <div>
                <div
                  style={{
                    color: '#FF9F43',
                    fontSize: '14px',
                    fontWeight: 600,
                  }}
                >
                  {upcomingRenewals.length} renouvellement
                  {upcomingRenewals.length > 1 ? 's' : ''} à venir
                </div>
                <div style={{ color: '#5B638A', fontSize: '12px' }}>
                  Dans les 7 prochains jours
                </div>
              </div>
            </div>
            <ChevronRight size={18} color="#FF9F43" />
          </div>
        )}

        {/* Subscriptions List */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          <span
            style={{
              color: '#9BA3C7',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Mes abonnements
          </span>
          <button
            onClick={() => navigate('/abonnements')}
            style={{
              background: 'none',
              border: 'none',
              color: '#00D1FF',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            Tout voir <ChevronRight size={14} />
          </button>
        </div>

        {displayedSubs.map((sub) => (
          <SubscriptionItem key={sub.id} subscription={sub} showBackground />
        ))}

        {/* Trust Banner */}
        <div
          style={{
            marginTop: '24px',
            borderRadius: '16px',
            background: 'rgba(18, 26, 58, 0.6)',
            border: '1px solid rgba(255,255,255,0.06)',
            padding: '16px',
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
              background: 'rgba(46, 213, 115, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Shield size={16} color="#2ED573" />
          </div>
          <div>
            <div style={{ color: '#2ED573', fontSize: '13px', fontWeight: 600 }}>
              Tes données restent privées
            </div>
            <div style={{ color: '#5B638A', fontSize: '12px' }}>
              Connexion bancaire 100% optionnelle
            </div>
          </div>
        </div>

        {/* Savings insight */}
        <div
          onClick={() => navigate('/connexions')}
          style={{
            marginTop: '12px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(0,209,255,0.08), rgba(123,97,255,0.08))',
            border: '1px solid rgba(0, 209, 255, 0.15)',
            padding: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <TrendingUp size={18} color="#00D1FF" />
            <div>
              <div style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: 600 }}>
                Détection automatique
              </div>
              <div style={{ color: '#5B638A', fontSize: '12px' }}>
                Connecter mes services
              </div>
            </div>
          </div>
          <ChevronRight size={16} color="#00D1FF" />
        </div>
      </div>
    </div>
  );
}
