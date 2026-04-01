# 🚀 AI Resume Analyzer + Job Recommender

A full-stack MERN application that analyzes resumes using AI, calculates ATS match scores, and fetches real job opportunities based on user skills — with job bookmarking support.

---

## ✨ Features

### 🧠 AI Resume Analysis

* Upload resume (PDF)
* Extracts text and detects skills
* Calculates ATS match score
* Identifies missing skills
* Provides AI-based feedback and career advice

### 💼 Real Job Fetcher

* Fetches live jobs using Adzuna API
* Matches jobs based on resume skills
* Displays structured job listings in dashboard

### ⭐ Job Bookmarking System

* Save jobs for later
* View saved jobs (user-specific)
* Remove saved jobs

### 🔐 Authentication

* JWT-based login/register
* Protected routes for secure access

---

## 🏗️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Framer Motion

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose

### APIs & Tools

* Adzuna Job API
* PDF Parser
* AI Feedback Engine

---

## 📂 Project Structure

```bash
client/
  src/
    components/
    pages/
    api.js

server/
  routes/
  models/
  middleware/
  utils/
```

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
ADZUNA_ID=your_id
ADZUNA_KEY=your_key
```

Run server:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd client
npm install
npm start
```

---

## 🔑 API Endpoints

### Auth

* `POST /api/auth/login`
* `POST /api/auth/register`

### Resume

* `POST /api/analyze`
* `GET /api/resumes`

### Jobs

* `GET /api/jobs/real`

### Saved Jobs

* `POST /api/saved-jobs`
* `GET /api/saved-jobs`
* `DELETE /api/saved-jobs/:id`

---

## 🚀 Future Improvements

* Job match score per listing
* Saved jobs dashboard UI
* Filters (location, role)
* Pagination for job results
* Email job alerts

---

## 📌 Author

Swayam Patil

---

## ⭐ If you like this project, give it a star!
