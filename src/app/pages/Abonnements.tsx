import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, Filter } from 'lucide-react';
import { subscriptions, realMonthly } from '../data/subscriptions';
import { SubscriptionItem } from '../components/SubscriptionItem';

const categories = ['Tous', 'Zombie', 'Actif', 'Divertissement', 'Musique', 'Sport & Bien-être'];

export function Abonnements() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('Tous');
  const navigate = useNavigate();

  const filtered = subscriptions.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    if (activeFilter === 'Zombie') return matchSearch && s.badge === 'zombie';
    if (activeFilter === 'Actif') return matchSearch && s.badge !== 'zombie';
    if (activeFilter !== 'Tous') return matchSearch && s.category === activeFilter;
    return matchSearch;
  });

  const zombieCount = subscriptions.filter((s) => s.badge === 'zombie').length;
  const zombieCost = subscriptions
    .filter((s) => s.badge === 'zombie')
    .reduce((sum, s) => sum + s.price, 0);

  return (
    <div style={{ padding: '56px 20px 16px' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1
          style={{
            color: '#FFFFFF',
            fontSize: '26px',
            fontWeight: 700,
            marginBottom: '4px',
          }}
        >
          Mes abonnements
        </h1>
        <p style={{ color: '#9BA3C7', fontSize: '14px' }}>
          {subscriptions.length} actifs · {realMonthly}€/mois
        </p>
      </div>

      {/* Search bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'rgba(18, 26, 58, 0.8)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '14px',
          padding: '12px 16px',
          marginBottom: '16px',
        }}
      >
        <Search size={16} color="#5B638A" />
        <input
          placeholder="Rechercher un abonnement..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            background: 'none',
            border: 'none',
            outline: 'none',
            color: '#FFFFFF',
            fontSize: '14px',
            flex: 1,
            fontFamily: "'Inter', sans-serif",
          }}
        />
      </div>

      {/* Filters */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          marginBottom: '20px',
          paddingBottom: '4px',
          scrollbarWidth: 'none',
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            style={{
              padding: '8px 14px',
              borderRadius: '999px',
              border: `1px solid ${activeFilter === cat ? '#00D1FF' : 'rgba(255,255,255,0.08)'}`,
              background:
                activeFilter === cat
                  ? 'rgba(0, 209, 255, 0.12)'
                  : 'rgba(18, 26, 58, 0.6)',
              color: activeFilter === cat ? '#00D1FF' : '#9BA3C7',
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Zombie warning banner */}
      {activeFilter !== 'Zombie' && zombieCount > 0 && (
        <div
          onClick={() => setActiveFilter('Zombie')}
          style={{
            borderRadius: '14px',
            background: 'rgba(255, 90, 95, 0.08)',
            border: '1px solid rgba(255, 90, 95, 0.25)',
            padding: '14px 16px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: '20px' }}>🧟</span>
          <div>
            <div style={{ color: '#FF5A5F', fontSize: '14px', fontWeight: 600 }}>
              {zombieCount} abonnement{zombieCount > 1 ? 's' : ''} zombie détecté{zombieCount > 1 ? 's' : ''}
            </div>
            <div style={{ color: '#9BA3C7', fontSize: '12px' }}>
              Tu dépenses {zombieCost}€/mois sans les utiliser
            </div>
          </div>
        </div>
      )}

      {/* List */}
      {filtered.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: '#5B638A',
          }}
        >
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔍</div>
          <div style={{ fontSize: '15px' }}>Aucun abonnement trouvé</div>
        </div>
      ) : (
        filtered.map((sub) => (
          <SubscriptionItem key={sub.id} subscription={sub} showBackground />
        ))
      )}

      {/* Add button */}
      <button
        onClick={() => navigate('/ajouter')}
        style={{
          width: '100%',
          padding: '16px',
          borderRadius: '16px',
          background: 'rgba(0, 209, 255, 0.08)',
          border: '1px dashed rgba(0, 209, 255, 0.3)',
          color: '#00D1FF',
          fontSize: '14px',
          fontWeight: 500,
          cursor: 'pointer',
          marginTop: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        + Ajouter un abonnement
      </button>
    </div>
  );
}
