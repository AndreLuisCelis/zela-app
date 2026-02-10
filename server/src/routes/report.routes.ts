import { Router } from 'express';
import { getAllReports, createReport, supportReport, sponsorReport } from '../controllers/report.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

/**
 * Rotas para Reports
 */
router.get('/', getAllReports);
router.post('/', createReport);
router.patch('/:id/support', supportReport);
router.patch('/:id/sponsor', authenticate, sponsorReport);

export default router;
