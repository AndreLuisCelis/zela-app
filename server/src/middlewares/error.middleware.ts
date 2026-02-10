import { Request, Response, NextFunction } from 'express';

/**
 * Middleware global de tratamento de erros
 */
export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error('❌ Erro:', err);

    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

    res.status(statusCode).json({
        error: err.message || 'Erro interno do servidor',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};
