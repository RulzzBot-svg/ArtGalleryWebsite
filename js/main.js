/* ============================================================
   ARTHAUS — Main JavaScript
   Gallery data, rendering, filtering, lightbox, upload modal
   ============================================================ */

'use strict';

/* ── Artwork Data ─────────────────────────────────────────────── */
const artworks = [
  { id: 1,  title: 'The Weight of Blue',   artist: 'Mira Santos',     category: 'painting',     year: 2024, medium: 'Oil on canvas, 120 × 90 cm',        image: 'https://picsum.photos/seed/art001/600/780',  featured: true  },
  { id: 2,  title: 'Coastal Silence',      artist: 'Thomas Veil',     category: 'photography',  year: 2023, medium: 'Silver gelatin print, 60 × 80 cm',   image: 'https://picsum.photos/seed/art002/900/600',  featured: true  },
  { id: 3,  title: 'Recursion No. 4',      artist: 'Nadia Osei',      category: 'digital',      year: 2024, medium: 'Generative art, archival print',      image: 'https://picsum.photos/seed/art003/700/700',  featured: true  },
  { id: 4,  title: 'Terre',                artist: 'Camille Roux',    category: 'sculpture',    year: 2022, medium: 'Fired clay, pigment, 38 cm H',        image: 'https://picsum.photos/seed/art004/700/900'  },
  { id: 5,  title: 'After Rain',           artist: 'Leon Park',       category: 'photography',  year: 2024, medium: 'Film photography, C-print',           image: 'https://picsum.photos/seed/art005/800/540'  },
  { id: 6,  title: 'Meridian',             artist: 'Sofia Reyes',     category: 'painting',     year: 2023, medium: 'Acrylic on linen, 100 × 80 cm',       image: 'https://picsum.photos/seed/art006/620/820'  },
  { id: 7,  title: 'Form Study II',        artist: 'James Oh',        category: 'digital',      year: 2024, medium: '3D render, archival pigment print',   image: 'https://picsum.photos/seed/art007/700/700'  },
  { id: 8,  title: 'Untitled (Red)',       artist: 'Anya Berg',       category: 'painting',     year: 2023, medium: 'Oil on board, 50 × 60 cm',            image: 'https://picsum.photos/seed/art008/820/600'  },
  { id: 9,  title: 'Erosion',             artist: 'Marcus Hill',     category: 'photography',  year: 2024, medium: 'Large-format film, platinum print',   image: 'https://picsum.photos/seed/art009/600/900'  },
  { id: 10, title: 'Vessel',              artist: 'Yuki Tanaka',     category: 'sculpture',    year: 2023, medium: 'Porcelain, ash glaze, 22 cm H',        image: 'https://picsum.photos/seed/art010/700/820'  },
  { id: 11, title: 'Night Grid',          artist: 'Elena Voss',      category: 'digital',      year: 2024, medium: 'Digital illustration, pigment print', image: 'https://picsum.photos/seed/art011/900/580'  },
  { id: 12, title: 'Still',               artist: 'Ben Carr',        category: 'photography',  year: 2023, medium: 'Color film, C-print, 40 × 50 cm',     image: 'https://picsum.photos/seed/art012/620/780'  },
  { id: 13, title: 'Harvest',             artist: 'Nadia Osei',      category: 'painting',     year: 2024, medium: 'Mixed media on canvas, 90 × 110 cm',  image: 'https://picsum.photos/seed/art013/820/700'  },
  { id: 14, title: 'Bloom',               artist: 'Sofia Reyes',     category: 'digital',      year: 2023, medium: 'Digital painting, limited edition',   image: 'https://picsum.photos/seed/art014/700/900'  },
  { id: 15, title: 'Fissure',             artist: 'Thomas Veil',     category: 'photography',  year: 2024, medium: 'Digital photography, archival ink',   image: 'https://picsum.photos/seed/art015/800/560'  },
  { id: 16, title: 'Hollow',              artist: 'James Oh',        category: 'sculpture',    year: 2024, medium: 'Cast bronze, 48 cm H',                image: 'https://picsum.photos/seed/art016/660/820'  },
  { id: 17, title: 'Transmission',        artist: 'Amara Liu',       category: 'cinema',       year: 2024, medium: 'Short film, 16 mm, 14 min',           image: 'https://picsum.photos/seed/art017/820/620'  },
  { id: 18, title: 'Salt Flat',           artist: 'Mira Santos',     category: 'painting',     year: 2023, medium: 'Watercolour on paper, 70 × 50 cm',    image: 'https://picsum.photos/seed/art018/680/900'  },
  { id: 19, title: 'Adjacency',           artist: 'Kai Patel',       category: 'digital',      year: 2024, medium: 'Motion graphics, archival print',     image: 'https://picsum.photos/seed/art019/900/640'  },
  { id: 20, title: 'Open Field',          artist: 'Clara Mendes',    category: 'photography',  year: 2024, medium: 'Medium format film, silver gelatin',  image: 'https://picsum.photos/seed/art020/700/860'  },
];

const cinemaWorks = [
  { id: 1, title: 'Drift',               director: 'Amara Liu',       year: 2024, duration: '12 min', genre: 'Experimental', thumbnail: 'https://picsum.photos/seed/film001/1200/675' },
  { id: 2, title: 'The Quiet Hour',      director: 'Felix Nakamura',  year: 2023, duration: '8 min',  genre: 'Documentary',  thumbnail: 'https://picsum.photos/seed/film002/1200/675' },
  { id: 3, title: 'Parallax',            director: 'Ingrid Holm',     year: 2024, duration: '18 min', genre: 'Narrative',    thumbnail: 'https://picsum.photos/seed/film003/1200/675' },
  { id: 4, title: 'Vesper',              director: 'Kaya Brown',      year: 2024, duration: '6 min',  genre: 'Experimental', thumbnail: 'https://picsum.photos/seed/film004/1200/675' },
  { id: 5, title: 'Still Life in Motion',director: 'Paulo Sanz',      year: 2023, duration: '22 min', genre: 'Art film',     thumbnail: 'https://picsum.photos/seed/film005/1200/675' },
  { id: 6, title: 'Aperture',            director: 'Amara Liu',       year: 2024, duration: '15 min', genre: 'Documentary',  thumbnail: 'https://picsum.photos/seed/film006/1200/675' },
];

/* ── Lightbox State ───────────────────────────────────────────── */
let lightboxItems  = [];
let lightboxIndex  = 0;

/* ── DOM Refs ─────────────────────────────────────────────────── */
const navbar            = document.getElementById('navbar');
const navToggle         = document.getElementById('navToggle');
const mobileMenu        = document.getElementById('mobileMenu');
const featuredGrid      = document.getElementById('featuredGrid');
const galleryGrid       = document.getElementById('galleryGrid');
const galleryEmpty      = document.getElementById('galleryEmpty');
const filterBar         = document.getElementById('filterBar');
const cinemaGrid        = document.getElementById('cinemaGrid');
const heroBgStrip       = document.getElementById('heroBgStrip');

const lightbox          = document.getElementById('lightbox');
const lightboxClose     = document.getElementById('lightboxClose');
const lightboxPrev      = document.getElementById('lightboxPrev');
const lightboxNext      = document.getElementById('lightboxNext');
const lightboxImg       = document.getElementById('lightboxImg');
const lightboxInfo      = document.getElementById('lightboxInfo');

const cinemaLightbox    = document.getElementById('cinemaLightbox');
const cinemaLightboxClose = document.getElementById('cinemaLightboxClose');
const cinemaLightboxThumb = document.getElementById('cinemaLightboxThumb');
const cinemaLightboxTitle = document.getElementById('cinemaLightboxTitle');
const cinemaLightboxInfo  = document.getElementById('cinemaLightboxInfo');

const uploadOverlay     = document.getElementById('uploadOverlay');
const modalClose        = document.getElementById('modalClose');
const uploadForm        = document.getElementById('uploadForm');
const fileInput         = document.getElementById('fileInput');
const uploadFilename    = document.getElementById('uploadFilename');
const uploadArea        = document.getElementById('uploadArea');
const toast             = document.getElementById('toast');

/* ── Navbar Scroll ────────────────────────────────────────────── */
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ── Mobile Menu Toggle ───────────────────────────────────────── */
navToggle.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
});

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

/* ── Hero Background Strip ────────────────────────────────────── */
function buildHeroStrip() {
  const stripImages = [
    artworks[0].image, artworks[5].image,
    artworks[8].image, artworks[12].image,
  ];
  stripImages.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    img.className = 'hero-bg-strip-img';
    img.loading = 'lazy';
    heroBgStrip.appendChild(img);
  });
}

/* ── Featured Grid ────────────────────────────────────────────── */
function buildFeatured() {
  const featured = artworks.filter(a => a.featured).slice(0, 3);
  featured.forEach((art, i) => {
    const item = document.createElement('div');
    item.className = 'featured-item reveal';
    item.style.transitionDelay = `${i * 0.1}s`;
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-label', `View ${art.title} by ${art.artist}`);

    item.innerHTML = `
      <img src="${art.image}" alt="${art.title} by ${art.artist}" loading="lazy" />
      <div class="featured-overlay">
        <span class="featured-overlay-tag">${art.category}</span>
        <p class="featured-overlay-title">${art.title}</p>
        <p class="featured-overlay-artist">${art.artist} &mdash; ${art.year}</p>
      </div>
    `;

    item.addEventListener('click', () => openLightbox(art, featured));
    item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(art, featured); } });
    featuredGrid.appendChild(item);
  });
}

/* ── Gallery Grid ─────────────────────────────────────────────── */
function buildGallery(filter = 'all') {
  galleryGrid.innerHTML = '';
  const items = filter === 'all' ? artworks : artworks.filter(a => a.category === filter);

  galleryEmpty.hidden = items.length > 0;

  items.forEach((art, i) => {
    const item = document.createElement('div');
    item.className = 'gallery-item reveal';
    item.style.transitionDelay = `${(i % 8) * 0.06}s`;
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-label', `View ${art.title} by ${art.artist}`);

    item.innerHTML = `
      <img src="${art.image}" alt="${art.title} by ${art.artist}" loading="lazy" />
      <div class="gallery-overlay">
        <span class="gallery-overlay-cat">${art.category}</span>
        <p class="gallery-overlay-title">${art.title}</p>
        <p class="gallery-overlay-artist">${art.artist}</p>
      </div>
    `;

    item.addEventListener('click', () => openLightbox(art, items));
    item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(art, items); } });
    galleryGrid.appendChild(item);
  });

  // Re-observe newly added items
  galleryGrid.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

/* ── Filter Tabs ──────────────────────────────────────────────── */
filterBar.addEventListener('click', e => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;

  filterBar.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-selected', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-selected', 'true');

  buildGallery(btn.dataset.filter);
});

/* ── Cinema Grid ──────────────────────────────────────────────── */
function buildCinema() {
  cinemaWorks.forEach((film, i) => {
    const card = document.createElement('div');
    card.className = 'cinema-card reveal';
    card.style.transitionDelay = `${i * 0.08}s`;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `View film: ${film.title} by ${film.director}`);

    card.innerHTML = `
      <img src="${film.thumbnail}" alt="${film.title}" loading="lazy" />
      <div class="cinema-card-overlay">
        <div class="cinema-play-btn" aria-hidden="true">&#9654;</div>
        <div class="cinema-card-info">
          <p class="cinema-card-title">${film.title}</p>
          <p class="cinema-card-meta">${film.director} &mdash; ${film.year} &mdash; ${film.duration} &mdash; ${film.genre}</p>
        </div>
      </div>
    `;

    card.addEventListener('click', () => openCinemaLightbox(film));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCinemaLightbox(film); } });
    cinemaGrid.appendChild(card);
  });
}

/* ── Lightbox ─────────────────────────────────────────────────── */
function openLightbox(art, items) {
  lightboxItems = items;
  lightboxIndex = items.indexOf(art);
  renderLightboxSlide();
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  lightboxClose.focus();
}

function renderLightboxSlide() {
  const art = lightboxItems[lightboxIndex];
  lightboxImg.src = art.image;
  lightboxImg.alt = `${art.title} by ${art.artist}`;
  lightboxInfo.innerHTML = `
    <p class="lb-title">${art.title}</p>
    <p class="lb-artist">${art.artist}</p>
    <p class="lb-meta">${art.medium} &mdash; ${art.year}</p>
  `;
  lightboxPrev.style.visibility = lightboxIndex > 0 ? 'visible' : 'hidden';
  lightboxNext.style.visibility = lightboxIndex < lightboxItems.length - 1 ? 'visible' : 'hidden';
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = '';
}

function lightboxNav(dir) {
  const next = lightboxIndex + dir;
  if (next >= 0 && next < lightboxItems.length) {
    lightboxIndex = next;
    renderLightboxSlide();
  }
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => lightboxNav(-1));
lightboxNext.addEventListener('click', () => lightboxNav(1));
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

/* ── Cinema Lightbox ──────────────────────────────────────────── */
function openCinemaLightbox(film) {
  cinemaLightboxThumb.src = film.thumbnail;
  cinemaLightboxThumb.alt = film.title;
  cinemaLightboxTitle.textContent = film.title;
  cinemaLightboxInfo.innerHTML = `
    <p class="lb-title">${film.title}</p>
    <p class="lb-artist">Dir. ${film.director}</p>
    <p class="lb-meta">${film.year} &mdash; ${film.duration} &mdash; ${film.genre}</p>
  `;
  cinemaLightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  cinemaLightboxClose.focus();
}

cinemaLightboxClose.addEventListener('click', () => {
  cinemaLightbox.hidden = true;
  document.body.style.overflow = '';
});
cinemaLightbox.addEventListener('click', e => {
  if (e.target === cinemaLightbox) {
    cinemaLightbox.hidden = true;
    document.body.style.overflow = '';
  }
});

/* ── Keyboard Navigation ──────────────────────────────────────── */
document.addEventListener('keydown', e => {
  if (!lightbox.hidden) {
    if (e.key === 'Escape')      closeLightbox();
    else if (e.key === 'ArrowLeft')  lightboxNav(-1);
    else if (e.key === 'ArrowRight') lightboxNav(1);
  }
  if (!cinemaLightbox.hidden && e.key === 'Escape') {
    cinemaLightbox.hidden = true;
    document.body.style.overflow = '';
  }
  if (!uploadOverlay.hidden && e.key === 'Escape') closeUpload();
});

/* ── Upload Modal ─────────────────────────────────────────────── */
function openUpload() {
  uploadOverlay.hidden = false;
  document.body.style.overflow = 'hidden';
  document.getElementById('modalClose').focus();
}

function closeUpload() {
  uploadOverlay.hidden = true;
  document.body.style.overflow = '';
}

document.getElementById('navSubmitBtn').addEventListener('click', openUpload);
document.getElementById('heroSubmitBtn').addEventListener('click', openUpload);
document.getElementById('aboutSubmitBtn').addEventListener('click', openUpload);
document.getElementById('mobileSubmitBtn').addEventListener('click', () => { closeMobileMenu(); openUpload(); });
document.querySelector('.footer-submit-link').addEventListener('click', e => { e.preventDefault(); openUpload(); });

modalClose.addEventListener('click', closeUpload);
uploadOverlay.addEventListener('click', e => { if (e.target === uploadOverlay) closeUpload(); });

/* File input feedback */
fileInput.addEventListener('change', () => {
  if (fileInput.files.length > 0) {
    uploadFilename.textContent = fileInput.files[0].name;
    uploadFilename.hidden = false;
  } else {
    uploadFilename.hidden = true;
  }
});

/* Drag & drop */
uploadArea.addEventListener('dragover', e => {
  e.preventDefault();
  uploadArea.style.borderColor = 'var(--text)';
});
uploadArea.addEventListener('dragleave', () => {
  uploadArea.style.borderColor = '';
});
uploadArea.addEventListener('drop', e => {
  e.preventDefault();
  uploadArea.style.borderColor = '';
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    fileInput.files = files;
    uploadFilename.textContent = files[0].name;
    uploadFilename.hidden = false;
  }
});

/* Form submit */
uploadForm.addEventListener('submit', e => {
  e.preventDefault();

  const name     = document.getElementById('fieldName').value.trim();
  const title    = document.getElementById('fieldTitle').value.trim();
  const category = document.getElementById('fieldCategory').value;

  if (!name || !title || !category) {
    highlightInvalid();
    return;
  }

  closeUpload();
  uploadForm.reset();
  uploadFilename.hidden = true;
  showToast();
});

function highlightInvalid() {
  ['fieldName', 'fieldTitle', 'fieldCategory'].forEach(id => {
    const el = document.getElementById(id);
    if (!el.value.trim()) {
      el.style.borderColor = '#e53935';
      el.addEventListener('input', () => { el.style.borderColor = ''; }, { once: true });
    }
  });
}

/* ── Toast ────────────────────────────────────────────────────── */
function showToast() {
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

/* ── Scroll Reveal (IntersectionObserver) ─────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

function observeReveal() {
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

/* ── Init ─────────────────────────────────────────────────────── */
buildHeroStrip();
buildFeatured();
buildGallery();
buildCinema();
observeReveal();
