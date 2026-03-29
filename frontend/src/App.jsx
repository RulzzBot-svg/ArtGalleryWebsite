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
import Toast from './components/Toast';
import { api } from './services/api';

export default function App() {
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

  const heroImages = featured.slice(0, 4).map((a) => a.image_url);

  return (
    <>
      <Navbar onSubmitClick={() => setUploadOpen(true)} />

      <Hero onSubmitClick={() => setUploadOpen(true)} heroImages={heroImages} />

      {featured.length > 0 && (
        <FeaturedWorks artworks={featured} onArtClick={openLightbox} />
      )}

      <Gallery key={galleryKey} onArtClick={openLightbox} />

      <Cinema onFilmClick={setActiveFilm} />

      <About onSubmitClick={() => setUploadOpen(true)} />

      <Footer onSubmitClick={() => setUploadOpen(true)} />

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

      <Toast message="Your work has been submitted!" visible={toastVisible} />
    </>
  );
}
