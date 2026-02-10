"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sponsorReport = exports.supportReport = exports.createReport = exports.getAllReports = void 0;
const report_model_1 = require("../models/report.model");
const user_model_1 = require("../models/user.model");
/**
 * Listar todos os alertas (Ordenados por data)
 */
const getAllReports = async (req, res) => {
    try {
        const reports = await report_model_1.Report.find().sort({ createdAt: -1 });
        res.json(reports);
    }
    catch (error) {
        res.status(500).json({
            error: 'Erro ao buscar alertas',
            details: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
};
exports.getAllReports = getAllReports;
/**
 * Criar novo alerta
 */
const createReport = async (req, res) => {
    try {
        const newReport = new report_model_1.Report(req.body);
        const savedReport = await newReport.save();
        res.status(201).json(savedReport);
    }
    catch (error) {
        res.status(400).json({
            error: 'Erro ao criar alerta',
            details: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
};
exports.createReport = createReport;
/**
 * Apoiar um alerta (Incrementar suporte)
 */
const supportReport = async (req, res) => {
    try {
        const report = await report_model_1.Report.findByIdAndUpdate(req.params.id, { $inc: { supportCount: 1 } }, { new: true });
        if (!report) {
            res.status(404).json({ error: 'Alerta não encontrado' });
            return;
        }
        res.json(report);
    }
    catch (error) {
        res.status(404).json({
            error: 'Alerta não encontrado',
            details: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
};
exports.supportReport = supportReport;
/**
 * Patrocinar um alerta
 */
const sponsorReport = async (req, res) => {
    try {
        const { id } = req.params;
        const { option } = req.body;
        const userId = req.userId;
        if (!userId) {
            res.status(401).json({ error: 'Usuário não autenticado' });
            return;
        }
        const user = await user_model_1.User.findById(userId);
        if (!user) {
            res.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }
        if (user.balance < option.cost) {
            res.status(400).json({ error: 'Saldo insuficiente' });
            return;
        }
        const report = await report_model_1.Report.findById(id);
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
    }
    catch (error) {
        res.status(500).json({
            error: 'Erro ao patrocinar alerta',
            details: error instanceof Error ? error.message : 'Erro desconhecido'
        });
    }
};
exports.sponsorReport = sponsorReport;
