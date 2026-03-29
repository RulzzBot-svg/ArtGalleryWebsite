/* API service — all calls go to the Flask backend at /api */

const BASE = '/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, options);
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
};
