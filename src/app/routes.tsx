import { createBrowserRouter } from 'react-router';
import { Root } from './components/Root';
import { Dashboard } from './pages/Dashboard';
import { Abonnements } from './pages/Abonnements';
import { SubscriptionDetail } from './pages/SubscriptionDetail';
import { CancellationFlow } from './pages/CancellationFlow';
import { AddSubscription } from './pages/AddSubscription';
import { Alerts } from './pages/Alerts';
import { Settings } from './pages/Settings';
import { Connections } from './pages/Connections';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Dashboard },
      { path: 'abonnements', Component: Abonnements },
      { path: 'abonnement/:id', Component: SubscriptionDetail },
      { path: 'resilier/:id', Component: CancellationFlow },
      { path: 'ajouter', Component: AddSubscription },
      { path: 'alertes', Component: Alerts },
      { path: 'parametres', Component: Settings },
      { path: 'connexions', Component: Connections },
    ],
  },
]);
