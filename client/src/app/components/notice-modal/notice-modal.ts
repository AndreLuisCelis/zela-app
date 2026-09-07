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
      case 'error': return 'bg-red-50 text-red-600 border-red-100';
      case 'success': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      default: return 'bg-navy-50 text-navy-600 border-navy-100';
    }
  }

  get buttonClass(): string {
    switch (this.type()) {
      case 'error': return 'bg-navy-900 shadow-navy-900/20 hover:bg-navy-800';
      case 'success': return 'bg-navy-900 shadow-navy-900/20 hover:bg-navy-800';
      default: return 'bg-navy-900 shadow-navy-900/20 hover:bg-navy-800';
    }
  }
}
