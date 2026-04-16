import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import { LayoutDashboard, List, Plus, Bell, Settings } from 'lucide-react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Accueil' },
  { path: '/abonnements', icon: List, label: 'Mes abos' },
  { path: '/ajouter', icon: Plus, label: 'Ajouter', isMain: true },
  { path: '/alertes', icon: Bell, label: 'Alertes' },
  { path: '/parametres', icon: Settings, label: 'Réglages' },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '430px',
        background: 'rgba(7, 11, 26, 0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 'env(safe-area-inset-bottom, 8px)',
        paddingTop: '10px',
        paddingLeft: '8px',
        paddingRight: '8px',
        zIndex: 100,
      }}
    >
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;

        if (item.isMain) {
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #00D1FF, #7B61FF)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(0, 209, 255, 0.35)',
                transition: 'transform 0.15s ease',
                marginTop: '-20px',
              }}
              onTouchStart={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform =
                  'scale(0.92)';
              }}
              onTouchEnd={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform =
                  'scale(1)';
              }}
            >
              <Icon size={22} color="#fff" strokeWidth={2.5} />
            </button>
          );
        }

        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 0',
              transition: 'all 0.2s ease',
            }}
          >
            <Icon
              size={20}
              color={isActive ? '#00D1FF' : '#5B638A'}
              strokeWidth={isActive ? 2.5 : 2}
            />
            <span
              style={{
                fontSize: '10px',
                fontWeight: 500,
                color: isActive ? '#00D1FF' : '#5B638A',
              }}
            >
              {item.label}
            </span>
            {isActive && (
              <div
                style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: '#00D1FF',
                  boxShadow: '0 0 6px #00D1FF',
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
