A production-ready prototype for a space booking platform that allows users to discover, book, and manage event spaces, co-working areas, and casual third spaces.

🚀 Live Demo
Frontend URL: http://localhost:3000
Backend API: http://localhost:3001

📋 Prerequisites
Before running this project, make sure you have:

Node.js 18+ installed

MongoDB Atlas account or local MongoDB

Razorpay account for payment processing

Git installed

🛠️ Installation & Setup
1. Clone the Repository
bash
git clone https://github.com/Mehangits/spaces-by-fanpit-prototype.git
cd spaces-by-fanpit-prototype
2. Backend Setup
bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
Configure backend environment (.env):

env
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/fanpit
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_REFRESH_SECRET=your-super-secret-refresh-key
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
FRONTEND_URL=http://localhost:3000
PORT=3001
3. Frontend Setup
bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
Configure frontend environment (.env.local):

env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-razorpay-key-id
4. Database Initialization
bash
# From backend directory
npm run init:db
🚀 Running the Application
Start Backend Server
bash
cd backend
npm run start:dev
Backend will run on http://localhost:3001

Start Frontend Development Server
bash
cd frontend
npm run dev
Frontend will run on http://localhost:3000

👥 Default User Accounts
Test Accounts:
Consumer: email: consumer@example.com, password: password123

Brand Owner: email: owner@example.com, password: password123

Staff: email: staff@example.com, password: password123

Razorpay Test Cards:
Card Number: 4111 1111 1111 1111

CVV: Any 3 digits

Expiry: Any future date

Name: Any name

📁 Project Structure
text
spaces-by-fanpit-prototype/
├── backend/                 # NestJS API Server
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── spaces/         # Space management
│   │   ├── reservations/   # Booking system
│   │   ├── payments/       # Razorpay integration
│   │   ├── users/          # User management
│   │   └── database/       # MongoDB configuration
│   ├── test/               # Test files
│   └── package.json
├── frontend/                # Next.js React Application
│   ├── src/
│   │   ├── app/            # App router pages
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── lib/           # Utility libraries
│   │   └── types/         # TypeScript definitions
│   ├── public/            # Static assets
│   └── package.json
└── README.md
🎯 User Roles & Features
👤 Consumer
Browse and search available spaces

Make reservations with real-time availability

Complete payments via Razorpay

View and manage bookings

Easy check-in/check-out process

🏢 Brand Owner
Create and manage multiple spaces

Configure advanced pricing models

View reservations and analytics

Manage space availability

Monitor revenue and occupancy

👨‍💼 Staff
View daily reservation lists

Validate customer check-ins/check-outs

Update reservation status in real-time

Manage day-to-day operations

💳 Payment Integration
The application uses Razorpay for secure payment processing:

✅ Secure payment gateway integration

✅ Test mode available with test cards

✅ Payment verification webhooks

✅ Refund processing support

✅ Payment status synchronization

🧪 Testing
Run Backend Tests
bash
cd backend
npm run test
Run Frontend Tests
bash
cd frontend
npm run test
API Testing
Import the Postman collection from /docs/postman-collection.json to test all API endpoints.

🚀 Deployment
Backend Deployment (Production)
bash
cd backend
npm run build
npm run start:prod
Frontend Deployment (Vercel)
bash
cd frontend
npm run build
npm run start
Environment Variables for Production
Update these variables for production deployment:

Database connection string

Production Razorpay keys

Secure JWT secrets

Frontend API URL

🔧 Troubleshooting
Common Issues:
MongoDB Connection Error

Verify your connection string in .env

Check MongoDB Atlas whitelisted IP addresses

Razorpay Payment Issues

Ensure Razorpay keys are correctly configured

Use test cards in development mode

JWT Authentication Errors

Verify JWT secrets are set in environment variables

Check token expiration settings

Build Errors

Clear node_modules and reinstall dependencies

Check TypeScript compilation errors

Getting Help:
Check the console for specific error messages

Verify all environment variables are set

Ensure all dependencies are installed

Check the browser developer tools for frontend errors

📞 Support
For technical support or questions:

Email: tech@fanpit.live

GitHub Issues: Create new issue

🔮 Future Enhancements
Admin analytics dashboard with charts

iCal/Google Calendar integration

Real-time chat support

Mobile app development

Advanced search and filtering

Multi-language support

Push notifications

Subscription-based pricing models

📄 License
This project is proprietary and developed for Fanpit. All rights reserved.

🙏 Acknowledgments
NestJS - Backend framework

Next.js - Frontend framework

MongoDB - Database

Razorpay - Payment processing

Tailwind CSS - Styling framework

Note: This is a production-ready prototype. For production deployment, ensure proper security measures, monitoring, and testing are implemented.

