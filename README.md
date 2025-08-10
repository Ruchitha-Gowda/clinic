 Clinic Management System
A full-stack clinic management system with a NestJS (Node.js) backend and a Next.js frontend.
Backend is deployed to Render, frontend to Vercel, and MySQL database hosted for free on Filess.io.

TO login >> username -> staffuser , password -> password123

Table of Contents
Features

Tech Stack

Local Development

Environment Variables

Deployment

API Endpoints

License

Features
Staff authentication & login

Doctor management

Patient management

Appointment scheduling

Queue tracking

Tech Stack
Backend: NestJS + MySQL (via Filess.io)

Frontend: Next.js

Deployment: Backend on Render, Frontend on Vercel

Local Development
1. Clone the repo
text
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
2. Backend
text
cd backend
npm install
Create a .env file in the backend folder:

text
DB_HOST=your-filess-host
DB_USER=your-filess-username
DB_PASS=your-filess-password
DB_NAME=your-filess-dbname
DB_PORT=your-filess-dbport
Start backend server (usually on port 3001):

text
npm run start:dev
3. Frontend
text
cd ../frontend
npm install
Create a .env.local file in the frontend folder:

text
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
Start frontend server (usually on port 3000):

text
npm run dev
Environment Variables
Backend (backend/.env)
DB_HOST

DB_USER

DB_PASS

DB_NAME

DB_PORT

Frontend (frontend/.env.local)
NEXT_PUBLIC_API_BASE_URL (Use backend Render URL for production)

Example: NEXT_PUBLIC_API_BASE_URL=https://clinic-api-xxxx.onrender.com

Deployment
Backend
Push code to GitHub.

Connect to Render and create a new web service.

Set required environment variables in Render dashboard.

Backend URL: https://your-backend.onrender.com

Frontend
Push code to GitHub in the frontend folder.

Import to Vercel as new project, set root directory to frontend.

Set environment variable:

NEXT_PUBLIC_API_BASE_URL=https://your-backend.onrender.com

Frontend URL: https://your-frontend.vercel.app

API Endpoints
POST /auth/login

GET /doctors

POST /doctors

PUT /doctors/:id

DELETE /doctors/:id

GET /patients

POST /patients

DELETE /patients/:id

GET /appointments

POST /appointments

PUT /appointments/:id

DELETE /appointments/:id

GET /queue

POST /queue

PUT /queue/:id

DELETE /queue/:id
