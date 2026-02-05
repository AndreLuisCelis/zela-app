import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { User } from '../../models/user.interface';
import { ZelaService } from '../../services/zela-service';

export @Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
class HeaderComponent {
  zelaService = inject(ZelaService);
  balance = input.required<number>();
  user = input<User | null>(null);
}
