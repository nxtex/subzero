import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Check, Link, Unlink, Shield, Zap, RefreshCw } from 'lucide-react';

interface ServiceConnection {
  id: string;
  name: string;
  icon: string;
  color: string;
  connected: boolean;
  type: 'streaming' | 'bank' | 'app';
  description: string;
  detectedSubs?: number;
}

const initialConnections: ServiceConnection[] = [
  {
    id: 'netflix',
    name: 'Netflix',
    icon: 'N',
    color: '#E50914',
    connected: true,
    type: 'streaming',
    description: 'Streaming vidéo',
    detectedSubs: 1,
  },
  {
    id: 'spotify',
    name: 'Spotify',
    icon: 'S',
    color: '#1DB954',
    connected: true,
    type: 'streaming',
    description: 'Streaming musical',
    detectedSubs: 1,
  },
  {
    id: 'amazon',
    name: 'Amazon',
    icon: 'A',
    color: '#FF9900',
    connected: false,
    type: 'app',
    description: 'Prime, Music, etc.',
  },
  {
    id: 'apple',
    name: 'Apple',
    icon: '🍎',
    color: '#555',
    connected: false,
    type: 'app',
    description: 'iCloud, TV+, Music...',
  },
  {
    id: 'google',
    name: 'Google',
    icon: 'G',
    color: '#4285F4',
    connected: false,
    type: 'app',
    description: 'One, YouTube, Drive...',
  },
];

const bankConnections: ServiceConnection[] = [
  {
    id: 'bnp',
    name: 'BNP Paribas',
    icon: 'B',
    color: '#009E4F',
    connected: false,
    type: 'bank',
    description: 'Open Banking PSD2',
  },
  {
    id: 'ca',
    name: 'Crédit Agricole',
    icon: 'CA',
    color: '#10B400',
    connected: false,
    type: 'bank',
    description: 'Open Banking PSD2',
  },
  {
    id: 'sg',
    name: 'Société Générale',
    icon: 'SG',
    color: '#E60028',
    connected: false,
    type: 'bank',
    description: 'Open Banking PSD2',
  },
  {
    id: 'boursorama',
    name: 'Boursorama',
    icon: 'BW',
    color: '#00AEEF',
    connected: false,
    type: 'bank',
    description: 'Open Banking PSD2',
  },
];

export function Connections() {
  const navigate = useNavigate();
  const [services, setServices] = useState(initialConnections);
  const [banks, setBanks] = useState(bankConnections);
  const [syncing, setSyncing] = useState<string | null>(null);

  const toggleService = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, connected: !s.connected } : s))
    );
  };

  const toggleBank = (id: string) => {
    setBanks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, connected: !b.connected } : b))
    );
  };

  const handleSync = (id: string) => {
    setSyncing(id);
    setTimeout(() => setSyncing(null), 2000);
  };

  const connectedCount =
    services.filter((s) => s.connected).length +
    banks.filter((b) => b.connected).length;

  const ConnectionCard = ({
    conn,
    onToggle,
    isBank = false,
  }: {
    conn: ServiceConnection;
    onToggle: (id: string) => void;
    isBank?: boolean;
  }) => (
    <div
      style={{
        borderRadius: '16px',
        background: conn.connected
          ? 'rgba(46, 213, 115, 0.05)'
          : 'rgba(18, 26, 58, 0.6)',
        border: conn.connected
          ? '1px solid rgba(46, 213, 115, 0.2)'
          : '1px solid rgba(255,255,255,0.06)',
        padding: '16px',
        marginBottom: '8px',
        transition: 'all 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Icon */}
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: `${conn.color}28`,
            border: `1px solid ${conn.color}44`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: conn.icon.length > 1 ? '12px' : '18px',
            fontWeight: 700,
            color: conn.color === '#555' ? '#aaa' : conn.color,
            flexShrink: 0,
          }}
        >
          {conn.icon}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
            <span style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 600 }}>
              {conn.name}
            </span>
            {conn.connected && (
              <span
                style={{
                  background: 'rgba(46, 213, 115, 0.15)',
                  color: '#2ED573',
                  fontSize: '10px',
                  fontWeight: 600,
                  padding: '2px 7px',
                  borderRadius: '999px',
                }}
              >
                CONNECTÉ
              </span>
            )}
          </div>
          <div style={{ color: '#5B638A', fontSize: '12px' }}>
            {conn.connected && conn.detectedSubs
              ? `${conn.detectedSubs} abonnement${conn.detectedSubs > 1 ? 's' : ''} détecté${conn.detectedSubs > 1 ? 's' : ''}`
              : conn.description}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
          {conn.connected && (
            <button
              onClick={() => handleSync(conn.id)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                background: 'rgba(0, 209, 255, 0.1)',
                border: '1px solid rgba(0, 209, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <RefreshCw
                size={13}
                color="#00D1FF"
                style={{
                  animation: syncing === conn.id ? 'spin 1s linear infinite' : 'none',
                }}
              />
            </button>
          )}
          <button
            onClick={() => onToggle(conn.id)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              background: conn.connected
                ? 'rgba(255, 90, 95, 0.1)'
                : 'rgba(0, 209, 255, 0.1)',
              border: `1px solid ${conn.connected ? 'rgba(255, 90, 95, 0.25)' : 'rgba(0, 209, 255, 0.25)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            {conn.connected ? (
              <Unlink size={13} color="#FF5A5F" />
            ) : (
              <Link size={13} color="#00D1FF" />
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ padding: '0 0 20px' }}>
      {/* Header */}
      <div
        style={{
          padding: '56px 20px 24px',
          background: 'linear-gradient(180deg, rgba(15,22,48,0.98) 0%, transparent 100%)',
        }}
      >
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
            marginBottom: '20px',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <ArrowLeft size={16} />
          Retour
        </button>

        <h1 style={{ color: '#FFFFFF', fontSize: '26px', fontWeight: 700, marginBottom: '4px' }}>
          Connexions
        </h1>
        <p style={{ color: '#9BA3C7', fontSize: '14px' }}>
          {connectedCount} service{connectedCount > 1 ? 's' : ''} connecté{connectedCount > 1 ? 's' : ''}
        </p>
      </div>

      <div style={{ padding: '0 20px' }}>
        {/* Trust banner */}
        <div
          style={{
            borderRadius: '16px',
            background: 'rgba(46, 213, 115, 0.06)',
            border: '1px solid rgba(46, 213, 115, 0.2)',
            padding: '14px 16px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <Shield size={18} color="#2ED573" style={{ flexShrink: 0 }} />
          <div>
            <div style={{ color: '#2ED573', fontSize: '13px', fontWeight: 600 }}>
              Connexion sécurisée · Optionnelle
            </div>
            <div style={{ color: '#5B638A', fontSize: '12px' }}>
              Lecture seule · Tes identifiants ne sont jamais stockés
            </div>
          </div>
        </div>

        {/* Services streaming */}
        <div style={{ marginBottom: '24px' }}>
          <div
            style={{
              color: '#9BA3C7',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Zap size={12} color="#9BA3C7" />
            Services connectés
          </div>
          {services.map((conn) => (
            <ConnectionCard key={conn.id} conn={conn} onToggle={toggleService} />
          ))}
        </div>

        {/* Banks */}
        <div style={{ marginBottom: '24px' }}>
          <div
            style={{
              color: '#9BA3C7',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}
          >
            Banques (Open Banking)
          </div>
          <div
            style={{
              borderRadius: '12px',
              background: 'rgba(255, 159, 67, 0.06)',
              border: '1px solid rgba(255, 159, 67, 0.15)',
              padding: '10px 14px',
              marginBottom: '12px',
              fontSize: '12px',
              color: '#9BA3C7',
              lineHeight: 1.5,
            }}
          >
            💡 En connectant ta banque, SubZero peut détecter automatiquement tes abonnements depuis tes relevés. Tu gardes le contrôle total.
          </div>
          {banks.map((conn) => (
            <ConnectionCard key={conn.id} conn={conn} onToggle={toggleBank} isBank />
          ))}
        </div>

        {/* Add more */}
        <button
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '16px',
            background: 'rgba(0, 209, 255, 0.06)',
            border: '1px dashed rgba(0, 209, 255, 0.25)',
            color: '#00D1FF',
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
          + Ajouter une connexion
        </button>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
