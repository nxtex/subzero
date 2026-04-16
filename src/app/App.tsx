import React, { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Onboarding } from './components/Onboarding';

const STORAGE_KEY = 'subzero_onboarding_done';

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    let done = false;
    try { done = !!localStorage.getItem(STORAGE_KEY); } catch {}
    if (!done) setShowOnboarding(true);
  }, []);

  if (showOnboarding) {
    return <Onboarding onDone={() => setShowOnboarding(false)} />;
  }

  return <RouterProvider router={router} />;
}
