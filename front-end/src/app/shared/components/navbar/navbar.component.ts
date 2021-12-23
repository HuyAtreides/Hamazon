import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

/** App navbar. */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  /** Logout. */
  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
