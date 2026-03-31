import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedWorks from './components/FeaturedWorks';
import Gallery from './components/Gallery';
import Cinema from './components/Cinema';
import About from './components/About';
import Footer from './components/Footer';
import Lightbox from './components/Lightbox';
import CinemaModal from './components/CinemaModal';
import UploadModal from './components/UploadModal';
import LoginModal from './components/LoginModal';
import Toast from './components/Toast';
import { api } from './services/api';

export default function App() {
  /* ── Auth state ── */
  const [user, setUser] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);

  /* ── Featured artworks for Hero + Featured section ── */
  const [featured, setFeatured] = useState([]);

  /* ── Lightbox state ── */
  const [lightboxItems, setLightboxItems] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  /* ── Cinema modal state ── */
  const [activeFilm, setActiveFilm] = useState(null);

  /* ── Upload modal ── */
  const [uploadOpen, setUploadOpen] = useState(false);

  /* ── Toast ── */
  const [toastVisible, setToastVisible] = useState(false);

  /* ── Gallery refresh key (incremented on new upload) ── */
  const [galleryKey, setGalleryKey] = useState(0);

  useEffect(() => {
    api.getFeatured().then(setFeatured).catch(console.error);
    api.getMe().then((d) => { if (d.user) setUser(d.user); }).catch(() => {});
  }, []);

  function openLightbox(art, items) {
    setLightboxItems(items);
    setLightboxIndex(items.indexOf(art));
    setLightboxOpen(true);
  }

  function lightboxNavigate(dir) {
    setLightboxIndex((i) => {
      const next = i + dir;
      return next >= 0 && next < lightboxItems.length ? next : i;
    });
  }

  function showToast() {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3500);
  }

  function handleUploadSuccess() {
    setGalleryKey((k) => k + 1);
    showToast();
  }

  function handleLoginSuccess(username) {
    setUser({ username });
  }

  async function handleLogout() {
    try { await api.logout(); } catch (_) {}
    setUser(null);
  }

  function openUpload() {
    if (user) setUploadOpen(true);
    else setLoginOpen(true);
  }

  const heroImages = featured.slice(0, 4).map((a) => a.image_url);

  return (
    <>
      <Navbar
        onSubmitClick={openUpload}
        onLoginClick={() => setLoginOpen(true)}
        onLogout={handleLogout}
        user={user}
      />

      <Hero onSubmitClick={openUpload} heroImages={heroImages} isLoggedIn={!!user} />

      {featured.length > 0 && (
        <FeaturedWorks artworks={featured} onArtClick={openLightbox} />
      )}

      <Gallery key={galleryKey} onArtClick={openLightbox} />

      <Cinema onFilmClick={setActiveFilm} />

      <About onSubmitClick={openUpload} isLoggedIn={!!user} />

      <Footer onSubmitClick={openUpload} isLoggedIn={!!user} />

      {lightboxOpen && (
        <Lightbox
          items={lightboxItems}
          index={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={lightboxNavigate}
        />
      )}

      {activeFilm && (
        <CinemaModal film={activeFilm} onClose={() => setActiveFilm(null)} />
      )}

      {uploadOpen && (
        <UploadModal
          onClose={() => setUploadOpen(false)}
          onSuccess={handleUploadSuccess}
        />
      )}

      {loginOpen && (
        <LoginModal
          onClose={() => setLoginOpen(false)}
          onSuccess={handleLoginSuccess}
        />
      )}

      <Toast message="Your work has been submitted!" visible={toastVisible} />
    </>
  );
}
