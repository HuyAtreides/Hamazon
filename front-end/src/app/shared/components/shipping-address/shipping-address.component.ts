import { isEqual } from 'lodash';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import {
  finalize,
  first,
  map,
  shareReplay,
  startWith,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { Country } from 'src/app/core/enums/country';
import { ShippingAddress } from 'src/app/core/models/shipping-address';
import { CustomErrorStateMatcher } from 'src/app/core/services/custom-error-state-matcher.service';
import { ShippingAddressService } from 'src/app/core/services/shipping-address.service';
import { enumToArray } from 'src/app/core/utils/enum-to-array';
import { handleError } from 'src/app/core/utils/handle-error';

/** Component collects shipping address from user. */
@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShippingAddressComponent implements OnDestroy {
  /** Whether to emits an event after saving the shipping address. Usually be true when this component is used as a step in a stepper. The emitted event indicates that this step is completed.  */
  @Input()
  public shouldEmitEventAfterSave!: boolean;

  /** Emit when shipping address was saved successfully and shouldEmitEventAfterSave property is true. */
  @Output()
  public readonly shippingAddressSaved = new EventEmitter<void>();

  /** List of countries. */
  public readonly countries = enumToArray(Country);

  /** Represents a shipping address form which will be initialized asynchronously. */
  public readonly shippingAddressForm$: Observable<FormGroup>;

  /** Error message. */
  public readonly message$ = new Subject<string>();

  /** Whether we are waiting for response from server or not. */
  public readonly isLoading$ = new BehaviorSubject<boolean>(false);

  /** Whether the form value changes is accepted. */
  public readonly isNewAddressNotAccepted$: Observable<boolean>;

  /** Whether the current address can be used. */
  public readonly isCurrentAddressNotAccepted$: Observable<boolean>;

  /** Shipping address of the current user. Null if the user hasn't provide shipping address. */
  private readonly shippingAddress$: Observable<ShippingAddress | null>;

  /** Emit value when this component is destroyed. */
  private readonly componentDestroyed$ = new Subject<string>();

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly shippingAddressService: ShippingAddressService,
    public readonly customErrorStateMatcher: CustomErrorStateMatcher,
  ) {
    this.shippingAddress$ = this.shippingAddressService
      .getShippingAddress()
      .pipe(shareReplay({ refCount: true, bufferSize: 1 }));
    this.shippingAddressForm$ = this.shippingAddress$.pipe(
      first(),
      map((shippingAddress) => this.initShippingAddressForm(shippingAddress)),
      shareReplay({ refCount: true, bufferSize: 1 }),
    );
    this.isCurrentAddressNotAccepted$ = this.initIsCurrentAddressNotAcceptedStream();
    this.isNewAddressNotAccepted$ = this.initIsNewAddressNotAcceptedStream();
  }

  /** Use current shipping address for the order. */
  public useCurrentAddress(): void {
    this.shippingAddressSaved.emit();
  }

  /** Handle shipping form submitted. */
  public handleAddNewShippingAddress(): void {
    this.isLoading$.next(true);
    this.shippingAddressForm$
      .pipe(
        takeUntil(this.componentDestroyed$),
        switchMap((form) => this.saveShippingAddress(form)),
        finalize(() => this.isLoading$.next(false)),
      )
      .subscribe({
        complete: () => {
          if (this.shouldEmitEventAfterSave) {
            this.shippingAddressSaved.emit();
          } else {
            this.message$.next('Your shipping address has been saved!');
          }
        },
        error: (err) => handleError(err, this.message$),
      });
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.componentDestroyed$.next();
  }

  /** Initialize the shipping address form.
   * @param initialValue Will be used as form default value if it is not null.
   */
  private initShippingAddressForm(initialValue: ShippingAddress | null): FormGroup {
    return this.formBuilder.group({
      id: [initialValue ? initialValue.id : null],
      fullname: [initialValue ? initialValue.fullname : '', Validators.required],
      address: [initialValue ? initialValue.address : '', Validators.required],
      country: [initialValue ? initialValue.country : Country.VN],
      city: [initialValue ? initialValue.city : '', Validators.required],
      phoneNumber: [
        initialValue ? initialValue.phoneNumber : '',
        [Validators.required, Validators.pattern(/^[0-9]+$/)],
      ],
      note: [initialValue ? initialValue.note : ''],
    });
  }

  private initIsCurrentAddressNotAcceptedStream(): Observable<boolean> {
    return this.shippingAddress$.pipe(map((shippingAddress) => shippingAddress == null));
  }

  private initIsNewAddressNotAcceptedStream(): Observable<boolean> {
    return this.shippingAddressForm$.pipe(
      switchMap((form) =>
        combineLatest([
          form.valueChanges,
          form.statusChanges,
          this.shippingAddress$,
          this.isLoading$,
        ]),
      ),
      map(
        ([formValue, formStatus, currentAddress, isLoading]) =>
          /** New address is not accepted if it is like the current address or we are loading or the form is invalid. */
          isEqual(formValue, currentAddress) || isLoading || formStatus === 'INVALID',
      ),
      startWith(true),
    );
  }

  private saveShippingAddress(form: FormGroup): Observable<void> {
    /** New shipping address should have null id so that the server can assign an auto-generate id for it. */
    const newShippingAddress: ShippingAddress = { ...form.value, id: null };

    return this.shippingAddressService.saveShippingAddress(newShippingAddress);
  }
}
