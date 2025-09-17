# 🎬 Filmograf  
Сервис для управления коллекцией фильмов с React фронтендом и FastAPI бэкендом.

# 🚀 Быстрый старт  
Предварительные требования:  
Node.js 16 или выше  
Python 3.8 или выше  
npm  

1. Клонирование репозитория
`git clone https://github.com/AlexBulavkin/filmograf.git`  
2. Запуск бэкенда (FastAPI)  
Переходим в папку бэкенда  
`cd server`  
Создаем виртуальное окружение  
`python3 -m venv venv`  
Активируем виртуальное окружение  
Для Windows:  
`venv\Scripts\activate`  
Для MacOS/Linux:   
`source venv/bin/activate`  
Устанавливаем зависимости  
`pip install -r requirements.txt`  
Запускаем сервер  
`uvicorn main:app --reload`  
📊 Бэкенд будет доступен по адресу: http://localhost:8000  
📖 Документация API: http://localhost:8000/docs  

3. Запуск фронтенда (React + Vite)  
Открываем новое окно терминала
Устанавливаем зависимости  
`npm install`  
Запускаем dev сервер  
`npm run dev`  
🌐 Фронтенд будет доступен по адресу: http://localhost:5173  

# 🛠 Технологии
Фронтенд  
⚡ Vite — быстрый сборщик  
⚛️ React — UI библиотека     
🎨 Chakra UI — система компонентов  
📋 React Hook Form — управление формами  
🔄 Axios — HTTP клиент

Бэкенд  
🐍 FastAPI — современный Python фреймворк    
🌐 Uvicorn — ASGI сервер  

# 📋 Функциональность
✅ Просмотр списка фильмов  
✅ Добавление и редактирование фильмов  
✅ Добавление в избранное  
✅ Фильтрация по жанрам  
✅ Информация о длительности
