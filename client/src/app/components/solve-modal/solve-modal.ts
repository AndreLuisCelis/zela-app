import { Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-solve-modal',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './solve-modal.html',
})
export class SolveModalComponent {
    close = output<void>();
    success = output<{ plan: string; images: File[] }>();

    plan = signal('');
    images = signal<File[]>([]);
    previews = signal<string[]>([]);

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const newFiles = Array.from(input.files);
            this.images.update(imgs => [...imgs, ...newFiles]);

            newFiles.forEach(file => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.previews.update(prevs => [...prevs, e.target?.result as string]);
                };
                reader.readAsDataURL(file);
            });
        }
    }

    removeImage(index: number) {
        this.images.update(imgs => imgs.filter((_, i) => i !== index));
        this.previews.update(prevs => prevs.filter((_, i) => i !== index));
    }

    submit() {
        if (!this.plan()) return;
        this.success.emit({ plan: this.plan(), images: this.images() });
    }
}
