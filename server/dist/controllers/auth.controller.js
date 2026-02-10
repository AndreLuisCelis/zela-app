"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const env_config_1 = require("../config/env.config");
/**
 * Gerar token JWT
 */
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, env_config_1.config.jwtSecret, {
        expiresIn: env_config_1.config.jwtExpiresIn
    });
};
/**
 * Registrar novo usuário
 */
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Verificar se usuário já existe
        const existingUser = await user_model_1.User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ error: 'Email já cadastrado' });
            return;
        }
        // Criar novo usuário
        const user = new user_model_1.User({ name, email, password });
        await user.save();
        // Gerar token
        const token = generateToken(user._id.toString());
        res.status(201).json({
            message: 'Usuário criado com sucesso',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                balance: user.balance
            }
        });
    }
    catch (error) {
        res.status(400).json({
            error: 'Erro ao criar usuário',
            details: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
};
exports.register = register;
/**
 * Login de usuário
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Verificar se usuário existe
        const user = await user_model_1.User.findOne({ email });
        if (!user) {
            res.status(401).json({ error: 'Email ou senha incorretos' });
            return;
        }
        // Verificar senha
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            res.status(401).json({ error: 'Email ou senha incorretos' });
            return;
        }
        // Gerar token
        const token = generateToken(user._id.toString());
        res.json({
            message: 'Login realizado com sucesso',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                balance: user.balance
            }
        });
    }
    catch (error) {
        res.status(500).json({
            error: 'Erro ao fazer login',
            details: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
};
exports.login = login;
/**
 * Obter perfil do usuário autenticado
 */
const getProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await user_model_1.User.findById(userId).select('-password');
        if (!user) {
            res.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }
        res.json({ user });
    }
    catch (error) {
        res.status(500).json({
            error: 'Erro ao buscar perfil',
            details: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
};
exports.getProfile = getProfile;
