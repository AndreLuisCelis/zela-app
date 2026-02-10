"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = void 0;
/**
 * Middleware para rotas não encontradas (404)
 */
const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        error: 'Rota não encontrada',
        path: req.originalUrl,
        method: req.method
    });
};
exports.notFoundHandler = notFoundHandler;
