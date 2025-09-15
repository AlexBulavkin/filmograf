from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List
import os

app = FastAPI(title="Movie API", version="1.0.0")

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Обслуживание статических файлов
app.mount("/static", StaticFiles(directory="static"), name="static")

# Создаем папку если её нет
os.makedirs("static/images", exist_ok=True)


class Movie(BaseModel):
    id: int
    title: str
    genre: str
    duration: int  
    description: str
    is_favorite: bool
    image_url: str


movies_data = [
    {
        "id": 1,
        "title": "Матрица",
        "genre": "Боевик",
        "duration": 136,
        "description": "Интересный фильм",
        "is_favorite": False,
        "image_url": "http://localhost:8000/static/images/matrix.png"
    },
    {
        "id": 2,
        "title": "Безумный Макс",
        "genre": "Боевик",
        "duration": 88,
        "description": "Интересный фильм",
        "is_favorite": False,
        "image_url": "http://localhost:8000/static/images/madmax.png"
    },
    {
        "id": 3,
        "title": "Джентельмены",
        "genre": "Драма",
        "duration": 113,
        "description": "Интересный фильм",
        "is_favorite": False,
        "image_url": "http://localhost:8000/static/images/gentelman.png"
    },
    {
        "id": 4,
        "title": "Отступники",
        "genre": "Триллер",
        "duration": 151,
        "description": "Интересный фильм",
        "is_favorite": False,
        "image_url": "http://localhost:8000/static/images/departed.png"
    },
    {
        "id": 5,
        "title": "Гладиатор",
        "genre": "Боевик",
        "duration": 155,
        "description": "Интересный фильм",
        "is_favorite": False,
        "image_url": "http://localhost:8000/static/images/gladiator.png"
    },
    {
        "id": 6,
        "title": "Однажды в Голливуде",
        "genre": "Драма",
        "duration": 161,
        "description": "Интересный фильм",
        "is_favorite": False,
        "image_url": "http://localhost:8000/static/images/hollywood.png"
    },
    {
        "id": 7,
        "title": "Предложение",
        "genre": "Комедия",
        "duration": 106,
        "description": "Интересный фильм",
        "is_favorite": False,
        "image_url": "http://localhost:8000/static/images/proposal.png"
    },
    {
        "id": 8,
        "title": "Малышка на миллион",
        "genre": "Драма",
        "duration": 132,
        "description": "Интересный фильм",
        "is_favorite": False,
        "image_url": "http://localhost:8000/static/images/baby.png"
    },
    {
        "id": 9,
        "title": "Ларри Краун",
        "genre": "Комедия",
        "duration": 98,
        "description": "Интересный фильм",
        "is_favorite": False,
        "image_url": "http://localhost:8000/static/images/larry.png"
    }
]

@app.get("/movies", response_model=List[Movie])
async def get_movies():
    """Возвращает список всех фильмов"""
    return movies_data

@app.get("/movies/{movie_id}", response_model=Movie)
async def get_movie(movie_id: int):
    """Возвращает фильм по ID"""
    for movie in movies_data:
        if movie["id"] == movie_id:
            return movie
    return {"error": "Фильм не найден"}

@app.get("/")
async def root():
    return {"message": "Movie API работает! Перейдите на /movies для получения списка фильмов"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)