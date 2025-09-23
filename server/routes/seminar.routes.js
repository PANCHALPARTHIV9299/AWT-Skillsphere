import { Router } from 'express';
import { createSeminar, listSeminars, getSeminar, listApprovedSeminars, listPendingSeminars, approveSeminar, rejectSeminar, getSeminarStats, updateSeminar, deleteSeminar, listSeminarsByCreator } from '../controllers/seminar.controller.js';
import path from 'path';
import { fileURLToPath } from 'url';

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Admin create
router.post('/', createSeminar);

// Admin create form (basic)
router.get('/create/new', (req, res) => {
  res.render('seminars/create');
});

// Public list
router.get('/', listSeminars);

// Public detail
router.get('/:id', getSeminar);

// Approved-only list for students
router.get('/public/approved', listApprovedSeminars);

// Admin: pending list, approve, reject, stats
router.get('/admin/pending', listPendingSeminars);
router.post('/admin/:id/approve', approveSeminar);
router.post('/admin/:id/reject', rejectSeminar);
router.get('/admin/stats', getSeminarStats);

// Teacher: list by creator
router.get('/creator/:userId', listSeminarsByCreator);

// Optional CRUD for seminars
router.patch('/:id', updateSeminar);
router.delete('/:id', deleteSeminar);

export default router;


