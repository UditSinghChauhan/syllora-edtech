# Syllora

Syllora is a full-stack edtech platform built with React, Node.js, Express, and MongoDB. It supports role-based learning workflows for students and instructors, including authentication, OTP verification, course publishing, media uploads, progress tracking, and Razorpay-powered payments.

## Highlights

- Student and instructor authentication with email verification and password reset
- Course catalog, course details, enrollment, and protected lesson viewing
- Instructor dashboard for course creation, editing, and analytics
- Progress tracking, ratings, reviews, and profile management
- Cloudinary media handling and Razorpay payment integration
- Responsive React frontend with Redux Toolkit state management

## Tech Stack

### Frontend

- React 18
- React Router v6
- Redux Toolkit
- Tailwind CSS
- Axios
- React Hook Form
- Chart.js

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- Nodemailer
- Cloudinary
- Razorpay

## Project Structure

```text
syllora-edtech/
|-- public/
|-- src/
|   |-- components/
|   |-- pages/
|   |-- services/
|   |-- slices/
|   |-- hooks/
|   |-- utils/
|   `-- App.js
|-- server/
|   |-- config/
|   |-- controllers/
|   |-- mail/
|   |-- middlewares/
|   |-- models/
|   |-- routes/
|   |-- utils/
|   `-- index.js
|-- package.json
`-- tailwind.config.js
```

## Local Setup

### Prerequisites

- Node.js 18 or newer
- npm
- MongoDB Atlas or a local MongoDB instance
- Cloudinary account
- Razorpay account
- SMTP credentials for transactional emails

### 1. Install dependencies

Frontend:

```bash
npm install
```

Backend:

```bash
cd server
npm install
```

### 2. Configure environment variables

Create `server/.env`:

```env
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@example.com
MAIL_PASS=your_email_password_or_app_password
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
PORT=4000
FRONTEND_URL=http://localhost:3000
```

Create `.env` in the project root:

```env
REACT_APP_BACKEND_URL=http://localhost:4000/api/v1
```

### 3. Run the app

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

## Deployment Notes

- Set the frontend `REACT_APP_BACKEND_URL` to your deployed API base URL.
- Set `FRONTEND_URL` in the backend environment to your deployed frontend domain.
- Ensure MongoDB, Cloudinary, Razorpay, and SMTP credentials are configured in the deployment platform.
- For SPA hosting, add a rewrite rule so unknown routes resolve to `index.html`.

## Suggested Portfolio Additions

- A live demo link
- A short product walkthrough GIF or screenshots
- Demo credentials for student and instructor flows
- Architecture diagram and API summary

## Resume Summary

Built a full-stack MERN edtech platform with role-based authentication, OTP verification, course management, protected learning flows, media uploads, and payment integration.
