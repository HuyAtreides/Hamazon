import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

const SNACK_BAR_ACTION_TITLE = 'Close';

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

  /** Emits value when this component is destroyed. */
  private readonly componentDestroyed$ = new Subject<void>();

  public constructor(private readonly snackbar: MatSnackBar) {}

  /** @inheritdoc */
  public ngOnInit(): void {
    this.message$
      .pipe(
        takeUntil(this.componentDestroyed$),
        tap((message) =>
          this.snackbar.open(message, SNACK_BAR_ACTION_TITLE, { duration: 2500 }),
        ),
      )
      .subscribe();
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }
}
