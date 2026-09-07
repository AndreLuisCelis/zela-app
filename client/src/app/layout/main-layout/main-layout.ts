import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header';
import { AuthComponent } from '../../components/auth/auth';
import { CreateReportComponent } from '../../components/create-report/create-report';
import { ZelaService } from '../../services/zela-service';
import { AuthService } from '../../services/auth';
import { UiStore } from '../../services/ui-store';

/**
 * Shell da aplicação: renderiza o header com a identificação do usuário
 * e o rodapé de navegação em todas as rotas, além dos modais globais
 * (autenticação e novo alerta). As páginas são carregadas no <router-outlet>.
 */
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, HeaderComponent, AuthComponent, CreateReportComponent],
  templateUrl: './main-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayout {
  uiStore = inject(UiStore);
  zelaService = inject(ZelaService);
  authService = inject(AuthService);

  activeTab = signal<'home' | 'map' | 'profile'>('home');

  openCreateReport() {
    if (this.authService.isAuthenticatedValue) {
      this.uiStore.openCreateReport();
    } else {
      this.uiStore.openAuth();
    }
  }

  async handleReportSuccess(data: {
    title: string;
    category: string;
    location: string;
    description: string;
    images: string[];
  }) {
    await this.zelaService.addReport(data);
    this.uiStore.closeCreateReport();
  }
}