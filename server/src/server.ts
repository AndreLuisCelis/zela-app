/**
 * API Backend para ZelaMorato
 * Tecnologia: Node.js, Express, Mongoose (MongoDB)
 */

import express from 'express';
import cors from 'cors';
import { config } from './config/env.config';
import { connectDatabase } from './config/database.config';
import routes from './routes';
import { notFoundHandler } from './middlewares/notFound.middleware';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Aumentado para suportar Base64 das fotos

// --- ROTAS DA API ---
app.use('/api', routes);

// --- MIDDLEWARES DE ERRO ---
app.use(notFoundHandler);
app.use(errorHandler);

// --- INICIAR SERVIDOR ---
const startServer = async (): Promise<void> => {
    try {
        // Conectar ao banco de dados
        await connectDatabase();

        // Iniciar servidor
        app.listen(config.port, () => {
            console.log(`🚀 Servidor a correr na porta ${config.port}`);
            console.log(`📝 Ambiente: ${config.nodeEnv}`);
        });
    } catch (error) {
        console.error('❌ Erro ao iniciar servidor:', error);
        process.exit(1);
    }
};

startServer();
