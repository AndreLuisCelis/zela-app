export interface Reports {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  status: 'pendente' | 'em progresso' | 'resolvido';
  zelasAcumulados: number;
  apoios: number;
  photos: string[];
  authorId: string;
  createdAt: string;
  isPatrocinado?: boolean;
  nivelPatrocinio?: 'BRONZE' | 'PRATA' | 'OURO';
}
