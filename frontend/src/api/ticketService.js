import apiClient from './apiClient';

class TicketService {
  async createTicket(ticketData) {
    // Map frontend form fields to backend expected format
    const backendData = {
      title: ticketData.subject,
      description: ticketData.message,
      priority: ticketData.priority === 'normal' ? 'medium' : ticketData.priority,
      category: ticketData.category || 'general',
      userEmail: ticketData.email,
      userName: ticketData.name
    };

    return apiClient.post('/tickets', backendData);
  }

  async getAllTickets() {
    return apiClient.get('/tickets');
  }

  async getTicket(id) {
    return apiClient.get(`/tickets/${id}`);
  }

  async updateTicket(id, updates) {
    return apiClient.put(`/tickets/${id}`, updates);
  }

  async deleteTicket(id) {
    return apiClient.delete(`/tickets/${id}`);
  }

  async getTicketsByStatus(status) {
    return apiClient.get(`/tickets/status/${status}`);
  }

  async checkHealth() {
    return apiClient.get('/health');
  }
}

export default new TicketService();