import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.config';

/**
 * Interface para o payload do JWT
 */
interface JwtPayload {
    userId: string;
}

/**
 * Middleware para autenticar requisições usando JWT
 */
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    try {
        // Obter token do header Authorization
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Token não fornecido' });
            return;
        }

        const token = authHeader.substring(7); // Remover 'Bearer '

        // Verificar e decodificar token
        const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;

        // Adicionar userId ao request (usando any para evitar erro de tipo)
        (req as any).userId = decoded.userId;

        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({ error: 'Token expirado' });
            return;
        }

        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ error: 'Token inválido' });
            return;
        }

        res.status(500).json({ error: 'Erro ao autenticar' });
    }
};
