import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ChevronRight, Eye, Bell, Zap, TrendingDown } from 'lucide-react';

const STORAGE_KEY = 'subzero_onboarding_done';

const slides = [
  {
    icon: '💸',
    color: '#00D1FF',
    colorDim: 'rgba(0,209,255,0.12)',
    colorBorder: 'rgba(0,209,255,0.25)',
    title: 'Tu paies plus que tu ne crois',
    description:
      'La plupart des gens sous-estiment leurs abonnements de 40\u00a0%. SubZero te montre exactement ce que tu d\u00e9penses chaque mois.',
    stat: '+40%',
    statLabel: 'de d\u00e9penses sous-estim\u00e9es en moyenne',
  },
  {
    icon: null,
    lucide: Eye,
    color: '#7B61FF',
    colorDim: 'rgba(123,97,255,0.12)',
    colorBorder: 'rgba(123,97,255,0.25)',
    title: 'Visualise tous tes abonnements',
    description:
      'Centralise Netflix, Spotify, salle de sport et tous tes autres abonnements en un seul endroit. Fini les surprises sur ton relev\u00e9 de compte.',
    stat: '9+',
    statLabel: 'cat\u00e9gories d\u2019abonnements support\u00e9es',
  },
  {
    icon: null,
    lucide: Bell,
    color: '#FF9F43',
    colorDim: 'rgba(255,159,67,0.12)',
    colorBorder: 'rgba(255,159,67,0.25)',
    title: 'Anticipe tes renouvellements',
    description:
      'Re\u00e7ois des alertes avant chaque pr\u00e9l\u00e8vement. Tu d\u00e9cides de garder ou de r\u00e9silier avant d\u2019\u00eatre d\u00e9bit\u00e9.',
    stat: '7j',
    statLabel: 'avant le renouvellement, tu es alert\u00e9',
  },
  {
    icon: null,
    lucide: Zap,
    color: '#2ED573',
    colorDim: 'rgba(46,213,115,0.12)',
    colorBorder: 'rgba(46,213,115,0.25)',
    title: 'R\u00e9silie en 2 minutes',
    description:
      'SubZero d\u00e9tecte tes abonnements non utilis\u00e9s et t\u2019explique pas \u00e0 pas comment les r\u00e9silier. Simple, rapide, efficace.',
    stat: '2min',
    statLabel: 'pour r\u00e9silier n\u2019importe quel abonnement',
  },
];

export function Onboarding({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const touchStartX = useRef<number | null>(null);

  const current = slides[step];
  const isLast = step === slides.length - 1;

  const goTo = (next: number, dir: 'forward' | 'back' = 'forward') => {
    setDirection(dir);
    setExiting(true);
    setTimeout(() => {
      setStep(next);
      setExiting(false);
    }, 220);
  };

  const next = () => {
    if (isLast) { finish(); return; }
    goTo(step + 1, 'forward');
  };

  const prev = () => {
    if (step === 0) return;
    goTo(step - 1, 'back');
  };

  const finish = () => {
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch {}
    onDone();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) next();
    else if (diff < -50) prev();
    touchStartX.current = null;
  };

  const LucideIcon = current.lucide ?? null;

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: 'linear-gradient(180deg, #070B1A 0%, #0F1630 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '60px 24px 48px',
        fontFamily: "'Inter', sans-serif",
        overflow: 'hidden',
      }}
    >
      {/* Skip */}
      {!isLast && (
        <button
          onClick={finish}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '999px',
            padding: '6px 14px',
            color: '#5B638A',
            fontSize: '13px',
            cursor: 'pointer',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Passer
        </button>
      )}

      {/* Logo */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
        <div style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.5px' }}>
          Sub<span style={{ color: '#00D1FF' }}>Zero</span>
        </div>
      </div>

      {/* Slide content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '360px',
          animation: exiting
            ? `slideOut${direction === 'forward' ? 'Left' : 'Right'} 0.22s ease forwards`
            : `slideIn${direction === 'forward' ? 'Right' : 'Left'} 0.28s cubic-bezier(0.16,1,0.3,1) forwards`,
        }}
      >
        {/* Big icon */}
        <div
          style={{
            width: '96px',
            height: '96px',
            borderRadius: '28px',
            background: current.colorDim,
            border: `1.5px solid ${current.colorBorder}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '32px',
            boxShadow: `0 20px 60px ${current.colorDim}`,
          }}
        >
          {current.icon
            ? <span style={{ fontSize: '42px' }}>{current.icon}</span>
            : LucideIcon && <LucideIcon size={40} color={current.color} />
          }
        </div>

        {/* Stat badge */}
        <div
          style={{
            background: current.colorDim,
            border: `1px solid ${current.colorBorder}`,
            borderRadius: '999px',
            padding: '4px 16px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span style={{ color: current.color, fontSize: '15px', fontWeight: 800 }}>
            {current.stat}
          </span>
          <span style={{ color: '#5B638A', fontSize: '12px' }}>
            {current.statLabel}
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            color: '#FFFFFF',
            fontSize: '26px',
            fontWeight: 800,
            textAlign: 'center',
            lineHeight: 1.2,
            marginBottom: '16px',
            letterSpacing: '-0.3px',
          }}
        >
          {current.title}
        </h1>

        {/* Description */}
        <p
          style={{
            color: '#9BA3C7',
            fontSize: '15px',
            textAlign: 'center',
            lineHeight: 1.65,
            maxWidth: '300px',
          }}
        >
          {current.description}
        </p>
      </div>

      {/* Bottom controls */}
      <div style={{ width: '100%', maxWidth: '360px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>

        {/* Dots */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > step ? 'forward' : 'back')}
              style={{
                width: i === step ? '24px' : '6px',
                height: '6px',
                borderRadius: '999px',
                background: i === step ? current.color : 'rgba(255,255,255,0.15)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* Next / Start button */}
        <button
          onClick={next}
          style={{
            width: '100%',
            padding: '17px',
            borderRadius: '16px',
            background: isLast
              ? 'linear-gradient(135deg, #00D1FF, #7B61FF)'
              : `linear-gradient(135deg, ${current.color}cc, ${current.color})`,
            border: 'none',
            color: '#FFFFFF',
            fontSize: '16px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: isLast
              ? '0 8px 32px rgba(0,209,255,0.35)'
              : `0 8px 24px ${current.colorDim}`,
            fontFamily: "'Inter', sans-serif",
            transition: 'all 0.2s',
          }}
        >
          {isLast ? (
            <><TrendingDown size={18} /> Commencer \u00e0 \u00e9conomiser</>
          ) : (
            <>Suivant <ChevronRight size={18} /></>
          )}
        </button>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOutLeft {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(-30px); }
        }
        @keyframes slideOutRight {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(30px); }
        }
      `}</style>
    </div>
  );
}
