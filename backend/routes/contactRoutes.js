import express from 'express';
import contactController from '../controllers/contactController.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

// GET /api/contacts - Get all contacts
router.get('/', asyncHandler(contactController.getAllContacts));

// GET /api/contacts/type/:type - Get contacts by type
router.get('/type/:type', asyncHandler(contactController.getContactsByType));

// GET /api/contacts/:id - Get single contact
router.get('/:id', asyncHandler(contactController.getContact));

// POST /api/contacts - Create general contact submission
router.post('/', asyncHandler(contactController.createContact));

// POST /api/contacts/website-assessment - Create website assessment submission
router.post('/website-assessment', asyncHandler(contactController.createWebsiteAssessment));

// PUT /api/contacts/:id - Update contact
router.put('/:id', asyncHandler(contactController.updateContact));

// DELETE /api/contacts/:id - Delete contact
router.delete('/:id', asyncHandler(contactController.deleteContact));

export default router;