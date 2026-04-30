import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { LandingScreen } from './screens/LandingScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import { LoginScreen } from './screens/LoginScreen';
import { saveSession, clearSession, getStoredUser, getToken, Users } from './lib/api';

['0fumo_onboarded', '0fumo_activePage', '0fumo_onboarding_started', '0fumo_signup_pending']
  .forEach(k => localStorage.removeItem(k));

function App() {
  const navigate = useNavigate();

  const [user, setUser] = React.useState(() => getStoredUser());
  const [isDarkMode, setIsDarkMode] = React.useState(
    () => localStorage.getItem('0fumo_darkMode') === 'true'
  );
  const [onboardingData, setOnboardingData] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('0fumo_onboarding_data')); }
    catch { return null; }
  });

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('0fumo_darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  const handleOnboardingComplete = async (data) => {
    if (data) {
      localStorage.setItem('0fumo_onboarding_data', JSON.stringify(data));
      setOnboardingData(data);
    }
    if (user) {
      if (data?.cigs && data?.packCost) {
        try {
          const updated = await Users.completeAssessment(Number(data.cigs), data.packCost);
          setUser(updated);
          localStorage.setItem('0fumo_user', JSON.stringify(updated));
          localStorage.removeItem('0fumo_onboarding_data');
        } catch { /* não crítico */ }
      }
      navigate('/');
    } else {
      navigate('/register');
    }
  };

  const handleSignUpComplete = async (authData) => {
    saveSession(authData);
    const saved = (() => {
      try { return JSON.parse(localStorage.getItem('0fumo_onboarding_data')); }
      catch { return null; }
    })();
    let finalUser = authData.user;
    if (saved?.cigs && saved?.packCost) {
      try {
        finalUser = await Users.completeAssessment(Number(saved.cigs), saved.packCost);
        localStorage.setItem('0fumo_user', JSON.stringify(finalUser));
      } catch { /* não crítico */ }
    }
    setUser(finalUser);
    localStorage.removeItem('0fumo_onboarding_data');
    navigate('/');
  };

  const handleLoginSuccess = (authData) => {
    saveSession(authData);
    setUser(authData.user);
    navigate('/');
  };

  const handleLogout = () => {
    clearSession();
    setUser(null);
    navigate('/landing');
  };

  const toggleDark = () => setIsDarkMode(v => !v);

  return (
    <Routes>
      <Route path="/landing"    element={<LandingScreen onStart={() => navigate('/onboarding')} onLogin={() => navigate('/login')} />} />
      <Route path="/onboarding" element={<OnboardingScreen onComplete={handleOnboardingComplete} isDarkMode={isDarkMode} onToggleDarkMode={toggleDark} />} />
      <Route path="/register"   element={<SignUpScreen onComplete={handleSignUpComplete} onLogin={() => navigate('/login')} onboardingData={onboardingData} isDarkMode={isDarkMode} onToggleDarkMode={toggleDark} />} />
      <Route path="/login"      element={<LoginScreen onSuccess={handleLoginSuccess} onBack={() => navigate('/landing')} isDarkMode={isDarkMode} onToggleDarkMode={toggleDark} />} />
      <Route path="*"           element={<Navigate to="/landing" replace />} />
    </Routes>
  );
}

export default App;
