"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDatabase = exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_config_1 = require("./env.config");
/**
 * Conectar ao MongoDB Atlas
 */
const connectDatabase = async () => {
    try {
        await mongoose_1.default.connect(env_config_1.config.mongoUri);
        console.log('✅ Conectado ao MongoDB Atlas');
    }
    catch (error) {
        console.error('❌ Erro ao conectar ao MongoDB:', error);
        process.exit(1); // Encerrar aplicação se não conseguir conectar ao DB
    }
};
exports.connectDatabase = connectDatabase;
/**
 * Desconectar do MongoDB
 */
const disconnectDatabase = async () => {
    try {
        await mongoose_1.default.disconnect();
        console.log('🔌 Desconectado do MongoDB');
    }
    catch (error) {
        console.error('❌ Erro ao desconectar do MongoDB:', error);
    }
};
exports.disconnectDatabase = disconnectDatabase;
