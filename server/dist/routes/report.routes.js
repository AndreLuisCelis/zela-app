"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const report_controller_1 = require("../controllers/report.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
/**
 * Rotas para Reports
 */
router.get('/', report_controller_1.getAllReports);
router.post('/', report_controller_1.createReport);
router.patch('/:id/support', report_controller_1.supportReport);
router.patch('/:id/sponsor', auth_middleware_1.authenticate, report_controller_1.sponsorReport);
exports.default = router;
