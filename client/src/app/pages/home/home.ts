import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ZelaService } from '../../services/zela-service';
import { Reports } from '../../models/report.interface';
import { ReportCardComponent } from '../../components/report-card/report-card';
import { SponsorModalComponent } from '../../components/sponsor-modal/sponsor-modal';
import { SolveModalComponent } from '../../components/solve-modal/solve-modal';
import { NoticeModalComponent } from '../../components/notice-modal/notice-modal';
import { SponsorOption } from '../../models/sponsor-option.interface';
import { AuthService } from '../../services/auth';
import { UiStore } from '../../services/ui-store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReportCardComponent,
    SponsorModalComponent,
    SolveModalComponent,
    NoticeModalComponent
  ],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {
  zelaService = inject(ZelaService);
  authService = inject(AuthService);
  uiStore = inject(UiStore);
  private router = inject(Router);

  showSponsorModal = signal(false);
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

  openReportDetail(report: Reports) {
    this.router.navigate(['/report', report._id]);
  }

  requireAuth(callback: () => void) {
    if (this.authService.isAuthenticatedValue) {
      callback();
    } else {
      this.uiStore.openAuth();
    }
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
      this.noticeData.set({
        title: 'Solicitação Enviada',
        message: 'Sua solicitação para ser um Resolvedor foi recebida! Aguarde a aprovação da administração.',
        type: 'success',
        buttonText: 'Entendi'
      });
    }
  }

  confirmSolve(data: { plan: string; images: File[] }) {
    console.log('Resolving report:', this.activeSolveReportId(), data);
    this.showSolveModal.set(false);
    this.activeSolveReportId.set(null);

    this.noticeData.set({
      title: 'Missão Aceita',
      message: 'Missão aceite! Obrigado por ajudar a comunidade.',
      type: 'success',
      buttonText: 'Entendi'
    });
    this.showNoticeModal.set(true);
  }
}
