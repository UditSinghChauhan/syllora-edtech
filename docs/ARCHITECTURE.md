# Architecture Overview

Syllora is a full-stack MERN edtech platform structured as a React single-page application backed by a Node.js and Express API with MongoDB for persistence.

## System Design

- `src/` contains the React frontend, routed with React Router and managed with Redux Toolkit.
- `server/` contains the backend API, organized into routes, controllers, models, middleware, and utilities.
- Cloudinary is used for media storage.
- Razorpay is used for course payment processing.
- Nodemailer is used for OTP and password-reset email flows.

## Core User Flows

### Student flow

1. Sign up with OTP verification.
2. Browse the catalog and course details.
3. Purchase courses using Razorpay.
4. Access protected lesson routes and track course progress.

### Instructor flow

1. Sign up and manage instructor profile details.
2. Create, edit, and publish courses from the dashboard.
3. Organize content into sections and subsections.
4. View instructor dashboard insights and course activity.

## Backend Modules

- `routes/` defines API route groups for auth, profile, course, payment, and contact flows.
- `controllers/` contains request handlers for business logic.
- `models/` contains Mongoose schemas for users, courses, categories, sections, subsections, ratings, and progress.
- `middlewares/auth.js` protects role-based routes for students, instructors, and admins.

## Frontend Modules

- `pages/` contains route-level screens such as home, login, signup, catalog, dashboard, and course viewing.
- `components/` contains reusable UI and feature components.
- `services/` contains API endpoint configuration and async operations.
- `slices/` stores Redux state for auth, profile, cart, course, and view-course flows.

## Deployment Model

- The frontend builds as a static React app.
- The backend runs as a separate Node.js service.
- The frontend communicates with the backend using `REACT_APP_BACKEND_URL`.
- CORS is controlled through the backend `FRONTEND_URL` environment variable.

## Professional Notes

- The project is organized as a portfolio-grade product build rather than a tutorial-level demo.
- Recruiters can evaluate it across UI, state management, API integration, authentication, payments, and deployment readiness.
