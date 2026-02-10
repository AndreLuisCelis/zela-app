"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const report_routes_1 = __importDefault(require("./report.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const router = (0, express_1.Router)();
/**
 * Registrar todas as rotas da API
 */
router.use('/reports', report_routes_1.default);
router.use('/auth', auth_routes_1.default);
exports.default = router;
