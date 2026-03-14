# Backend Developer Intern - Task Management Project

## 📌 Project Summary

This is a complete, production-ready REST API with authentication and role-based access control, plus a frontend UI.

**Time to setup:** ~5 minutes  
**Tech:** Node.js + Express + SQLite + JWT + React-like UI  
**Features:** User auth, Task CRUD, Role-based access, API docs

---

## 🎯 What's Included

### ✅ Backend
- Express.js REST API with JWT authentication
- SQLite database (easily upgradable to PostgreSQL)
- Role-based access control (user/admin)
- Complete CRUD for tasks
- Swagger API documentation
- Input validation & security best practices

### ✅ Frontend
- Clean, responsive UI (HTML/CSS/JS)
- User registration & login
- Task management dashboard
- Task CRUD operations
- Error handling & success messages

### ✅ Documentation
- Comprehensive README
- Quick Start guide
- Postman collection
- Swagger/OpenAPI docs (in-app)
- Scalability recommendations

---

## 🚀 Quick Start

### Backend
```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:5000
```

### Frontend
```bash
cd frontend
# Open index.html in browser OR
python -m http.server 8000
# Visit http://localhost:8000
```

---

## 📚 Full Documentation

- **README.md** - Complete setup and API reference
- **QUICK_START.md** - Fast setup guide
- **Postman Collection** - API testing ready
- **Swagger Docs** - Access at http://localhost:5000/api-docs

---

## 📋 Key Features

| Feature | Status | Location |
|---------|--------|----------|
| User Registration | ✅ | `/v1/auth/register` |
| User Login + JWT | ✅ | `/v1/auth/login` |
| Role-Based Access | ✅ | Admin/User roles |
| Task CRUD | ✅ | `/v1/tasks/*` |
| Admin Controls | ✅ | `/v1/admin/*` |
| Input Validation | ✅ | Joi schemas |
| API Docs | ✅ | Swagger/OpenAPI |
| Security | ✅ | Helmet, CORS, bcryptjs |
| Error Handling | ✅ | Consistent responses |

---

## 🗂️ Directory Structure

```
backend/               # Node.js Express API
├── src/
│   ├── index.js       # Main entry
│   ├── config/        # Database config
│   ├── middleware/    # Auth, validation
│   ├── models/        # User, Task models
│   └── routes/        # API endpoints
├── .env              # Configuration
└── package.json

frontend/             # HTML/CSS/JS UI
├── index.html        # Complete UI in one file
└── package.json

README.md             # Full documentation
QUICK_START.md        # Quick setup
.gitignore           # Git ignore
```

---

## 🔐 Security Implemented

✅ Password hashing (bcryptjs)  
✅ JWT token authentication  
✅ Role-based access control  
✅ Input validation (Joi)  
✅ CORS protection  
✅ Security headers (Helmet)  
✅ Ownership verification  
✅ Error sanitization  

---

## 📈 Scalability Roadmap

Read README.md for detailed scalability notes on:
- Database scaling (PostgreSQL, indexing)
- Caching (Redis)
- Microservices architecture
- Load balancing
- Docker deployment
- CI/CD pipelines
- Monitoring & logging

---

## 🧪 Testing

### Using Frontend UI
1. Open frontend in browser
2. Register a user
3. Login
4. Create/edit/delete tasks

### Using Postman
1. Import `backend/Task_Management_API.postman_collection.json`
2. Get token from login response
3. Test all endpoints

### Using Swagger
1. Start backend: `npm run dev`
2. Visit: http://localhost:5000/api-docs
3. Test endpoints directly

---

## 🎓 Learning Points

This project covers:
- RESTful API design
- JWT authentication flow
- Role-based access control
- Database schema design
- Input validation & sanitization
- Security best practices
- Error handling patterns
- API documentation
- Frontend-backend integration

Perfect for internship portfolios and learning backend development!

---

## 📞 Support

Refer to README.md for:
- Troubleshooting
- API reference
- Database schema
- Deployment guides

---

✨ **Ready to deploy or customize?** Check the full README.md for production recommendations!
