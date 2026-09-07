import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ZelaService } from '../../services/zela-service';
import { AuthService } from '../../services/auth';
import { Reports } from '../../models/report.interface';
import { SponsorModalComponent } from '../../components/sponsor-modal/sponsor-modal';
import { SolveModalComponent } from '../../components/solve-modal/solve-modal';
import { NoticeModalComponent } from '../../components/notice-modal/notice-modal';
import { SponsorOption } from '../../models/sponsor-option.interface';
import { UiStore } from '../../services/ui-store';

@Component({
  selector: 'app-report-detail-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SponsorModalComponent,
    SolveModalComponent,
    NoticeModalComponent
  ],
  templateUrl: './report-detail-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  zelaService = inject(ZelaService);
  authService = inject(AuthService);
  uiStore = inject(UiStore);

  reportId = signal<string | null>(null);

  // Computa o report em tempo real da lista no ZelaService para manter sincronizado com apoios/patrocínios
  report = computed(() => {
    const id = this.reportId();
    if (!id) return null;
    return this.zelaService.reports().find(r => r._id === id) || null;
  });

  isLoading = signal<boolean>(true);

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

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;
  currentIndex = signal(0);

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.reportId.set(id);
      await this.zelaService.getReportById(id);
      this.isLoading.set(false);
    } else {
      this.goBack();
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  requireAuth(callback: () => void) {
    if (this.authService.isAuthenticatedValue) {
      callback();
    } else {
      this.uiStore.openAuth();
    }
  }

  handleSupport() {
    const rep = this.report();
    if (rep) {
      this.requireAuth(() => {
        this.zelaService.addSupport(rep._id);
      });
    }
  }

  openSponsor() {
    this.requireAuth(() => {
      this.showSponsorModal.set(true);
    });
  }

  async handleSponsorSuccess(option: SponsorOption) {
    const rep = this.report();
    if (rep) {
      const ok = await this.zelaService.patrocinar(rep._id, option);
      if (ok) {
        this.showSponsorModal.set(false);
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

  handleSolve() {
    const rep = this.report();
    if (rep) {
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

        this.showSolveModal.set(true);
      });
    }
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
    this.showSolveModal.set(false);
    this.noticeData.set({
      title: 'Missão Aceita',
      message: 'Missão aceite! Obrigado por ajudar a comunidade.',
      type: 'success',
      buttonText: 'Entendi'
    });
    this.showNoticeModal.set(true);
  }

  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    if (element.offsetWidth > 0) {
      const index = Math.round(element.scrollLeft / element.offsetWidth);
      if (this.currentIndex() !== index) {
        this.currentIndex.set(index);
      }
    }
  }

  scrollPrev(event: Event) {
    event.stopPropagation();
    const el = this.scrollContainer.nativeElement;
    el.scrollBy({ left: -el.offsetWidth, behavior: 'smooth' });
  }

  scrollNext(event: Event) {
    event.stopPropagation();
    const el = this.scrollContainer.nativeElement;
    el.scrollBy({ left: el.offsetWidth, behavior: 'smooth' });
  }
}
