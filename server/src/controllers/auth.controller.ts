import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { config } from '../config/env.config';

/**
 * Gerar token JWT
 */
const generateToken = (userId: string): string => {
    return jwt.sign({ userId }, config.jwtSecret, {
        expiresIn: config.jwtExpiresIn
    } as any);
};

/**
 * Registrar novo usuário
 */
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        // Verificar se usuário já existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ error: 'Email já cadastrado' });
            return;
        }

        // Criar novo usuário
        const user = new User({ name, email, password });
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
                avatar: (user as any).avatar,
                balance: (user as any).balance
            }
        });
    } catch (error) {
        res.status(400).json({
            error: 'Erro ao criar usuário',
            details: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
};

/**
 * Login de usuário
 */
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Verificar se usuário existe
        const user = await User.findOne({ email });
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
                avatar: (user as any).avatar,
                balance: (user as any).balance
            }
        });
    } catch (error) {
        res.status(500).json({
            error: 'Erro ao fazer login',
            details: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
};

/**
 * Obter perfil do usuário autenticado
 */
export const getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).userId;
        const user = await User.findById(userId).select('-password');

        if (!user) {
            res.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }

        res.json({ user });
    } catch (error) {
        res.status(500).json({
            error: 'Erro ao buscar perfil',
            details: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
};
