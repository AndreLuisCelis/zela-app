/**
 * API Backend para ZelaMorato
 * Tecnologia: Node.js, Express, Mongoose (MongoDB)
 */

import dns from 'node:dns';
import express from 'express';
import cors from 'cors';
import { config } from './config/env.config';
import { connectDatabase } from './config/database.config';
import routes from './routes';

// Forçar o uso do DNS do Google para evitar o erro querySrv ECONNREFUSED (comum no Windows/MongoDB Atlas)
dns.setServers(['8.8.8.8', '8.8.4.4']);
import { notFoundHandler } from './middlewares/notFound.middleware';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

// --- MIDDLEWARES ---
app.use(cors({
  origin: [
    'http://localhost:4200', // Angular dev server
    'http://localhost:3000', // Node.js server (se necessário)
    'https://dh35dmlg-80.brs.devtunnels.ms', // Seu dev tunnel
    'https://*.devtunnels.ms', // Permitir todos subdomínios devtunnels
    'https://zela-app-celisapp.netlify.app' // Netlify App
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true, // Permitir cookies/credenciais se necessário
  maxAge: 86400, // Cache de preflight por 24h
}));
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
