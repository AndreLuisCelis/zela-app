import mongoose from 'mongoose';
import { config } from './env.config';

/**
 * Conectar ao MongoDB Atlas
 */
export const connectDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(config.mongoUri);
        console.log('✅ Conectado ao MongoDB Atlas');
    } catch (error) {
        console.error('❌ Erro ao conectar ao MongoDB:', error);
        process.exit(1); // Encerrar aplicação se não conseguir conectar ao DB
    }
};

/**
 * Desconectar do MongoDB
 */
export const disconnectDatabase = async (): Promise<void> => {
    try {
        await mongoose.disconnect();
        console.log('🔌 Desconectado do MongoDB');
    } catch (error) {
        console.error('❌ Erro ao desconectar do MongoDB:', error);
    }
};
