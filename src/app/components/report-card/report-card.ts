import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-report-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
class ReportCardComponent {
  report = input.required<Report>();
  sponsor = output<Report>();
  support = output<string>();
}
