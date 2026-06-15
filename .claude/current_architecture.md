# Arquitetura Atual — 0 Fumo Frontend (feature/assessment)

**Regra:** Sempre que alterar ou criar um componente, atualize o bloco correspondente abaixo.

---

================================================
ESTADO ATUAL DO COMPONENTE: App
Última Atualização: 2026-04-29

ESTADO LOCAL:
- user : User | null
- isDarkMode : boolean
- onboardingData : { cigs, packCost } | null

ROTAS ATIVAS:
- /landing    → LandingScreen
- /onboarding → OnboardingScreen
- /register   → SignUpScreen
- /login      → LoginScreen
- /*          → redirect /landing

CHAMADAS API:
- Users.completeAssessment(cigsPerDay, packCostId) : POST /api/users/me/assessment

ACOPLAMENTO:
- src/lib/api.js
- LandingScreen, OnboardingScreen, SignUpScreen, LoginScreen
================================================

================================================
ESTADO ATUAL DO COMPONENTE: LandingScreen
Última Atualização: 2026-04-29

PROPS:
- onStart : () => void  → navega /onboarding
- onLogin : () => void  → navega /login

ACOPLAMENTO:
- src/lib/icons.jsx
- src/components/ui/Card.jsx
- src/assets/desktop.jpeg, mobile.png
================================================

================================================
ESTADO ATUAL DO COMPONENTE: OnboardingScreen
Última Atualização: 2026-04-29

PROPS:
- onComplete : ({ cigs, packCost, rewardDream }) => void
- isDarkMode : boolean
- onToggleDarkMode : () => void

ESTADO LOCAL (7 steps):
- step : 0–7
- cigs, smokingTime : string
- motivosSel : Set<string>
- physioData : { birthDate, packCost, activity, symptoms: Set }
- behavioralData : { triggerMoment, rituals: Set }
- rewardDream : string
- mentalData : { stressScale, stressCoping, quitAttempts, longestQuit, quitDifficulties }

ACOPLAMENTO:
- src/lib/icons.jsx
- src/components/ui/Card.jsx
================================================

================================================
ESTADO ATUAL DO COMPONENTE: SignUpScreen
Última Atualização: 2026-04-29

PROPS:
- onComplete : (authData) => void
- onLogin : () => void
- onboardingData : { cigs, packCost } | null
- isDarkMode : boolean
- onToggleDarkMode : () => void

CHAMADAS API:
- Auth.register(name, email, password) : POST /api/auth/register

ACOPLAMENTO:
- src/lib/icons.jsx
- src/lib/api.js (Auth)
================================================

================================================
ESTADO ATUAL DO COMPONENTE: LoginScreen
Última Atualização: 2026-04-29

PROPS:
- onSuccess : (authData) => void
- onBack : () => void
- isDarkMode : boolean
- onToggleDarkMode : () => void

CHAMADAS API:
- Auth.login(email, password) : POST /api/auth/login

ACOPLAMENTO:
- src/lib/icons.jsx
- src/lib/api.js (Auth, saveSession)
================================================

================================================
ESTADO ATUAL: js/api.js
Última Atualização: 2026-06-15

EXPORTS:
- getToken() : string | null
- saveSession(data) : void
- clearSession() : void
- getUser() : User | null
- Auth.register(name, email, password)
- Auth.login(email, password)
- Users.me()
- Users.update(id, name, email)
- Users.delete(id)
- Users.completeAssessment(id, cigsPerDay, smokingYears, motivation, dependencyLevel)
- Events.register(type, intensity, trigger, occurredAt, notes)
- Events.list()
- Progress.getStats() : GET /api/progress → ProgressStatsDTO
================================================

================================================
ESTADO ATUAL DO COMPONENTE: dashboard.html
Última Atualização: 2026-06-15

SEÇÕES:
- Banner de avaliação pendente (oculto se assessmentCompleted)
- Card de ações rápidas (oculto se assessmentCompleted = false)
- Card de progresso (oculto se sem assessment; carrega Progress.getStats())
  - totalEvents, daysTracking, eventsByType.resistiu, eventsByType.fumou
- Card de perfil (nome, email, membro desde)
- Formulário de edição de perfil
- Zona de perigo (exclusão de conta)

CHAMADAS API:
- Users.me() : GET /api/users/me
- Users.update(id, name, email) : PUT /api/users/{id}
- Users.delete(id) : DELETE /api/users/{id}
- Progress.getStats() : GET /api/progress
================================================

================================================
ESTADO ATUAL DO COMPONENTE: AppShell / Shell
Última Atualização: 2026-04-30

ARQUIVO: src/components/Shell.jsx + Shell.css

EXPORTS:
- LogCravingButton — botão de ação na sidebar
- CravingLogModal — modal de registro de desejo (chama Events.create, dispara 'craving-logged')
- Sidebar — nav lateral com NAV_ITEMS e footer (Settings, LogOut)
- AppShell — layout principal: Sidebar + TopBar + children

PROPS (AppShell):
- activePage : string
- onNavigate : (page: string) => void
- onLogout : () => void
- onToggleDarkMode : () => void
- isDarkMode : boolean
- children : ReactNode

ACOPLAMENTO:
- src/lib/icons.jsx (Menu, Bell, Sun, Moon, User, Flame, etc.)
- src/lib/api.js (Events)
- src/components/ui/Card.jsx
================================================

================================================
ESTADO ATUAL DO COMPONENTE: TriggersScreen
Última Atualização: 2026-04-30

ARQUIVO: src/screens/TriggersScreen.jsx + TriggersScreen.css

ESTADO LOCAL:
- activeTab : 'cravings' | 'cigarettes'
- viewMode : 'grid' | 'list'
- cravings, cigarettes : SmokingEventResponseDTO[]
- filterPeriod : 'hoje' | '7dias' | '30dias' | 'todos'
- selectedTypes : Set<string>
- filterIntensity : string
- searchQuery : string

CHAMADAS API:
- Events.list('CRAVING') : GET /api/events?type=CRAVING
- Events.list('CIGARETTE_SMOKED') : GET /api/events?type=CIGARETTE_SMOKED
- Events.remove(id) : DELETE /api/events/{id}

ACOPLAMENTO:
- src/lib/icons.jsx
- src/lib/api.js (Events)
- src/components/ui/Card.jsx
================================================

================================================
ESTADO ATUAL DO COMPONENTE: LaboratoryScreen
Última Atualização: 2026-04-30

ARQUIVO: src/screens/LaboratoryScreen.jsx

ESTADO LOCAL:
- refreshKey : number (incrementado ao receber 'craving-logged')

ACOPLAMENTO:
- src/components/charts/HeatmapDemo.jsx
- src/components/charts/SankeyOverview.jsx
- src/components/ui/Card.jsx
================================================

================================================
ESTADO ATUAL DO COMPONENTE: HeatmapDemo
Última Atualização: 2026-04-30

ARQUIVO: src/components/charts/HeatmapDemo.jsx + HeatmapDemo.css

PROPS:
- refreshKey : number

CHAMADAS API:
- Events.heatmap() : GET /api/events/heatmap

ACOPLAMENTO:
- src/lib/api.js (Events)
================================================

================================================
ESTADO ATUAL DO COMPONENTE: SankeyOverview
Última Atualização: 2026-04-30

ARQUIVO: src/components/charts/SankeyOverview.jsx + SankeyOverview.css

PROPS:
- refreshKey : number

CHAMADAS API:
- Events.relapseCorrelation() : GET /api/events/relapse-correlation

ACOPLAMENTO:
- src/lib/api.js (Events)
================================================

================================================
ESTADO ATUAL DO COMPONENTE: App
Última Atualização: 2026-04-30

ESTADO LOCAL:
- user : User | null
- isDarkMode : boolean
- onboardingData : { cigs, packCost } | null

ROTAS PÚBLICAS:
- /landing    → LandingScreen
- /onboarding → OnboardingScreen
- /register   → SignUpScreen
- /login      → LoginScreen

ROTAS AUTENTICADAS (PrivateRoute + AssessmentGuard + AppLayout):
- /           → placeholder (Dashboard — feature/monitorar-progresso)
- /saude      → placeholder (feature/monitorar-progresso)
- /gatilhos   → TriggersScreen
- /relaxar    → placeholder (feature/relaxamento)
- /laboratorio → LaboratoryScreen
- /comunidade  → placeholder (feature/relaxamento)
- /config      → placeholder (feature/monitorar-progresso)
- /*           → redirect baseado em token

CHAMADAS API:
- Users.completeAssessment(cigsPerDay, packCostId) : POST /api/users/me/assessment

ACOPLAMENTO:
- src/lib/api.js
- src/components/Shell.jsx (AppShell)
- Todas as screens ativas
================================================
