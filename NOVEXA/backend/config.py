import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    DEBUG = True
    GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
    MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
    CORS_ORIGINS = ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"]
