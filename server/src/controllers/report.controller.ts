import { Request, Response } from 'express';
import { Report } from '../models/report.model';
import { User } from '../models/user.model';

/**
 * Listar todos os alertas (Ordenados por data)
 */
export const getAllReports = async (req: Request, res: Response): Promise<void> => {
    try {
        const reports = await Report.find().sort({ createdAt: -1 });
        res.json(reports);
    } catch (error) {
        res.status(500).json({
            error: 'Erro ao buscar alertas',
            details: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
};

/**
 * Criar novo alerta
 */
export const createReport = async (req: Request, res: Response): Promise<void> => {
    try {
        const newReport = new Report(req.body);
        const savedReport = await newReport.save();
        res.status(201).json(savedReport);
    } catch (error) {
        res.status(400).json({
            error: 'Erro ao criar alerta',
            details: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
};

/**
 * Apoiar um alerta (Incrementar suporte)
 */
export const supportReport = async (req: Request, res: Response): Promise<void> => {
    try {
        const report = await Report.findByIdAndUpdate(
            req.params.id,
            { $inc: { supportCount: 1 } },
            { new: true }
        );

        if (!report) {
            res.status(404).json({ error: 'Alerta não encontrado' });
            return;
        }

        res.json(report);
    } catch (error) {
        res.status(404).json({
            error: 'Alerta não encontrado',
            details: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
};

/**
 * Patrocinar um alerta
 */
export const sponsorReport = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { option } = req.body;
        const userId = (req as any).userId;

        if (!userId) {
            res.status(401).json({ error: 'Usuário não autenticado' });
            return;
        }

        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }

        if (user.balance < option.cost) {
            res.status(400).json({ error: 'Saldo insuficiente' });
            return;
        }

        const report = await Report.findById(id);
        if (!report) {
            res.status(404).json({ error: 'Alerta não encontrado' });
            return;
        }

        // Atualizar usuário
        user.balance -= option.cost;
        await user.save();

        // Atualizar alerta
        report.isPatrocinado = true;
        report.nivelPatrocinio = option.id;
        report.zelasAcumulados = (report.zelasAcumulados || 0) + option.cost;

        const updatedReport = await report.save();

        res.json({
            message: 'Patrocínio realizado com sucesso',
            report: updatedReport,
            balance: user.balance
        });
    } catch (error) {
        res.status(500).json({
            error: 'Erro ao patrocinar alerta',
            details: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
};
