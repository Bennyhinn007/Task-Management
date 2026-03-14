# Task Management API - Backend Developer Intern Project

A scalable REST API with JWT authentication and role-based access control, complete with a simple frontend UI.

## 🎯 Project Overview

This project demonstrates:
- **User Authentication** with JWT tokens and password hashing (bcryptjs)
- **Role-Based Access Control** (User vs Admin)
- **CRUD Operations** for Tasks entity
- **API Versioning** (v1 endpoints)
- **Input Validation** with Joi
- **Security Best Practices** (Helmet, CORS, input sanitization)
- **API Documentation** with Swagger/OpenAPI
- **RESTful Design** with proper HTTP status codes

## 📋 Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** SQLite (easily scalable to PostgreSQL/MySQL)
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Validation:** Joi
- **Security:** Helmet, CORS
- **API Docs:** Swagger/OpenAPI

### Frontend
- **HTML5, CSS3, JavaScript** (Vanilla JS - no build required)
- **Fetch API** for HTTP requests
- **LocalStorage** for token persistence

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Backend Setup

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables** (`.env` is already set up):
   ```
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
   JWT_EXPIRE=24h
   DB_PATH=./data/app.db
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```
   - Server runs on `http://localhost:5000`
   - Swagger docs: `http://localhost:5000/api-docs`
   - Health check: `http://localhost:5000/health`

### Frontend Setup

1. **Navigate to frontend folder:**
   ```bash
   cd frontend
   ```

2. **Open in browser:**
   - Simply open `index.html` in your browser (no build step needed!)
   - Or serve with: `python -m http.server 8000` then visit `http://localhost:8000`

## 📚 API Endpoints (v1)

### Authentication
```
POST   /v1/auth/register     - Register new user
POST   /v1/auth/login         - Login (returns JWT token)
GET    /v1/auth/me           - Get current user (requires token)
```

### Tasks (All require authentication)
```
GET    /v1/tasks             - Get all tasks (or user's tasks if not admin)
GET    /v1/tasks/:id         - Get specific task
POST   /v1/tasks             - Create new task
PUT    /v1/tasks/:id         - Update task (owner or admin only)
DELETE /v1/tasks/:id         - Delete task (owner or admin only)
```

### Admin (Requires admin role)
```
GET    /v1/admin/users       - Get all users
PUT    /v1/admin/users/:id/role - Update user role
DELETE /v1/admin/users/:id   - Delete user
```

## 🔐 Authentication Flow

1. **Register:** Send name, email, password → Get success message
2. **Login:** Send email, password → Get JWT token
3. **Protected Routes:** Send token in header: `Authorization: Bearer <token>`

### Example request with token:
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     http://localhost:5000/v1/tasks
```

## 📖 Testing with Postman

1. Import `backend/Task_Management_API.postman_collection.json` into Postman
2. Update the `Bearer YOUR_JWT_TOKEN` with actual token from login response
3. Test all endpoints

## 💾 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  password TEXT (hashed),
  role TEXT (user/admin),
  created_at DATETIME,
  updated_at DATETIME
)
```

### Tasks Table
```sql
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY,
  user_id INTEGER FOREIGN KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT (pending/in-progress/completed),
  priority TEXT (low/medium/high),
  created_at DATETIME,
  updated_at DATETIME
)
```

## 🛡️ Security Features

✅ **Password Hashing** - bcryptjs with salt rounds
✅ **JWT Tokens** - Secure token-based authentication
✅ **Role-Based Access** - Admin vs User permissions
✅ **Input Validation** - Joi schema validation
✅ **CORS** - Restricted origin access
✅ **Helmet** - Security headers
✅ **Ownership Verification** - Users can only modify their own tasks
✅ **Error Handling** - No sensitive info in error messages

## 📁 Project Structure

```
backend/
├── src/
│   ├── index.js              # Main app entry
│   ├── config/
│   │   └── database.js       # SQLite setup
│   ├── middleware/
│   │   ├── auth.js           # Auth & role middleware
│   │   └── validation.js     # Input validation
│   ├── models/
│   │   ├── User.js           # User model & methods
│   │   └── Task.js           # Task model & methods
│   └── routes/
│       └── v1/
│           ├── auth.js       # Auth endpoints
│           ├── tasks.js      # Task CRUD endpoints
│           └── admin.js      # Admin endpoints
├── .env                      # Environment variables
├── .gitignore
├── package.json
└── Task_Management_API.postman_collection.json

frontend/
├── index.html                # All-in-one UI
├── package.json
└── .gitignore
```

## 🧪 Quick Test Steps

1. **Register a user:**
   - Open frontend UI
   - Fill register form with: name, email, password
   - Click Register

2. **Login:**
   - Use same email & password
   - Click Login → Dashboard appears

3. **Create a task:**
   - Fill task form with title, description, priority
   - Click Create Task

4. **Edit a task:**
   - Click Edit button on task
   - Change status and click OK

5. **Delete a task:**
   - Click Delete button
   - Confirm deletion

## 📈 Scalability & Future Improvements

### For Production:

1. **Database Scaling**
   - Switch from SQLite to PostgreSQL/MySQL
   - Add connection pooling
   - Implement database indexes

2. **Caching**
   - Add Redis for token caching and task caching
   - Reduce database queries

3. **Load Balancing**
   - Deploy multiple server instances
   - Use Nginx/HAProxy for load distribution

4. **Logging & Monitoring**
   - Use Winston or Bunyan for structured logging
   - Integrate Sentry for error tracking
   - Monitor API performance with New Relic/DataDog

5. **Microservices**
   - Split into Auth Service, Task Service, User Service
   - Use message queues (RabbitMQ/Kafka) for inter-service communication

6. **API Rate Limiting**
   - Implement express-rate-limit
   - Prevent abuse and DDoS attacks

7. **Docker Deployment**
   ```dockerfile
   FROM node:18
   WORKDIR /app
   COPY . .
   RUN npm install
   EXPOSE 5000
   CMD ["npm", "start"]
   ```

8. **CI/CD Pipeline**
   - GitHub Actions for automated testing
   - Deploy to AWS/Heroku/DigitalOcean

9. **Environment Management**
   - Separate .env files for development, staging, production
   - Use secrets manager for production keys

10. **API Versioning Strategy**
    - v1, v2, v3 endpoints for backward compatibility
    - Deprecation notices for old versions

## 🔑 Default Admin Setup

To create an admin user, you can modify the register endpoint or manually update the role:

1. Register a normal user
2. Directly update database or use admin API (if you have admin token) to change role to 'admin'

Example SQL:
```sql
UPDATE users SET role = 'admin' WHERE email = 'admin@example.com';
```

## 🐛 Troubleshooting

**Port 5000 already in use:**
```bash
# Change PORT in .env or kill process
lsof -i :5000
kill -9 <PID>
```

**CORS error:**
- Update `CORS_ORIGIN` in `.env` to match frontend URL

**Database not initializing:**
- Delete `data/app.db` and restart server
- Check file permissions in `data/` folder

**JWT token invalid:**
- Tokens expire after 24h (configurable in `.env`)
- Re-login to get a new token

## 📝 API Response Format

All responses follow this format:

**Success:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description"
}
```

## 📞 Support & Learning Resources

- [Express.js Docs](https://expressjs.com/)
- [JWT Introduction](https://jwt.io/)
- [REST API Best Practices](https://restfulapi.net/)
- [OWASP Security Guidelines](https://owasp.org/)

## 📄 License

MIT License - Feel free to use this project for learning purposes!

---

**Created:** March 2026  
**Student Project:** Intern Backend Developer Assignment  
**Last Updated:** March 2026
