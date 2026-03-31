import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    # ──────────────────────────────────────────────────────────────────────────
    # DATABASE — Neon PostgreSQL
    # Replace the placeholder below with your Neon connection string, which
    # looks like:
    #   postgresql://user:password@ep-xyz.us-east-2.aws.neon.tech/neondb?sslmode=require
    #
    # You can set it as an environment variable DATABASE_URL (recommended) or
    # paste it directly here.  The .env file in /backend is gitignored so it
    # is safe to put credentials there.
    # ──────────────────────────────────────────────────────────────────────────
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL",
        "postgresql://YOUR_USER:YOUR_PASSWORD@YOUR_HOST.neon.tech/neondb?sslmode=require",  # <-- INSERT YOUR NEON URL HERE
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Upload storage (local folder for uploaded files)
    UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), "uploads")
    MAX_CONTENT_LENGTH = 200 * 1024 * 1024  # 200 MB

    # CORS — allow the Vite dev server and any production origin
    CORS_ORIGINS = os.environ.get("CORS_ORIGINS", "http://localhost:5173").split(",")

    SECRET_KEY = os.environ.get("SECRET_KEY", "change-me-in-production")

    # Session cookie — cross-origin (Vercel frontend + backend on separate domains) needs
    # SameSite=None + Secure. Set these env vars in production; leave unset for local dev.
    SESSION_COOKIE_SAMESITE = os.environ.get("SESSION_COOKIE_SAMESITE", "Lax")
    SESSION_COOKIE_SECURE = os.environ.get("SESSION_COOKIE_SECURE", "false").lower() == "true"
