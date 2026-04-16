import React from 'react';
import { Outlet } from 'react-router';
import { BottomNav } from './BottomNav';
import { StartupModal } from './StartupModal';

export function Root() {
  return (
    <div
      style={{
        minHeight: '100dvh',
        background: '#070B1A',
        fontFamily: "'Inter', sans-serif",
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '430px',
          minHeight: '100dvh',
          position: 'relative',
          background: 'linear-gradient(180deg, #070B1A 0%, #0F1630 100%)',
        }}
      >
        <div
          style={{
            paddingBottom: '90px',
            minHeight: '100dvh',
            overflowX: 'hidden',
          }}
        >
          <Outlet />
        </div>
        <BottomNav />
        <StartupModal />
      </div>
    </div>
  );
}
