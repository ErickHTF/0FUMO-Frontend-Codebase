import React from 'react';
import { Routes, Route, Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AppShell } from './components/Shell';
import { LandingScreen } from './components/screens/LandingScreen';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import { SignUpScreen } from './components/screens/SignUpScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { HealthScreen } from './components/screens/HealthScreen';
import { TriggersScreen } from './components/screens/TriggersScreen';
import { RelaxationScreen } from './components/screens/RelaxationScreen';
import { CommunityScreen } from './components/screens/CommunityScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { saveSession, clearSession, getStoredUser, getToken } from './lib/api';

// ── Maps URL pathname → Shell activePage id ─────────────────
const PATH_TO_PAGE = {
  '/':           'dashboard',
  '/saude':      'saude',
  '/gatilhos':   'gatilhos',
  '/relaxar':    'relaxar',
  '/comunidade': 'comunidade',
  '/config':     'config',
};

// ── Layout wrapper: bridges Router ↔ AppShell ───────────────
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

// ── Redirects to /landing if no JWT present ──────────────────
function PrivateRoute() {
  return getToken() ? <Outlet /> : <Navigate to="/landing" replace />;
}

// ── Root ─────────────────────────────────────────────────────
function App() {
  const navigate = useNavigate();

  const [user, setUser] = React.useState(() => getStoredUser());
  const [isDarkMode, setIsDarkMode] = React.useState(
    () => localStorage.getItem('0fumo_darkMode') === 'true'
  );

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('0fumo_darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  // Read onboarding data saved by OnboardingScreen
  const onboardingData = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem('0fumo_onboarding_data')); }
    catch { return null; }
  }, []);

  const handleOnboardingComplete = (data) => {
    if (data) localStorage.setItem('0fumo_onboarding_data', JSON.stringify(data));
    navigate('/register');
  };

  const handleSignUpComplete = (authData) => {
    saveSession(authData);
    setUser(authData.user);
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

  return (
    <Routes>
      {/* ── Public ────────────────────────────────────────── */}
      <Route
        path="/landing"
        element={
          <LandingScreen
            onStart={() => navigate('/onboarding')}
            onLogin={() => navigate('/login')}
          />
        }
      />
      <Route
        path="/onboarding"
        element={<OnboardingScreen onComplete={handleOnboardingComplete} />}
      />
      <Route
        path="/register"
        element={
          <SignUpScreen
            onComplete={handleSignUpComplete}
            onLogin={() => navigate('/login')}
            onboardingData={onboardingData}
          />
        }
      />
      <Route
        path="/login"
        element={
          <LoginScreen
            onSuccess={handleLoginSuccess}
            onBack={() => navigate('/landing')}
          />
        }
      />

      {/* ── Protected ─────────────────────────────────────── */}
      <Route element={<PrivateRoute />}>
        <Route
          element={
            <AppLayout
              user={user}
              onLogout={handleLogout}
              isDarkMode={isDarkMode}
              onToggleDarkMode={() => setIsDarkMode(v => !v)}
            />
          }
        >
          <Route path="/"           element={<DashboardScreen />} />
          <Route path="/saude"      element={<HealthScreen />} />
          <Route path="/gatilhos"   element={<TriggersScreen />} />
          <Route path="/relaxar"    element={<RelaxationScreen />} />
          <Route path="/comunidade" element={<CommunityScreen />} />
          <Route
            path="/config"
            element={<SettingsScreen user={user} onDeleteAccount={handleLogout} />}
          />
        </Route>
      </Route>

      {/* ── Fallback ──────────────────────────────────────── */}
      <Route path="*" element={<Navigate to={getToken() ? '/' : '/landing'} replace />} />
    </Routes>
  );
}

export default App;
