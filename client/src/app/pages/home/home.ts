import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ZelaService } from '../../services/zela-service';
import { Reports } from '../../models/report.interface';
import { ReportCardComponent } from '../../components/report-card/report-card';
import { SponsorModalComponent } from '../../components/sponsor-modal/sponsor-modal';
import { HeaderComponent } from '../../components/header/header';
import { AuthComponent } from "../../components/auth/auth";
import { CreateReportComponent } from "../../components/create-report/create-report";
import { SponsorOption } from '../../models/sponsor-option.interface';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { SolveModalComponent } from '../../components/solve-modal/solve-modal';
import { NoticeModalComponent } from '../../components/notice-modal/notice-modal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    ReportCardComponent,
    SponsorModalComponent,
    CreateReportComponent,
    AuthComponent,
    SolveModalComponent,
    NoticeModalComponent
  ],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {
  zelaService = inject(ZelaService);
  authService = inject(AuthService);
  loginEmail = '';

  activeTab = signal<'home' | 'map' | 'profile'>('home');
  showReportModal = signal(false);
  showSponsorModal = signal(false);
  showAuthModal = signal(false);
  showSolveModal = signal(false);
  showNoticeModal = signal(false);
  
  noticeData = signal<{ 
    title: string, 
    message: string, 
    type: 'error' | 'success' | 'info',
    buttonText?: string,
    actionButtonText?: string,
    actionType?: string 
  }>({
    title: '',
    message: '',
    type: 'info'
  });

  activeReportId = signal<string | null>(null);
  activeSolveReportId = signal<string | null>(null);

  requireAuth(callback: () => void) {
    if (this.authService.isAuthenticatedValue) {
      callback();
    } else {
      this.showAuthModal.set(true);
    }
  }

  handleReportSuccess(data: { title: string; category: string; location: string, images: string[] }) {
    this.zelaService.addReport(data);
    this.showReportModal.set(false);
  }

  openSponsor(reportId: string) {
    this.requireAuth(() => {
      this.activeReportId.set(reportId);
      this.showSponsorModal.set(true);
    });
  }

  async handleSponsorSuccess(option: SponsorOption) {
    const reportId = this.activeReportId();
    if (reportId) {
      const ok = await this.zelaService.patrocinar(reportId, option);
      if (ok) {
        this.showSponsorModal.set(false);
        this.activeReportId.set(null);
      } else {
        // Mostrar modal de aviso quando o saldo é insuficiente
        this.noticeData.set({
          title: 'Saldo Insuficiente',
          message: 'Não tens Zelas (🪙) suficientes para este nível de patrocínio. Ganha mais resolvendo ocorrências!',
          type: 'error',
          buttonText: 'Entendi'
        });
        this.showNoticeModal.set(true);
      }
    }
  }

  handleSupport(reportId: string) {
    this.requireAuth(() => {
      this.zelaService.addSupport(reportId);
    });
  }

  openCreateReport() {
    this.requireAuth(() => {
      this.showReportModal.set(true);
    });
  }

  handleAuthSuccess() {
    this.showAuthModal.set(false);
  }

  handleSolve(reportId: string) {
    this.requireAuth(() => {
      const user = this.authService.currentUserValue;
      const roles = user?.roles || [];
      
      if (!roles.includes('resolver')) {
        this.noticeData.set({
          title: 'Torne-se um Resolvedor',
          message: 'Notamos que ainda não és um Resolvedor! Esta funcionalidade permite-te aceitar missões e ganhar recompensas ajudando a comunidade. Queres solicitar o teu perfil?',
          type: 'info',
          buttonText: 'Agora não',
          actionButtonText: 'Quero ser Resolvedor',
          actionType: 'request_resolver'
        });
        this.showNoticeModal.set(true);
        return;
      }

      this.activeSolveReportId.set(reportId);
      this.showSolveModal.set(true);
    });
  }

  handleNoticeAction() {
    if (this.noticeData().actionType === 'request_resolver') {
      // Simulação de solicitação
      alert('Sua solicitação para ser um Resolvedor foi recebida! Aguarde a aprovação da administração.');
      this.showNoticeModal.set(false);
    }
  }

  confirmSolve(data: { plan: string; images: File[] }) {
    console.log('Resolving report:', this.activeSolveReportId(), data);

    // Aqui vai a lógica para marcar como 'Em Progresso' ou similar
    // Por enquanto, apenas fecha o modal e limpa estado
    this.showSolveModal.set(false);
    this.activeSolveReportId.set(null);
    // Opcional: Mostrar toast de sucesso
    alert('Missão aceite! Obrigado por ajudar a comunidade.');
  }
}
