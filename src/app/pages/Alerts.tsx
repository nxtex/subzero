import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Bell, BellOff, ChevronRight, Calendar, AlertTriangle } from 'lucide-react';
import { subscriptions } from '../data/subscriptions';

export function Alerts() {
  const navigate = useNavigate();
  const [notifEnabled, setNotifEnabled] = useState(true);

  const urgentAlerts = subscriptions.filter(
    (s) => s.daysUntilRenewal !== null && s.daysUntilRenewal <= 3
  );
  const soonAlerts = subscriptions.filter(
    (s) =>
      s.daysUntilRenewal !== null &&
      s.daysUntilRenewal > 3 &&
      s.daysUntilRenewal <= 7
  );
  const upcomingAlerts = subscriptions.filter(
    (s) =>
      s.daysUntilRenewal !== null &&
      s.daysUntilRenewal > 7 &&
      s.daysUntilRenewal <= 30
  );
  const unusedAlerts = subscriptions.filter((s) => s.badge === 'non-utilise');

  const getAlertColor = (days: number | null) => {
    if (days === null) return '#9BA3C7';
    if (days <= 3) return '#FF5A5F';
    if (days <= 7) return '#FF9F43';
    return '#00D1FF';
  };

  const AlertItem = ({
    name,
    icon,
    color,
    price,
    days,
    id,
  }: {
    name: string;
    icon: string;
    color: string;
    price: number;
    days: number | null;
    id: string;
  }) => {
    const alertColor = getAlertColor(days);
    return (
      <div
        onClick={() => navigate(`/abonnement/${id}`)}
        style={{
          borderRadius: '16px',
          background: `rgba(${alertColor === '#FF5A5F' ? '255, 90, 95' : alertColor === '#FF9F43' ? '255, 159, 67' : '0, 209, 255'}, 0.06)`,
          border: `1px solid ${alertColor}28`,
          padding: '14px 16px',
          marginBottom: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: `${color}28`,
            border: `1px solid ${color}44`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            fontWeight: 700,
            color: color === '#000000' ? '#fff' : color,
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 600, marginBottom: '2px' }}>
            {name}
          </div>
          <div style={{ color: '#9BA3C7', fontSize: '12px' }}>
            {days !== null ? `Renouvellement dans ${days} jour${days > 1 ? 's' : ''}` : 'Abonnement non utilisé'}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
          <span style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 700 }}>
            {price}€
          </span>
          {days !== null && (
            <span
              style={{
                background: `${alertColor}22`,
                color: alertColor,
                fontSize: '11px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '999px',
              }}
            >
              J-{days}
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '56px 20px 20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h1 style={{ color: '#FFFFFF', fontSize: '26px', fontWeight: 700, marginBottom: '4px' }}>
            Alertes
          </h1>
          <p style={{ color: '#9BA3C7', fontSize: '14px' }}>
            {urgentAlerts.length + soonAlerts.length} renouvellements à surveiller
          </p>
        </div>
        <button
          onClick={() => setNotifEnabled(!notifEnabled)}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: notifEnabled
              ? 'rgba(0, 209, 255, 0.1)'
              : 'rgba(18, 26, 58, 0.6)',
            border: `1px solid ${notifEnabled ? 'rgba(0, 209, 255, 0.25)' : 'rgba(255,255,255,0.06)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          {notifEnabled ? (
            <Bell size={18} color="#00D1FF" />
          ) : (
            <BellOff size={18} color="#5B638A" />
          )}
        </button>
      </div>

      {/* Notification toggle */}
      <div
        style={{
          borderRadius: '16px',
          background: 'rgba(18, 26, 58, 0.6)',
          border: '1px solid rgba(255,255,255,0.06)',
          padding: '16px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Bell size={18} color={notifEnabled ? '#00D1FF' : '#5B638A'} />
          <div>
            <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 600 }}>
              Notifications push
            </div>
            <div style={{ color: '#5B638A', fontSize: '12px' }}>
              J-30, J-7, J-1 avant chaque renouvellement
            </div>
          </div>
        </div>
        <div
          onClick={() => setNotifEnabled(!notifEnabled)}
          style={{
            width: '48px',
            height: '26px',
            borderRadius: '13px',
            background: notifEnabled ? '#00D1FF' : 'rgba(255,255,255,0.1)',
            cursor: 'pointer',
            position: 'relative',
            transition: 'background 0.3s ease',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '3px',
              left: notifEnabled ? '25px' : '3px',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: '#FFFFFF',
              transition: 'left 0.3s ease',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          />
        </div>
      </div>

      {/* Urgent Alerts */}
      {urgentAlerts.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <AlertTriangle size={14} color="#FF5A5F" />
            <span
              style={{
                color: '#FF5A5F',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Urgent
            </span>
          </div>
          {urgentAlerts.map((s) => (
            <AlertItem
              key={s.id}
              id={s.id}
              name={s.name}
              icon={s.icon}
              color={s.color}
              price={s.price}
              days={s.daysUntilRenewal}
            />
          ))}
        </div>
      )}

      {/* Soon */}
      {soonAlerts.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Calendar size={14} color="#FF9F43" />
            <span
              style={{
                color: '#FF9F43',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Cette semaine
            </span>
          </div>
          {soonAlerts.map((s) => (
            <AlertItem
              key={s.id}
              id={s.id}
              name={s.name}
              icon={s.icon}
              color={s.color}
              price={s.price}
              days={s.daysUntilRenewal}
            />
          ))}
        </div>
      )}

      {/* Upcoming */}
      {upcomingAlerts.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <div
            style={{
              color: '#9BA3C7',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
          >
            Ce mois-ci
          </div>
          {upcomingAlerts.map((s) => (
            <AlertItem
              key={s.id}
              id={s.id}
              name={s.name}
              icon={s.icon}
              color={s.color}
              price={s.price}
              days={s.daysUntilRenewal}
            />
          ))}
        </div>
      )}

      {/* Abonnements non utilisés */}
      {unusedAlerts.length > 0 && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <AlertTriangle size={14} color="#FF5A5F" />
            <span
              style={{
                color: '#FF5A5F',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Abonnements non utilisés
            </span>
          </div>
          {unusedAlerts.map((s) => (
            <AlertItem
              key={s.id}
              id={s.id}
              name={s.name}
              icon={s.icon}
              color={s.color}
              price={s.price}
              days={null}
            />
          ))}
        </div>
      )}
    </div>
  );
}
