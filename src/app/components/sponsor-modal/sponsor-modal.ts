import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-sponsor-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sponsor-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
class SponsorModalComponent {
  report = input.required<Report>();
  confirm = output<number>();
  close = output<void>();

  options = [50, 100, 250];
  selectedAmount = signal(50);
}
