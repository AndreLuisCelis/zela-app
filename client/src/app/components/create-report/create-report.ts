import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-create-report',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-report.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateReportComponent {
  authService = inject(AuthService);
  close = output<void>();
  // ALTERAÇÃO 2: Atualizado output para incluir description
  success = output<{
    title: string;
    category: string;
    location: string;
    description: string; // NOVO CAMPO
    images: string[]
  }>();

  categories = ['LIMPEZA', 'INFRA', 'SEGURANÇA', 'OUTROS'];
  images = signal<string[]>([]);

  // ALTERAÇÃO 3: Adicionado campo description ao reportData
  reportData = {
    title: '',
    category: 'LIMPEZA',
    location: '',
    description: '', // NOVO CAMPO
    authorId: ''
  };

  triggerFileInput() {
    const el = document.querySelector('input[type="file"]') as HTMLInputElement;
    el?.click();
  }

  async handleFile(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    if (file && this.images().length < 5) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 400; // Reduzido de 800 para 400
          let width = img.width;
          let height = img.height;

          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          // Converte para JPEG com compressão de 40% (Reduzido de 60%)
          const compressed = canvas.toDataURL('image/jpeg', 0.4);
          this.images.update(prev => [...prev, compressed]);
        };
      };
      reader.readAsDataURL(file);
    }
  }

  removePhoto(index: number) {
    this.images.update((prev: any[]) => prev.filter((_, i) => i !== index));
  }

  async submit() {
    // ALTERAÇÃO 4: Agora envia também a description
    const user = this.authService.currentUserValue;
    this.reportData.authorId = user.id;
    this.success.emit({
      ...this.reportData,
      images: this.images()
    });
    console.warn(this.images().length);
    this.close.emit();
  }
}
