import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-notice-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notice-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoticeModalComponent {
  title = input<string>('Aviso');
  message = input<string>('');
  type = input<'error' | 'success' | 'info'>('info');
  buttonText = input<string>('Entendi');
  actionButtonText = input<string>();
  
  close = output<void>();
  action = output<void>();

  get icon(): string {
    switch (this.type()) {
      case 'error': return '⚠️';
      case 'success': return '✅';
      default: return 'ℹ️';
    }
  }

  get colorClass(): string {
    switch (this.type()) {
      case 'error': return 'bg-red-100 text-red-600';
      case 'success': return 'bg-emerald-100 text-emerald-600';
      default: return 'bg-blue-100 text-blue-600';
    }
  }

  get buttonClass(): string {
    switch (this.type()) {
      case 'error': return 'bg-slate-900';
      case 'success': return 'bg-emerald-600';
      default: return 'bg-blue-600';
    }
  }
}
