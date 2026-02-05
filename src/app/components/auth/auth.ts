import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy, signal, output, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ZelaService } from "../../services/zela-service";

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
  isLogin = signal(true);
  form = { name: '', email: '', password: '' };
  login = output<any>();
  register = output<any>();

  handleSubmit() {
    if (this.isLogin()) {
      this.login.emit({ email: this.form.email, password: this.form.password });
    } else {
      this.register.emit(this.form);
    }
  }
}
