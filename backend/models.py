from datetime import datetime, timezone
from extensions import db


class Artwork(db.Model):
    """Represents a single art piece uploaded by an artist."""

    __tablename__ = "artworks"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    artist = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(50), nullable=False)  # painting, photography, digital, sculpture, cinema, mixed, other
    year = db.Column(db.Integer)
    medium = db.Column(db.String(255))
    description = db.Column(db.Text)

    # Either a file stored locally (relative path under /uploads) or an external URL
    image_url = db.Column(db.String(1024))       # resolved URL served to the client
    file_path = db.Column(db.String(1024))       # local file path (if uploaded)

    featured = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "artist": self.artist,
            "category": self.category,
            "year": self.year,
            "medium": self.medium,
            "description": self.description,
            "image_url": self.image_url,
            "featured": self.featured,
            "created_at": self.created_at.isoformat(),
        }


class CinemaWork(db.Model):
    """Represents a short film or reel submitted by a filmmaker."""

    __tablename__ = "cinema_works"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    director = db.Column(db.String(255), nullable=False)
    year = db.Column(db.Integer)
    duration = db.Column(db.String(50))   # e.g. "14 min"
    genre = db.Column(db.String(100))

    thumbnail_url = db.Column(db.String(1024))  # still image / poster
    video_url = db.Column(db.String(1024))      # link to the actual film (optional)
    file_path = db.Column(db.String(1024))      # local file path (if uploaded)

    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "director": self.director,
            "year": self.year,
            "duration": self.duration,
            "genre": self.genre,
            "thumbnail_url": self.thumbnail_url,
            "video_url": self.video_url,
            "description": self.description,
            "created_at": self.created_at.isoformat(),
        }
