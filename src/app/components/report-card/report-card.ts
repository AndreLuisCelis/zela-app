import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, input, output, signal, ViewChild } from '@angular/core';
import { Reports } from '../../models/report.interface';

export @Component({
  selector: 'app-report-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
class ReportCardComponent {
  report = input.required<Reports>();
  support = output<string>();
  sponsor = output<string>();

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;
  currentIndex = signal(0);

  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    const index = Math.round(element.scrollLeft / element.offsetWidth);
    if (this.currentIndex() !== index) {
      this.currentIndex.set(index);
    }
  }

  scrollPrev() {
    this.scrollContainer.nativeElement.scrollLeft -= this.scrollContainer.nativeElement.offsetWidth;
  }

  scrollNext() {
    this.scrollContainer.nativeElement.scrollLeft += this.scrollContainer.nativeElement.offsetWidth;
  }
}
