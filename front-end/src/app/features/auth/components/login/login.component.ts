import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { CustomErrorStateMatcher } from 'src/app/core/services/custom-error-state-matcher.service';
import { handleError } from 'src/app/core/utils/handle-error';

const SNACK_BAR_ACTION_TITLE = 'Close';

/** Login page. */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../auth.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
  /** Login form. */
  public readonly loginForm: FormGroup;

  /** Determines whether the form is submitting or not. */
  public readonly isSubmitting$ = new BehaviorSubject<boolean>(false);

  /** Error message. */
  public readonly errorMessage$ = new Subject<string>();

  /** Whether the password is visible or not. */
  private readonly isPasswordVisible$ = new BehaviorSubject<boolean>(false);

  /** Emits value when this component is destroyed. */
  private readonly componentDestroyed$ = new Subject<void>();

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly snackbar: MatSnackBar,
    private readonly router: Router,
    public readonly customErrorStateMatcher: CustomErrorStateMatcher,
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.errorMessage$
      .pipe(
        tap((message) =>
          this.snackbar.open(message, SNACK_BAR_ACTION_TITLE, {
            duration: 2500,
          }),
        ),
        takeUntil(this.componentDestroyed$),
      )
      .subscribe();
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }

  /** Get form control.
   * @param controlName Form control name.
   */
  public getControl(controlName: string): AbstractControl {
    return this.loginForm.controls[controlName];
  }

  /** Toggle password visibility. */
  public togglePasswordVisibility(): void {
    this.isPasswordVisible$.next(!this.isPasswordVisible$.value);
  }

  /** Password input field type. */
  public get passwordInputType(): string {
    return this.isPasswordVisible$.value ? 'text' : 'password';
  }

  /** Password input field icon type. */
  public get passwordIconType(): string {
    return this.isPasswordVisible$.value ? 'visibility' : 'visibility_off';
  }

  /** Handle submit. */
  public handleSubmit(): void {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      this.isSubmitting$.next(true);
      this.authService
        .login(this.loginForm.value)
        .pipe(
          takeUntil(this.componentDestroyed$),
          finalize(() => this.isSubmitting$.next(false)),
        )
        .subscribe({
          error: (err: unknown) => handleError(err, this.errorMessage$),
          complete: () => this.router.navigate(['/books']),
        });
    }
  }
}
