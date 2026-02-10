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
    AuthComponent
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
  activeReportId = signal<string | null>(null);

  handleReportSuccess(data: { title: string; category: string; location: string, images: string[] }) {
    this.zelaService.addReport(data);
    this.showReportModal.set(false);
  }

  openSponsor(reportId: string) {
    this.activeReportId.set(reportId);
    this.showSponsorModal.set(true);
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
}
