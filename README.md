# 🚀 AI Resume Analyzer & Real-Time Job Recommendation Platform

An **AI-powered full-stack career intelligence platform** that analyzes resumes, simulates ATS scoring, detects skill gaps, generates professional AI feedback, and recommends real-world job opportunities using workflow automation.

Built with **MERN Stack + AI + Workflow Automation (n8n)**.

---

## 🌍 Overview

This platform simulates a **modern Applicant Tracking System (ATS)** used by recruiters and enhances it with **AI intelligence and real-time job discovery automation**.

Users can:

* Upload resumes (PDF)
* Get ATS-style match score for a specific job role
* Detect existing & missing skills
* Receive structured AI feedback
* Get **real-world job recommendations automatically**
* Track resume analysis history via dashboard

---

## 🎯 Key Features

### 🔐 Authentication & Security

* JWT-based authentication
* Protected API routes
* Secure resume storage & analysis history
* Session-based user data isolation

---

### 📄 Resume Processing Engine

* PDF upload via Multer
* Automated resume text extraction
* Intelligent skill detection system
* Skill normalization using custom skill mapping

---

### 📊 ATS Match Scoring System

Simulates recruiter screening logic.

**Formula**

```
Match Score = (Matched Skills / Total Required Skills) × 100
```

Capabilities:

* Skill-to-role comparison
* Missing skill detection
* Match scoring visualization
* Resume structure scoring

---

### 🤖 AI Resume Feedback System

Generates structured professional insights:

* Resume Summary
* Strengths Identification
* Missing Skills Suggestions
* Resume Improvement Actions
* Career Growth Advice

Powered by **LLM inference (Groq / Open Source Models)**.

---

### 💼 Real-Time Job Recommendation Engine

This is the **core advanced feature**.

Instead of static dataset recommendations:

* Resume skills are sent to **n8n automation workflow**
* Workflow fetches real jobs from public job APIs
* Jobs are filtered based on skill relevance
* Top matching jobs are returned to backend
* Displayed instantly in UI

**Pipeline Logic**

```
Resume → Skill Extraction → Automation Webhook →
External Job API → Filtering Engine →
Recommended Jobs → UI Rendering
```

---

### ⚙️ Workflow Automation (n8n Integration)

* Webhook-based automation trigger
* HTTP job API fetch node
* JavaScript filtering node
* Production & Test webhook modes
* Enables scalable automation features like:

Future Automation Ideas:

* Daily job alerts
* Email notifications
* Skill learning roadmap automation
* Application tracking

---

### 📂 Dashboard & Analytics

Users can:

* View resume analysis history
* Track ATS score trends
* Explore past recommended jobs
* Monitor skill improvement

---

## 🏗 System Architecture

```
React + Tailwind Frontend
        ↓
Node.js / Express Backend
        ↓
MongoDB Database
        ↓
AI Feedback Engine (LLM API)
        ↓
Workflow Automation (n8n)
        ↓
External Job APIs
```

---

## 🔄 Application Flow

1️⃣ User uploads resume
2️⃣ Backend extracts text
3️⃣ Skills are detected
4️⃣ ATS score calculated
5️⃣ AI feedback generated
6️⃣ Resume stored in MongoDB
7️⃣ Skills sent to n8n webhook
8️⃣ Automation fetches real job listings
9️⃣ Matching jobs returned to backend
🔟 Jobs displayed in frontend

---

## 🛠 Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js
* Multer (File Upload)
* PDF Parsing

### Database

* MongoDB
* Mongoose

### AI

* Groq LLM API / Open Source Models

### Automation

* n8n Workflow Engine
* Webhook Triggers
* External Job APIs

---

## 🗂 Database Schema

### Users

* name
* email
* password (hashed)

### Resumes

* user
* fileName
* detectedSkills
* matchScore
* structureScore
* missingSkills
* aiFeedback
* recommendedJobs
* createdAt

### JobRoles

* title
* requiredSkills
* description
* level
* salaryRange

---

## ⚙️ Installation

### Clone Repository

```
git clone https://github.com/your-username/ai-resume-analyzer.git
cd ai-resume-analyzer
```

---

### Backend Setup

```
npm install
```

Create `.env`

```
MONGO_URI=mongodb://127.0.0.1:27017/ai-resume-analyzer
JWT_SECRET=your_secret
GROQ_API_KEY=your_key
```

Run backend

```
nodemon index.js
```

Server:

```
http://localhost:5000
```

---

### Frontend Setup

```
cd client
npm install
npm run dev
```

Frontend:

```
http://localhost:5173
```

---

### Automation Setup (n8n)

Run locally:

```
npx n8n
```

Create workflow:

* Webhook Node
* HTTP Request Node (Job API)
* Code Node (Skill Filtering)

Activate workflow.

Production webhook:

```
http://localhost:5678/webhook/job-search
```

---

## 🔐 API Endpoints

### Authentication

* `POST /api/auth/register`
* `POST /api/auth/login`

### Resume

* `POST /api/analyze`
* `GET /api/resumes`

### Job Roles

* `GET /api/jobs`

---

## 🧪 Challenges Solved

* ATS scoring consistency issues
* Resume skill extraction accuracy
* AI JSON response parsing
* JWT protected route debugging
* Workflow webhook test vs production mode confusion
* Job API SSL & filtering problems
* Frontend async state rendering bugs

---

## 🚀 Future Improvements

* Semantic skill matching (vector embeddings)
* Resume rewriting with AI
* Job match percentage visualization
* Email job alerts automation
* Redis job cache layer
* Cloud deployment (AWS / Render / Vercel)
* SaaS subscription model

---

## 💡 Real-World Impact

* Helps students optimize resumes
* Simulates recruiter ATS filtering
* Provides real job opportunities
* Can scale into full career SaaS platform

---

## 👨‍💻 Author

**Swayam Patil**
AIML Student
MERN + AI + Automation Developer

---

## ⭐ Support

If this project helped you:

⭐ Star the repository
💬 Share feedback
🚀 Contribute improvements

---
