"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
// Carregar variáveis de ambiente do arquivo .env
dotenv_1.default.config();
/**
 * Validar e exportar configurações de ambiente
 */
const getEnvConfig = () => {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        console.warn('⚠️  MONGO_URI não definido no .env, usando valor padrão');
    }
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        console.warn('⚠️  JWT_SECRET não definido no .env, usando valor padrão (NÃO RECOMENDADO EM PRODUÇÃO)');
    }
    return {
        port: parseInt(process.env.PORT || '3000', 10),
        nodeEnv: process.env.NODE_ENV || 'development',
        mongoUri: mongoUri || 'mongodb+srv://usuario:<PASSWORD>@<CLUSTER_URL>/zelamorato?retryWrites=true&w=majority',
        jwtSecret: jwtSecret || 'default-secret-key-change-in-production',
        jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d'
    };
};
exports.config = getEnvConfig();
