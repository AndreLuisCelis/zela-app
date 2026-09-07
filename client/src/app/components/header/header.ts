import { ChangeDetectionStrategy, Component, inject, OnInit, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.interface';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  authService = inject(AuthService);
  loginClick = output<void>();

  user = signal<User | null>(null);

  ngOnInit() {
    this.user.set(this.authService.currentUserValue);
    this.authService.getCurrentUser().subscribe(user => this.user.set(user));
  }
}
