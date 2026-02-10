"use strict";
/**
 * API Backend para ZelaMorato
 * Tecnologia: Node.js, Express, Mongoose (MongoDB)
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_config_1 = require("./config/env.config");
const database_config_1 = require("./config/database.config");
const routes_1 = __importDefault(require("./routes"));
const notFound_middleware_1 = require("./middlewares/notFound.middleware");
const error_middleware_1 = require("./middlewares/error.middleware");
const app = (0, express_1.default)();
// --- MIDDLEWARES ---
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '10mb' })); // Aumentado para suportar Base64 das fotos
// --- ROTAS DA API ---
app.use('/api', routes_1.default);
// --- MIDDLEWARES DE ERRO ---
app.use(notFound_middleware_1.notFoundHandler);
app.use(error_middleware_1.errorHandler);
// --- INICIAR SERVIDOR ---
const startServer = async () => {
    try {
        // Conectar ao banco de dados
        await (0, database_config_1.connectDatabase)();
        // Iniciar servidor
        app.listen(env_config_1.config.port, () => {
            console.log(`🚀 Servidor a correr na porta ${env_config_1.config.port}`);
            console.log(`📝 Ambiente: ${env_config_1.config.nodeEnv}`);
        });
    }
    catch (error) {
        console.error('❌ Erro ao iniciar servidor:', error);
        process.exit(1);
    }
};
startServer();
