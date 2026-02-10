"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = require("../config/env.config");
/**
 * Middleware para autenticar requisições usando JWT
 */
const authenticate = (req, res, next) => {
    try {
        // Obter token do header Authorization
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Token não fornecido' });
            return;
        }
        const token = authHeader.substring(7); // Remover 'Bearer '
        // Verificar e decodificar token
        const decoded = jsonwebtoken_1.default.verify(token, env_config_1.config.jwtSecret);
        // Adicionar userId ao request (usando any para evitar erro de tipo)
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            res.status(401).json({ error: 'Token expirado' });
            return;
        }
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            res.status(401).json({ error: 'Token inválido' });
            return;
        }
        res.status(500).json({ error: 'Erro ao autenticar' });
    }
};
exports.authenticate = authenticate;
