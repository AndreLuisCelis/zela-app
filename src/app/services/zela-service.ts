import { Injectable, signal, computed } from "@angular/core";
import { Reports } from "../models/report.interface";

export @Injectable({ providedIn: 'root' })
class ZelaService {
  private _reports = signal<Reports[]>([
    {
      id: '1',
      title: 'Lixo na Praça Central',
      description: 'Acúmulo de entulho e lixo doméstico.',
      category: 'LIMPEZA',
      location: 'Praça das Flores, Centro',
      status: 'pendente',
      zelasAcumulados: 120,
      apoios: 45,
      photos: ['https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=600&auto=format&fit=crop'],
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Poste sem luz',
      description: 'Rua escura há mais de 3 dias.',
      category: 'ILUMINAÇÃO',
      location: 'Rua Augusta, 400',
      status: 'pendente',
      zelasAcumulados: 350,
      apoios: 12,
      photos: ['https://images.unsplash.com/photo-1473116763249-2faaef81ccda?q=80&w=600&auto=format&fit=crop'],
      createdAt: new Date().toISOString()
    }
  ]);

  private _userBalance = signal(1250);

  // Read-only signals para os componentes
  reports = computed(() => this._reports());
  balance = computed(() => this._userBalance());

  addSupport(id: string) {
    this._reports.update(list =>
      list.map(r => r.id === id ? { ...r, apoios: r.apoios + 1 } : r)
    );
  }

  sponsorReport(id: string, amount: number) {
    if (this._userBalance() >= amount) {
      this._reports.update((list: any[]) =>
        list.map(r => r.id === id ? { ...r, zelasAcumulados: r.zelasAcumulados + amount } : r)
      );
      this._userBalance.update(b => b - amount);
      return true;
    }
    return false;
  }
}
