import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

/** App navbar. */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  /** Username. */
  public readonly username$: Observable<string | null>;

  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly userService: UserService,
  ) {
    this.username$ = this.userService.currentUser$.pipe(
      map((user) => (user ? user.username : user)),
    );
  }

  /** Get welcome message.
   * @param username Username used to generate welcome message.
   */
  public getWelcomeMessage(username: String): string {
    return `Welcome, ${username}`;
  }

  /** Logout. */
  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
