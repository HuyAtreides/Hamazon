import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

const SNACK_BAR_ACTION_TITLE = 'Close';
const SNACK_BAR_DURATION = 2500;

/** A component used to display message using snack bar. */
@Component({
  selector: 'app-message-snack-bar',
  templateUrl: './message-snack-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageSnackBarComponent implements OnDestroy, OnInit {
  /** Message to display. */
  @Input()
  public message$!: Observable<string>;

  @Input()
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  @Input()
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  /** Emits value when this component is destroyed. */
  private readonly componentDestroyed$ = new Subject<void>();

  public constructor(private readonly snackbar: MatSnackBar) {}

  /** @inheritdoc */
  public ngOnInit(): void {
    this.message$
      .pipe(
        takeUntil(this.componentDestroyed$),
        tap((message) =>
          this.snackbar.open(message, SNACK_BAR_ACTION_TITLE, {
            duration: SNACK_BAR_DURATION,
            verticalPosition: this.verticalPosition,
            horizontalPosition: this.horizontalPosition,
          }),
        ),
      )
      .subscribe();
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }
}
