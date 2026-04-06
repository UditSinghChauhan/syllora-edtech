# Syllora Architecture

## :building_construction: System Overview

Syllora is a full-stack edtech platform built as a React single-page application with a Node.js and Express backend and MongoDB for persistence. The system supports two primary product flows: students discover and consume courses, while instructors create and manage course content.

At a high level:

- The frontend handles routing, forms, dashboards, and protected learning views
- The backend exposes REST APIs for authentication, course management, payments, profile updates, and progress tracking
- MongoDB stores users, courses, categories, content structure, reviews, and learning progress
- Cloudinary stores uploaded media such as course thumbnails and video assets
- Razorpay handles payment order creation and payment verification
- Nodemailer is used for OTP, enrollment, and password-related emails

## :jigsaw: Architecture Diagram (Text-based)

```text
React Client
   |
   v
Express API Server
   |
   +--> MongoDB
   |      - users
   |      - profiles
   |      - categories
   |      - courses
   |      - sections
   |      - subsections
   |      - course progress
   |      - ratings/reviews
   |      - OTP records
   |
   +--> Cloudinary
   |      - course thumbnails
   |      - uploaded course media
   |
   +--> Razorpay
   |      - payment order creation
   |      - payment verification
   |
   +--> Email Service
          - OTP delivery
          - enrollment confirmation
          - password update/reset emails
```

## :lock: Authentication Flow

### Signup

- A new user requests an OTP using their email
- The backend generates and stores the OTP in the `OTP` collection
- After OTP verification, the backend creates:
  - a `Profile` document for user metadata
  - a `User` document linked to that profile
- Users can register as `Student` or `Instructor`
- Instructor accounts are currently created with `approved: false`, which leaves room for future approval workflows

### Login

- Users log in with email and password
- Passwords are checked with `bcrypt`
- On success, the backend signs a JWT containing:
  - user id
  - email
  - account type
- The token is returned in the response and also set as an HTTP-only cookie

### Authorization

- Protected routes use middleware to validate the JWT
- Role guards enforce access based on account type:
  - `isStudent`
  - `isInstructor`
  - `isAdmin`
- In the current product, the main active frontend roles are student and instructor

## :books: Course Management Flow

### Course Creation

- Instructors create courses from the dashboard
- The backend accepts course metadata such as:
  - title
  - description
  - learning outcomes
  - price
  - tags
  - instructions
  - category
  - publish status
- The course thumbnail is uploaded through the API and stored in Cloudinary
- The resulting Cloudinary URL is saved in the `Course` document

### Course Structure

- A course is broken into `Section` documents
- Each section contains multiple `SubSection` documents
- Subsections represent lesson units and store fields like:
  - title
  - description
  - duration
  - video URL

### Course Retrieval

- Public APIs return published courses for catalog browsing
- Course details are populated with:
  - instructor info
  - category
  - reviews
  - nested sections and subsections
- A separate authenticated endpoint returns full course details for enrolled students and the owning instructor

## :movie_camera: Learning Flow

### Enrollment

- Students add courses to cart on the frontend
- The backend creates a Razorpay order based on selected course prices
- After payment verification, the backend:
  - adds the student to `studentsEnrolled` in each course
  - adds the course to the user's enrolled course list
  - creates a `CourseProgress` document
  - sends an enrollment email

### Content Access

- Students access learning content through protected routes
- Full course details include sections, subsections, and the student's completed videos
- Instructors can access full course details only for courses they own

### Progress Tracking

- Each enrolled student gets one `CourseProgress` document per course
- The document stores:
  - `courseID`
  - `userId`
  - `completedVideos`
- When a lesson is completed, the subsection id is appended to `completedVideos`
- This keeps progress tracking simple and course-specific

## :card_file_box: Data Layer

### Core Collections

- `User`: account identity, role, enrolled courses, linked profile, course progress ids
- `Profile`: user metadata such as gender, date of birth, about, and contact number
- `Category`: course grouping used in catalog browsing
- `Course`: main course entity with instructor, category, content references, enrollments, pricing, and status
- `Section`: logical content grouping inside a course
- `SubSection`: lesson-level unit, including video URL and duration
- `CourseProgress`: per-user progress record for a course
- `RatingAndReview`: student feedback linked to user and course
- `OTP`: temporary records for signup verification

### Relationships

```text
User 1 --> 1 Profile
User 1 --> many Courses            (as instructor-created courses)
User many --> many Courses         (as student enrollments)
Category 1 --> many Courses
Course 1 --> many Sections
Section 1 --> many SubSections
Course 1 --> many Ratings
User 1 --> many Ratings
User 1 --> many CourseProgress
Course 1 --> many CourseProgress
```

### Modeling Notes

- Enrollment is modeled with references on both `User` and `Course`
- Progress is stored separately instead of inside the course, which keeps learner state isolated from course content
- Sections and subsections are separate collections, which simplifies nested content management and population

## :dart: Role-Based Access

### Students can

- Sign up and log in
- Browse published courses
- View course details
- Purchase and enroll in courses
- Access protected lessons after enrollment
- Track completed lessons
- Add ratings and reviews
- Manage profile and account settings

### Instructors can

- Sign up and log in
- Create draft or published courses
- Upload course thumbnails and media
- Add sections and subsections
- Edit and manage their own courses
- View instructor dashboard metrics such as course count, student count, and income

### Admin support

- Backend middleware supports an admin role
- Category creation is protected as an admin action in the API
- The current frontend is centered more on student and instructor workflows than a full admin panel

## :gear: Scalability & Improvements

- Move video delivery fully behind a CDN-backed media strategy for faster playback across regions
- Add caching for frequently requested catalog and course-detail endpoints
- Introduce background jobs or queues for email sending and media processing
- Add webhook-based payment reconciliation for stronger payment reliability
- Expand analytics for course completion, retention, and instructor performance
- Add a recommendation layer based on category interest, enrollments, and learning history
- Add search indexing for faster course discovery at larger catalog sizes

## :dart: Design Decisions

### Why this stack

- React fits the dashboard-heavy frontend and protected client-side routing needs
- Express keeps API routing and controller structure simple and readable
- MongoDB works well for document-style course content with nested references and flexible metadata
- Redux Toolkit helps manage auth, profile, cart, and course state across the client

### Why this database structure

- Course content is hierarchical, so separate collections for courses, sections, and subsections map well to the product model
- Progress is separated from content so multiple learners can independently interact with the same course
- Storing role and enrollment data on the user model makes authorization and dashboard queries straightforward

### Trade-offs

- Deep population across courses, sections, subsections, and related metadata is simple to build but can become heavier as data grows
- Enrollment data is duplicated across user and course documents, which improves query convenience but requires careful consistency
- JWT-based auth is practical for this app, but larger systems may add refresh-token rotation and stronger session controls
- Payment and media integrations are handled directly inside the backend today; larger deployments may split these into more isolated services

## Interview Summary

If explaining Syllora in an interview, a clear summary is:

- React frontend for students and instructors
- Express API for auth, courses, payments, and progress tracking
- MongoDB for users, courses, content, and learner progress
- Cloudinary for media and Razorpay for enrollment payments
- Role-based access to separate browsing, teaching, and learning workflows
