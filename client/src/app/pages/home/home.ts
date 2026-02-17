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
    SolveModalComponent
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
      this.activeSolveReportId.set(reportId);
      this.showSolveModal.set(true);
    });
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
