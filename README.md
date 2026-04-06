# Syllora

Syllora is a full-stack edtech platform for discovering courses, enrolling in them, and learning through structured video content. It supports separate student and instructor flows, so learners can track progress while instructors can publish and manage their own courses.

## :rocket: Project Overview

Syllora helps learners move from browsing to enrollment to lesson completion in one product. The platform combines course discovery, protected learning content, payments, and role-based dashboards in a single MERN application.

## :sparkles: Key Features

- Browse courses by category and view detailed course pages before enrolling
- Student and instructor authentication with OTP email verification and password reset flows
- Protected video-based course experience with sections and subsections
- Lecture-level progress tracking for enrolled students
- Student dashboard for profile management, cart, and enrolled courses
- Instructor dashboard for course creation, editing, publishing, and course insights
- Ratings and reviews for courses
- Razorpay-powered checkout for paid enrollments
- Cloudinary-based media uploads for course assets

## :dart: Use Case

Syllora is built for online learners who want a simple place to explore and complete courses, and for instructors who need a straightforward way to publish and manage course content.

It solves the common gap between course discovery and course delivery by keeping authentication, enrollment, payments, and learning progress in one workflow.

## :building_construction: Tech Stack

### Frontend

- React 18
- React Router v6
- Redux Toolkit
- Tailwind CSS
- Axios
- React Hook Form
- Chart.js / react-chartjs-2
- video-react

### Backend

- Node.js
- Express
- JWT-based authentication
- Mongoose
- Nodemailer
- express-fileupload

### Database

- MongoDB

### Additional Tools

- Razorpay for payments
- Cloudinary for media storage
- Jest-based frontend tests via `react-scripts test`

## :gear: How It Works (High Level)

1. Users sign up as students or instructors and verify their email with OTP.
2. Students browse the catalog, review course details, and enroll through checkout.
3. Enrolled learners access protected course videos and move through sections and subsections.
4. Course progress is saved as lessons are completed.
5. Instructors manage courses from the dashboard and view course/student metrics.

## :test_tube: Testing

- The frontend includes basic automated tests for shared utilities and API endpoint configuration
- Manual testing is still important for end-to-end flows like authentication, payments, and dashboard actions
- Current automated test status: `2` test suites passed, `5` tests passed

## :rocket: Future Improvements

- AI-based course recommendations
- Richer quiz and assessment support
- Better learner and instructor analytics
- Mobile app or PWA support
- Admin-facing moderation and content management tools

## :pushpin: Status

Active development. Core student and instructor flows are implemented, and the project is being refined with better testing, polish, and additional product features.

## Project Structure

```text
syllora-edtech/
|-- public/
|-- src/
|   |-- components/
|   |-- data/
|   |-- hooks/
|   |-- pages/
|   |-- reducer/
|   |-- services/
|   |-- slices/
|   `-- utils/
|-- server/
|   |-- config/
|   |-- controllers/
|   |-- mail/
|   |-- middlewares/
|   |-- models/
|   |-- routes/
|   `-- utils/
|-- docs/
|-- package.json
`-- tailwind.config.js
```

## Local Setup

### Prerequisites

- Node.js 18+
- npm
- MongoDB Atlas or a local MongoDB instance
- Cloudinary account
- Razorpay account
- SMTP credentials for transactional emails

### 1. Install dependencies

```bash
npm install
cd server
npm install
```

### 2. Configure environment variables

Create a root `.env` file:

```env
REACT_APP_BACKEND_URL=http://localhost:4000/api/v1
```

Create `server/.env`:

```env
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@example.com
MAIL_PASS=your_email_password_or_app_password
CONTACT_US_EMAIL=your_inbox@example.com
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
PORT=4000
FRONTEND_URL=http://localhost:3000
```

### 3. Run the project

Frontend only:

```bash
npm start
```

Frontend and backend together:

```bash
npm run dev
```

Backend only:

```bash
cd server
npm run dev
```

## Notes

- API routes are mounted under `/api/v1`
- The frontend reads its backend base URL from `REACT_APP_BACKEND_URL`
- The backend uses `FRONTEND_URL` for CORS configuration
- See `docs/ARCHITECTURE.md` for a high-level system overview
