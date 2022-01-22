import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { BehaviorSubject } from 'rxjs';

type StepNumber = 0 | 1;

/** Checkout page. */
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent {
  /** Stepper. Used to move to next step. */
  @ViewChild('stepper')
  public stepper!: MatStepper;

  /** Status of each step. */
  public readonly stepsStatus: BehaviorSubject<boolean>[] = [
    new BehaviorSubject<boolean>(false),
    new BehaviorSubject<boolean>(false),
  ];

  /** Move to next step.
   * @param currentStepNumber Current step number.
   */
  public moveToNextStep(currentStepNumber: StepNumber): void {
    this.stepsStatus[currentStepNumber].next(true);

    /** Use setTimeout so that when we invoke stepper.next() the completed property of mat-step was set to true.  */
    setTimeout(() => {
      this.stepper.next();
    });
  }
}
