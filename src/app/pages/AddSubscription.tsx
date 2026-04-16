import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft,
  Shield,
  ChevronDown,
  Check,
  Link,
} from 'lucide-react';

const categories = [
  'Divertissement',
  'Musique',
  'Sport & Bien-être',
  'E-commerce',
  'Créativité',
  'Productivité',
  'Stockage',
  'Autre',
];

const frequencies = [
  { value: 'monthly', label: 'Mensuel' },
  { value: 'yearly', label: 'Annuel' },
  { value: 'weekly', label: 'Hebdomadaire' },
];

const popularServices = [
  { name: 'Netflix', color: '#E50914', icon: 'N' },
  { name: 'Spotify', color: '#1DB954', icon: 'S' },
  { name: 'Amazon Prime', color: '#FF9900', icon: 'A' },
  { name: 'Disney+', color: '#113CCF', icon: 'D' },
  { name: 'YouTube Premium', color: '#FF0000', icon: 'Y' },
  { name: 'Apple TV+', color: '#555', icon: '🍎' },
  { name: 'Canal+', color: '#000', icon: 'C+' },
  { name: 'Deezer', color: '#A238FF', icon: 'D' },
];

export function AddSubscription() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'choice' | 'manual' | 'auto'>('choice');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [frequency, setFrequency] = useState('monthly');
  const [category, setCategory] = useState('');
  const [renewalDay, setRenewalDay] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => navigate('/abonnements'), 1500);
  };

  const selectPopular = (service: { name: string; color: string; icon: string }) => {
    setName(service.name);
    setMode('manual');
  };

  if (submitted) {
    return (
      <div
        style={{
          padding: '56px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'rgba(0, 209, 255, 0.12)',
            border: '2px solid rgba(0, 209, 255, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            boxShadow: '0 0 30px rgba(0, 209, 255, 0.15)',
          }}
        >
          <Check size={32} color="#00D1FF" strokeWidth={3} />
        </div>
        <h2 style={{ color: '#FFFFFF', fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>
          Abonnement ajouté !
        </h2>
        <p style={{ color: '#9BA3C7', fontSize: '14px' }}>
          Redirection vers ta liste...
        </p>
      </div>
    );
  }

  if (mode === 'choice') {
    return (
      <div style={{ padding: '56px 20px 20px' }}>
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

        <h1
          style={{
            color: '#FFFFFF',
            fontSize: '26px',
            fontWeight: 700,
            marginBottom: '8px',
          }}
        >
          Ajouter un abonnement
        </h1>
        <p style={{ color: '#9BA3C7', fontSize: '14px', marginBottom: '32px' }}>
          Choisis comment tu veux l'ajouter
        </p>

        {/* Manual option */}
        <div
          onClick={() => setMode('manual')}
          style={{
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(0,209,255,0.08), rgba(123,97,255,0.08))',
            border: '1px solid rgba(0, 209, 255, 0.2)',
            padding: '24px',
            marginBottom: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #00D1FF22, #7B61FF22)',
                border: '1px solid rgba(0,209,255,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: '22px' }}>✏️</span>
            </div>
            <div>
              <div style={{ color: '#FFFFFF', fontSize: '17px', fontWeight: 700 }}>
                Saisie manuelle
              </div>
              <div style={{ color: '#9BA3C7', fontSize: '12px' }}>
                Rapide · Recommandé
              </div>
            </div>
          </div>
          <p style={{ color: '#9BA3C7', fontSize: '13px', lineHeight: 1.5 }}>
            Ajoute n'importe quel abonnement en quelques secondes.
            <span
              style={{
                color: '#2ED573',
                fontWeight: 600,
                marginLeft: '4px',
              }}
            >
              Sans connecter ta banque.
            </span>
          </p>
        </div>

        {/* Auto option */}
        <div
          onClick={() => setMode('auto')}
          style={{
            borderRadius: '20px',
            background: 'rgba(18, 26, 58, 0.6)',
            border: '1px solid rgba(255,255,255,0.06)',
            padding: '24px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'rgba(91, 99, 138, 0.2)',
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Link size={20} color="#9BA3C7" />
            </div>
            <div>
              <div style={{ color: '#FFFFFF', fontSize: '17px', fontWeight: 700 }}>
                Connexion bancaire
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '2px',
                }}
              >
                <span
                  style={{
                    background: 'rgba(46, 213, 115, 0.15)',
                    color: '#2ED573',
                    fontSize: '10px',
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: '999px',
                  }}
                >
                  OPTIONNEL
                </span>
              </div>
            </div>
          </div>
          <p style={{ color: '#9BA3C7', fontSize: '13px', lineHeight: 1.5 }}>
            Détection automatique de tes abonnements depuis tes relevés.{' '}
            <strong style={{ color: '#9BA3C7' }}>Optionnel, sécurisé, tu gardes le contrôle.</strong>
          </p>
        </div>

        {/* Popular services */}
        <div style={{ marginTop: '28px' }}>
          <div
            style={{
              color: '#9BA3C7',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '14px',
            }}
          >
            Services populaires
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
            }}
          >
            {popularServices.map((service) => (
              <button
                key={service.name}
                onClick={() => selectPopular(service)}
                style={{
                  padding: '12px 14px',
                  borderRadius: '14px',
                  background: `linear-gradient(135deg, ${service.color}18, ${service.color}08)`,
                  border: `1px solid ${service.color}28`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    background: `${service.color}33`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: service.color === '#000000' ? '#fff' : service.color,
                    flexShrink: 0,
                  }}
                >
                  {service.icon}
                </div>
                <span style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: 500 }}>
                  {service.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'auto') {
    return (
      <div style={{ padding: '56px 20px 20px' }}>
        <button
          onClick={() => setMode('choice')}
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

        <h1 style={{ color: '#FFFFFF', fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>
          Connexion bancaire
        </h1>
        <p style={{ color: '#9BA3C7', fontSize: '14px', marginBottom: '24px' }}>
          Détecte automatiquement tes abonnements
        </p>

        {/* Trust message */}
        <div
          style={{
            borderRadius: '16px',
            background: 'rgba(46, 213, 115, 0.06)',
            border: '1px solid rgba(46, 213, 115, 0.2)',
            padding: '16px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
          }}
        >
          <Shield size={20} color="#2ED573" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ color: '#2ED573', fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>
              Ta confidentialité est protégée
            </div>
            <ul style={{ color: '#9BA3C7', fontSize: '12px', lineHeight: 1.7, paddingLeft: '16px', margin: 0 }}>
              <li>Connexion en lecture seule</li>
              <li>Tes identifiants ne sont jamais stockés</li>
              <li>Tu peux déconnecter à tout moment</li>
              <li>Certifié Open Banking PSD2</li>
            </ul>
          </div>
        </div>

        {/* Banks */}
        {['BNP Paribas', 'Crédit Agricole', 'Société Générale', 'La Banque Postale', 'CIC', 'Boursorama'].map((bank) => (
          <div
            key={bank}
            style={{
              borderRadius: '14px',
              background: 'rgba(18, 26, 58, 0.6)',
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '14px 16px',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(0, 209, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#00D1FF',
                }}
              >
                {bank[0]}
              </div>
              <span style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 500 }}>
                {bank}
              </span>
            </div>
            <Link size={16} color="#5B638A" />
          </div>
        ))}

        <button
          onClick={() => setMode('choice')}
          style={{
            width: '100%',
            marginTop: '16px',
            padding: '16px',
            borderRadius: '14px',
            background: 'none',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#9BA3C7',
            fontSize: '14px',
            cursor: 'pointer',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Je préfère ajouter manuellement
        </button>
      </div>
    );
  }

  // Manual form
  return (
    <div style={{ padding: '56px 20px 20px' }}>
      <button
        onClick={() => setMode('choice')}
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

      <h1 style={{ color: '#FFFFFF', fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>
        Nouvel abonnement
      </h1>
      <p style={{ color: '#9BA3C7', fontSize: '14px', marginBottom: '28px' }}>
        Remplis les informations
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Name */}
        <div>
          <label
            style={{ color: '#9BA3C7', fontSize: '12px', fontWeight: 500, display: 'block', marginBottom: '8px' }}
          >
            NOM DU SERVICE
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Netflix, Spotify..."
            required
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: '14px',
              background: 'rgba(18, 26, 58, 0.8)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#FFFFFF',
              fontSize: '15px',
              outline: 'none',
              boxSizing: 'border-box',
              fontFamily: "'Inter', sans-serif",
            }}
          />
        </div>

        {/* Price */}
        <div>
          <label
            style={{ color: '#9BA3C7', fontSize: '12px', fontWeight: 500, display: 'block', marginBottom: '8px' }}
          >
            PRIX
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
              required
              step="0.01"
              min="0"
              style={{
                width: '100%',
                padding: '14px 40px 14px 16px',
                borderRadius: '14px',
                background: 'rgba(18, 26, 58, 0.8)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#FFFFFF',
                fontSize: '15px',
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: "'Inter', sans-serif",
              }}
            />
            <span
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9BA3C7',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              €
            </span>
          </div>
        </div>

        {/* Frequency */}
        <div>
          <label
            style={{ color: '#9BA3C7', fontSize: '12px', fontWeight: 500, display: 'block', marginBottom: '8px' }}
          >
            FRÉQUENCE
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {frequencies.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setFrequency(f.value)}
                style={{
                  flex: 1,
                  padding: '12px 8px',
                  borderRadius: '12px',
                  background:
                    frequency === f.value
                      ? 'rgba(0, 209, 255, 0.12)'
                      : 'rgba(18, 26, 58, 0.6)',
                  border: `1px solid ${frequency === f.value ? 'rgba(0, 209, 255, 0.35)' : 'rgba(255,255,255,0.06)'}`,
                  color: frequency === f.value ? '#00D1FF' : '#9BA3C7',
                  fontSize: '13px',
                  fontWeight: frequency === f.value ? 600 : 400,
                  cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Renewal day */}
        <div>
          <label
            style={{ color: '#9BA3C7', fontSize: '12px', fontWeight: 500, display: 'block', marginBottom: '8px' }}
          >
            JOUR DE RENOUVELLEMENT
          </label>
          <input
            type="number"
            value={renewalDay}
            onChange={(e) => setRenewalDay(e.target.value)}
            placeholder="Ex: 15 (pour le 15 de chaque mois)"
            min="1"
            max="31"
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: '14px',
              background: 'rgba(18, 26, 58, 0.8)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#FFFFFF',
              fontSize: '15px',
              outline: 'none',
              boxSizing: 'border-box',
              fontFamily: "'Inter', sans-serif",
            }}
          />
        </div>

        {/* Category */}
        <div>
          <label
            style={{ color: '#9BA3C7', fontSize: '12px', fontWeight: 500, display: 'block', marginBottom: '8px' }}
          >
            CATÉGORIE
          </label>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '999px',
                  background:
                    category === cat
                      ? 'rgba(0, 209, 255, 0.12)'
                      : 'rgba(18, 26, 58, 0.6)',
                  border: `1px solid ${category === cat ? 'rgba(0, 209, 255, 0.35)' : 'rgba(255,255,255,0.06)'}`,
                  color: category === cat ? '#00D1FF' : '#9BA3C7',
                  fontSize: '12px',
                  fontWeight: category === cat ? 600 : 400,
                  cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Trust note */}
        <div
          style={{
            borderRadius: '12px',
            background: 'rgba(46, 213, 115, 0.06)',
            border: '1px solid rgba(46, 213, 115, 0.15)',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Shield size={14} color="#2ED573" />
          <span style={{ color: '#9BA3C7', fontSize: '12px' }}>
            Sans connexion bancaire · Tes données restent sur ton appareil
          </span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '18px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #00D1FF, #7B61FF)',
            border: 'none',
            color: '#070B1A',
            fontSize: '16px',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: "'Inter', sans-serif",
            boxShadow: '0 8px 24px rgba(0, 209, 255, 0.25)',
          }}
        >
          Ajouter l'abonnement
        </button>
      </form>
    </div>
  );
}
