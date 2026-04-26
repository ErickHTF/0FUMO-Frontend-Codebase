import React from 'react';
import { AppShell } from './components/Shell';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import { SignUpScreen } from './components/screens/SignUpScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { HealthScreen } from './components/screens/HealthScreen';
import { TriggersScreen } from './components/screens/TriggersScreen';
import { RelaxationScreen } from './components/screens/RelaxationScreen';
import { CommunityScreen } from './components/screens/CommunityScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { LandingScreen } from './components/screens/LandingScreen';
import { saveSession, clearSession, getStoredUser } from './lib/api';

function App() {
  const [onboarded, setOnboarded] = React.useState(() =>
    localStorage.getItem('0fumo_onboarded') === 'true'
  );
  const [onboardingStarted, setOnboardingStarted] = React.useState(() =>
    localStorage.getItem('0fumo_onboarding_started') === 'true'
  );
  const [signupPending, setSignupPending] = React.useState(() =>
    localStorage.getItem('0fumo_signup_pending') === 'true'
  );
  const [onboardingData, setOnboardingData] = React.useState(() => {
    try {
      const saved = localStorage.getItem('0fumo_onboarding_data');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });
  const [activePage, setActivePage] = React.useState(() =>
    localStorage.getItem('0fumo_activePage') || 'dashboard'
  );
  const [user, setUser] = React.useState(() => getStoredUser());
  const [showLogin, setShowLogin] = React.useState(false);

  const handleOnboardingComplete = (data) => {
    setSignupPending(true);
    setOnboardingStarted(false);
    if (data) {
      setOnboardingData(data);
      localStorage.setItem('0fumo_onboarding_data', JSON.stringify(data));
    }
    localStorage.setItem('0fumo_signup_pending', 'true');
    localStorage.removeItem('0fumo_onboarding_started');
  };

  const handleSignUpComplete = (authData) => {
    saveSession(authData);
    setUser(authData.user);
    setOnboarded(true);
    setSignupPending(false);
    setActivePage('dashboard');
    localStorage.setItem('0fumo_onboarded', 'true');
    localStorage.setItem('0fumo_activePage', 'dashboard');
    localStorage.removeItem('0fumo_signup_pending');
    localStorage.removeItem('0fumo_onboarding_data');
  };

  const handleStartJourney = () => {
    setOnboardingStarted(true);
    localStorage.setItem('0fumo_onboarding_started', 'true');
  };

  const handleShowLogin = () => setShowLogin(true);

  const handleLoginSuccess = (authData) => {
    saveSession(authData);
    setUser(authData.user);
    setOnboarded(true);
    setShowLogin(false);
    setOnboardingStarted(false);
    setSignupPending(false);
    setActivePage('dashboard');
    localStorage.setItem('0fumo_onboarded', 'true');
    localStorage.setItem('0fumo_activePage', 'dashboard');
    localStorage.removeItem('0fumo_onboarding_started');
    localStorage.removeItem('0fumo_signup_pending');
  };

  const handleNavigate = (page) => {
    setActivePage(page);
    localStorage.setItem('0fumo_activePage', page);
  };

  const handleLogout = () => {
    clearSession();
    setUser(null);
    setOnboarded(false);
    setOnboardingStarted(false);
    setSignupPending(false);
    setOnboardingData(null);
    setShowLogin(false);
    localStorage.removeItem('0fumo_onboarded');
    localStorage.removeItem('0fumo_activePage');
    localStorage.removeItem('0fumo_onboarding_started');
    localStorage.removeItem('0fumo_signup_pending');
    localStorage.removeItem('0fumo_onboarding_data');
  };

  if (showLogin) {
    return (
      <LoginScreen
        onSuccess={handleLoginSuccess}
        onBack={() => setShowLogin(false)}
      />
    );
  }

  if (!onboarded) {
    if (signupPending) {
      return (
        <SignUpScreen
          onComplete={handleSignUpComplete}
          onLogin={handleShowLogin}
          onboardingData={onboardingData}
        />
      );
    }
    if (onboardingStarted) {
      return <OnboardingScreen onComplete={handleOnboardingComplete} />;
    }
    return <LandingScreen onStart={handleStartJourney} onLogin={handleShowLogin} />;
  }

  const renderScreen = () => {
    if (activePage === 'config') {
      return <SettingsScreen user={user} onDeleteAccount={handleLogout} />;
    }
    const screens = {
      dashboard: <DashboardScreen />,
      saude: <HealthScreen />,
      gatilhos: <TriggersScreen />,
      relaxar: <RelaxationScreen />,
      comunidade: <CommunityScreen />,
    };
    return screens[activePage] || screens.dashboard;
  };

  return (
    <AppShell activePage={activePage} onNavigate={handleNavigate} onLogout={handleLogout}>
      {renderScreen()}
    </AppShell>
  );
}

export default App;
