import React from 'react';
import { Routes, Route, Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AppShell } from './components/Shell';
import { LandingScreen } from './screens/LandingScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import { LoginScreen } from './screens/LoginScreen';
import { TriggersScreen } from './screens/TriggersScreen';
import { LaboratoryScreen } from './screens/LaboratoryScreen';
import { saveSession, clearSession, getStoredUser, getToken, Users } from './lib/api';

['0fumo_onboarded', '0fumo_activePage', '0fumo_onboarding_started', '0fumo_signup_pending']
  .forEach(k => localStorage.removeItem(k));

const PATH_TO_PAGE = {
  '/':            'dashboard',
  '/saude':       'saude',
  '/gatilhos':    'gatilhos',
  '/relaxar':     'relaxar',
  '/laboratorio': 'laboratorio',
  '/comunidade':  'comunidade',
  '/config':      'config',
};

function AppLayout({ user, onLogout, isDarkMode, onToggleDarkMode }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <AppShell
      activePage={PATH_TO_PAGE[pathname] || 'dashboard'}
      onNavigate={(page) => navigate(page === 'dashboard' ? '/' : `/${page}`)}
      onLogout={onLogout}
      isDarkMode={isDarkMode}
      onToggleDarkMode={onToggleDarkMode}
    >
      <Outlet context={{ user, onLogout }} />
    </AppShell>
  );
}

function PrivateRoute() {
  return getToken() ? <Outlet /> : <Navigate to="/landing" replace />;
}

function AssessmentGuard({ user }) {
  if (user && user.assessmentCompleted === false) {
    return <Navigate to="/onboarding" replace />;
  }
  return <Outlet />;
}

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

      <Route element={<PrivateRoute />}>
        <Route element={<AssessmentGuard user={user} />}>
          <Route element={<AppLayout user={user} onLogout={handleLogout} isDarkMode={isDarkMode} onToggleDarkMode={toggleDark} />}>
            <Route path="/"            element={<div style={{ padding: '40px 0', color: 'var(--color-text-secondary)' }}>Dashboard em breve (próxima feature)</div>} />
            <Route path="/saude"       element={<div style={{ padding: '40px 0', color: 'var(--color-text-secondary)' }}>Saúde em breve (próxima feature)</div>} />
            <Route path="/gatilhos"    element={<TriggersScreen />} />
            <Route path="/relaxar"     element={<div style={{ padding: '40px 0', color: 'var(--color-text-secondary)' }}>Relaxar em breve (próxima feature)</div>} />
            <Route path="/laboratorio" element={<LaboratoryScreen />} />
            <Route path="/comunidade"  element={<div style={{ padding: '40px 0', color: 'var(--color-text-secondary)' }}>Comunidade em breve (próxima feature)</div>} />
            <Route path="/config"      element={<div style={{ padding: '40px 0', color: 'var(--color-text-secondary)' }}>Configurações em breve (próxima feature)</div>} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={getToken() ? '/' : '/landing'} replace />} />
    </Routes>
  );
}

export default App;
