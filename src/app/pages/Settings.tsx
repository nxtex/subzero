import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Shield,
  Bell,
  Database,
  Link,
  HelpCircle,
  ChevronRight,
  Moon,
  Trash2,
  LogOut,
} from 'lucide-react';

interface SettingItemProps {
  icon: React.ReactNode;
  label: string;
  description?: string;
  onClick?: () => void;
  right?: React.ReactNode;
  danger?: boolean;
}

function SettingItem({ icon, label, description, onClick, right, danger }: SettingItemProps) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '16px',
        cursor: onClick ? 'pointer' : 'default',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        transition: 'background 0.15s ease',
      }}
    >
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          background: danger
            ? 'rgba(255, 90, 95, 0.1)'
            : 'rgba(18, 26, 58, 0.8)',
          border: `1px solid ${danger ? 'rgba(255,90,95,0.2)' : 'rgba(255,255,255,0.06)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            color: danger ? '#FF5A5F' : '#FFFFFF',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          {label}
        </div>
        {description && (
          <div style={{ color: '#5B638A', fontSize: '12px', marginTop: '1px' }}>
            {description}
          </div>
        )}
      </div>
      {right || (onClick && !danger && <ChevronRight size={16} color="#5B638A" />)}
    </div>
  );
}

export function Settings() {
  const navigate = useNavigate();
  const [currency, setCurrency] = useState('EUR (€)');

  return (
    <div style={{ padding: '56px 0 20px' }}>
      {/* Header */}
      <div style={{ padding: '0 20px 24px' }}>
        <h1 style={{ color: '#FFFFFF', fontSize: '26px', fontWeight: 700, marginBottom: '4px' }}>
          Paramètres
        </h1>
        <p style={{ color: '#9BA3C7', fontSize: '14px' }}>
          Gérer ton compte SubZero
        </p>
      </div>

      {/* Profile card */}
      <div
        style={{
          margin: '0 20px 24px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, rgba(0,209,255,0.08), rgba(123,97,255,0.08))',
          border: '1px solid rgba(0, 209, 255, 0.15)',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00D1FF, #7B61FF)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            fontWeight: 700,
            color: '#070B1A',
            flexShrink: 0,
          }}
        >
          A
        </div>
        <div>
          <div style={{ color: '#FFFFFF', fontSize: '17px', fontWeight: 700 }}>
            Alex Dubois
          </div>
          <div style={{ color: '#9BA3C7', fontSize: '13px' }}>
            9 abonnements · 113€/mois
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div style={{ margin: '0 20px 12px' }}>
        <div
          style={{
            color: '#5B638A',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '0 0 8px 4px',
          }}
        >
          Notifications
        </div>
        <div
          style={{
            borderRadius: '16px',
            background: 'rgba(18, 26, 58, 0.6)',
            border: '1px solid rgba(255,255,255,0.06)',
            overflow: 'hidden',
          }}
        >
          <SettingItem
            icon={<Bell size={16} color="#00D1FF" />}
            label="Notifications push"
            description="J-30, J-7, J-1 avant renouvellement"
            right={
              <div
                style={{
                  width: '44px',
                  height: '24px',
                  borderRadius: '12px',
                  background: '#00D1FF',
                  position: 'relative',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: '#fff',
                  }}
                />
              </div>
            }
          />
          <SettingItem
            icon={<Bell size={16} color="#9BA3C7" />}
            label="Alertes zombies"
            description="Après 14 jours d'inactivité"
            right={
              <div
                style={{
                  width: '44px',
                  height: '24px',
                  borderRadius: '12px',
                  background: '#00D1FF',
                  position: 'relative',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: '#fff',
                  }}
                />
              </div>
            }
          />
        </div>
      </div>

      {/* Sécurité & Données */}
      <div style={{ margin: '0 20px 12px' }}>
        <div
          style={{
            color: '#5B638A',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '0 0 8px 4px',
          }}
        >
          Sécurité & Données
        </div>
        <div
          style={{
            borderRadius: '16px',
            background: 'rgba(18, 26, 58, 0.6)',
            border: '1px solid rgba(255,255,255,0.06)',
            overflow: 'hidden',
          }}
        >
          <SettingItem
            icon={<Shield size={16} color="#2ED573" />}
            label="Confidentialité"
            description="Tes données ne quittent pas ton appareil"
          />
          <SettingItem
            icon={<Database size={16} color="#9BA3C7" />}
            label="Exporter mes données"
            description="Format CSV ou JSON"
          />
          <SettingItem
            icon={<Link size={16} color="#9BA3C7" />}
            label="Connexions bancaires"
            description="Gérer les accès Open Banking"
            onClick={() => navigate('/connexions')}
          />
        </div>
      </div>

      {/* App */}
      <div style={{ margin: '0 20px 12px' }}>
        <div
          style={{
            color: '#5B638A',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '0 0 8px 4px',
          }}
        >
          Application
        </div>
        <div
          style={{
            borderRadius: '16px',
            background: 'rgba(18, 26, 58, 0.6)',
            border: '1px solid rgba(255,255,255,0.06)',
            overflow: 'hidden',
          }}
        >
          <SettingItem
            icon={<Moon size={16} color="#9BA3C7" />}
            label="Thème"
            description="Dark mode (par défaut)"
          />
          <SettingItem
            icon={<span style={{ color: '#9BA3C7', fontSize: '13px', fontWeight: 600 }}>€</span>}
            label="Devise"
            description={currency}
          />
          <SettingItem
            icon={<HelpCircle size={16} color="#9BA3C7" />}
            label="Aide & Support"
            description="FAQ, contact, tutoriels"
          />
        </div>
      </div>

      {/* Danger zone */}
      <div style={{ margin: '0 20px 24px' }}>
        <div
          style={{
            borderRadius: '16px',
            background: 'rgba(255, 90, 95, 0.04)',
            border: '1px solid rgba(255, 90, 95, 0.1)',
            overflow: 'hidden',
          }}
        >
          <SettingItem
            icon={<Trash2 size={16} color="#FF5A5F" />}
            label="Supprimer mes données"
            description="Action irréversible"
            danger
          />
        </div>
      </div>

      {/* Version */}
      <div
        style={{
          textAlign: 'center',
          padding: '0 20px',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(0, 209, 255, 0.06)',
            border: '1px solid rgba(0, 209, 255, 0.1)',
            borderRadius: '999px',
            padding: '6px 16px',
          }}
        >
          <span style={{ color: '#00D1FF', fontSize: '13px', fontWeight: 700 }}>
            SubZero
          </span>
          <span style={{ color: '#5B638A', fontSize: '12px' }}>v1.0.0</span>
        </div>
        <div style={{ color: '#5B638A', fontSize: '11px', marginTop: '8px' }}>
          Tes données · Ta liberté
        </div>
      </div>
    </div>
  );
}
