// Mock user data for authentication
export const mockUsers = [
  {
    id: 'user-1',
    name: 'John Smith',
    email: 'employee@example.com',
    role: 'employee',
    companyId: 'company-1',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 'user-2',
    name: 'EcoTech Inc.',
    email: 'company@example.com',
    role: 'company',
    avatar: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

// Mock carbon footprint data for charts
export const mockFootprintData = {
  daily: [
    { date: '2025-03-01', value: 12.5 },
    { date: '2025-03-02', value: 10.2 },
    { date: '2025-03-03', value: 15.7 },
    { date: '2025-03-04', value: 8.3 },
    { date: '2025-03-05', value: 9.1 },
    { date: '2025-03-06', value: 7.8 },
    { date: '2025-03-07', value: 6.5 },
  ],
  weekly: [
    { date: '2025-02-01', value: 75.2 },
    { date: '2025-02-08', value: 82.7 },
    { date: '2025-02-15', value: 68.9 },
    { date: '2025-02-22', value: 70.3 },
    { date: '2025-03-01', value: 62.1 },
    { date: '2025-03-08', value: 58.4 },
  ],
  monthly: [
    { date: '2024-10-01', value: 320.5 },
    { date: '2024-11-01', value: 298.3 },
    { date: '2024-12-01', value: 310.7 },
    { date: '2025-01-01', value: 285.2 },
    { date: '2025-02-01', value: 260.8 },
    { date: '2025-03-01', value: 245.3 },
  ],
};

// Mock category breakdown data
export const mockCategoryData = [
  { category: 'Transportation', value: 45.2 },
  { category: 'Energy', value: 32.8 },
  { category: 'Food', value: 18.5 },
  { category: 'Shopping', value: 15.3 },
  { category: 'Home', value: 10.7 },
  { category: 'Other', value: 5.2 },
];

// Mock suggestions for carbon reduction
export const mockSuggestions = [
  {
    id: 'sug-1',
    title: 'Switch to LED Bulbs',
    description: 'Replace traditional incandescent bulbs with energy-efficient LED alternatives to reduce energy consumption.',
    impact: 'medium',
    points: 50,
    completed: false,
    category: 'energy',
  },
  {
    id: 'sug-2',
    title: 'Bike to Work Once a Week',
    description: 'Replace one car commute per week with biking to reduce transportation emissions.',
    impact: 'high',
    points: 100,
    completed: false,
    category: 'transportation',
  },
  {
    id: 'sug-3',
    title: 'Reduce Meat Consumption',
    description: 'Try plant-based alternatives for at least 3 meals per week to reduce food-related emissions.',
    impact: 'high',
    points: 80,
    completed: true,
    category: 'food',
  },
  {
    id: 'sug-4',
    title: 'Unplug Electronics',
    description: 'Unplug electronics and appliances when not in use to eliminate phantom energy consumption.',
    impact: 'low',
    points: 30,
    completed: false,
    category: 'energy',
  },
  {
    id: 'sug-5',
    title: 'Use Reusable Shopping Bags',
    description: 'Bring your own bags when shopping to reduce plastic waste.',
    impact: 'medium',
    points: 40,
    completed: true,
    category: 'shopping',
  },
  {
    id: 'sug-6',
    title: 'Install a Smart Thermostat',
    description: 'Optimize your home heating and cooling with a programmable thermostat.',
    impact: 'medium',
    points: 60,
    completed: false,
    category: 'home',
  },
];

// Mock reward data
export const mockRewards = [
  {
    id: 'reward-1',
    title: '10% Off at EcoStore',
    description: 'Get 10% off your next purchase at EcoStore with this reward.',
    points: 500,
    expiresAt: '2025-06-30',
    redeemed: false,
    image: 'https://images.pexels.com/photos/7319146/pexels-photo-7319146.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 'reward-2',
    title: 'Free Public Transit Pass',
    description: 'One-month free public transportation pass for your city.',
    points: 1000,
    expiresAt: '2025-06-30',
    redeemed: false,
    image: 'https://images.pexels.com/photos/2541312/pexels-photo-2541312.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 'reward-3',
    title: 'Plant a Tree in Your Name',
    description: 'We\'ll plant a tree in your name in a reforestation project.',
    points: 800,
    expiresAt: '2025-12-31',
    redeemed: true,
    image: 'https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 'reward-4',
    title: 'Sustainable Coffee Subscription',
    description: 'One-month subscription to ethically sourced, sustainable coffee.',
    points: 1200,
    expiresAt: '2025-06-30',
    redeemed: false,
    image: 'https://images.pexels.com/photos/585753/pexels-photo-585753.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

// Mock employee data for company view
export const mockEmployees = [
  {
    id: 'emp-1',
    name: 'John Smith',
    department: 'Engineering',
    footprint: 65.3,
    reduction: 12.5,
    points: 850,
    completedSuggestions: 8,
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 'emp-2',
    name: 'Sarah Johnson',
    department: 'Marketing',
    footprint: 58.7,
    reduction: 15.2,
    points: 1200,
    completedSuggestions: 12,
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 'emp-3',
    name: 'Michael Williams',
    department: 'Finance',
    footprint: 72.1,
    reduction: 8.7,
    points: 620,
    completedSuggestions: 5,
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 'emp-4',
    name: 'Emma Brown',
    department: 'HR',
    footprint: 61.5,
    reduction: 10.3,
    points: 780,
    completedSuggestions: 7,
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 'emp-5',
    name: 'David Lee',
    department: 'Operations',
    footprint: 68.2,
    reduction: 9.8,
    points: 710,
    completedSuggestions: 6,
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

// Mock company data for leaderboard
export const mockCompanies = [
  {
    id: 'company-1',
    name: 'EcoTech Inc.',
    industry: 'Technology',
    employees: 120,
    footprint: 58.2,
    reduction: 18.5,
    logo: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 'company-2',
    name: 'Green Solutions',
    industry: 'Consulting',
    employees: 75,
    footprint: 48.7,
    reduction: 22.3,
    logo: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 'company-3',
    name: 'Sustainable Foods',
    industry: 'Food & Beverage',
    employees: 210,
    footprint: 62.5,
    reduction: 15.8,
    logo: 'https://images.pexels.com/photos/5273044/pexels-photo-5273044.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 'company-4',
    name: 'Ecoway Transport',
    industry: 'Transportation',
    employees: 180,
    footprint: 72.3,
    reduction: 12.5,
    logo: 'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 'company-5',
    name: 'Clean Energy Co.',
    industry: 'Energy',
    employees: 95,
    footprint: 52.8,
    reduction: 25.1,
    logo: 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 'company-6',
    name: 'Verdant Retail',
    industry: 'Retail',
    employees: 320,
    footprint: 68.7,
    reduction: 10.2,
    logo: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];