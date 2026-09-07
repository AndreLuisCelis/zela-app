import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, input, output, signal, ViewChild } from '@angular/core';
import { Reports } from '../../models/report.interface';

@Component({
  selector: 'app-report-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportDetailModalComponent {
  report = input.required<Reports>();

  close = output<void>();
  support = output<string>();
  sponsor = output<string>();
  solve = output<string>();

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;
  currentIndex = signal(0);

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
    this.scrollContainer.nativeElement.scrollLeft -= this.scrollContainer.nativeElement.offsetWidth;
  }

  scrollNext(event: Event) {
    event.stopPropagation();
    this.scrollContainer.nativeElement.scrollLeft += this.scrollContainer.nativeElement.offsetWidth;
  }
}
