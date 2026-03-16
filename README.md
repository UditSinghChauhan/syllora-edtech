# 🎓 Syllora – EdTech Platform

## Overview

**Syllora** is a comprehensive full-stack EdTech platform designed to democratize online education. It empowers instructors to create, manage, and monetize high-quality educational content while providing students with an intuitive, engaging learning experience. Built with modern web technologies, Syllora facilitates seamless course discovery, enrollment, progress tracking, and secure payments.

## 📌 Significance for the Client

### Business Impact
- **Revenue Generation**: Integrated payment gateway (Razorpay) enables secure course monetization and subscription management
- **Scalability**: Cloud-based infrastructure (Cloudinary for media storage) supports unlimited course content and user growth
- **User Engagement**: Comprehensive rating, review, and progress tracking system enhances student satisfaction and retention
- **Content Control**: Instructors have full autonomy over course creation, pricing, and content management

### Educational Value
- **Accessibility**: Democratizes quality education by making courses available to students worldwide
- **Structured Learning**: Organized course structure with sections and subsections ensures progressive learning
- **Progress Tracking**: Students can monitor their learning journey with real-time course progress indicators
- **Quality Assurance**: Rating and review system maintains content quality and instructor accountability

### Key Differentiators
✅ Role-based authentication (Students, Instructors, Admin)  
✅ Real-time course progress tracking  
✅ Integrated payment system with Razorpay  
✅ Email verification and secure password management  
✅ OTP-based authentication for enhanced security  
✅ Cloud-based media storage with Cloudinary  
✅ Responsive design for mobile and desktop  

---

## 🚀 Features

### For Students
- 🔐 **Secure Registration & Login** - Email verification and OTP-based authentication
- 🔍 **Course Discovery** - Browse and search courses by category
- 📚 **Enrollment** - Seamless course enrollment with secure payments
- 📊 **Progress Tracking** - Monitor learning progress with visual indicators
- ⭐ **Ratings & Reviews** - Rate courses and read peer reviews
- 📖 **Video Learning** - Stream course videos with interactive controls
- 🎯 **Dashboard** - Personalized dashboard for course management

### For Instructors
- ✍️ **Course Creation** - Create and manage multiple courses
- 📹 **Content Management** - Organize content into sections and subsections
- 💰 **Monetization** - Set pricing and manage course revenue
- 📊 **Analytics** - Track student enrollment and course performance
- 🎨 **Rich Media Support** - Upload images, videos, and documents
- 👥 **Student Management** - View enrolled students and their progress

### For Admin
- 🛠️ **Category Management** - Create and manage course categories
- 👤 **User Management** - Monitor users and handle disputes
- 📈 **Platform Analytics** - View platform-wide statistics
- ✉️ **Communication** - Send notifications to users

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library for building interactive interfaces
- **Redux Toolkit** - State management for complex application state
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Axios** - HTTP client for API requests
- **React Hook Form** - Efficient form management
- **React Hot Toast** - Notification system
- **Swiper** - Carousel/slider functionality
- **Chart.js & react-chartjs-2** - Data visualization
- **React Markdown** - Markdown rendering for course content
- **Video React** - Video player component
- **React Icons** - Icon library

### Backend
- **Node.js & Express.js** - Server and API framework
- **MongoDB & Mongoose** - NoSQL database and ODM
- **JWT (JSON Web Tokens)** - Secure authentication
- **Bcrypt & Bcryptjs** - Password hashing
- **Nodemailer** - Email service
- **Cloudinary** - Cloud storage for media files
- **Razorpay** - Payment gateway integration
- **OTP Generator** - One-Time Password generation
- **Node Schedule** - Task scheduling for OTP expiration
- **Cookie Parser** - HTTP cookie parsing
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

### Deployment & DevOps
- **Concurrently** - Run multiple npm scripts simultaneously
- **Nodemon** - Auto-restart server during development

---

## 📂 Project Structure

```
syllora-edtech/
├── public/                    # Static files
├── server/                    # Backend (Node.js + Express)
│   ├── config/               # Configuration files (DB, Cloudinary, Razorpay)
│   ├── controllers/          # Route controllers
│   ├── models/               # MongoDB schemas
│   ├── routes/               # API routes
│   ├── middlewares/          # Authentication and custom middlewares
│   ├── mail/                 # Email templates and utilities
│   ├── utils/                # Helper utilities
│   └── index.js              # Server entry point
├── src/                       # Frontend (React)
│   ├── components/           # Reusable React components
│   ├── pages/                # Page components
│   ├── services/             # API integration and business logic
│   ├── slices/               # Redux slices for state management
│   ├── hooks/                # Custom React hooks
│   ├── utils/                # Utility functions
│   ├── data/                 # Static data and constants
│   ├── assets/               # Images, logos, and media
│   └── App.js                # Main app component
├── package.json              # Frontend dependencies
└── tailwind.config.js         # Tailwind CSS configuration
```

---

## ⚙️ Installation & Setup

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud - MongoDB Atlas)
- Accounts for: Cloudinary, Razorpay, Gmail (for email service)

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd syllora-edtech
```

### Step 2: Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd server
npm install
```

### Step 3: Environment Configuration

Create a `.env` file in the `server` directory:

```env
# Database
MONGODB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database-name>

# JWT/Auth
JWT_SECRET=your_jwt_secret_key
OTP_MAIL_FROM=your_email@gmail.com

# Email Service (Gmail)
MAIL_PASS=your_app_specific_password
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com

# Cloudinary
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# App Configuration
PORT=4000
NODE_ENV=development
```

Create a `.env.local` file in the root directory for frontend:

```env
REACT_APP_API_BASE_URL=http://localhost:4000/api/v1
```

---

## 🚴 Running the Application

### Development Mode

**Option 1: Run both client and server concurrently**
```bash
npm run dev
```

**Option 2: Run separately**

Terminal 1 - Frontend:
```bash
npm start
```

Terminal 2 - Backend:
```bash
cd server
npm run dev
```

### Production Build
```bash
npm run build
cd server
npm start
```

Access the application at: `http://localhost:3000`

---

## 🔌 API Endpoints Overview

### Authentication Routes (`/api/v1/auth`)
- `POST /signup` - User registration
- `POST /login` - User login
- `POST /sendotp` - Send OTP for email verification
- `POST /changepassword` - Change password
- `POST /resetpassword` - Reset forgot password
- `GET /resetpasswordtoken` - Get reset token

### Course Routes (`/api/v1/courses`)
- `POST /createCourse` - Create a new course
- `GET /getAllCourses` - Fetch all courses
- `GET /getCourseDetails` - Get specific course details
- `POST /editCourse` - Update course information
- `DELETE /deleteCourse` - Delete a course
- `POST /addSectionToTemplate` - Add course section
- `POST /updateSection` - Update section
- `DELETE /deleteSection` - Delete section

### Enrollment Routes (`/api/v1/payments`)
- `POST /capturePayment` - Process course payment
- `POST /verifySignature` - Verify Razorpay payment
- `POST /sendPaymentSuccessEmail` - Send confirmation email

### User Profile Routes (`/api/v1/profile`)
- `GET /getUserDetails` - Fetch user profile
- `PUT /updateProfile` - Update profile information
- `PUT /updateDisplayPicture` - Change profile picture
- `DELETE /deleteAccount` - Delete user account

### Rating & Review Routes
- `POST /createRating` - Post course review
- `GET /getAverageRating` - Get course rating
- `GET /getAllRating` - Fetch all reviews

---

## 🔐 Authentication & Security

- **JWT Tokens** - Secure, stateless authentication
- **Password Hashing** - Bcrypt for secure password storage
- **OTP Verification** - Enhanced security for email verification
- **Email Verification** - Ensure valid user emails
- **Role-Based Access Control** - Different permissions for students, instructors, and admins
- **Secure API Communication** - HTTPS ready deployment
- **CORS Protection** - Restricted cross-origin requests

---

## 📧 Email Templates

The platform includes pre-built email templates for:
- 📧 Email Verification
- 🎓 Course Enrollment Confirmation
- 💳 Payment Success Notification
- 🔑 Password Update Confirmation
- 📬 Contact Form Response

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is private and proprietary. Unauthorized copying or distribution is prohibited.

---

## 🆘 Support & Contact

For issues, bugs, or feature requests, please use the **Contact Us** feature in the application or reach out to the development team.

---

## 🎯 Future Enhancements

- Live class sessions with WebRTC integration
- AI-powered course recommendations
- Advanced analytics dashboard
- Mobile app (React Native)
- Gamification and badges
- Peer-to-peer collaboration tools
- Advanced search and filtering

---

**Made with ❤️ for Online Education**