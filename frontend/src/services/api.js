/* API service — all calls go to the Flask backend at /api */

// In dev, Vite proxies /api -> localhost:5000 so BASE stays '/api'.
// In production (Render static site), set VITE_API_URL to your backend URL, e.g.:
//   https://arthaus-api.onrender.com
const BASE = (import.meta.env.VITE_API_URL ?? '') + '/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, { credentials: 'include', ...options });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  /* Artworks */
  getArtworks: (category) => {
    const q = category && category !== 'all' ? `?category=${encodeURIComponent(category)}` : '';
    return request(`/artworks${q}`);
  },
  getFeatured: () => request('/artworks/featured'),
  createArtwork: (formData) =>
    request('/artworks', { method: 'POST', body: formData }),

  /* Cinema */
  getCinema: () => request('/cinema'),
  createCinema: (formData) =>
    request('/cinema', { method: 'POST', body: formData }),

  /* Auth */
  getMe: () => request('/auth/me'),
  login: (username, password) =>
    request('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    }),
  logout: () => request('/auth/logout', { method: 'POST' }),
};
