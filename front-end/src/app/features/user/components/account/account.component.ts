import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { isEqual } from 'lodash';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import {
  filter,
  finalize,
  first,
  map,
  shareReplay,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { Token } from 'src/app/core/models/token';
import { CustomErrorStateMatcher } from 'src/app/core/services/custom-error-state-matcher.service';
import { UserService } from 'src/app/core/services/user.service';
import { CustomValidators } from 'src/app/core/utils/custom-validators';
import { filterInvalidForm } from 'src/app/core/utils/filter-invalid-form';
import { filterNull } from 'src/app/core/utils/filter-null';
import { handleError } from 'src/app/core/utils/handle-error';

import { CurrentPasswordDialogComponent } from './components/current-password-dialog/current-password-dialog.component';

/** User account page. */
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent implements OnDestroy {
  /** User account form. */
  public readonly form$: Observable<FormGroup>;

  /** Whether we are loading or not. */
  public readonly isLoading$ = new BehaviorSubject<boolean>(false);

  /** Determine whether the new user account info is accepted or not. */
  public readonly isNewInfoNotAccepted$: Observable<boolean>;

  /** Message. */
  public readonly message$ = new Subject<string>();

  /** Emits when this component is destroyed. */
  private readonly componentDestroyed$ = new Subject<void>();

  public constructor(
    private readonly userService: UserService,
    private readonly formBuilder: FormBuilder,
    private readonly dialog: MatDialog,
    public readonly customErrorStateMatcher: CustomErrorStateMatcher,
  ) {
    this.form$ = this.initForm();
    this.isNewInfoNotAccepted$ = this.initNewInfoValidationStream();
    this.addsValidator();
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }

  /** Handle submit form. */
  public handleSubmit(): void {
    this.form$
      .pipe(
        takeUntil(this.componentDestroyed$),
        filterInvalidForm(),
        switchMap((form) => this.updateUserInfo(form)),
        finalize(() => this.isLoading$.next(false)),
      )
      .subscribe({
        next: () => this.message$.next('Your changes have been saved!'),
        error: (err) => handleError(err, this.message$),
      });
  }

  private updateUserInfo(form: FormGroup): Observable<Token> {
    const dialogRef = this.dialog.open(CurrentPasswordDialogComponent);

    return dialogRef.afterClosed().pipe(
      filter((credential) => credential != null),
      tap(() => this.isLoading$.next(true)),
      switchMap((credential) =>
        this.userService.updateUserInfo({
          credential,
          payload: form.value,
        }),
      ),
    );
  }

  private initNewInfoValidationStream(): Observable<boolean> {
    return this.form$.pipe(
      switchMap((form) =>
        combineLatest([
          form.valueChanges,
          this.userService.currentUser$,
          this.isLoading$,
        ]),
      ),
      map(([formValue, user, isLoading]) => {
        const editedUser = {
          username: formValue.username,
          password: formValue.password,
          email: formValue.email,
        };
        return isEqual(editedUser, { ...user, password: '' }) || isLoading;
      }),
      startWith(true),
    );
  }

  private initForm(): Observable<FormGroup> {
    return this.userService.currentUser$.pipe(
      filterNull(),
      first(),
      map((user) =>
        this.formBuilder.group({
          username: [
            user.username,
            [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(15),
              Validators.pattern(/^[a-zA-Z0-9_]+$/),
            ],
          ],
          email: [user.email, [Validators.required, Validators.email]],
          password: ['', [Validators.minLength(7)]],
          confirmPassword: [
            '',
            [CustomValidators.matchControl('password', 'New password')],
          ],
        }),
      ),
      shareReplay({ refCount: true, bufferSize: 1 }),
    );
  }

  /** Adds the required-validator to the confirm password form control dynamically whenever the password form control value is not empty.  */
  private addsValidator(): void {
    this.form$
      .pipe(
        switchMap((form) =>
          form.controls.password.valueChanges.pipe(
            tap((value) => {
              if (value === '') {
                form.controls.confirmPassword.removeValidators(Validators.required);
              } else {
                form.controls.confirmPassword.addValidators(Validators.required);
              }
              form.controls.confirmPassword.updateValueAndValidity();
            }),
          ),
        ),
        takeUntil(this.componentDestroyed$),
      )
      .subscribe();
  }
}
