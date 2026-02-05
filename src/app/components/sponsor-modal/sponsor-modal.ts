import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { Reports } from '../../models/report.interface';
import { SponsorOption } from '../../models/sponsor-option.interface';

export @Component({
  selector: 'app-sponsor-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sponsor-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
class SponsorModalComponent {
close = output<void>();
  success = output<SponsorOption>();
  selectedOption = signal<SponsorOption | null>(null);

  options: SponsorOption[] = [
    { id: 'BRONZE', label: 'Bronze', cost: 100, boost: '+24h Destaque', color: 'bg-orange-100 text-orange-700' },
    { id: 'PRATA', label: 'Prata', cost: 250, boost: '+72h Destaque', color: 'bg-slate-100 text-slate-600' },
    { id: 'OURO', label: 'Ouro', cost: 500, boost: 'Destaque Vitalício', color: 'bg-amber-100 text-amber-700' }
  ];

  confirm() {
    if (this.selectedOption()) this.success.emit(this.selectedOption()!);
  }
}
