import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-report',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-report.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateReportComponent {
  close = output<void>();
  success = output<{ title: string; category: string; location: string, photos: string[] }>();

  categories = ['LIMPEZA', 'INFRA', 'SEGURANÇA', 'OUTROS'];
  photos = signal<string[]>([]);

  reportData = {
    title: '',
    category: 'LIMPEZA',
    location: ''
  };

  triggerFileInput() {
    const el = document.querySelector('input[type="file"]') as HTMLInputElement;
    el?.click();
  }

  handleFile(event: any) {
    const file = event.target.files[0];
    if (file && this.photos().length < 5) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.photos.update(prev => [...prev, e.target.result]);
      };
      reader.readAsDataURL(file);
    }
  }

  removePhoto(index: number) {
    this.photos.update((prev: any[]) => prev.filter((_, i) => i !== index));
  }

  submit() {
    this.success.emit({
      ...this.reportData,
      photos: this.photos()
    });
    console.warn(this.photos().length);
    this.close.emit();
  }
}
