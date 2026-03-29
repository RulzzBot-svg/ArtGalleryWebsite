"""
seed.py — Populate the database with sample artworks and cinema works.

Run once after creating the schema:
  cd backend
  python seed.py
"""
from app import create_app
from extensions import db
from models import Artwork, CinemaWork

SAMPLE_ARTWORKS = [
    dict(title="The Weight of Blue",    artist="Mira Santos",  category="painting",    year=2024, medium="Oil on canvas, 120 × 90 cm",      image_url="https://picsum.photos/seed/art001/600/780", featured=True),
    dict(title="Coastal Silence",       artist="Thomas Veil", category="photography", year=2023, medium="Silver gelatin print, 60 × 80 cm", image_url="https://picsum.photos/seed/art002/900/600", featured=True),
    dict(title="Recursion No. 4",       artist="Nadia Osei",  category="digital",     year=2024, medium="Generative art, archival print",   image_url="https://picsum.photos/seed/art003/700/700", featured=True),
    dict(title="Terre",                 artist="Camille Roux",category="sculpture",   year=2022, medium="Fired clay, pigment, 38 cm H",     image_url="https://picsum.photos/seed/art004/700/900"),
    dict(title="After Rain",            artist="Leon Park",   category="photography", year=2024, medium="Film photography, C-print",         image_url="https://picsum.photos/seed/art005/800/540"),
    dict(title="Meridian",              artist="Sofia Reyes", category="painting",    year=2023, medium="Acrylic on linen, 100 × 80 cm",    image_url="https://picsum.photos/seed/art006/620/820"),
    dict(title="Form Study II",         artist="James Oh",    category="digital",     year=2024, medium="3D render, archival pigment print", image_url="https://picsum.photos/seed/art007/700/700"),
    dict(title="Untitled (Red)",        artist="Anya Berg",   category="painting",    year=2023, medium="Oil on board, 50 × 60 cm",         image_url="https://picsum.photos/seed/art008/820/600"),
    dict(title="Erosion",               artist="Marcus Hill", category="photography", year=2024, medium="Large-format film, platinum print", image_url="https://picsum.photos/seed/art009/600/900"),
    dict(title="Vessel",                artist="Yuki Tanaka", category="sculpture",   year=2023, medium="Porcelain, ash glaze, 22 cm H",     image_url="https://picsum.photos/seed/art010/700/820"),
    dict(title="Night Grid",            artist="Elena Voss",  category="digital",     year=2024, medium="Digital illustration, pigment print",image_url="https://picsum.photos/seed/art011/900/580"),
    dict(title="Still",                 artist="Ben Carr",    category="photography", year=2023, medium="Color film, C-print, 40 × 50 cm",  image_url="https://picsum.photos/seed/art012/620/780"),
    dict(title="Harvest",               artist="Nadia Osei",  category="painting",    year=2024, medium="Mixed media on canvas, 90 × 110 cm",image_url="https://picsum.photos/seed/art013/820/700"),
    dict(title="Bloom",                 artist="Sofia Reyes", category="digital",     year=2023, medium="Digital painting, limited edition", image_url="https://picsum.photos/seed/art014/700/900"),
    dict(title="Fissure",               artist="Thomas Veil", category="photography", year=2024, medium="Digital photography, archival ink", image_url="https://picsum.photos/seed/art015/800/560"),
    dict(title="Hollow",                artist="James Oh",    category="sculpture",   year=2024, medium="Cast bronze, 48 cm H",              image_url="https://picsum.photos/seed/art016/660/820"),
    dict(title="Transmission",          artist="Amara Liu",   category="cinema",      year=2024, medium="Short film, 16 mm, 14 min",        image_url="https://picsum.photos/seed/art017/820/620"),
    dict(title="Salt Flat",             artist="Mira Santos", category="painting",    year=2023, medium="Watercolour on paper, 70 × 50 cm", image_url="https://picsum.photos/seed/art018/680/900"),
    dict(title="Adjacency",             artist="Kai Patel",   category="digital",     year=2024, medium="Motion graphics, archival print",  image_url="https://picsum.photos/seed/art019/900/640"),
    dict(title="Open Field",            artist="Clara Mendes",category="photography", year=2024, medium="Medium format film, silver gelatin",image_url="https://picsum.photos/seed/art020/700/860"),
]

SAMPLE_CINEMA = [
    dict(title="Drift",                director="Amara Liu",      year=2024, duration="12 min", genre="Experimental", thumbnail_url="https://picsum.photos/seed/film001/1200/675"),
    dict(title="The Quiet Hour",       director="Felix Nakamura", year=2023, duration="8 min",  genre="Documentary",  thumbnail_url="https://picsum.photos/seed/film002/1200/675"),
    dict(title="Parallax",             director="Ingrid Holm",    year=2024, duration="18 min", genre="Narrative",    thumbnail_url="https://picsum.photos/seed/film003/1200/675"),
    dict(title="Vesper",               director="Kaya Brown",     year=2024, duration="6 min",  genre="Experimental", thumbnail_url="https://picsum.photos/seed/film004/1200/675"),
    dict(title="Still Life in Motion", director="Paulo Sanz",     year=2023, duration="22 min", genre="Art film",     thumbnail_url="https://picsum.photos/seed/film005/1200/675"),
    dict(title="Aperture",             director="Amara Liu",      year=2024, duration="15 min", genre="Documentary",  thumbnail_url="https://picsum.photos/seed/film006/1200/675"),
]


def seed():
    app = create_app()
    with app.app_context():
        if Artwork.query.count() == 0:
            for data in SAMPLE_ARTWORKS:
                db.session.add(Artwork(**data))
            print(f"Inserted {len(SAMPLE_ARTWORKS)} artworks.")
        else:
            print("Artworks table already has data — skipping.")

        if CinemaWork.query.count() == 0:
            for data in SAMPLE_CINEMA:
                db.session.add(CinemaWork(**data))
            print(f"Inserted {len(SAMPLE_CINEMA)} cinema works.")
        else:
            print("Cinema works table already has data — skipping.")

        db.session.commit()
        print("Seed complete.")


if __name__ == "__main__":
    seed()
