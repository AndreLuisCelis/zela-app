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
  createdAt: string;
}
