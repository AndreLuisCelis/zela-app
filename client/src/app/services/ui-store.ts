import { Injectable, signal } from '@angular/core';

/**
 * Estado global de UI compartilhado entre o shell (MainLayout) e as páginas.
 * Mantém os modais de autenticação e criação de ocorrência acessíveis de
 * qualquer rota, seguindo o padrão convencional de shell + outlet.
 */
@Injectable({ providedIn: 'root' })
export class UiStore {
  readonly showAuth = signal(false);
  readonly showCreateReport = signal(false);

  openAuth() {
    this.showAuth.set(true);
  }

  closeAuth() {
    this.showAuth.set(false);
  }

  openCreateReport() {
    this.showCreateReport.set(true);
  }

  closeCreateReport() {
    this.showCreateReport.set(false);
  }
}