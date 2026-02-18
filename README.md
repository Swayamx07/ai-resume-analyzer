🚀 AI Resume Analyzer & Job Recommendation System

An AI-powered full-stack web application that analyzes resumes, calculates ATS-style match scores, detects skill gaps, and recommends suitable job roles using a real-world dataset.

Built using the MERN Stack with AI integration.

📌 Overview

This system helps users:

Understand how well their resume matches a job role

Identify missing skills

Receive AI-generated professional feedback

Get job recommendations based on skill matching

Track resume analysis history

It simulates a simplified ATS (Applicant Tracking System) with intelligent feedback.

🎯 Key Features
🔐 Authentication

User Registration & Login

JWT-based secure authentication

Protected API routes

📄 Resume Processing

PDF Resume Upload

Text Extraction from Resume

Automatic Skill Detection

📊 ATS Match Engine

Role-based skill comparison

Match Score calculation

Missing Skill identification

🤖 AI Feedback

Professional Summary

Strengths Identification

Improvement Suggestions

Career Advice

💼 Job Recommendation Engine

493+ IT Job Roles (Dataset-driven)

Match percentage for each role

Sorted recommendations

📂 Dashboard

Resume History

Score tracking

Job recommendations

🏗 System Architecture
Frontend (React + Tailwind)
        ↓
Backend (Node + Express)
        ↓
MongoDB Database
        ↓
AI API (Hugging Face)

Application Flow

User uploads resume

Backend extracts resume text

Skills are detected

Resume matched against job role dataset

Match score calculated

AI generates structured feedback

Results stored in database

Recommended roles returned

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

PDF Text Extractor

Database

MongoDB

Mongoose

AI Integration

Hugging Face Inference API

📊 Match Score Logic
Formula
Match Score = (Matched Skills / Total Required Skills) × 100

Recommendation Logic

Compare detected skills with all job roles

Calculate score for each role

Sort roles in descending order

Return top matching roles

🗂 Database Schema
🧑 Users Collection

name

email

password (hashed)

📄 Resumes Collection

user (ObjectId)

fileName

detectedSkills

matchScore

role

missingSkills

aiFeedback

createdAt

💼 JobRoles Collection

title

requiredSkills

description

level

salaryRange

📁 Dataset

IT Job Roles Dataset (CSV)

493+ roles

Imported into MongoDB

Dynamic role selection in frontend

⚙️ Installation Guide
1️⃣ Clone Repository
git clone <your-repo-url>
cd ai-resume-analyzer

🔧 Backend Setup

Install dependencies:

npm install


Create .env file:

MONGO_URI=mongodb://127.0.0.1:27017/ai-resume-analyzer
JWT_SECRET=your_secret_key
HF_API_TOKEN=your_huggingface_token


Run backend:

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
Auth

POST /api/auth/register

POST /api/auth/login

Resume

POST /api/analyze

GET /api/resumes

Jobs

GET /api/jobs

GET /api/jobs/recommend

🚀 Future Improvements

Company-specific resume matching

Real-time job API integration (LinkedIn / Indeed)

Resume auto-rewrite suggestions

Skill learning roadmap generation

Admin analytics dashboard

Deployment (Render / Vercel / AWS)

🧪 Challenges Faced

AI API model errors (Gemini → HF migration)

Protected route token debugging

CSV import path issues

State management issues in React

404 analyze route debugging

Dataset field mapping mismatch

All issues were resolved during development.

💡 Real-World Use Case

Helps students optimize resumes

Saves recruiter screening time

Simulates ATS filtering

Scalable to multiple industries

Can evolve into SaaS product

👨‍💻 Author

Developed by: Your Name
Final Year AIML Student
MERN + AI Developer

⭐ If you like this project

Give it a star and share feedback!