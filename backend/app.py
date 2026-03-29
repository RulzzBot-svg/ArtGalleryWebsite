import os
from flask import Flask
from flask_cors import CORS
from config import Config
from extensions import db
from routes import api_bp


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Ensure upload folder exists
    os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

    # Extensions
    db.init_app(app)
    CORS(app, origins=app.config["CORS_ORIGINS"])

    # Blueprints
    app.register_blueprint(api_bp)

    # Create database tables if they don't exist yet
    with app.app_context():
        db.create_all()

    return app


if __name__ == "__main__":
    app = create_app()
    # Debug mode is controlled by the FLASK_DEBUG environment variable (default: off).
    # Never enable debug=True in production — it exposes an interactive debugger.
    debug = os.environ.get("FLASK_DEBUG", "0") == "1"
    app.run(debug=debug, port=5000)
