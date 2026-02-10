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
