import React from 'react';
import { AppShell } from './components/Shell';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { HealthScreen } from './components/screens/HealthScreen';
import { TriggersScreen } from './components/screens/TriggersScreen';
import { RelaxationScreen } from './components/screens/RelaxationScreen';
import { CommunityScreen } from './components/screens/CommunityScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { LandingScreen } from './components/screens/LandingScreen';

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

  const [onboardingStarted, setOnboardingStarted] = React.useState(() => {
    const saved = localStorage.getItem('0fumo_onboarding_started');
    return saved === 'true';
  });
  
  const [activePage, setActivePage] = React.useState(() => {
    const saved = localStorage.getItem('0fumo_activePage');
    return saved || 'dashboard';
  });

  const handleOnboardingComplete = () => {
    setOnboarded(true);
    setActivePage('dashboard');
    setOnboardingStarted(false);
    localStorage.setItem('0fumo_onboarded', 'true');
    localStorage.setItem('0fumo_activePage', 'dashboard');
    localStorage.removeItem('0fumo_onboarding_started');
  };

  const handleStartJourney = () => {
    setOnboardingStarted(true);
    localStorage.setItem('0fumo_onboarding_started', 'true');
  };

  const handleLogin = () => {
    setOnboarded(true);
    setActivePage('dashboard');
    setOnboardingStarted(false);
    localStorage.setItem('0fumo_onboarded', 'true');
    localStorage.setItem('0fumo_activePage', 'dashboard');
    localStorage.removeItem('0fumo_onboarding_started');
  };

  const handleNavigate = (page) => {
    setActivePage(page);
    localStorage.setItem('0fumo_activePage', page);
  };

  const handleLogout = () => {
    setOnboarded(false);
    setOnboardingStarted(false);
    localStorage.removeItem('0fumo_onboarded');
    localStorage.removeItem('0fumo_activePage');
    localStorage.removeItem('0fumo_onboarding_started');
  };

  if (!onboarded) {
    if (onboardingStarted) {
      return <OnboardingScreen onComplete={handleOnboardingComplete} />;
    }
    return <LandingScreen onStart={handleStartJourney} onLogin={handleLogin} />;
  }

  return (
    <AppShell activePage={activePage} onNavigate={handleNavigate} onLogout={handleLogout}>
      {SCREENS[activePage] || SCREENS.dashboard}
    </AppShell>
  );
}

export default App;
