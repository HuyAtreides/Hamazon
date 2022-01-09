import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { concat, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Book } from 'src/app/core/models/book';
import { AuthService } from 'src/app/core/services/auth.service';
import { BookService } from 'src/app/core/services/book.service';
import { UserService } from 'src/app/core/services/user.service';
import { listenControlChanges } from 'src/app/core/utils/listen-control-changes';

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

  /** Auto complete form control. */
  public readonly autoCompleteControl = new FormControl('');

  /** List of suggested books. */
  public readonly books$: Observable<readonly Book[] | null>;

  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly bookService: BookService,
  ) {
    this.username$ = this.userService.currentUser$.pipe(
      map((user) => (user ? user.username : user)),
    );
    this.books$ = listenControlChanges<string>(this.autoCompleteControl).pipe(
      switchMap((searchString) => {
        /** Only perform book suggestion when search string is not empty. */
        if (searchString !== '') {
          return concat(
            of(null),
            this.bookService.suggestBooks({
              searchString,
            }),
          );
        }
        return of([]);
      }),
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
