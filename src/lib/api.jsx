export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export async function fetchSeminars(type) {
  const qs = type ? `?type=${encodeURIComponent(type)}` : '';
  const res = await fetch(`${API_BASE_URL}/api/seminars/public/approved${qs}`);
  if (!res.ok) throw new Error('Failed to load seminars');
  return res.json();
}

export async function createSeminar(payload) {
  const res = await fetch(`${API_BASE_URL}/api/seminars`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function registerForSeminar({ userId, seminarId }) {
  const res = await fetch(`${API_BASE_URL}/api/registrations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, seminarId })
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function fetchUserRegistrations(userId) {
  const res = await fetch(`${API_BASE_URL}/api/registrations/user/${userId}`);
  if (!res.ok) throw new Error('Failed to load registrations');
  return res.json();
}

export async function fetchPendingSeminars() {
  const res = await fetch(`${API_BASE_URL}/api/seminars/admin/pending`);
  if (!res.ok) throw new Error('Failed to load pending seminars');
  return res.json();
}

export async function approveSeminarById(id) {
  const res = await fetch(`${API_BASE_URL}/api/seminars/admin/${id}/approve`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to approve');
  return res.json();
}

export async function rejectSeminarById(id) {
  const res = await fetch(`${API_BASE_URL}/api/seminars/admin/${id}/reject`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to reject');
  return res.json();
}

export async function fetchSeminarsByCreator(userId) {
  const res = await fetch(`${API_BASE_URL}/api/seminars/creator/${userId}`);
  if (!res.ok) throw new Error('Failed to load teacher seminars');
  return res.json();
}



