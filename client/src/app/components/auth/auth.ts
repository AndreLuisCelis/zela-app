import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy, signal, inject, output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ZelaService } from "../../services/zela-service";
import { AuthService } from "../../services/auth";
import { Router } from "@angular/router";

// --- AUTH COMPONENT (LOGIN & REGISTER) ---
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './auth.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {
  zelaService = inject(ZelaService);
  authService = inject(AuthService);
  router = inject(Router);

  isLogin = signal(true);
  errorMessage = signal('');
  form = { name: '', email: '', password: '' };
  success = output<void>();

  handleSubmit() {
    this.errorMessage.set('');

    if (this.isLogin()) {
      this.authService.login({ email: this.form.email, password: this.form.password })
        .subscribe({
          next: () => this.success.emit(),
          error: (err) => {
            console.error('Login error:', err);
            const msg = err.error?.error || 'Falha no login. Verifique as suas credenciais.';
            this.errorMessage.set(msg);
          }
        });
    } else {
      this.authService.register(this.form)
        .subscribe({
          next: () => this.success.emit(),
          error: (err) => {
            console.error('Register error:', err);
            const msg = err.error?.error || 'Falha no registo. Tente novamente.';
            this.errorMessage.set(msg);
          }
        });
    }
  }
}
