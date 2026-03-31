import os
import uuid
from flask import Blueprint, request, jsonify, send_from_directory, current_app, session
from werkzeug.utils import secure_filename
from extensions import db
from models import Artwork, CinemaWork, User

api_bp = Blueprint("api", __name__, url_prefix="/api")

ALLOWED_IMAGE_EXTENSIONS = {"jpg", "jpeg", "png", "gif", "webp", "bmp", "tiff"}
ALLOWED_VIDEO_EXTENSIONS = {"mp4", "mov", "avi", "mkv", "webm"}
ALLOWED_EXTENSIONS = ALLOWED_IMAGE_EXTENSIONS | ALLOWED_VIDEO_EXTENSIONS


def _allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def _save_file(file_storage):
    """Save an uploaded file to UPLOAD_FOLDER and return the relative URL."""
    filename = secure_filename(file_storage.filename)
    ext = filename.rsplit(".", 1)[-1].lower() if "." in filename else ""
    unique_name = f"{uuid.uuid4().hex}.{ext}"
    upload_folder = current_app.config["UPLOAD_FOLDER"]
    os.makedirs(upload_folder, exist_ok=True)
    dest = os.path.join(upload_folder, unique_name)
    file_storage.save(dest)
    return f"/api/uploads/{unique_name}", dest


# ── Authentication ──────────────────────────────────────────────────────────

@api_bp.route("/auth/login", methods=["POST"])
def login():
    data = request.get_json(silent=True) or {}
    username = data.get("username", "").strip()
    password = data.get("password", "")
    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400
    user = User.query.filter_by(username=username).first()
    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid credentials"}), 401
    session["user_id"] = user.id
    session["username"] = user.username
    return jsonify({"username": user.username})


@api_bp.route("/auth/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({"ok": True})


@api_bp.route("/auth/me", methods=["GET"])
def me():
    if "user_id" not in session:
        return jsonify({"user": None})
    return jsonify({"user": {"username": session["username"]}})


# ── Serve uploaded files ────────────────────────────────────────────────────
@api_bp.route("/uploads/<path:filename>")
def serve_upload(filename):
    return send_from_directory(current_app.config["UPLOAD_FOLDER"], filename)


# ── Artworks ────────────────────────────────────────────────────────────────

@api_bp.route("/artworks", methods=["GET"])
def get_artworks():
    """Return all artworks, optionally filtered by ?category=<name>."""
    category = request.args.get("category")
    query = Artwork.query
    if category:
        query = query.filter_by(category=category)
    artworks = query.order_by(Artwork.created_at.desc()).all()
    return jsonify([a.to_dict() for a in artworks])


@api_bp.route("/artworks/featured", methods=["GET"])
def get_featured():
    """Return artworks marked as featured."""
    artworks = (
        Artwork.query.filter_by(featured=True)
        .order_by(Artwork.created_at.desc())
        .limit(6)
        .all()
    )
    return jsonify([a.to_dict() for a in artworks])


@api_bp.route("/artworks/<int:artwork_id>", methods=["GET"])
def get_artwork(artwork_id):
    artwork = Artwork.query.get_or_404(artwork_id)
    return jsonify(artwork.to_dict())


@api_bp.route("/artworks", methods=["POST"])
def create_artwork():
    """
    Accept multipart/form-data with the following fields:
      name        (required) — artist name
      title       (required) — title of work
      category    (required) — one of the defined categories
      year        (optional) — integer year
      medium      (optional)
      description (optional)
      url         (optional) — direct URL to the artwork image/video
      file        (optional) — uploaded file (image or video)
    """
    if "user_id" not in session:
        return jsonify({"error": "Authentication required"}), 401

    name = request.form.get("name", "").strip()
    title = request.form.get("title", "").strip()
    category = request.form.get("category", "").strip()
    year_str = request.form.get("year", "").strip()
    medium = request.form.get("medium", "").strip() or None
    description = request.form.get("description", "").strip() or None
    url = request.form.get("url", "").strip() or None
    uploaded_file = request.files.get("file")

    # Validate required fields
    if not name or not title or not category:
        return jsonify({"error": "name, title, and category are required"}), 400

    if not url and not uploaded_file:
        return jsonify({"error": "Either a file upload or a URL is required"}), 400

    year = None
    if year_str:
        try:
            year = int(year_str)
        except ValueError:
            return jsonify({"error": "year must be an integer"}), 400

    image_url = url
    file_path = None

    if uploaded_file and uploaded_file.filename:
        if not _allowed_file(uploaded_file.filename):
            return jsonify({"error": "File type not allowed"}), 400
        image_url, file_path = _save_file(uploaded_file)

    artwork = Artwork(
        title=title,
        artist=name,
        category=category,
        year=year,
        medium=medium,
        description=description,
        image_url=image_url,
        file_path=file_path,
    )
    db.session.add(artwork)
    db.session.commit()
    return jsonify(artwork.to_dict()), 201


# ── Cinema ───────────────────────────────────────────────────────────────────

@api_bp.route("/cinema", methods=["GET"])
def get_cinema():
    """Return all cinema works."""
    films = CinemaWork.query.order_by(CinemaWork.created_at.desc()).all()
    return jsonify([f.to_dict() for f in films])


@api_bp.route("/cinema/<int:film_id>", methods=["GET"])
def get_cinema_work(film_id):
    film = CinemaWork.query.get_or_404(film_id)
    return jsonify(film.to_dict())


@api_bp.route("/cinema", methods=["POST"])
def create_cinema():
    """
    Accept multipart/form-data with the following fields:
      director    (required)
      title       (required)
      year        (optional)
      duration    (optional) — e.g. "14 min"
      genre       (optional)
      description (optional)
      url         (optional) — direct URL to the film or thumbnail
      file        (optional) — uploaded file (video or image thumbnail)
    """
    if "user_id" not in session:
        return jsonify({"error": "Authentication required"}), 401

    director = request.form.get("director", "").strip()
    title = request.form.get("title", "").strip()
    year_str = request.form.get("year", "").strip()
    duration = request.form.get("duration", "").strip() or None
    genre = request.form.get("genre", "").strip() or None
    description = request.form.get("description", "").strip() or None
    url = request.form.get("url", "").strip() or None
    uploaded_file = request.files.get("file")

    if not director or not title:
        return jsonify({"error": "director and title are required"}), 400

    year = None
    if year_str:
        try:
            year = int(year_str)
        except ValueError:
            return jsonify({"error": "year must be an integer"}), 400

    thumbnail_url = url
    file_path = None

    if uploaded_file and uploaded_file.filename:
        if not _allowed_file(uploaded_file.filename):
            return jsonify({"error": "File type not allowed"}), 400
        thumbnail_url, file_path = _save_file(uploaded_file)

    film = CinemaWork(
        title=title,
        director=director,
        year=year,
        duration=duration,
        genre=genre,
        description=description,
        thumbnail_url=thumbnail_url,
        file_path=file_path,
    )
    db.session.add(film)
    db.session.commit()
    return jsonify(film.to_dict()), 201
