import dotenv from 'dotenv';

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

interface EnvConfig {
    port: number;
    nodeEnv: string;
    mongoUri: string;
    jwtSecret: string;
    jwtExpiresIn: string | number;
}

/**
 * Validar e exportar configurações de ambiente
 */
const getEnvConfig = (): EnvConfig => {
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

export const config = getEnvConfig();
