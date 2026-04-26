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

  update: (id, name, email) =>
    apiFetch(`/users/${id}`, { method: 'PUT', body: JSON.stringify({ name, email }) }),

  delete: (id) => apiFetch(`/users/${id}`, { method: 'DELETE' }),
};
