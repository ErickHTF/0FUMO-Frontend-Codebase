import React from 'react';
import { AppShell } from './components/Shell';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { HealthScreen } from './components/screens/HealthScreen';
import { TriggersScreen } from './components/screens/TriggersScreen';
import { RelaxationScreen } from './components/screens/RelaxationScreen';
import { CommunityScreen } from './components/screens/CommunityScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';

const SCREENS = {
  dashboard: <DashboardScreen />,
  saude: <HealthScreen />,
  gatilhos: <TriggersScreen />,
  relaxar: <RelaxationScreen />,
  comunidade: <CommunityScreen />,
  config: <SettingsScreen />,
};

function App() {
  const [onboarded, setOnboarded] = React.useState(() => {
    const saved = localStorage.getItem('0fumo_onboarded');
    return saved === 'true';
  });
  
  const [activePage, setActivePage] = React.useState(() => {
    const saved = localStorage.getItem('0fumo_activePage');
    return saved || 'dashboard';
  });

  const handleOnboardingComplete = () => {
    setOnboarded(true);
    localStorage.setItem('0fumo_onboarded', 'true');
    localStorage.setItem('0fumo_activePage', 'dashboard');
  };

  const handleNavigate = (page) => {
    setActivePage(page);
    localStorage.setItem('0fumo_activePage', page);
  };

  if (!onboarded) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  return (
    <AppShell activePage={activePage} onNavigate={handleNavigate}>
      {SCREENS[activePage] || SCREENS.dashboard}
    </AppShell>
  );
}

export default App;
