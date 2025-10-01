# HRPulse - HR Management System

HRPulse is a beautiful and modern HR management system with separate dashboards for HR managers and employees. It features role-based access control, sleek user interfaces, and a comprehensive set of HR management features.

## Features

- 🔐 Beautiful Sign In / Sign Up pages with role selection
- 👥 Role-based access for HR and Employee users
- 📊 Comprehensive dashboards with data visualization
- 👨‍💼 HR features: employee management, performance tracking, leave approval
- 👩‍💻 Employee features: profile management, salary details, leave requests
- 🎨 Modern UI with responsive design and subtle animations

## Tech Stack

### Frontend
- React (with functional components & hooks)
- TypeScript
- Tailwind CSS for styling
- Recharts for data visualization
- React Router for navigation
- Lucide React for icons

### Backend
- Flask with Blueprints
- SQLAlchemy ORM
- SQLite database
- Flask-CORS for cross-origin resource sharing

## Project Structure

```
/
├── src/                  # Frontend React code
│   ├── components/       # Reusable UI components
│   ├── contexts/         # React context providers
│   ├── layouts/          # Page layout components
│   ├── pages/            # Page components
│   │   ├── auth/         # Authentication pages
│   │   ├── hr/           # HR dashboard pages
│   │   └── employee/     # Employee dashboard pages
│   └── main.tsx          # Main React entry point
│
├── backend/              # Flask backend code
│   ├── blueprints/       # API route blueprints
│   ├── app.py            # Flask app initialization
│   ├── models.py         # Database models
│   └── seed.py           # Database seeding script
│
└── README.md             # Project documentation
```

## Getting Started

### Prerequisites

- Node.js and npm
- Python 3.8 or higher
- Flask and required Python packages

### Setup & Installation

1. **Clone the repository:**
   ```
   git clone https://github.com/yourusername/hrpulse.git
   cd hrpulse
   ```

2. **Install frontend dependencies:**
   ```
   npm install
   ```

3. **Install backend dependencies:**
   ```
   cd backend
   pip install flask flask-sqlalchemy flask-cors
   ```

4. **Seed the database:**
   ```
   python seed.py
   ```

5. **Start the backend server:**
   ```
   flask run
   ```

6. **Start the frontend development server:**
   ```
   cd ..
   npm run dev
   ```

7. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## Login Information

You can use the following credentials to log in:

- **HR Manager:**
  - Email: hr@example.com
  - Password: password123

- **Employee:**
  - Email: john.doe@example.com
  - Password: password123

## Project Features

### HR Dashboard

- **Employee Management**: View, edit, and manage employee information
- **Performance Monitoring**: Track employee performance with visualizations
- **Leave Approval**: Manage and respond to employee leave requests

### Employee Dashboard

- **Profile Management**: View and update personal information
- **Salary Details**: View salary history and breakdown
- **Leave Management**: Submit and track leave requests