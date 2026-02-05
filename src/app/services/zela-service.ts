import { Injectable, signal, computed } from "@angular/core";
import { Reports } from "../models/report.interface";
import { User } from "../models/user.interface";
import { SponsorOption } from "../models/sponsor-option.interface";

@Injectable({ providedIn: 'root' })
export class ZelaService {
  private _currentUser = signal<User | null>(null);
  private _reports = signal<Reports[]>([
    {
      id: '1',
      title: 'Lixo na Praça Central',
      description: 'Acúmulo de entulho e lixo doméstico na zona norte da praça.',
      category: 'LIMPEZA',
      location: 'Praça das Flores, Centro',
      status: 'pendente',
      zelasAcumulados: 120,
      apoios: 45,
      photos: ['https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=600&auto=format&fit=crop'
      ],
      authorId: 'user-0',
      createdAt: new Date().toISOString()
    }
  ]);

  currentUser = computed(() => this._currentUser());
  reports = computed(() => this._reports());
  isAuthenticated = computed(() => !!this._currentUser());

  // Simulação de Registo
  register(name: string, email: string, password: string) {
    const newUser: User = {
      id: 'user-' + Math.random().toString(36).substr(2, 5),
      name: name,
      email: email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      balance: 500 // Bónus de boas-vindas
    };
    this._currentUser.set(newUser);
    return true;
  }

  // Simulação de Login
  login(email: string, password: string = '12345678') {
    // Para protótipo, aceita qualquer login se a pass tiver mais de 3 chars
    if (password.length >= 4) {
      this._currentUser.set({
        id: 'user-123',
        name: email.split('@')[0],
        email: email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        balance: 1250
      });
      return true;
    }
    return false;
  }

  logout() {
    this._currentUser.set(null);
  }

  addReport(data: Partial<Reports>) {
    const user = this._currentUser();
    if (!user) return;

    const newReport: Reports = {
      id: Date.now().toString(),
      title: data.title || 'Sem título',
      description: data.description || '',
      category: data.category || 'GERAL',
      location: data.location || 'Local desconhecido',
      status: 'pendente',
      zelasAcumulados: 0,
      apoios: 0,
      photos: data.photos || ['https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=600&auto=format&fit=crop'],
      authorId: user.id,
      createdAt: new Date().toISOString()
    };

    this._reports.update(list => [newReport, ...list]);
  }

  addSupport(id: string) {
    this._reports.update(list =>
      list.map(r => r.id === id ? { ...r, apoios: r.apoios + 1 } : r)
    );
  }

  patrocinar(reportId: string, option: SponsorOption) {
    const user = this._currentUser();
    if (!user || user.balance < option.cost) return false;

    this._currentUser.set({ ...user, balance: user.balance - option.cost });
    this._reports.update(list =>
      list.map(r => r.id === reportId ? {
        ...r,
        isPatrocinado: true,
        nivelPatrocinio: option.id,
        zelasAcumulados: r.zelasAcumulados + option.cost
      } : r)
    );
    return true;
  }
}
