import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from './contexts/AuthContext';

// Layouts
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import EmployeeDashboard from './pages/employee/Dashboard';
import EmployeeFootprint from './pages/employee/Footprint';
import EmployeeSuggestions from './pages/employee/Suggestions';
import EmployeeRewards from './pages/employee/Rewards';
import CompanyDashboard from './pages/company/Dashboard';
import CompanyEmployees from './pages/company/Employees';
import CompanyLeaderboard from './pages/company/Leaderboard';
import Profile from './pages/Profile';
import NotFoundPage from './pages/NotFoundPage';

// Protected Route wrapper
const ProtectedRoute = ({ 
  children, 
  requiredRole 
}: { 
  children: React.ReactNode; 
  requiredRole?: string;
}) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to={user?.role === 'employee' ? '/employee' : '/company'} replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        
        {/* Protected routes - Employee */}
        <Route 
          path="/employee" 
          element={
            <ProtectedRoute requiredRole="employee">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<EmployeeDashboard />} />
          <Route path="footprint" element={<EmployeeFootprint />} />
          <Route path="suggestions" element={<EmployeeSuggestions />} />
          <Route path="rewards" element={<EmployeeRewards />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        
        {/* Protected routes - Company */}
        <Route 
          path="/company" 
          element={
            <ProtectedRoute requiredRole="company">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<CompanyDashboard />} />
          <Route path="employees" element={<CompanyEmployees />} />
          <Route path="leaderboard" element={<CompanyLeaderboard />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        
        {/* 404 page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;