import React, { useState, useEffect } from 'react';
import { Phone, Bot, Calendar, Users, Zap, CheckCircle, ArrowRight, MessageSquare, Clock, TrendingUp, X, Play, Pause, Volume2 } from 'lucide-react';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    practiceName: '',
    currentBookingMethod: '',
    monthlyPatients: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  
  // Demo state
  const [demoStep, setDemoStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(true);

  const demoConversation = [
    {
      speaker: 'patient',
      message: "Hi, I'd like to schedule a dental cleaning appointment.",
      timestamp: '0:00'
    },
    {
      speaker: 'ai',
      message: "Hello! I'd be happy to help you schedule a cleaning appointment. May I have your name please?",
      timestamp: '0:03'
    },
    {
      speaker: 'patient',
      message: "Sure, it's Sarah Johnson.",
      timestamp: '0:08'
    },
    {
      speaker: 'ai',
      message: "Thank you, Sarah. I see you're a returning patient. When would you prefer to come in? We have availability this week on Tuesday at 2 PM or Thursday at 10 AM.",
      timestamp: '0:11'
    },
    {
      speaker: 'patient',
      message: "Thursday at 10 AM works perfectly for me.",
      timestamp: '0:18'
    },
    {
      speaker: 'ai',
      message: "Perfect! I've scheduled your cleaning appointment for Thursday, January 18th at 10:00 AM with Dr. Smith. You'll receive a confirmation text shortly. Is there anything else I can help you with today?",
      timestamp: '0:21'
    },
    {
      speaker: 'patient',
      message: "That's all, thank you so much!",
      timestamp: '0:30'
    },
    {
      speaker: 'ai',
      message: "You're very welcome, Sarah! We look forward to seeing you on Thursday. Have a great day!",
      timestamp: '0:33'
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && demoStep < demoConversation.length) {
      interval = setInterval(() => {
        setDemoStep(prev => {
          if (prev >= demoConversation.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, demoStep, demoConversation.length]);

  const handlePlayDemo = () => {
    if (demoStep >= demoConversation.length - 1) {
      setDemoStep(0);
    }
    setIsPlaying(!isPlaying);
  };

  const resetDemo = () => {
    setDemoStep(0);
    setIsPlaying(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Google Apps Script Web App URL - you'll need to create this
      const scriptURL = 'https://script.google.com/macros/s/AKfycbw1klfn6CmCx6Q4iE-AgPuD5EIfyelcYVN7OO9WAhy393W8sbZxgtfRkImgLCXUEfLBnw/exec';

      
      const response = await fetch(scriptURL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams({
    ...formData,
    timestamp: new Date().toISOString(),
    source: 'Website'
  })
});

const text = await response.text();
console.log('Response:', text);


      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        practiceName: '',
        currentBookingMethod: '',
        monthlyPatients: '',
        message: ''
      });
      
      setTimeout(() => {
        setShowForm(false);
        setSubmitStatus('');
      }, 2000);

    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Lead Capture Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Get Your Free AI Demo</h3>
              <button 
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {submitStatus === 'success' && (
              <div className="bg-green-600/20 border border-green-600/50 rounded-lg p-4 mb-6">
                <p className="text-green-400 font-semibold">Thank you! We'll contact you within 24 hours to schedule your demo.</p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="bg-red-600/20 border border-red-600/50 rounded-lg p-4 mb-6">
                <p className="text-red-400 font-semibold">There was an error submitting your form. Please try again or call us directly.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    placeholder="Dr. John Smith"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    placeholder="doctor@practice.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    placeholder="(555) 123-4567"
                  />
                </div>
                
                <div>
                  <label htmlFor="practiceName" className="block text-sm font-medium text-gray-300 mb-2">
                    Practice Name *
                  </label>
                  <input
                    type="text"
                    id="practiceName"
                    name="practiceName"
                    required
                    value={formData.practiceName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    placeholder="Smith Family Dentistry"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="currentBookingMethod" className="block text-sm font-medium text-gray-300 mb-2">
                    Current Booking Method
                  </label>
                  <select
                    id="currentBookingMethod"
                    name="currentBookingMethod"
                    value={formData.currentBookingMethod}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  >
                    <option value="">Select method</option>
                    <option value="Phone only">Phone only</option>
                    <option value="Online booking">Online booking</option>
                    <option value="Both phone and online">Both phone and online</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="monthlyPatients" className="block text-sm font-medium text-gray-300 mb-2">
                    Monthly New Patients
                  </label>
                  <select
                    id="monthlyPatients"
                    name="monthlyPatients"
                    value={formData.monthlyPatients}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  >
                    <option value="">Select range</option>
                    <option value="1-10">1-10</option>
                    <option value="11-25">11-25</option>
                    <option value="26-50">26-50</option>
                    <option value="51-100">51-100</option>
                    <option value="100+">100+</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Additional Information
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  placeholder="Tell us about your current challenges with patient booking..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 disabled:hover:scale-100 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Calendar className="h-5 w-5" />
                    <span>Schedule My Demo</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">DentalAI Pro</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#services" className="text-gray-300 hover:text-blue-400 transition-colors">Services</a>
              <a href="#demo" className="text-gray-300 hover:text-blue-400 transition-colors">Demo</a>
              <a href="#features" className="text-gray-300 hover:text-blue-400 transition-colors">Features</a>
              <a href="#about" className="text-gray-300 hover:text-blue-400 transition-colors">About</a>
              <a href="#contact" className="text-gray-300 hover:text-blue-400 transition-colors">Contact</a>
            </nav>
            <button 
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-blue-900/20 text-blue-400 px-4 py-2 rounded-full mb-8 border border-blue-800/30">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">AI-Powered Booking Automation</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Transform Your
              <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Dental Practice
              </span>
              with AI Agents
            </h1>
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Automate patient bookings, reduce no-shows, and increase revenue with our intelligent AI booking agents. 
              Handle calls 24/7, schedule appointments seamlessly, and never miss a patient again.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Calendar className="h-5 w-5" />
                <span>Book Free Demo</span>
              </button>
              <button className="border border-gray-700 hover:border-gray-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:bg-gray-800 flex items-center justify-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>Call Us Now</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-400">98%</div>
              <div className="text-gray-400">Call Answer Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-400">40%</div>
              <div className="text-gray-400">Increase in Bookings</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-400">24/7</div>
              <div className="text-gray-400">Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              See Our AI Agent in Action
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Watch how our AI booking agent handles a real patient call with natural conversation and intelligent scheduling.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Phone Interface */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
              <div className="bg-black rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-gray-400 text-sm">Incoming Call</div>
                </div>
                
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-10 w-10 text-blue-400" />
                  </div>
                  <div className="text-white font-semibold mb-2">Smith Family Dentistry</div>
                  <div className="text-gray-400 text-sm mb-6">AI Agent Active</div>
                  
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={handlePlayDemo}
                      className="bg-green-600 hover:bg-green-700 p-3 rounded-full transition-colors"
                    >
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    </button>
                    <button
                      onClick={resetDemo}
                      className="bg-gray-600 hover:bg-gray-700 p-3 rounded-full transition-colors"
                    >
                      <ArrowRight className="h-6 w-6 rotate-180" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-sm">{showTranscript ? 'Hide' : 'Show'} Transcript</span>
                </button>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Volume2 className="h-4 w-4" />
                  <span className="text-sm">Audio Simulation</span>
                </div>
              </div>
            </div>

            {/* Conversation Transcript */}
            <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50 h-[500px] overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Live Conversation</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-400">Recording</span>
                </div>
              </div>

              <div className="space-y-4 h-[400px] overflow-y-auto">
                {demoConversation.slice(0, demoStep + 1).map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.speaker === 'ai' ? 'justify-start' : 'justify-end'} animate-fade-in`}
                  >
                    <div className={`max-w-[80%] p-4 rounded-2xl ${
                      message.speaker === 'ai' 
                        ? 'bg-blue-600/20 border border-blue-500/30' 
                        : 'bg-gray-700/50 border border-gray-600/30'
                    }`}>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className={`w-2 h-2 rounded-full ${
                          message.speaker === 'ai' ? 'bg-blue-400' : 'bg-gray-400'
                        }`}></div>
                        <span className="text-xs text-gray-400 uppercase tracking-wide">
                          {message.speaker === 'ai' ? 'AI Agent' : 'Patient'}
                        </span>
                        <span className="text-xs text-gray-500">{message.timestamp}</span>
                      </div>
                      <p className="text-white">{message.message}</p>
                    </div>
                  </div>
                ))}
                
                {isPlaying && demoStep < demoConversation.length - 1 && (
                  <div className="flex justify-start">
                    <div className="bg-blue-600/20 border border-blue-500/30 p-4 rounded-2xl">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-sm text-gray-400">AI is typing...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Demo Results */}
          <div className="mt-16 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-2xl p-8 border border-green-500/20">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Demo Results</h3>
              <p className="text-gray-400">What happened in this 37-second call:</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-green-600/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                </div>
                <h4 className="font-semibold mb-2">Appointment Scheduled</h4>
                <p className="text-sm text-gray-400">Patient booked for Thursday, Jan 18th at 10:00 AM</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-600/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-blue-400" />
                </div>
                <h4 className="font-semibold mb-2">Patient Identified</h4>
                <p className="text-sm text-gray-400">Returning patient Sarah Johnson recognized instantly</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-600/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <MessageSquare className="h-6 w-6 text-purple-400" />
                </div>
                <h4 className="font-semibold mb-2">Confirmation Sent</h4>
                <p className="text-sm text-gray-400">Automated text confirmation delivered</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 flex items-center justify-center space-x-2 mx-auto"
            >
              <Calendar className="h-5 w-5" />
              <span>See This in Your Practice</span>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Powered by Advanced AI Technology
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our AI booking agents are designed specifically for dental practices, 
              understanding your unique needs and patient communication requirements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800/30 p-8 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all hover:scale-105">
              <div className="bg-blue-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <MessageSquare className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Natural Conversations</h3>
              <p className="text-gray-400">AI agents that speak naturally with patients, understanding context and providing personalized responses.</p>
            </div>
            
            <div className="bg-gray-800/30 p-8 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all hover:scale-105">
              <div className="bg-blue-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Calendar className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Smart Scheduling</h3>
              <p className="text-gray-400">Intelligent appointment booking that considers availability, treatment types, and patient preferences.</p>
            </div>
            
            <div className="bg-gray-800/30 p-8 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all hover:scale-105">
              <div className="bg-blue-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Clock className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">24/7 Availability</h3>
              <p className="text-gray-400">Never miss a booking opportunity with round-the-clock AI agents ready to assist patients.</p>
            </div>
            
            <div className="bg-gray-800/30 p-8 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all hover:scale-105">
              <div className="bg-blue-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Patient Management</h3>
              <p className="text-gray-400">Comprehensive patient data management with automated follow-ups and reminder systems.</p>
            </div>
            
            <div className="bg-gray-800/30 p-8 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all hover:scale-105">
              <div className="bg-blue-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Analytics & Insights</h3>
              <p className="text-gray-400">Detailed reporting on booking patterns, patient interactions, and practice performance metrics.</p>
            </div>
            
            <div className="bg-gray-800/30 p-8 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all hover:scale-105">
              <div className="bg-blue-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <CheckCircle className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Seamless Integration</h3>
              <p className="text-gray-400">Easy integration with existing practice management systems and scheduling software.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Complete Automation Solutions
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              From initial patient contact to post-appointment follow-up, our AI agents handle every aspect of patient communication.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600/20 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Phone className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Inbound Call Handling</h3>
                  <p className="text-gray-400">AI agents answer all incoming calls, schedule appointments, and handle patient inquiries professionally.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600/20 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Calendar className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Appointment Scheduling</h3>
                  <p className="text-gray-400">Intelligent scheduling that optimizes your calendar and reduces conflicts and double-bookings.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600/20 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <MessageSquare className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Patient Communication</h3>
                  <p className="text-gray-400">Automated reminders, follow-ups, and patient education through multiple communication channels.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600/20 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Lead Qualification</h3>
                  <p className="text-gray-400">Intelligent lead screening and qualification to focus on high-value patient opportunities.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600/20 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <TrendingUp className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Revenue Optimization</h3>
                  <p className="text-gray-400">Smart upselling and cross-selling of dental services based on patient needs and history.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600/20 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
                  <p className="text-gray-400">Continuous monitoring and improvement of AI interactions to maintain high service standards.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Revolutionizing Dental Practice Management
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                We specialize in creating intelligent AI booking agents specifically designed for dental practices. 
                Our advanced automation solutions help you focus on what matters most – providing exceptional patient care.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">5+ years of healthcare automation experience</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">100+ successful dental practice implementations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">HIPAA compliant and secure</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">24/7 technical support</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-8 rounded-2xl border border-gray-700/50">
              <div className="text-center space-y-6">
                <Bot className="h-20 w-20 text-blue-400 mx-auto" />
                <h3 className="text-2xl font-bold">Ready to Get Started?</h3>
                <p className="text-gray-400">
                  Join hundreds of dental practices already using our AI booking agents to increase efficiency and revenue.
                </p>
                <button 
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105 w-full"
                >
                  Schedule Your Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to Transform Your Practice?
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Get started with our AI booking agents today and see immediate improvements in patient satisfaction and booking rates.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 px-10 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Calendar className="h-5 w-5" />
              <span>Book Free Consultation</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="border border-gray-600 hover:border-gray-500 px-10 py-4 rounded-lg text-lg font-semibold transition-all hover:bg-gray-800 flex items-center justify-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>(512) 925-743</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Bot className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">DentalAI Pro</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Revolutionizing dental practice management with intelligent AI booking agents that work 24/7 to grow your practice.
              </p>
              <div className="text-sm text-gray-500">
                © 2025 DentalAI Pro. All rights reserved.
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">AI Booking Agents</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Appointment Scheduling</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Patient Communication</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Practice Analytics</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>(512) 925-743</li>
                <li>hello@dentalai.pro</li>
                <li>24/7 Support Available</li>
                <li>HIPAA Compliant</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;