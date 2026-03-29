# ARTHAUS

An open art gallery built with **React + Tailwind CSS** (frontend) and **Flask + Neon PostgreSQL** (backend).

---

## Project Structure

```
ArtGalleryWebsite/
├── frontend/          # React 19 + Vite + Tailwind CSS
│   └── src/
│       ├── components/   # Navbar, Hero, Gallery, Cinema, Lightbox, etc.
│       ├── services/     # api.js — all API calls to the Flask backend
│       ├── App.jsx
│       └── main.jsx
└── backend/           # Flask REST API
    ├── app.py          # Application factory
    ├── config.py       # Configuration — set your Neon DB URL here
    ├── extensions.py   # SQLAlchemy instance
    ├── models.py       # Artwork, CinemaWork models
    ├── routes.py       # /api/* routes
    ├── seed.py         # Populate DB with sample data
    └── requirements.txt
```

---

## Quick Start

### 1. Backend (Flask + Neon)

```bash
cd backend
python -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Configure your Neon database
cp .env.example .env
# Edit .env and set DATABASE_URL to your Neon connection string
# (See https://neon.tech → your project → Connection Details → Connection String)

# Run the server
python app.py
# → http://localhost:5000
```

**First-time setup:** After the server starts, seed the database with sample data:
```bash
python seed.py
```

#### Connecting to Neon

1. Create a project at [neon.tech](https://neon.tech)
2. Go to **Connection Details** → copy the **Connection String**
3. Paste it into `backend/.env` as `DATABASE_URL`
4. The string looks like:
   ```
   postgresql://user:password@ep-xyz.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

---

### 2. Frontend (React + Tailwind)

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

The Vite dev server proxies `/api/*` requests to `http://localhost:5000`, so both servers need to run simultaneously.

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/artworks` | List all artworks (optional `?category=`) |
| `GET` | `/api/artworks/featured` | List featured artworks |
| `GET` | `/api/artworks/:id` | Get a single artwork |
| `POST` | `/api/artworks` | Upload a new artwork |
| `GET` | `/api/cinema` | List all cinema works |
| `GET` | `/api/cinema/:id` | Get a single cinema work |
| `POST` | `/api/cinema` | Upload a new cinema work |
| `GET` | `/api/uploads/:filename` | Serve an uploaded file |

### POST `/api/artworks` — form fields

| Field | Required | Description |
|-------|----------|-------------|
| `name` | ✅ | Artist name |
| `title` | ✅ | Title of work |
| `category` | ✅ | `painting`, `photography`, `digital`, `sculpture`, `cinema`, `mixed`, `other` |
| `year` | — | Year created |
| `medium` | — | Medium / technique |
| `description` | — | Optional description |
| `url` | ✅ or `file` | Direct URL to image/video |
| `file` | ✅ or `url` | File upload (image or video, max 200 MB) |

---

## Production

```bash
# Backend
gunicorn "app:create_app()" --bind 0.0.0.0:5000

# Frontend
cd frontend && npm run build
# Serve dist/ with Nginx or any static host
```
