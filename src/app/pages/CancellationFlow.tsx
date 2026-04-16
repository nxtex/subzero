import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Check, Copy, ExternalLink, ChevronRight } from 'lucide-react';
import { subscriptions } from '../data/subscriptions';

export function CancellationFlow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);
  const [done, setDone] = useState(false);

  const sub = subscriptions.find((s) => s.id === id);
  if (!sub) {
    return (
      <div style={{ padding: '56px 20px', color: '#FFFFFF', textAlign: 'center' }}>
        <p>Abonnement introuvable</p>
        <button onClick={() => navigate(-1)} style={{ marginTop: '16px', color: '#00D1FF', background: 'none', border: 'none', cursor: 'pointer' }}>
          Retour
        </button>
      </div>
    );
  }

  const steps = sub.cancellationSteps;
  const totalSteps = steps.length;

  const handleStepComplete = (idx: number) => {
    if (!completedSteps.includes(idx)) {
      setCompletedSteps([...completedSteps, idx]);
    }
    if (idx < totalSteps - 1) {
      setCurrentStep(idx + 1);
    }
  };

  const copyEmail = () => {
    const emailTemplate = `Bonjour,\n\nJe souhaite résilier mon abonnement ${sub.name} avec effet immédiat.\n\nMerci de confirmer la prise en compte de cette résiliation.\n\nCordialement`;
    navigator.clipboard.writeText(emailTemplate).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const allDone = completedSteps.length >= totalSteps;

  if (done) {
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
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(46, 213, 115, 0.15)',
            border: '2px solid rgba(46, 213, 115, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
            boxShadow: '0 0 30px rgba(46, 213, 115, 0.2)',
          }}
        >
          <Check size={36} color="#2ED573" strokeWidth={3} />
        </div>
        <h2
          style={{
            color: '#FFFFFF',
            fontSize: '24px',
            fontWeight: 700,
            marginBottom: '12px',
          }}
        >
          Résiliation confirmée ! 🎉
        </h2>
        <p style={{ color: '#9BA3C7', fontSize: '14px', lineHeight: 1.6, marginBottom: '8px' }}>
          Tu vas économiser
        </p>
        <div
          style={{
            fontSize: '40px',
            fontWeight: 800,
            color: '#2ED573',
            textShadow: '0 0 20px rgba(46,213,115,0.4)',
            marginBottom: '8px',
          }}
        >
          {sub.price * 12}€
        </div>
        <p style={{ color: '#9BA3C7', fontSize: '14px', marginBottom: '32px' }}>
          par an sur {sub.name}
        </p>

        <button
          onClick={() => navigate('/')}
          style={{
            width: '100%',
            padding: '18px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #2ED573, #00D1FF)',
            border: 'none',
            color: '#070B1A',
            fontSize: '16px',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Retour au tableau de bord
        </button>
      </div>
    );
  }

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

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: `linear-gradient(135deg, ${sub.color}33, ${sub.color}66)`,
              border: `1px solid ${sub.color}44`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: 700,
              color: sub.color === '#000000' ? '#fff' : sub.color,
            }}
          >
            {sub.icon}
          </div>
          <div>
            <h1
              style={{ color: '#FFFFFF', fontSize: '20px', fontWeight: 700, marginBottom: '2px' }}
            >
              Résilier {sub.name}
            </h1>
            <p style={{ color: '#9BA3C7', fontSize: '13px' }}>
              Suis les étapes · {sub.price}€/mois
            </p>
          </div>
        </div>

        {/* Progress */}
        <div
          style={{
            height: '4px',
            borderRadius: '999px',
            background: 'rgba(255,255,255,0.08)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${(completedSteps.length / totalSteps) * 100}%`,
              background: 'linear-gradient(90deg, #00D1FF, #7B61FF)',
              borderRadius: '999px',
              transition: 'width 0.4s ease',
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '8px',
          }}
        >
          <span style={{ color: '#5B638A', fontSize: '12px' }}>
            {completedSteps.length}/{totalSteps} étapes
          </span>
          <span style={{ color: '#00D1FF', fontSize: '12px' }}>
            {Math.round((completedSteps.length / totalSteps) * 100)}%
          </span>
        </div>
      </div>

      <div style={{ padding: '0 20px' }}>
        {/* Steps */}
        {steps.map((step, idx) => {
          const isCompleted = completedSteps.includes(idx);
          const isCurrent = idx === currentStep;
          const isPast = idx < currentStep;

          return (
            <div
              key={idx}
              style={{
                borderRadius: '16px',
                background: isCurrent
                  ? 'rgba(18, 26, 58, 0.9)'
                  : isCompleted
                    ? 'rgba(46, 213, 115, 0.06)'
                    : 'rgba(18, 26, 58, 0.4)',
                border: isCurrent
                  ? '1px solid rgba(0, 209, 255, 0.3)'
                  : isCompleted
                    ? '1px solid rgba(46, 213, 115, 0.2)'
                    : '1px solid rgba(255,255,255,0.04)',
                padding: '16px',
                marginBottom: '10px',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                {/* Step number */}
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: isCompleted
                      ? 'rgba(46, 213, 115, 0.2)'
                      : isCurrent
                        ? 'rgba(0, 209, 255, 0.15)'
                        : 'rgba(255,255,255,0.05)',
                    border: isCompleted
                      ? '1px solid rgba(46, 213, 115, 0.5)'
                      : isCurrent
                        ? '1px solid rgba(0, 209, 255, 0.4)'
                        : '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.3s ease',
                  }}
                >
                  {isCompleted ? (
                    <Check size={14} color="#2ED573" strokeWidth={3} />
                  ) : (
                    <span
                      style={{
                        color: isCurrent ? '#00D1FF' : '#5B638A',
                        fontSize: '13px',
                        fontWeight: 700,
                      }}
                    >
                      {idx + 1}
                    </span>
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      color: isCompleted
                        ? '#2ED573'
                        : isCurrent
                          ? '#FFFFFF'
                          : '#5B638A',
                      fontSize: '14px',
                      fontWeight: isCurrent ? 600 : 400,
                      marginBottom: isCurrent ? '12px' : '0',
                      textDecoration: isCompleted ? 'line-through' : 'none',
                      opacity: !isCurrent && !isCompleted ? 0.6 : 1,
                    }}
                  >
                    {step}
                  </div>

                  {isCurrent && (
                    <button
                      onClick={() => handleStepComplete(idx)}
                      style={{
                        padding: '10px 20px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #00D1FF, #7B61FF)',
                        border: 'none',
                        color: '#070B1A',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontFamily: "'Inter', sans-serif",
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      Fait <ChevronRight size={14} strokeWidth={3} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Email template */}
        <div
          style={{
            borderRadius: '16px',
            background: 'rgba(18, 26, 58, 0.6)',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '16px',
            marginTop: '8px',
            marginBottom: '16px',
          }}
        >
          <div
            style={{
              color: '#9BA3C7',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '10px',
            }}
          >
            Modèle d'email de résiliation
          </div>
          <div
            style={{
              background: 'rgba(7, 11, 26, 0.5)',
              borderRadius: '10px',
              padding: '12px',
              color: '#9BA3C7',
              fontSize: '13px',
              lineHeight: 1.6,
              marginBottom: '12px',
            }}
          >
            Bonjour,<br /><br />
            Je souhaite résilier mon abonnement{' '}
            <strong style={{ color: '#FFFFFF' }}>{sub.name}</strong> avec effet
            immédiat.<br /><br />
            Merci de confirmer la prise en compte de cette résiliation.<br /><br />
            Cordialement
          </div>
          <button
            onClick={copyEmail}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '12px',
              background: copied
                ? 'rgba(46, 213, 115, 0.12)'
                : 'rgba(0, 209, 255, 0.1)',
              border: `1px solid ${copied ? 'rgba(46, 213, 115, 0.3)' : 'rgba(0, 209, 255, 0.25)'}`,
              color: copied ? '#2ED573' : '#00D1FF',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.3s ease',
            }}
          >
            {copied ? (
              <>
                <Check size={16} />
                Copié !
              </>
            ) : (
              <>
                <Copy size={16} />
                Copier l'email
              </>
            )}
          </button>
        </div>

        {/* Access link */}
        {sub.cancellationUrl && (
          <button
            onClick={() => window.open(sub.cancellationUrl, '_blank')}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '14px',
              background: 'rgba(18, 26, 58, 0.6)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#9BA3C7',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '16px',
            }}
          >
            <ExternalLink size={16} />
            Accéder à {sub.name}
          </button>
        )}

        {/* Final CTA */}
        <button
          onClick={() => setDone(true)}
          style={{
            width: '100%',
            padding: '18px',
            borderRadius: '16px',
            background: allDone
              ? 'linear-gradient(135deg, #2ED573, #00D1FF)'
              : 'rgba(46, 213, 115, 0.12)',
            border: allDone
              ? 'none'
              : '1px solid rgba(46, 213, 115, 0.3)',
            color: allDone ? '#070B1A' : '#2ED573',
            fontSize: '16px',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: "'Inter', sans-serif",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: allDone ? '0 8px 24px rgba(46, 213, 115, 0.3)' : 'none',
            transition: 'all 0.3s ease',
          }}
        >
          <Check size={18} strokeWidth={3} />
          J'ai résilié !
        </button>
      </div>
    </div>
  );
}
