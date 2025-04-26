import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export type UserRole = 'employee' | 'company';

interface JwtPayload {
  name: string;
  email: string;
  role: string;
}

export interface ActivityData {
  total_emission: number;
  activity_type_breakdown: {
    [key: string]: number;
  };
  daily_emission_breakdown: Array<{
    start: string;
    end: string;
    emission: number;
  }>;
  weekly_emission_breakdown: Array<{
    start: string;
    end: string;
    emission: number;
  }>;
  monthly_emission_breakdown: Array<{
    start: string;
    end: string;
    emission: number;
  }>;
  top_3_users?: Array<{
    user_id: string;
    total_emission: number;
  }>;
  companyLeaderboard?: Array<{
    company_id: string;
    total_emission: number;
  }>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  companyId?: string;
  avatar?: string;
  token?: string;
  activityData?: ActivityData;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: { name: string; email: string; password: string; role: UserRole }) => Promise<boolean>;
  logout: () => void;
  error: string | null;
  fetchActivityData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivityData = async () => {
    if (!user) return;

    try {
      const queryParams = new URLSearchParams({
        user_type: user.role,
        identifier: user.name,
      });

      const response = await fetch(`http://127.0.0.1:8005/fetch-activity/?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch activity data');
      }

      const data = await response.json();
      
      setUser(prevUser => {
        if (!prevUser) return null;
        const updatedUser = {
          ...prevUser,
          activityData: data.total,
        };
        localStorage.setItem('greenPulseUser', JSON.stringify(updatedUser));
        return updatedUser;
      });
    } catch (err) {
      console.error('Error fetching activity data:', err);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('greenPulseUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user:', e);
        localStorage.removeItem('greenPulseUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const queryParams = new URLSearchParams({
        email,
        password
      }).toString();

      const response = await fetch(`http://127.0.0.1:8081/api/user/login?${queryParams}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const { jwtToken } = await response.json();
      
      // Decode the JWT token
      const decoded = jwtDecode<JwtPayload>(jwtToken);
      
      // Map role from JWT token
      const role: UserRole = decoded.role.toLowerCase() === 'employee' ? 'employee' : 'company';
      
      // Create user object from decoded token
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: decoded.name,
        email: decoded.email,
        role,
        token: jwtToken,
      };
      
      setUser(newUser);
      localStorage.setItem('greenPulseUser', JSON.stringify(newUser));

      // Fetch activity data after successful login
      await fetchActivityData();
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: { name: string; email: string; password: string; role: UserRole }): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://127.0.0.1:8081/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: userData.password,
          userTypeId: userData.role === 'employee' ? 1 : 2
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      // After successful registration, log the user in
      return await login(userData.email, userData.password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('greenPulseUser');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    error,
    fetchActivityData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};