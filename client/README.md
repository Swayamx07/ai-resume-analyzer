# 🤖 AI Resume Analyzer

An AI-powered web application that analyzes resumes, evaluates job match scores, and provides intelligent career feedback using modern web technologies.

This project is designed as a **modern AI SaaS-style platform** featuring authentication, analytics dashboards, animated UI transitions, and a unified glassmorphism design system.

---

## 🚀 Features

### 📄 Resume Analysis
- Upload PDF resumes
- AI-powered resume evaluation
- Job-role based matching system
- Instant match score generation
- AI feedback summary

### 📊 Analytics Dashboard
- Resume analysis history
- Match score trend visualization
- Recommended job roles
- Interactive analytics charts

### 🎨 Modern UI / UX
- Glassmorphism design system
- Unified dark AI theme
- Gradient glow background
- Smooth page transitions using Framer Motion
- Responsive dashboard layout

### 🔐 Authentication
- User registration & login
- JWT-based authentication
- Protected routes
- Secure session handling

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS v4
- Framer Motion
- Recharts
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

---

## 📂 Project Structure
ai-resume-analyzer/
│
├── client/
│ ├── src/
│ │ ├── components/
│ │ │ ├── DashboardLayout.jsx
│ │ │ ├── HeroBackground.jsx
│ │ │ ├── ResumeHistoryTable.jsx
│ │ │ └── ScoreTrendChart.jsx
│ │ │
│ │ ├── pages/
│ │ │ ├── Analyze.jsx
│ │ │ ├── DashboardHome.jsx
│ │ │ ├── Login.jsx
│ │ │ └── Register.jsx
│ │ │
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│ │
│ └── package.json
│
└── server/


---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/ai-resume-analyzer.git
cd ai-resume-analyzer

2️⃣ Install Dependencies

Frontend:

cd client
npm install

Backend:

cd server
npm install
3️⃣ Environment Variables

Create a .env file inside the server folder:

MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
4️⃣ Run Development Servers

Backend:

npm run dev

Frontend:

npm run dev

Frontend runs at:

http://localhost:5173
✨ UI Highlights

AI-style landing experience

Glass dashboard panels

Smooth animated navigation

Unified product design language

Modern SaaS-inspired interface

📈 Future Improvements

AI resume optimization suggestions

Skill gap detection

Interview preparation insights

Resume comparison analytics

Exportable reports

👨‍💻 Author

Swayam Patil

AIML Student • Full Stack Developer • AI Enthusiast