# 🚀 Django React Notes App

Full-stack Notes application built with Django REST Framework and React.

## ✨ Features

- JWT Authentication (Login / Register)
- Protected Routes
- Create Notes
- Delete Notes
- User-specific notes (multi-user)
- Token refresh flow
- Axios interceptor auth handling

## 🧠 Tech Stack

### Backend
- Django
- Django REST Framework
- SimpleJWT

### Frontend
- React (Vite)
- React Router
- Axios

## 🔐 Authentication Flow

- Login → obtain access & refresh tokens
- Tokens stored in localStorage
- Axios interceptor adds Authorization header
- Auto refresh when token expires

## 📦 API Endpoints

- POST `/api/token/`
- POST `/api/token/refresh/`
- POST `/api/user/register/`
- GET `/api/notes/`
- POST `/api/notes/`
- DELETE `/api/notes/delete/:id/`

## ⚙️ Run Locally

### Backend
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
