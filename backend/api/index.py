"""
Vercel serverless entry point.
Vercel looks for `app` (the WSGI callable) in this file.
"""
import sys
import os

# Make the backend root importable so config/models/routes resolve correctly
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import create_app

app = create_app()
