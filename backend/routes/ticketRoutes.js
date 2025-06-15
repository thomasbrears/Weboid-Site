import express from 'express';
import ticketController from '../controllers/ticketController.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

// GET /api/tickets - Get all tickets
router.get('/', asyncHandler(ticketController.getAllTickets));

// GET /api/tickets/status/:status - Get tickets by status
router.get('/status/:status', asyncHandler(ticketController.getTicketsByStatus));

// GET /api/tickets/:id - Get single ticket
router.get('/:id', asyncHandler(ticketController.getTicket));

// POST /api/tickets - Create new ticket
router.post('/', asyncHandler(ticketController.createTicket));

// PUT /api/tickets/:id - Update ticket
router.put('/:id', asyncHandler(ticketController.updateTicket));

// DELETE /api/tickets/:id - Delete ticket
router.delete('/:id', asyncHandler(ticketController.deleteTicket));

export default router;