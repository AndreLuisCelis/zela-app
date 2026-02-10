import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy, signal, inject } from "@angular/core";
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

  handleSubmit() {
    this.errorMessage.set('');

    if (this.isLogin()) {
      this.authService.login({ email: this.form.email, password: this.form.password })
        .subscribe({
          next: () => this.router.navigate(['/']),
          error: (err) => {
            console.error('Login error:', err);
            this.errorMessage.set('Falha no login. Verifique as suas credenciais.');
          }
        });
    } else {
      this.authService.register(this.form)
        .subscribe({
          next: () => this.router.navigate(['/']),
          error: (err) => {
            console.error('Register error:', err);
            this.errorMessage.set('Falha no registo. Tente novamente.');
          }
        });
    }
  }
}
