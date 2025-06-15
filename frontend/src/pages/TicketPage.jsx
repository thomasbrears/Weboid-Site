import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import TitleHeader from '../components/TitleHeader';
import ticketService from '../api/ticketService';
import { ApiError } from '../api/apiClient';

const TicketPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    priority: 'normal',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [ticketNumber, setTicketNumber] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear success message when user starts editing
    if (submitSuccess) {
      setSubmitSuccess(false);
      setTicketNumber(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors below.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setTicketNumber(null);

    try {
      const response = await ticketService.createTicket(formData);
      
      if (response.success) {
        setSubmitSuccess(true);
        
        // Use the formatted ticket number from the response
        const displayTicketNumber = response.data.ticketNumber || response.data.ticket_number || response.data.id;
        setTicketNumber(displayTicketNumber);
        
        toast.success('Your support ticket has been submitted successfully!');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          category: '',
          priority: 'normal',
          message: ''
        });
        setErrors({});
      } else {
        throw new Error(response.message || 'Failed to submit ticket');
      }
    } catch (error) {
      console.error('Error submitting ticket:', error);
      
      let errorMessage = 'There was an error submitting your ticket. Please try again.';
      
      if (error instanceof ApiError) {
        // Handle specific API errors
        if (error.status === 400 && error.data?.errors) {
          errorMessage = `Validation error: ${error.data.errors.join(', ')}`;
        } else if (error.status === 0) {
          errorMessage = 'Unable to connect to server. Please check your internet connection.';
        } else {
          errorMessage = error.message;
        }
      }
      
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Submit Support Ticket | Weboid Support</title>
        <meta name="description" content="Need help with your website? Submit a support ticket and our team will assist you as soon as possible." />
      </Helmet>

      <TitleHeader
        title="Submit a Support Ticket"
        subtitle="Te tuku tautoko - We're here to help"
        backgroundImage="/img/ticket.png"
      />
      
      <section className="py-16 px-6 sm:px-8 lg:px-10 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto">
          {/* Info Section */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">Before submitting a ticket</h3>
                <p className="text-blue-700 dark:text-blue-300 mb-2">
                  Please check our <Link to="/support" className="underline hover:text-blue-800 dark:hover:text-blue-200">Knowledge Base</Link> first - you might find the answer you're looking for right away!
                </p>
                <p className="text-blue-700 dark:text-blue-300">
                  For urgent issues, please call us directly at <a href="tel:+64272690900" className="underline hover:text-blue-800 dark:hover:text-blue-200">+64 27 269 0900</a>.
                </p>
              </div>
            </div>
          </div>
          
          {/* Success Message */}
          {submitSuccess && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-8">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-lg font-medium text-green-800 dark:text-green-200 mb-2">Ticket submitted successfully!</h3>
                  <p className="text-green-700 dark:text-green-300 mb-2">
                    Your ticket <span className='font-bold'>#{ticketNumber}</span> has been created.
                  </p>
                  <p className="text-green-700 dark:text-green-300 mb-2">
                    We will review your request and email or call you as soon as possible.
                  </p>
                  <p className="text-green-600 dark:text-green-400 text-sm">
                    You will receive a confirmation email shortly with your ticket details and reference number. You are welcome to reply to this email with any attachments or additional information.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Ticket Form */}
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ${
                    errors.name ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
              </div>
              
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ${
                    errors.email ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
              </div>
            </div>
            
            {/* Subject */}
            <div className="mb-6">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Brief description of your issue"
                className={`w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ${
                  errors.subject ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              {errors.subject && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                >
                  <option value="">Select a category</option>
                  <option value="general">General Inquiry</option>
                  <option value="technical">Technical Issue</option>
                  <option value="billing">Billing Question</option>
                  <option value="feature">Feature Request</option>
                  <option value="website">Website Support</option>
                  <option value="hosting">Hosting Issue</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              {/* Priority */}
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>
            
            {/* Message */}
            <div className="mb-8">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                placeholder="Please describe your issue in detail. Include any error messages, steps you've taken, and what you expected to happen."
                className={`w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ${
                  errors.message ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                }`}
              ></textarea>
              {errors.message && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>}
            </div>
            
            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <Link
                to="/support"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition inline-flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Knowledge Base
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-blue-600 dark:bg-blue-800 text-white px-8 py-3 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700 dark:hover:bg-blue-600'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Ticket'
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default TicketPage;