import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Leaf, 
  LineChart, 
  Users, 
  Award, 
  ArrowRight, 
  Lightbulb, 
  BarChart4,
  Car,
  Home,
  Coffee,
  ShoppingBag
} from 'lucide-react';
import Button from '../components/ui/Button';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-primary-600" />
            <span className="text-xl font-semibold">GreenPulse</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-700 hover:text-primary-600 transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-primary-600 transition-colors">How it works</a>
            <a href="#testimonials" className="text-gray-700 hover:text-primary-600 transition-colors">Testimonials</a>
            <Link 
              to="/login" 
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              Log in
            </Link>
            <Link to="/register">
              <Button 
                variant="primary" 
                size="sm"
              >
                Sign up
              </Button>
            </Link>
          </div>
          <div className="md:hidden">
            <Link to="/login">
              <Button 
                variant="primary" 
                size="sm"
              >
                Log in
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-36 md:pb-24 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
                  Reduce Your <span className="text-primary-600">Carbon Footprint</span> Together
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg">
                  Track, analyze, and reduce your environmental impact with our all-in-one platform designed for individuals and companies.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link to="/register">
                    <Button 
                      variant="primary" 
                      size="lg"
                      icon={<ArrowRight size={20} />}
                    >
                      Get started
                    </Button>
                  </Link>
                  <a href="#how-it-works">
                    <Button 
                      variant="outline" 
                      size="lg"
                    >
                      Learn more
                    </Button>
                  </a>
                </div>
              </motion.div>
            </div>
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="w-full h-80 md:h-96 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl overflow-hidden shadow-xl">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.05, 1],
                        rotate: [0, 2, 0, -2, 0],
                      }}
                      transition={{ 
                        duration: 5, 
                        repeat: Infinity,
                        repeatType: "reverse" 
                      }}
                    >
                      <Leaf className="w-32 h-32 text-white opacity-20" />
                    </motion.div>
                  </div>
                  <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 w-56">
                    <h3 className="text-sm font-semibold mb-2 text-gray-800">Weekly Summary</h3>
                    <div className="bg-success-50 text-success-700 rounded-md px-2 py-1 text-xs font-medium inline-flex items-center mb-2">
                      <ArrowRight size={12} className="mr-1 -rotate-45" /> 
                      15% reduction
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full mb-3">
                      <div className="h-full bg-success-500 rounded-full w-2/3"></div>
                    </div>
                    <div className="text-xs text-gray-600">280 kg of CO₂ saved</div>
                  </div>
                  <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 w-56">
                    <h3 className="text-sm font-semibold mb-1 text-gray-800">Top Categories</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="flex items-center text-gray-700">
                          <Car size={12} className="mr-1" /> Transportation
                        </span>
                        <span className="font-medium">45%</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="flex items-center text-gray-700">
                          <Home size={12} className="mr-1" /> Energy
                        </span>
                        <span className="font-medium">30%</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="flex items-center text-gray-700">
                          <Coffee size={12} className="mr-1" /> Food
                        </span>
                        <span className="font-medium">15%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners/Stats Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <p className="text-gray-500 mb-8 text-center">Trusted by forward-thinking organizations</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-3xl">
              <div className="flex items-center justify-center">
                <div className="h-8 text-gray-400 font-semibold">ACME Corp</div>
              </div>
              <div className="flex items-center justify-center">
                <div className="h-8 text-gray-400 font-semibold">EcoTech</div>
              </div>
              <div className="flex items-center justify-center">
                <div className="h-8 text-gray-400 font-semibold">GreenFuture</div>
              </div>
              <div className="flex items-center justify-center">
                <div className="h-8 text-gray-400 font-semibold">SustainCo</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <motion.div
                whileInView={{ opacity: [0, 1], y: [20, 0] }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-primary-600 mb-2">8.5M+</div>
                <div className="text-gray-600">kg of CO₂ reduced</div>
              </motion.div>
              <motion.div
                whileInView={{ opacity: [0, 1], y: [20, 0] }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-primary-600 mb-2">10k+</div>
                <div className="text-gray-600">active users</div>
              </motion.div>
              <motion.div
                whileInView={{ opacity: [0, 1], y: [20, 0] }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-primary-600 mb-2">250+</div>
                <div className="text-gray-600">companies</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Features for Everyone</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform provides powerful tools for both individuals and companies to track, 
              analyze and improve their environmental impact.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-card"
            >
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mb-6">
                <LineChart size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Detailed Tracking</h3>
              <p className="text-gray-600">
                Monitor your carbon footprint across various categories including transportation, energy, food, and more.
              </p>
            </motion.div>
            
            <motion.div
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-card"
            >
              <div className="w-12 h-12 bg-accent-100 text-accent-600 rounded-lg flex items-center justify-center mb-6">
                <Lightbulb size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Suggestions</h3>
              <p className="text-gray-600">
                Receive personalized recommendations to reduce your environmental impact based on your activity patterns.
              </p>
            </motion.div>
            
            <motion.div
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-card"
            >
              <div className="w-12 h-12 bg-success-100 text-success-600 rounded-lg flex items-center justify-center mb-6">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Rewards System</h3>
              <p className="text-gray-600">
                Earn points and rewards for making environmentally-friendly choices and achieving reduction goals.
              </p>
            </motion.div>
            
            <motion.div
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-card"
            >
              <div className="w-12 h-12 bg-secondary-100 text-secondary-600 rounded-lg flex items-center justify-center mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Team Management</h3>
              <p className="text-gray-600">
                For companies, track and manage your entire organization's carbon footprint with powerful admin tools.
              </p>
            </motion.div>
            
            <motion.div
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-card"
            >
              <div className="w-12 h-12 bg-warning-100 text-warning-600 rounded-lg flex items-center justify-center mb-6">
                <BarChart4 size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Competitive Insights</h3>
              <p className="text-gray-600">
                Compare your company's performance with industry benchmarks and competitors on our leaderboards.
              </p>
            </motion.div>
            
            <motion.div
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-card"
            >
              <div className="w-12 h-12 bg-error-100 text-error-600 rounded-lg flex items-center justify-center mb-6">
                <ShoppingBag size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sustainable Marketplace</h3>
              <p className="text-gray-600">
                Discover eco-friendly products and services to help you reduce your environmental impact further.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A simple process to help you start reducing your carbon footprint today.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Sign Up</h3>
              <p className="text-gray-600">
                Create an account as an individual employee or as a company to get started.
              </p>
            </motion.div>
            
            <motion.div
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Track Activity</h3>
              <p className="text-gray-600">
                Log your daily activities across various categories to calculate your carbon footprint.
              </p>
            </motion.div>
            
            <motion.div
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Reduce & Earn</h3>
              <p className="text-gray-600">
                Implement suggestions, reduce your footprint, and earn rewards for your progress.
              </p>
            </motion.div>
          </div>
          
          <div className="mt-16 text-center">
            <Link to="/register">
              <Button 
                variant="primary" 
                size="lg"
                icon={<ArrowRight size={20} />}
              >
                Start your journey
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from individuals and companies who have successfully reduced their carbon footprint.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-card"
            >
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150" 
                  alt="Sarah Chen" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">Sarah Chen</h4>
                  <p className="text-sm text-gray-500">Product Manager</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "GreenPulse helped our team reduce emissions by 23% in just 3 months. The insights and suggestions were incredibly actionable."
              </p>
            </motion.div>
            
            <motion.div
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-card"
            >
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150" 
                  alt="Michael Thorne" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">Michael Thorne</h4>
                  <p className="text-sm text-gray-500">Sustainability Director</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "As a company of 500+ employees, we needed a way to track our overall environmental impact. GreenPulse provided exactly what we needed and more."
              </p>
            </motion.div>
            
            <motion.div
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-card"
            >
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150" 
                  alt="Jessica Winters" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">Jessica Winters</h4>
                  <p className="text-sm text-gray-500">Software Engineer</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The rewards system kept me motivated. I've made lasting changes to my daily routine and feel good about my reduced impact on the environment."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to make a difference?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10">
            Join thousands of individuals and companies already reducing their carbon footprint.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/register">
              <Button 
                variant="accent" 
                size="lg"
                icon={<ArrowRight size={20} />}
              >
                Sign up now
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                variant="outline" 
                size="lg"
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                Log in
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-6 w-6 text-primary-500" />
                <span className="text-xl font-semibold text-white">GreenPulse</span>
              </div>
              <p className="mb-4">Making sustainability accessible and rewarding for everyone.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">About us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of service</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>hello@greenpulse.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Green Street<br />San Francisco, CA 94103</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-sm">© 2025 GreenPulse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;