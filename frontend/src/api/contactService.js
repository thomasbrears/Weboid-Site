import apiClient from './apiClient';

class ContactService {
  // Create general contact submission
  async createContact(contactData) {
    const backendData = {
      type: 'general',
      name: contactData.name,
      email: contactData.email,
      phone: contactData.phone,
      subject: contactData.subject,
      message: contactData.message,
      company: contactData.company,
      website: contactData.website,
      source: contactData.source || 'website'
    };

    return apiClient.post('/contacts', backendData);
  }

  // Create website assessment submission
  async createWebsiteAssessment(assessmentData) {
    const backendData = {
      name: assessmentData.name,
      email: assessmentData.email,
      phone: assessmentData.phone,
      business: assessmentData.business,
      currentWebsite: assessmentData.currentWebsite,
      challenges: assessmentData.challenges,
      goals: assessmentData.goals,
      source: 'landing_page_assessment'
    };

    return apiClient.post('/contacts/website-assessment', backendData);
  }

  // Get all contacts (admin only)
  async getAllContacts() {
    return apiClient.get('/contacts');
  }

  // Get single contact
  async getContact(id) {
    return apiClient.get(`/contacts/${id}`);
  }

  // Update contact
  async updateContact(id, updates) {
    return apiClient.put(`/contacts/${id}`, updates);
  }

  // Delete contact
  async deleteContact(id) {
    return apiClient.delete(`/contacts/${id}`);
  }

  // Get contacts by type
  async getContactsByType(type) {
    return apiClient.get(`/contacts/type/${type}`);
  }

  // Get website assessments specifically
  async getWebsiteAssessments() {
    return this.getContactsByType('website_assessment');
  }

  // Get general contacts specifically
  async getGeneralContacts() {
    return this.getContactsByType('general');
  }

  // Health check
  async checkHealth() {
    return apiClient.get('/health');
  }
}

export default new ContactService();