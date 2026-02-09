# 🎓 EduMatrix - University Management System

**A full-stack university management system with role-based access control, course enrollment, payment integration, and email notifications.**

![React](https://img.shields.io/badge/React-gray?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-gray?logo=typescript) ![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js) ![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb) ![Stripe](https://img.shields.io/badge/Stripe-Payment-blue?logo=stripe) ![SendGrid](https://img.shields.io/badge/SendGrid-Email-339933?logo=twilio)

<!-- ![Nodemailer](https://img.shields.io/badge/Nodemailer-Email-339933?logo=nodemailer) -->

## ✨ Features

### User Features

- 🏫 Browse universities and available courses
- 📱 Responsive Design: Mobile-friendly interface
- 🔐 Authentication: Secure login and registration system
- 📧 OTP Verification: Login with email OTP verification

### Student Portal

- 🔐 Secure registration & login with JWT and email OTP verification
- 🏫 Browse universities and available courses
- 📚 Enroll in courses with integrated Stripe payment
- 📊 Personalized dashboard to track enrollments and progress
- ✅ Payment verification and course access management

### Admin Panel

- 📋 Complete CRUD operations for Streams, Subjects, Courses, and Universities
- 👥 View and manage student enrollments
- 📱 Responsive sidebar with mobile support
- 🔒 Protected routes with role-based access control

### Security & Authentication

- 🛡️ JWT token-based authentication
- 🔑 Bcrypt password encryption
- 📧 Email OTP verification
- 👥 Protected routes for students and administrators (Role-Based Access Control)
- 🛂 Input and Params validation (Joi & Yup)
- 🌐 CORS protection

## 📌 Live Preview : https://edu-matrix-aum.vercel.app

## 🛠️ Tech Stack

**Frontend:** React • TypeScript • Context API • Vite • Bootstrap • React Router • Formik + Yup • Axios • AOS • Toastify

**Backend:** Node.js • Express • TypeScript • MongoDB • Mongoose • JWT • Nodemailer

**Others:** JWT • Bcrypt • Joi • Yup • CORS • Stripe • SendGrid • Nodemailer

<!-- **Payment & Email:** Stripe • SendGrid • Nodemailer -->

## 📁 Project Structure

```
Edu-Matrix/
├── university-be/             # Backend (Node.js + Express + MongoDB)
│   ├── src/
│   │   ├── config/                 # Database configuration
│   │   ├── controller/             # Route controllers
│   │   ├── helper/                 # Helper functions
│   │   ├── middleware/             # Authentication & validation
│   │   ├── models/                 # MongoDB models
│   │   ├── routes/                 # API routes
│   │   ├── services/               # Business logic
│   │   ├── validators/             # Input validation schemas
│   │   └──server.ts                # Server entry point
│   └── package.json                # Dependencies
│
├── university-management/     # Frontend (React + TypeScript + Vite)
│   ├── src/
│   │   ├── api/                    # API service layer
│   │   ├── components/             # Reusable components (Navbar, Sidebar, Forms)
│   │   ├── context/                # Global state management
│   │   ├── helper/                 # Utility functions
│   │   ├── pages/
│   │   │   ├── Admin/              # Stream, Subject, Course, University CRUD
│   │   │   ├── Student/            # Dashboard, Enrollment, University List
│   │   │   └── User/               # Login, Register, OTP
│   │   ├── App.tsx                 # Main app component
│   │   ├── main.tsx                # Entry point
│   │   └── main.css                # Global styles
│   ├── .env                        # Environment variables
│   ├── index.html                  # HTML template
│   ├── package.json                # Dependencies
│   ├── tsconfig.json               # TypeScript config
│   ├── vite.config.ts              # Vite configuration
│   └── vercel.json                 # Vercel deployment config
│
└──README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)
- Stripe account
- Email service (Gmail/SendGrid)

### Backend Setup

```bash
cd university-be
npm install

# Create .env file
cp .env.example .env
```

**Backend `.env`:**

```env
PORT=3007
CLIENT_URL=http://localhost:5173
MONGODB_URL=mongodb://localhost:27017/edumatrix
JWT_SECRET_KEY=your_secret_key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your_email_password
STRIPE_SECRET_KEY=sk_test_your_stripe_key
```

**Start backend:**

```bash
npm run dev  # Development mode
```

### Frontend Setup

```bash
cd university-management
npm install
```

**Frontend `.env`:**

```env
VITE_BACKEND_URL=http://localhost:3007/api/v1/
```

**Start frontend:**

```bash
npm run dev
```

**Access:**

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3007`

## 🔌 API Endpoints

### User Routes (`/api/v1`)

- `POST /register` - Register user
- `POST /login` - Login user
- `POST /send-otp` - Send email OTP
- `POST /verify-otp` - Verify OTP
- `GET /api/student/universities` - Get universities list
- `GET /api/student/university/:id` - Get university details

### Student Routes (`/api/v1/student`) 🔒

- `GET /profile` - Get student profile
- `POST /enroll` - Enroll in course
- `GET /enrollments` - View enrollments
- `POST /verify-payment` - Verify Stripe payment
- `GET /dashboard` - Dashboard data

### Admin Routes (`/api/v1/admin`) 🔒

- **Streams:** `GET/POST/PUT/DELETE /stream(s)`
- **Subjects:** `GET/POST/PUT/DELETE /subject(s)`
- **Courses:** `GET/POST/PUT/DELETE /course(s)`
- **Universities:** `GET/POST/PUT/DELETE /universit(y|ies)`

🔒 = Protected routes (🛡️JWT required and 👥role-based access control)

## 🌐 Deployment

**Frontend (Vercel):**

```bash
cd university-management
npm run build
vercel
```

**Backend (Render/Railway):**

- Build: `npm run build`
- Start: `npm start`
- Add environment variables

**Database:** MongoDB Atlas (cloud) or local MongoDB

## 🎯 User Roles

| Feature                                  | Public | Student | Admin |
| ---------------------------------------- | ------ | ------- | ----- |
| **Responsive** Mobile-friendly interface | ✅     | ✅      | ✅    |
| View Universities/Courses                | ✅     | ✅      | ✅    |
| Enroll in Courses                        | ❌     | ✅      | ❌    |
| Dashboard                                | ❌     | ✅      | ✅    |
| Manage Content (CRUD)                    | ❌     | ❌      | ✅    |

## 📜 Scripts

**Frontend:**

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

**Backend:**

- `npm run dev` - Start with nodemon
- `npm run build` - Compile TypeScript
- `npm start` - Run production server

<!-- ## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/NewFeature`)
3. Commit changes (`git commit -m 'Add NewFeature'`)
4. Push to branch (`git push origin feature/NewFeature`)
5. Open Pull Request -->

<!-- ## 📄 License

MIT License - feel free to use this project for learning and development. -->

## 👨‍💻 Author

**Aum Parekh :** [@AumParekh07](https://github.com/AumParekh07)

**Project Link :** https://github.com/AumParekh07/EduMatrix

**Live Preview :** https://edu-matrix-aum.vercel.app

---

<div align="center">
<b>Give A ⭐ Star this repo if you find it helpful!</b>

<b>Made with ❤️ by <a href="https://github.com/AumParekh07" target="_blank">Aum Parekh</a></b>

</div>
