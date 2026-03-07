🚀 AI Resume Analyzer & Job Recommendation System

An AI-powered full-stack web application that analyzes resumes, calculates ATS-style match scores, detects skill gaps, and recommends suitable job roles using a real-world dataset.

Built using the MERN Stack with AI integration.

📌 Overview

This system simulates a simplified Applicant Tracking System (ATS) used by recruiters.

Users can:

Upload their resume

Analyze how well it matches a specific job role

Identify missing skills

Receive AI-generated professional feedback

Get job role recommendations based on skill matching

Track resume analysis history

🎯 Key Features
🔐 Authentication

User Registration & Login

JWT-based authentication

Secure protected API routes

📄 Resume Processing

Upload PDF resumes

Automatic text extraction

Intelligent skill detection

📊 ATS Match Engine

Compare resume skills with job role requirements

Calculate ATS match score

Identify missing skills

Formula

Match Score = (Matched Skills / Total Required Skills) × 100
🤖 AI Feedback System

AI generates structured feedback including:

Professional summary

Strengths identification

Resume improvement suggestions

Career guidance

Powered by Hugging Face Inference API

💼 Job Recommendation Engine

Dataset of 493+ IT Job Roles

Calculates match percentage for each role

Returns top recommended job roles

Recommendation Logic:

Detect skills from resume

Compare skills with all job roles

Calculate score for each role

Sort roles by highest match

Return best matches

📂 Dashboard

Users can:

View resume analysis history

Track ATS scores

Explore recommended job roles

🏗 System Architecture
Frontend (React + Tailwind)
        ↓
Backend (Node.js + Express)
        ↓
MongoDB Database
        ↓
AI Feedback (Hugging Face API)
Application Flow

1️⃣ User uploads resume
2️⃣ Backend extracts resume text
3️⃣ Skills are detected
4️⃣ Resume compared with job role dataset
5️⃣ Match score calculated
6️⃣ AI generates structured feedback
7️⃣ Results stored in MongoDB
8️⃣ Recommended roles returned to user

🛠 Tech Stack
Frontend

React.js

Tailwind CSS

Axios

React Router

Backend

Node.js

Express.js

Multer (File Upload)

PDF Text Extraction

Database

MongoDB

Mongoose

AI Integration

Hugging Face Inference API

🗂 Database Schema
Users Collection
name
email
password (hashed)
Resumes Collection
user (ObjectId)
fileName
detectedSkills
matchScore
role
missingSkills
aiFeedback
createdAt
JobRoles Collection
title
requiredSkills
description
level
salaryRange
📁 Dataset

IT Job Roles Dataset (CSV)

Contains 493+ IT roles

Imported into MongoDB

Used for skill matching & recommendations

⚙️ Installation Guide
1️⃣ Clone Repository
git clone https://github.com/your-username/ai-resume-analyzer.git
cd ai-resume-analyzer
🔧 Backend Setup

Install dependencies

npm install

Create .env file

MONGO_URI=mongodb://127.0.0.1:27017/ai-resume-analyzer
JWT_SECRET=your_secret_key
HF_API_TOKEN=your_huggingface_token

Run backend

nodemon index.js

Server runs on:

http://localhost:5000
💻 Frontend Setup
cd client
npm install
npm run dev

Frontend runs on:

http://localhost:5173
🔐 API Endpoints
Authentication
POST /api/auth/register
POST /api/auth/login
Resume Analysis
POST /api/analyze
GET /api/resumes
Job Roles
GET /api/jobs
GET /api/jobs/recommend
🧪 Challenges Faced

During development several technical challenges were solved:

AI API model errors (Gemini → Hugging Face migration)

Protected route JWT token debugging

CSV dataset import path issues

React state management bugs

404 analyze route debugging

Dataset field mapping mismatches

🚀 Future Improvements

Company-specific resume matching

Integration with LinkedIn / Indeed Job APIs

AI-powered resume rewriting

Skill learning roadmap generator

Admin analytics dashboard

Cloud deployment (AWS / Render / Vercel)

💡 Real-World Use Cases

Helps students optimize resumes

Reduces recruiter screening time

Simulates real ATS filtering

Can scale into a SaaS career platform

👨‍💻 Author

Swayam Patil
AIML Student
MERN + AI Developer

⭐ Support

If you found this project helpful:

⭐ Star the repository
💬 Share feedback
🚀 Contribute improvements