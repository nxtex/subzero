import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { X, AlertTriangle, Zap, TrendingDown } from 'lucide-react';
import { unusedSubscriptions } from '../data/subscriptions';

export function StartupModal() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const navigate = useNavigate();

  const unusedCount = unusedSubscriptions.length;
  const unusedCost = unusedSubscriptions.reduce((sum, s) => sum + s.price, 0);
  const yearlyCost = unusedCost * 12;

  useEffect(() => {
    if (unusedCount === 0) return;
    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      setClosing(false);
    }, 280);
  };

  const handleResilier = () => {
    close();
    setTimeout(() => navigate('/abonnements'), 320);
  };

  if (!visible || unusedCount === 0) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={close}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(4px)',
          zIndex: 1000,
          animation: closing
            ? 'fadeOut 0.28s ease forwards'
            : 'fadeIn 0.28s ease forwards',
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '430px',
          zIndex: 1001,
          animation: closing
            ? 'slideDown 0.28s cubic-bezier(0.4, 0, 1, 1) forwards'
            : 'slideUp 0.36s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(180deg, #111827 0%, #0F1630 100%)',
            borderRadius: '24px 24px 0 0',
            border: '1px solid rgba(255,255,255,0.08)',
            borderBottom: 'none',
            padding: '24px 20px 36px',
            position: 'relative',
          }}
        >
          {/* Drag handle */}
          <div
            style={{
              width: '36px',
              height: '4px',
              borderRadius: '999px',
              background: 'rgba(255,255,255,0.15)',
              margin: '0 auto 20px',
            }}
          />

          {/* Close button */}
          <button
            onClick={close}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '32px',
              height: '32px',
              borderRadius: '999px',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={16} color="#9BA3C7" />
          </button>

          {/* Icon */}
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '16px',
              background: 'rgba(255, 90, 95, 0.12)',
              border: '1px solid rgba(255, 90, 95, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
            }}
          >
            <AlertTriangle size={24} color="#FF5A5F" />
          </div>

          {/* Title */}
          <div
            style={{
              color: '#FFFFFF',
              fontSize: '20px',
              fontWeight: 700,
              marginBottom: '8px',
              lineHeight: 1.3,
            }}
          >
            {unusedCount} abonnement{unusedCount > 1 ? 's' : ''} non utilisé{unusedCount > 1 ? 's' : ''}
          </div>

          {/* Description */}
          <p
            style={{
              color: '#9BA3C7',
              fontSize: '14px',
              lineHeight: 1.6,
              marginBottom: '20px',
            }}
          >
            Tu paies{' '}
            <strong style={{ color: '#FF5A5F' }}>{unusedCost}€/mois</strong>{' '}
            pour des services que tu n’utilises pas. En résiliant, tu pourrais
            économiser{' '}
            <strong style={{ color: '#2ED573' }}>{yearlyCost}€ par an</strong>.
          </p>

          {/* Subscriptions list */}
          <div
            style={{
              borderRadius: '14px',
              background: 'rgba(18, 26, 58, 0.6)',
              border: '1px solid rgba(255,255,255,0.06)',
              overflow: 'hidden',
              marginBottom: '20px',
            }}
          >
            {unusedSubscriptions.map((s, i) => (
              <div
                key={s.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderBottom:
                    i < unusedSubscriptions.length - 1
                      ? '1px solid rgba(255,255,255,0.05)'
                      : 'none',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: `${s.color}28`,
                    border: `1px solid ${s.color}44`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '15px',
                    fontWeight: 700,
                    color: s.color === '#000000' ? '#fff' : s.color,
                    flexShrink: 0,
                  }}
                >
                  {s.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 600 }}>
                    {s.name}
                  </div>
                  <div style={{ color: '#5B638A', fontSize: '12px' }}>
                    Dernière utilisation : {s.lastUsed ?? 'inconnue'}
                  </div>
                </div>
                <span
                  style={{
                    color: '#FF5A5F',
                    fontSize: '14px',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  -{s.price}€/mois
                </span>
              </div>
            ))}
          </div>

          {/* Savings badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(46, 213, 115, 0.08)',
              border: '1px solid rgba(46, 213, 115, 0.2)',
              borderRadius: '12px',
              padding: '10px 14px',
              marginBottom: '20px',
            }}
          >
            <TrendingDown size={16} color="#2ED573" />
            <span style={{ color: '#2ED573', fontSize: '13px', fontWeight: 600 }}>
              Économie potentielle : {yearlyCost}€/an
            </span>
          </div>

          {/* CTA buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={handleResilier}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #FF5A5F, #FF3B3B)',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '15px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 8px 24px rgba(255, 90, 95, 0.3)',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <Zap size={16} />
              Résilier maintenant
            </button>

            <button
              onClick={close}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '14px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#9BA3C7',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Ignorer pour l’instant
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        @keyframes slideUp {
          from { transform: translateX(-50%) translateY(100%); }
          to   { transform: translateX(-50%) translateY(0); }
        }
        @keyframes slideDown {
          from { transform: translateX(-50%) translateY(0); }
          to   { transform: translateX(-50%) translateY(100%); }
        }
      `}</style>
    </>
  );
}
