import React, { useState, useRef } from 'react';
import { Phone, Bot, Calendar, Users, Zap, CheckCircle, ArrowRight, MessageSquare, Clock, TrendingUp, X, Play, Pause, Volume2 } from 'lucide-react';
import audioFile from './audio.mp3';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
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
  
  // Audio demo state
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbzjV1TDsRxtIs00iC_Sy7IifYbtXseyEPjT-IUBJvAF9BMk3zuZZqJgSFqAuZmwBA6GKw/exec', {
        method: 'POST',
        body: new FormData(e.target as HTMLFormElement)
      });
      
      if (response.ok) {
        setShowForm(false);
        setShowThankYou(true);
        // Reset form data
        setFormData({
          name: '',
          email: '',
          phone: '',
          practiceName: '',
          currentBookingMethod: '',
          monthlyPatients: '',
          message: ''
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error - you could show an error message here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Thank You Modal */}
      {showThankYou && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full border border-gray-700">
            <div className="text-center">
              <div className="bg-green-600/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-400" />
              </div>
              
              <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
              <p className="text-xl text-gray-300 mb-6">
                We've received your request for a demo of our AI booking system.
              </p>
              
              <div className="bg-gray-700/50 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4 text-blue-400">What happens next?</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-600/20 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-400">1</span>
                    </div>
                    <p className="text-gray-300">Our team will review your practice details and prepare a customized demo</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-600/20 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-400">2</span>
                    </div>
                    <p className="text-gray-300">We'll contact you within 24 hours to schedule your personalized demo</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-600/20 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-400">3</span>
                    </div>
                    <p className="text-gray-300">During the demo, you'll see exactly how our AI can transform your practice</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6 mb-8 border border-blue-800/30">
                <p className="text-sm text-gray-300 mb-2">
                  <strong className="text-blue-400">Quick question?</strong> Call us directly:
                </p>
                <p className="text-xl font-semibold text-white">(512) XXX-XXX</p>
              </div>
              
              <button
                onClick={() => setShowThankYou(false)}
                className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105"
              >
                Continue Exploring
              </button>
            </div>
          </div>
        </div>
      )}

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
            
            <form onSubmit={handleFormSubmit} className="space-y-6">
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
                    <span>Contact Us</span>
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

      {/* Audio Demo Section */}
      <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Hear Our AI Agent in Action
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Listen to a real conversation between our AI booking agent and a patient calling Pure Care Dental.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Audio Player */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center">
                    <Phone className="h-8 w-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Pure Care Dental - AI Agent Call</h3>
                    <p className="text-gray-400">Patient scheduling a cleaning appointment</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Volume2 className="h-5 w-5" />
                  <span className="text-sm">Audio Demo</span>
                </div>
              </div>

              {/* Audio Element */}
              <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleAudioEnded}
                className="hidden"
              >
                <source src={audioFile} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>

              {/* Custom Audio Controls */}
              <div className="bg-black/30 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={handlePlayPause}
                    className="bg-blue-600 hover:bg-blue-700 p-4 rounded-full transition-colors"
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </button>
                  
                  <div className="flex-1 mx-6">
                    <div className="bg-gray-700 rounded-full h-2 relative">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-400 min-w-[80px] text-right">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-gray-300 text-sm">
                    {isPlaying ? 'Playing live conversation...' : 'Click play to hear the AI agent in action'}
                  </p>
                </div>
              </div>
            </div>

            {/* Demo Results */}
            <div className="mt-12 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-2xl p-8 border border-green-500/20">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">What Happened in This Call</h3>
                <p className="text-gray-400">Our AI agent successfully handled the entire booking process:</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-green-600/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  </div>
                  <h4 className="font-semibold mb-2">Appointment Scheduled</h4>
                  <p className="text-sm text-gray-400">Patient successfully booked for cleaning appointment</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-blue-600/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Users className="h-6 w-6 text-blue-400" />
                  </div>
                  <h4 className="font-semibold mb-2">Natural Conversation</h4>
                  <p className="text-sm text-gray-400">AI spoke naturally and professionally throughout</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-purple-600/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <MessageSquare className="h-6 w-6 text-purple-400" />
                  </div>
                  <h4 className="font-semibold mb-2">Confirmation Sent</h4>
                  <p className="text-sm text-gray-400">Automated confirmation and reminders scheduled</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <button 
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105 flex items-center justify-center space-x-2 mx-auto"
              >
                <Calendar className="h-5 w-5" />
                <span>Get This for Your Practice</span>
              </button>
            </div>
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
              <span>(512) XXX-XXXX</span>
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
                <li>(512) XXX-XXX</li>
                <li>hello@dentalai.pro</li>
                <li>24/7 Support Available</li>
                <li>HIPAA Compliant</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;