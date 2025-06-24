import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import TitleHeader from '../components/TitleHeader';
import ContactSection from '../components/ContactSection';
import ticketService from '../api/ticketService';
import { ApiError } from '../api/apiClient';

const ReportErrorPage = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    pageUrl: '',
    errorDescription: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    agreedToTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [ticketNumber, setTicketNumber] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!formData.pageUrl.trim()) newErrors.pageUrl = 'Page URL is required';
    else if (!isValidUrl(formData.pageUrl)) newErrors.pageUrl = 'Please enter a valid URL';
    if (!formData.errorDescription.trim()) newErrors.errorDescription = 'Error description is required';
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.agreedToTerms) newErrors.agreedToTerms = 'You must agree to the terms to submit this report';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      // Try with https:// prefix if no protocol is provided
      try {
        new URL('https://' + string);
        return true;
      } catch (_) {
        return false;
      }
    }
  };

  const formatUrlForDisplay = (url) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return 'https://' + url;
    }
    return url;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing/changing
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
      toast.error('There is an error in your submission. Please fix the highlighted fields.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setTicketNumber(null);

    try {
      // Format the data for the ticket system
      const ticketData = {
        name: formData.fullName,
        email: formData.email,
        subject: `Website Error Report - ${formData.businessName}`,
        category: 'website',
        priority: 'normal',
        message: `ERROR REPORT DETAILS:

Business Website: ${formData.businessName}
Page URL: ${formatUrlForDisplay(formData.pageUrl)}
Phone Number: ${formData.phoneNumber || 'Not provided'}

ERROR DESCRIPTION:
${formData.errorDescription}


This error report has been submitted via the Weboid website error reporting form.`,};

      const response = await ticketService.createTicket(ticketData);
      
      if (response.success) {
        setSubmitSuccess(true);
        
        // Use the formatted ticket number from the response
        const displayTicketNumber = response.data.ticketNumber || response.data.ticket_number || response.data.id;
        setTicketNumber(displayTicketNumber);
        
        toast.success('Your error report has been submitted successfully!');
        
        // Reset form
        setFormData({
          businessName: '',
          pageUrl: '',
          errorDescription: '',
          fullName: '',
          email: '',
          phoneNumber: '',
          agreedToTerms: false
        });
        setErrors({});
      } else {
        throw new Error(response.message || 'Failed to submit error report');
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      
      let errorMessage = 'There was an error submitting your report. Please try again or email us directly at report-error@weboid.dev';
      
      if (error instanceof ApiError) {
        // Handle specific API errors
        if (error.status === 400 && error.data?.errors) {
          errorMessage = `Validation error: ${error.data.errors.join(', ')}`;
        } else if (error.status === 0) {
          errorMessage = 'Unable to connect to server. Please check your internet connection or email us at report-error@weboid.dev';
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
        <title>Report a website Error | Weboid</title>
        <meta name="description" content="Report errors or issues on Weboid's website or our clients' websites. Your feedback helps us improve our services and user experience. Thank you for helping us maintain a high standard of quality." />
        <meta name="keywords" content="Report errors, Error reporting, Issue reporting, Website errors, Error feedback, Quality improvement, Weboid feedback" />
        <meta property="og:title" content="Report a website Error | Weboid" />
        <meta property="og:description" content="Report errors or issues on Weboid's website or our clients' websites. Your feedback helps us improve our services and user experience. Thank you for helping us maintain a high standard of quality." />
      </Helmet>

      <TitleHeader
        title="Report a website issue"
        subtitle="We're here to help"
        backgroundImage="img/error.jpg"
      />

      <section className="py-16 px-6 sm:px-8 lg:px-10 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sm:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Report a Website Error or Issue
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We apologize for any inconvenience you may have encountered while browsing Weboid's or one of our client's websites. 
                We value your feedback and appreciate you taking the time to let us know about the issue. Rest assured, we are committed to resolving it promptly.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                By reporting the error, you are helping us improve the user experience and ensure that our websites are functioning optimally. 
                Our team will prioritise the resolution of the reported issue and work diligently to fix it as soon as possible.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Please complete the form below with the necessary information to report the error. We appreciate your support in improving our websites and look forward to resolving the issue promptly.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-blue-800 dark:text-blue-200 mb-2">
                  <strong>Note:</strong> If you have encountered an error on a client's site, rest assured that we will work closely with the client to address and rectify the issue.
                </p>
                <p className="text-blue-800 dark:text-blue-200">
                  If you have any questions, or would prefer to make this report by email, please email{' '}
                  <a href="mailto:report-error@weboid.dev" className="underline hover:text-blue-900 dark:hover:text-blue-100">
                    report-error@weboid.dev
                  </a>
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
                  <h3 className="text-lg font-medium text-green-800 dark:text-green-200 mb-2">Error report submitted successfully!</h3>
                  <p className="text-green-700 dark:text-green-300 mb-2">
                    Your error report <span className='font-bold'>#{ticketNumber}</span> has been created and our team has been notified.
                  </p>
                  <p className="text-green-700 dark:text-green-300 mb-2">
                    We will investigate the issue and contact you if we need additional information.
                  </p>
                  <p className="text-green-600 dark:text-green-400 text-sm">
                    If you have screenshots of the error, please email them to{' '}
                    <a href="mailto:report-error@weboid.dev" className="underline hover:text-green-800 dark:hover:text-green-200">
                      report-error@weboid.dev
                    </a>{' '}
                    and reference ticket #{ticketNumber}.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Error Report Form */}
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sm:p-8">
            {/* Website & Error Details Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                Website & Error Details
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                The more details you can provide will ensure we can identify the error/issue.
              </p>
              
              {/* Business Name */}
              <div className="mb-6">
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name of business <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="Which business's website are you having issues with?"
                  className={`w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ${
                    errors.businessName ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {errors.businessName && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.businessName}</p>}
              </div>
              
              {/* Page URL */}
              <div className="mb-6">
                <label htmlFor="pageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Page URL with the error <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="pageUrl"
                  name="pageUrl"
                  value={formData.pageUrl}
                  onChange={handleChange}
                  placeholder="Please enter the URL that you first noticed this error/issue"
                  className={`w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ${
                    errors.pageUrl ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                  }`}
                />
                {errors.pageUrl && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.pageUrl}</p>}
              </div>
              
              {/* Error Description */}
              <div className="mb-6">
                <label htmlFor="errorDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Error/issue Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="errorDescription"
                  name="errorDescription"
                  value={formData.errorDescription}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Please provide as much detail of the error/issue as possible. Include what you were trying to do, what happened, and what you expected to happen."
                  className={`w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ${
                    errors.errorDescription ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                  }`}
                ></textarea>
                {errors.errorDescription && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.errorDescription}</p>}
              </div>
              
              {/* Screenshot Note */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">Error/Issue Screenshot</h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      If you have screenshots of the error, please email them to{' '}
                      <a href="mailto:report-error@weboid.dev" className="underline hover:text-yellow-800 dark:hover:text-yellow-200">
                        report-error@weboid.dev
                      </a>{' '}
                      after submitting this form (include your ticket number for reference).
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Your Details Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                Your Details
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                We will only contact you to follow up on the status of your report or for additional information.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    What is your full name? <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    placeholder="e.g. John Doe"
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ${
                      errors.fullName ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {errors.fullName && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.fullName}</p>}
                </div>
                
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    What is your email address? <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    placeholder="e.g. johndoe@weboid.dev"
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 ${
                      errors.email ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
                </div>
              </div>
              
              {/* Phone Number */}
              <div className="mt-6">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  What is your phone number?
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="e.g. 021 123 4567"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                />
              </div>
            </div>
            
            {/* Important Information */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                Important Information
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
                <div className="prose dark:prose-invert max-w-none text-sm">
                  <p className="mb-4 text-gray-900 dark:text-white">
                    By submitting this error report, you acknowledge and agree that the reported error or issue will be shared with our website developers, Weboid, for investigation and resolution. Weboid may also contact you via phone or email to seek clarification or follow up on your report.
                  </p>
                  <p className="mb-4 text-gray-900 dark:text-white">
                    You further authorise Weboid to discuss the reported error or issue with their client for investigation and resolution purposes.
                  </p>
                  <p className="mb-0 text-gray-900 dark:text-white">
                    Weboid will handle your information in accordance with their Privacy Policy. For more information on how Weboid handles your personal data, please refer to their Privacy Policy at{' '}
                    <Link to="/privacy" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline">
                      weboid.dev/privacy
                    </Link>.
                  </p>
                </div>
              </div>
              
              {/* Agreement Checkbox */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="agreedToTerms"
                    name="agreedToTerms"
                    type="checkbox"
                    checked={formData.agreedToTerms}
                    onChange={handleChange}
                    className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ${
                      errors.agreedToTerms ? 'border-red-500 dark:border-red-400' : ''
                    }`}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agreedToTerms" className="text-gray-700 dark:text-gray-300">
                    I have read, understand and accept the Important Information above <span className="text-red-500">*</span>
                  </label>
                  {errors.agreedToTerms && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.agreedToTerms}</p>}
                </div>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <Link
                to="/"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition inline-flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Homepage
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-red-600 dark:bg-red-700 text-white px-8 py-3 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-red-700 dark:hover:bg-red-600'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting Report...
                  </span>
                ) : (
                  'Submit Error Report'
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      <ContactSection />
    </>
  );
};

export default ReportErrorPage;