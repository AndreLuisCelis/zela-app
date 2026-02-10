import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * Interface para os dados do User (DTO/Export)
 */
export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    balance: number;
}

/**
 * Interface para o modelo User (Mongoose)
 */
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    avatar: string;
    balance: number;
    createdAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

/**
 * Schema do User
 */
const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, 'Nome é obrigatório'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email é obrigatório'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Email inválido']
    },
    password: {
        type: String,
        required: [true, 'Senha é obrigatória'],
        minlength: [6, 'Senha deve ter no mínimo 6 caracteres']
    },
    avatar: {
        type: String,
        default: 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'
    },
    balance: {
        type: Number,
        default: 2000
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

/**
 * Hook pre-save para fazer hash da senha antes de salvar
 */
UserSchema.pre('save', async function (next) {
    // Só fazer hash se a senha foi modificada
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error as Error);
    }
});

/**
 * Método para comparar senha fornecida com a senha armazenada
 */
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

/**
 * Modelo User
 */
export const User = mongoose.model<IUser>('User', UserSchema);
