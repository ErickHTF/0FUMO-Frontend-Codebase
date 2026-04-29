const API_BASE = '/api';

export function getToken() {
  return localStorage.getItem('0fumo_token');
}

export function saveSession(data) {
  localStorage.setItem('0fumo_token', data.token);
  localStorage.setItem('0fumo_user', JSON.stringify(data.user));
}

export function clearSession() {
  localStorage.removeItem('0fumo_token');
  localStorage.removeItem('0fumo_user');
  localStorage.removeItem('0fumo_onboarding_data');
  localStorage.removeItem('0fumo_onboarded');
  localStorage.removeItem('0fumo_activePage');
  localStorage.removeItem('0fumo_onboarding_started');
  localStorage.removeItem('0fumo_signup_pending');
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem('0fumo_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

async function apiFetch(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const token = getToken();
  if (token) headers['Authorization'] = 'Bearer ' + token;

  const res = await fetch(API_BASE + path, { ...options, headers });

  if (res.status === 204) return null;

  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw { status: res.status, body };
  return body;
}

export const Auth = {
  register: (name, email, password) =>
    apiFetch('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) }),

  login: (email, password) =>
    apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
};

export const Users = {
  me: () => apiFetch('/users/me'),

  completeAssessment: (cigsPerDay, packCostId) =>
    apiFetch('/users/me/assessment', { method: 'POST', body: JSON.stringify({ cigsPerDay, packCostId }) }),

  updateQuitDate: (quitDate) =>
    apiFetch('/users/me/quit-date', { method: 'PUT', body: JSON.stringify({ quitDate }) }),

  update: (id, name, email) =>
    apiFetch(`/users/${id}`, { method: 'PUT', body: JSON.stringify({ name, email }) }),

  delete: (id) => apiFetch(`/users/${id}`, { method: 'DELETE' }),
};

export const Events = {
  create: (eventType, intensity, context, note, occurredAt) =>
    apiFetch('/events', { method: 'POST', body: JSON.stringify({ eventType, intensity, context, note, occurredAt }) }),

  list: (type) =>
    apiFetch('/events' + (type ? `?type=${type}` : '')),

  stats: () => apiFetch('/events/stats'),

  heatmap: (year, month) =>
    apiFetch('/events/heatmap' + (year && month ? `?year=${year}&month=${month}` : '')),

  relapseCorrelation: () => apiFetch('/events/relapse-correlation'),

  remove: (id) => apiFetch(`/events/${id}`, { method: 'DELETE' }),
};

export const Messages = {
  select: (payload) =>
    apiFetch('/messages/select', { method: 'POST', body: JSON.stringify(payload) }),

  feedback: (historyId, foiUtil) =>
    apiFetch('/messages/feedback', { method: 'PATCH', body: JSON.stringify({ historyId, wasUseful: foiUtil }) }),
};

export const Insights = {
  financialProjection: () => apiFetch('/users/me/financial-projection'),
};
