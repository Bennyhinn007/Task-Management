# Quick Start Guide

## 🚀 One-Command Setup

### Backend (Terminal 1)
```bash
cd backend
npm install
npm run dev
```
Backend runs on: **http://localhost:5000**

### Frontend (Terminal 2)
```bash
cd frontend
# Option 1: Open index.html directly in browser
# Option 2: Use Python server
python -m http.server 8000
# Or use Node's http-server
npx http-server
```
Frontend runs on: **http://localhost:3000** (or local file)

---

## 📌 First Time Testing

1. **Open Frontend:** http://localhost:3000 (or open frontend/index.html)
2. **Register:**
   - Name: John Developer
   - Email: john@dev.com
   - Password: password123
3. **Login:**
   - Email: john@dev.com
   - Password: password123
4. **Create Task:**
   - Title: "Complete Backend Project"
   - Description: "Implement all APIs"
   - Priority: high
5. **Try API Docs:**
   - Visit: http://localhost:5000/api-docs
   - Test endpoints directly from Swagger

---

## 🧪 Manual API Testing (cURL)

### Register
```bash
curl -X POST http://localhost:5000/v1/auth/register \
  -H "Content-Type: application/json" \
  -d {\"name\":\"Test\",\"email\":\"test@test.com\",\"password\":\"pass123\"}
```

### Login & Get Token
```bash
curl -X POST http://localhost:5000/v1/auth/login \
  -H "Content-Type: application/json" \
  -d {\"email\":\"test@test.com\",\"password\":\"pass123\"}
```

### Create Task (Replace TOKEN with actual token)
```bash
curl -X POST http://localhost:5000/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d {\"title\":\"My Task\",\"description\":\"Test\",\"priority\":\"high\"}
```

### Get All Tasks
```bash
curl -X GET http://localhost:5000/v1/tasks \
  -H "Authorization: Bearer TOKEN"
```

---

## 📊 Project Checklist

✅ BackEnd:
  - User registration & login
  - JWT authentication
  - Role-based access (user vs admin)
  - CRUD for Tasks
  - Input validation
  - Security (password hashing, CORS, Helmet)
  - Error handling
  - API versioning (/v1/)

✅ Frontend:
  - UI for registration
  - UI for login
  - Protected dashboard
  - Task creation form
  - Task list display
  - Edit/delete functionality
  - Token persistence
  - Error/success messages

✅ Documentation:
  - API Swagger/OpenAPI docs
  - Postman collection
  - README with full setup
  - Scalability notes
  - This quick start guide

✅ Database:
  - Users table with roles
  - Tasks table with relationships
  - Auto timestamps
  - Input validation

---

## 🔗 Important Links

- **API Base URL:** http://localhost:5000
- **API Docs:** http://localhost:5000/api-docs
- **Health Check:** http://localhost:5000/health
- **Frontend:** Open frontend/index.html

---

## 💡 Next Steps for Learning

1. Understand JWT by checking `backend/src/models/User.js`
2. See role-based access in `backend/src/middleware/auth.js`
3. Learn validation in `backend/src/middleware/validation.js`
4. Study the database setup in `backend/src/config/database.js`
5. Try modifying task fields or adding new features

---

## 🐳 Production Deployment

See README.md for Docker, scaling, and deployment strategies.
