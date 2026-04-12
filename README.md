# Syllora

> **A full-stack EdTech platform where students discover, enroll, and learn — and instructors publish, manage, and grow.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-syllora--edtech.vercel.app-brightgreen?style=for-the-badge&logo=vercel)](https://syllora-edtech.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-UditSinghChauhan%2Fsyllora--edtech-181717?style=for-the-badge&logo=github)](https://github.com/UditSinghChauhan/syllora-edtech)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

## The Problem

Online learning platforms are either too consumer-facing (no instructor tools) or too complex to set up (enterprise dashboards). Most side-projects in this space are only frontend demos — they lack real auth, real payments, and real content delivery.

## The Solution

Syllora is a **production-ready, end-to-end EdTech platform** built on the MERN stack. It handles the complete lifecycle — email-verified signup → course browsing → Razorpay checkout → protected video learning with per-student progress tracking — with separate, fully functional dashboards for students and instructors.

---

## Features

**Students**
- Browse courses by category with a fully paginated catalog
- View detailed course pages (curriculum, instructor bio, ratings) before enrolling
- Razorpay-powered checkout for paid course enrollment
- Protected video player with section/subsection navigation
- Lesson-level progress tracking (completed videos saved per student)
- Manage profile, enrolled courses, account settings, and cart

**Instructors**
- Create and publish courses with thumbnail uploads (Cloudinary)
- Build structured curricula — courses → sections → subsections (video + duration)
- Edit and delete courses with cascading content cleanup
- Dashboard with per-course metrics: student count and revenue

**Auth & Security**
- OTP email verification on signup (Nodemailer)
- JWT-based authentication (HTTP-only cookie + Authorization header)
- Role-based route guards: Student / Instructor / Admin
- Bcrypt password hashing, reset-password email flow

---

## Tech Stack

### Frontend
![React](https://img.shields.io/badge/React_18-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router_v6-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=flat-square&logo=chartdotjs&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express_5-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)

### Integrations
![Razorpay](https://img.shields.io/badge/Razorpay-02042B?style=flat-square&logo=razorpay&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Nodemailer-22B573?style=flat-square)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

---

## Architecture Overview

```
┌─────────────────────────────────────────────┐
│              React SPA (Vercel)             │
│  Redux Toolkit · React Router · Tailwind    │
└─────────────────────┬───────────────────────┘
                      │ HTTPS / REST API
┌─────────────────────▼───────────────────────┐
│          Express API Server (Node.js)       │
│  /api/v1/auth  /course  /payment  /profile  │
│  JWT Auth · Role Guards · File Upload       │
└──────┬──────────┬──────────┬────────────────┘
       │          │          │
  ┌────▼───┐ ┌───▼────┐ ┌───▼─────────┐
  │MongoDB │ │Cloudina│ │  Razorpay   │
  │Atlas   │ │ry CDN  │ │  Payments   │
  └────────┘ └────────┘ └─────────────┘
```

**Data Models:** `User` → `Profile` · `Course` → `Section` → `SubSection` · `CourseProgress` · `RatingAndReview` · `Category` · `OTP`

**Auth Flow:** `POST /auth/sendotp` → OTP stored DB → `POST /auth/signup` (OTP verified server-side) → `POST /auth/login` → JWT issued as HTTP-only cookie + response body

**Payment Flow:** `POST /payment/capturePayment` → Razorpay order created → client-side Razorpay checkout → `POST /payment/verifyPayment` (HMAC-SHA256 signature check) → student enrolled + email sent

---

## Live Demo

🌐 **[syllora-edtech.vercel.app](https://syllora-edtech.vercel.app/)**

> **Student demo:** Sign up as a Student, browse the catalog, add a course to cart, and go through checkout.  
> **Instructor demo:** Sign up as an Instructor, create a course with sections and video content, then view your dashboard metrics.

---

## Local Setup

### Prerequisites

- Node.js 18+
- npm 9+
- MongoDB Atlas cluster (or local MongoDB instance)
- [Cloudinary](https://cloudinary.com/) account (free tier works)
- [Razorpay](https://razorpay.com/) test account
- Gmail with [App Password](https://support.google.com/accounts/answer/185833) enabled

### 1. Clone the repository

```bash
git clone https://github.com/UditSinghChauhan/syllora-edtech.git
cd syllora-edtech
```

### 2. Install dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server && npm install && cd ..
```

### 3. Configure environment variables

**Root `.env`** (frontend):
```env
REACT_APP_BACKEND_URL=http://localhost:4000/api/v1
```

**`server/.env`** (backend — see `server/.env.example` for all variables):
```env
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_min_32_chars

MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_gmail_app_password
CONTACT_US_EMAIL=your_email@gmail.com

RAZORPAY_KEY=rzp_test_xxxxxxxxxxxx
RAZORPAY_SECRET=your_razorpay_secret

CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
FOLDER_NAME=syllora-media

PORT=4000
FRONTEND_URL=http://localhost:3000
```

### 4. Run the project

```bash
# Start both frontend and backend together (recommended)
npm run dev

# Frontend only (port 3000)
npm start

# Backend only (port 4000)
cd server && npm run dev
```

The frontend will be available at `http://localhost:3000` and the API at `http://localhost:4000/api/v1`.

---

## API Reference

All routes are prefixed with `/api/v1`. Protected routes require a `Bearer <token>` Authorization header or a `token` cookie.

### Auth — `/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/sendotp` | ✗ | Send OTP to email for signup verification |
| POST | `/signup` | ✗ | Register new user (OTP verified server-side) |
| POST | `/login` | ✗ | Login and receive JWT |
| POST | `/changepassword` | ✓ | Change password for authenticated user |
| POST | `/reset-password-token` | ✗ | Request password reset email |
| POST | `/reset-password` | ✗ | Reset password using token from email |

### Courses — `/course`

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| GET | `/getAllCourses` | ✗ | — | List all published courses |
| POST | `/getCourseDetails` | ✗ | — | Get public course details by ID |
| POST | `/getFullCourseDetails` | ✓ | Student/Instructor | Get full course with video URLs and progress |
| POST | `/createCourse` | ✓ | Instructor | Create a new course |
| POST | `/editCourse` | ✓ | Instructor | Update course metadata or thumbnail |
| DELETE | `/deleteCourse` | ✓ | Instructor | Delete course + all sections and subsections |
| GET | `/getInstructorCourses` | ✓ | Instructor | Get all courses for the logged-in instructor |
| POST | `/addSection` | ✓ | Instructor | Add a section to a course |
| POST | `/updateSection` | ✓ | Instructor | Edit a section |
| POST | `/deleteSection` | ✓ | Instructor | Delete a section and its subsections |
| POST | `/addSubSection` | ✓ | Instructor | Add a subsection (video lesson) |
| POST | `/updateSubSection` | ✓ | Instructor | Edit a subsection |
| POST | `/deleteSubSection` | ✓ | Instructor | Delete a subsection |
| POST | `/updateCourseProgress` | ✓ | Student | Mark a subsection as completed |
| GET | `/showAllCategories` | ✗ | — | List all course categories |
| POST | `/getCategoryPageDetails` | ✗ | — | Get courses for a catalog category page |
| POST | `/createCategory` | ✓ | Admin | Create a new course category |
| POST | `/createRating` | ✓ | Student | Submit a course rating and review |
| GET | `/getReviews` | ✗ | — | Get all course ratings and reviews |

### Profile — `/profile`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/getUserDetails` | ✓ | Get authenticated user's full profile |
| PUT | `/updateProfile` | ✓ | Update profile fields (bio, DOB, contact, gender) |
| PUT | `/updateDisplayPicture` | ✓ | Upload and update profile picture |
| DELETE | `/deleteProfile` | ✓ | Delete account and all associated data |
| GET | `/getEnrolledCourses` | ✓ | Get student's enrolled courses with progress |
| GET | `/instructorDashboard` | ✓ | Get instructor's course stats and revenue |

### Payments — `/payment`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/capturePayment` | ✓ | Create Razorpay order for selected courses |
| POST | `/verifyPayment` | ✓ | Verify Razorpay HMAC signature and enroll student |
| POST | `/sendPaymentSuccessEmail` | ✓ | Send payment confirmation email |

---

## Project Structure

```
syllora-edtech/
├── public/                    # Static HTML and robots.txt
├── src/
│   ├── assets/                # Images, videos, and other static assets
│   ├── components/
│   │   ├── common/            # Navbar, Footer, shared UI components
│   │   └── core/              # Feature-specific components
│   │       ├── Auth/          # OpenRoute, PrivateRoute guards
│   │       ├── Dashboard/     # Student + Instructor dashboard views
│   │       ├── HomePage/      # Landing page sections
│   │       ├── Course/        # Course creation and editing forms
│   │       ├── Catalog/       # Catalog browsing components
│   │       └── ViewCourse/    # Video player and lesson navigation
│   ├── pages/                 # Top-level route components
│   ├── services/
│   │   ├── apis.js            # All API endpoint constants
│   │   ├── apiconnector.js    # Axios instance
│   │   └── operations/        # API call functions per domain
│   ├── slices/                # Redux Toolkit slices (auth, cart, course, profile)
│   ├── utils/                 # Utility functions and constants
│   └── App.js                 # Root component with route definitions
├── server/
│   ├── config/                # Database, Cloudinary, Razorpay setup
│   ├── controllers/           # Route handler logic per domain
│   ├── middlewares/           # JWT auth and role guard middleware
│   ├── models/                # Mongoose schemas
│   ├── routes/                # Express router definitions
│   ├── mail/templates/        # Nodemailer HTML email templates
│   └── utils/                 # mailSender, imageUploader, secToDuration
├── docs/
│   └── ARCHITECTURE.md        # Detailed system and data-layer architecture
├── .env.example               # Frontend environment template
└── package.json               # Root scripts (npm run dev starts everything)
```

---

## Testing

```bash
# Run all frontend tests (Jest via react-scripts)
npm test -- --watchAll=false
```

Current coverage: **2 test suites, 5 tests passing**
- `src/utils/utils.test.js` — `GetAvgRating`, `formattedDate` utility functions
- `src/services/apis.test.js` — API endpoint URL construction with env vars

---

## Future Improvements

- [ ] **AI course recommendations** — suggest courses based on enrollment history and category interest
- [ ] **Quiz and assessment system** — per-section quizzes with grading
- [ ] **Admin panel** — category management, user moderation, content review queue
- [ ] **Search and filter** — full-text course search with category and price filters
- [ ] **Refresh token rotation** — replace long-lived JWTs with short-lived access + refresh token pairs
- [ ] **Webhook-based payment reconciliation** — Razorpay webhooks for stronger payment reliability
- [ ] **PWA / mobile-responsive improvements** — service worker, offline content access
- [ ] **CDN-backed video delivery** — serve video through a CDN for faster global playback

---

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">Built by <a href="https://github.com/UditSinghChauhan">Udit Singh Chauhan</a></p>
