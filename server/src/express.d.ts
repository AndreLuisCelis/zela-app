import { IUser } from './models/user.model';

/**
 * Extensão dos tipos do Express para incluir propriedades personalizadas
 */
declare global {
    namespace Express {
        interface Request {
            /**
             * Utilizador autenticado anexado ao request pelo middleware de autenticação
             */
            user?: IUser;
        }
    }
}

export { };
