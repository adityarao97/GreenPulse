import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Leaf, 
  Home, 
  LineChart, 
  Lightbulb, 
  Award, 
  Users, 
  Medal,
  User,
  LogOut, 
  Menu, 
  X,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const isEmployee = user?.role === 'employee';
  
  const employeeLinks = [
    { path: '/employee', icon: <Home size={20} />, label: 'Dashboard' },
    { path: '/employee/footprint', icon: <LineChart size={20} />, label: 'My Footprint' },
    { path: '/employee/suggestions', icon: <Lightbulb size={20} />, label: 'Suggestions' },
    { path: '/employee/rewards', icon: <Award size={20} />, label: 'Rewards' },
  ];
  
  const companyLinks = [
    { path: '/company', icon: <Home size={20} />, label: 'Dashboard' },
    { path: '/company/employees', icon: <Users size={20} />, label: 'Employees' },
    { path: '/company/leaderboard', icon: <Medal size={20} />, label: 'Leaderboard' },
  ];
  
  const links = isEmployee ? employeeLinks : companyLinks;

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  // Get page title based on current path
  const getPageTitle = () => {
    const currentLink = links.find(link => link.path === location.pathname);
    return currentLink?.label || 'Dashboard';
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || window.innerWidth >= 1024) && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ ease: "easeOut", duration: 0.25 }}
            className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-30 lg:static lg:translate-x-0 flex flex-col`}
          >
            {/* Sidebar header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <Link to={isEmployee ? "/employee" : "/company"} className="flex items-center space-x-2">
                <Leaf className="h-6 w-6 text-primary-600" />
                <span className="text-xl font-semibold text-gray-900">GreenPulse</span>
              </Link>
              <button 
                onClick={toggleSidebar}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Sidebar links */}
            <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) => 
                    `flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors ${
                      isActive 
                        ? 'bg-primary-50 text-primary-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  {link.icon}
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </nav>
            
            {/* Sidebar footer */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-3 py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer transition-colors"
                   onClick={handleLogout}>
                <LogOut size={20} />
                <span>Logout</span>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white border-b border-gray-200 shadow-sm z-10">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button 
                onClick={toggleSidebar}
                className="lg:hidden text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">{getPageTitle()}</h1>
            </div>
            
            {/* User profile dropdown */}
            <div className="relative">
              <div 
                className="flex items-center space-x-2 cursor-pointer"
                onClick={toggleProfileMenu}
              >
                <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium">
                  {user?.name.charAt(0)}
                </div>
                <span className="hidden md:inline text-sm font-medium text-gray-700">{user?.name}</span>
                <ChevronDown size={16} className="text-gray-500" />
              </div>
              
              {/* Profile dropdown menu */}
              {isProfileMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50"
                >
                  <Link
                    to={`/${user?.role}/profile`}
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <User size={16} className="mr-2" />
                    Profile
                  </Link>
                  <div 
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// Helper component for NavLink
const Link = ({ 
  to, 
  className, 
  children 
}: { 
  to: string; 
  className?: string; 
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(to);
  };
  
  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default DashboardLayout;