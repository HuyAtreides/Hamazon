import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { CustomValidators } from 'src/app/core/utils/custom-validators';
import { handleError } from 'src/app/core/utils/handle-error';

const SNACK_BAR_ACTION_TITLE = 'Close';

/** Register page. */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../auth.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnDestroy {
  /** Login form. */
  public readonly registerForm: FormGroup;

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
  ) {
    this.registerForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          Validators.pattern(/^[a-zA-Z0-9_]+$/),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(7)]],
      email: ['', [Validators.required, Validators.email]],
      confirmPassword: [
        '',
        [Validators.required, CustomValidators.matchControl('password')],
      ],
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

  /** Get form control.
   * @param controlName Form control name.
   */
  public getControl(controlName: string): AbstractControl {
    return this.registerForm.controls[controlName];
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }

  /** Password input field type. */
  public get passwordInputType(): string {
    return this.isPasswordVisible$.value ? 'text' : 'password';
  }

  /** Password input field icon type. */
  public get passwordIconType(): string {
    return this.isPasswordVisible$.value ? 'visibility' : 'visibility_off';
  }

  /** Toggle password visibility. */
  public togglePasswordVisibility(): void {
    this.isPasswordVisible$.next(!this.isPasswordVisible$.value);
  }

  /** Username control. */
  public get usernameControl(): AbstractControl {
    return this.registerForm.controls.username;
  }

  /** Password control. */
  public get passwordControl(): AbstractControl {
    return this.registerForm.controls.password;
  }

  /** Handle submit. */
  public handleSubmit(): void {
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      this.isSubmitting$.next(true);
      this.authService
        .register(this.registerForm.value)
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
