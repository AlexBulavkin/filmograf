from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List, Optional
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


class MovieCreate(BaseModel):
    title: str
    genre: str
    duration: int  
    description: str
    is_favorite: bool = False
    image_url: str


class MovieUpdate(BaseModel):
    title: Optional[str] = None
    genre: Optional[str] = None
    duration: Optional[int] = None
    description: Optional[str] = None
    is_favorite: Optional[bool] = None
    image_url: Optional[str] = None


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


def get_next_id():
    """Генерирует следующий ID для нового фильма"""
    if not movies_data:
        return 1
    return max(movie["id"] for movie in movies_data) + 1


@app.get("/movies", response_model=List[Movie])
async def get_movies():
    """Возвращает список всех фильмов"""
    return movies_data

@app.get("/movies/favorites", response_model=List[Movie])
async def get_favorite_movies():
    """Возвращает список избранных фильмов"""
    favorite_movies = [movie for movie in movies_data if movie["is_favorite"]]
    return favorite_movies



@app.get("/movies/{movie_id}", response_model=Movie)
async def get_movie(movie_id: int):
    """Возвращает фильм по ID"""
    for movie in movies_data:
        if movie["id"] == movie_id:
            return movie
    raise HTTPException(status_code=404, detail="Фильм не найден")


@app.post("/movies", response_model=Movie)
async def create_movie(movie: MovieCreate):
    """Создает новый фильм"""
    new_movie = {
        "id": get_next_id(),
        "title": movie.title,
        "genre": movie.genre,
        "duration": movie.duration,
        "description": movie.description,
        "is_favorite": movie.is_favorite,
        "image_url": movie.image_url
    }
    movies_data.append(new_movie)
    return new_movie


@app.put("/movies/{movie_id}", response_model=Movie)
async def update_movie(movie_id: int, movie_update: MovieUpdate):
    """Полностью обновляет фильм"""
    for index, movie in enumerate(movies_data):
        if movie["id"] == movie_id:
            updated_movie = {
                "id": movie_id,
                "title": movie_update.title if movie_update.title is not None else movie["title"],
                "genre": movie_update.genre if movie_update.genre is not None else movie["genre"],
                "duration": movie_update.duration if movie_update.duration is not None else movie["duration"],
                "description": movie_update.description if movie_update.description is not None else movie["description"],
                "is_favorite": movie_update.is_favorite if movie_update.is_favorite is not None else movie["is_favorite"],
                "image_url": movie_update.image_url if movie_update.image_url is not None else movie["image_url"]
            }
            movies_data[index] = updated_movie
            return updated_movie
    raise HTTPException(status_code=404, detail="Фильм не найден")


@app.patch("/movies/{movie_id}", response_model=Movie)
async def partial_update_movie(movie_id: int, movie_update: MovieUpdate):
    """Частично обновляет фильм"""
    for index, movie in enumerate(movies_data):
        if movie["id"] == movie_id:
            updated_movie = movie.copy()
            if movie_update.title is not None:
                updated_movie["title"] = movie_update.title
            if movie_update.genre is not None:
                updated_movie["genre"] = movie_update.genre
            if movie_update.duration is not None:
                updated_movie["duration"] = movie_update.duration
            if movie_update.description is not None:
                updated_movie["description"] = movie_update.description
            if movie_update.is_favorite is not None:
                updated_movie["is_favorite"] = movie_update.is_favorite
            if movie_update.image_url is not None:
                updated_movie["image_url"] = movie_update.image_url
            
            movies_data[index] = updated_movie
            return updated_movie
    raise HTTPException(status_code=404, detail="Фильм не найден")


@app.delete("/movies/{movie_id}")
async def delete_movie(movie_id: int):
    """Удаляет фильм"""
    for index, movie in enumerate(movies_data):
        if movie["id"] == movie_id:
            deleted_movie = movies_data.pop(index)
            return {"message": f"Фильм '{deleted_movie['title']}' удален", "deleted_movie": deleted_movie}
    raise HTTPException(status_code=404, detail="Фильм не найден")


@app.get("/")
async def root():
    return {"message": "Movie API работает! Перейдите на /movies для получения списка фильмов"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)