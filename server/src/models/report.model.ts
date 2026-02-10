import mongoose, { Document, Schema } from 'mongoose';

/**
 * Interface para o modelo Report
 */
export interface Reports {
    _id: string;
    title: string;
    description: string;
    category: string;
    location: string;
    status: 'pendente' | 'em progresso' | 'resolvido';
    zelasAcumulados: number;
    supportCount: number;
    images: string[];
    authorId: string;
    createdAt: string;
    isPatrocinado?: boolean;
    nivelPatrocinio?: 'BRONZE' | 'PRATA' | 'OURO';
}

/**
 * Interface para o modelo Report (Mongoose)
 */
export interface IReport extends Document {
    title: string;
    description: string;
    category: string;
    location: string;
    status: 'pendente' | 'em progresso' | 'resolvido';
    zelasAcumulados: number;
    supportCount: number;
    images: string[];
    authorId: string;
    createdAt: Date;
    isPatrocinado?: boolean;
    nivelPatrocinio?: 'BRONZE' | 'PRATA' | 'OURO';
}

/**
 * Schema do Report
 */
const ReportSchema = new Schema<IReport>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    status: {
        type: String,
        enum: ['pendente', 'em progresso', 'resolvido'],
        default: 'pendente'
    },
    zelasAcumulados: { type: Number, default: 0 },
    supportCount: { type: Number, default: 0 },
    images: [{ type: String }],
    authorId: { type: String, required: true },
    isPatrocinado: { type: Boolean, default: false },
    nivelPatrocinio: {
        type: String,
        enum: ['BRONZE', 'PRATA', 'OURO']
    }
}, {
    timestamps: true // Isso gerencia automaticamente createdAt e updatedAt
});

/**
 * Modelo Report
 */
export const Report = mongoose.model<IReport>('Report', ReportSchema);
