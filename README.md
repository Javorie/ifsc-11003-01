# SecPlus Trainer

SecPlus Trainer is a full-stack cybersecurity quiz platform inspired by Kahoot, built for CompTIA Security+ SY0-701 exam prep.

## Features
- Kahoot-style quiz mode with timer (10–30s), speed + accuracy scoring, random questions, immediate feedback.
- Study Mode (no timer) and Exam Simulation Mode (90 questions / 90 mins).
- JWT authentication (signup/login), saved quiz history, and per-user analytics.
- Adaptive learning mode that prioritizes weak domains, supports repeat misses, and raises difficulty over time.
- Analytics dashboard:
  - Domain accuracy %
  - Questions answered per domain
  - Weakest/strongest domains
  - Trend over time
  - Recent mistakes
  - Recommendation engine (`Needs Improvement`, `Moderate`, `Strong`)

## Tech Stack
- Frontend: React + Tailwind CSS + Recharts
- Backend: Node.js + Express
- Database: MongoDB + Mongoose

## Project Structure
```
/client       # React app
/server       # Node.js API
/models       # placeholder folder for requested layout
/routes       # placeholder folder for requested layout
/controllers  # placeholder folder for requested layout
```

Backend source logic is implemented in `server/models`, `server/routes`, and `server/controllers`.

## Domains Seeded
- General Security Concepts
- Threats, Vulnerabilities, and Mitigations
- Security Architecture
- Security Operations
- Security Program Management and Oversight

Includes **25 seeded questions** (`server/data/questions.js`).

## Local Setup
### 1) Start MongoDB
Make sure a local MongoDB service is running (default URI in `.env.example` is `mongodb://127.0.0.1:27017/secplus_trainer`).

### 2) Backend setup
```bash
cd server
cp .env.example .env
npm install
npm run seed
npm run dev
```

Backend runs on `http://localhost:5000`.

### 3) Frontend setup
```bash
cd client
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

Set optional frontend env var if needed:
```bash
# client/.env
VITE_API_URL=http://localhost:5000/api
```

## API Highlights
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/quiz/questions`
- `POST /api/quiz/submit`
- `GET /api/analytics`

## Notes
- Adaptive mode chooses weak domains based on user historical domain accuracy.
- Analytics are computed dynamically each request from user stats and quiz history.
