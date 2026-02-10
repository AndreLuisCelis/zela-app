import { Request, Response, NextFunction } from 'express';

/**
 * Middleware para rotas não encontradas (404)
 */
export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
    res.status(404).json({
        error: 'Rota não encontrada',
        path: req.originalUrl,
        method: req.method
    });
};
