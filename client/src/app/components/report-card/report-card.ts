import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, input, output, signal, computed, ViewChild } from '@angular/core';
import { Reports } from '../../models/report.interface';

@Component({
  selector: 'app-report-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportCardComponent {
  report = input.required<Reports>();

  selectReport = output<Reports>();
  support = output<string>();
  sponsor = output<string>();
  solve = output<string>();

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;
  currentIndex = signal(0);

  truncatedDescription = computed(() => {
    const desc = this.report().description || '';
    if (desc.length > 250) {
      return desc.substring(0, 250) + '...';
    }
    return desc;
  });

  isDescriptionTruncated = computed(() => {
    return (this.report().description || '').length > 250;
  });

  onCardClick() {
    this.selectReport.emit(this.report());
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
