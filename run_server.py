"""
FastAPI Server Launcher
Run with: python run_server.py
Or: uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
"""

import uvicorn
from backend.config import settings

if __name__ == "__main__":
    print(f"Starting {settings.PROJECT_NAME} on http://{settings.HOST}:{settings.PORT}...")
    print(f"Interactive Swagger documentation available at: http://{settings.HOST}:{settings.PORT}/docs")
    print(f"ReDoc alternative documentation available at: http://{settings.HOST}:{settings.PORT}/redoc")
    uvicorn.run("backend.main:app", host=settings.HOST, port=settings.PORT, reload=True)
