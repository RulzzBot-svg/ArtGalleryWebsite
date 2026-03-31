import { useState, useCallback, useEffect } from 'react';
import { api } from '../services/api';

export default function LoginModal({ onClose, onSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleKey = useCallback(
    (e) => { if (e.key === 'Escape') onClose(); },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!username.trim() || !password) { setError('Please enter your username and password.'); return; }
    setLoading(true);
    setError('');
    try {
      const data = await api.login(username.trim(), password);
      onSuccess(data.username);
      onClose();
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="loginModalTitle"
    >
      <div className="bg-[#F5F4EF] w-full max-w-md rounded-sm relative p-8 md:p-10">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#111]/40 hover:text-[#111] transition-colors text-xl leading-none"
          aria-label="Close"
        >
          ×
        </button>

        <h2
          id="loginModalTitle"
          className="font-serif text-3xl font-light text-[#111] mb-1"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Welcome back.
        </h2>
        <p className="text-sm text-[#888] mb-8">Sign in to upload and manage artworks.</p>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="login-username" className="text-xs font-medium tracking-wider uppercase text-[#888]">
              Username
            </label>
            <input
              id="login-username"
              type="text"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(''); }}
              className="w-full border-b border-[#111]/20 bg-transparent py-2.5 text-sm text-[#111] placeholder-[#aaa] outline-none focus:border-[#111] transition-colors"
              placeholder="your username"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="login-password" className="text-xs font-medium tracking-wider uppercase text-[#888]">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              className="w-full border-b border-[#111]/20 bg-transparent py-2.5 text-sm text-[#111] placeholder-[#aaa] outline-none focus:border-[#111] transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-xs text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 px-7 py-3.5 bg-[#111] text-[#F5F4EF] text-sm font-medium tracking-wide rounded-sm hover:bg-transparent hover:text-[#111] border border-[#111] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
