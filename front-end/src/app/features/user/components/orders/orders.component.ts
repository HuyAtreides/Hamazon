import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { finalize, scan, share, switchMap, tap } from 'rxjs/operators';
import { OrderPaginationOptions } from 'src/app/core/models/order-pagination-options';
import { Page } from 'src/app/core/models/page';

import { NestedFormErrorStateMatcher } from 'src/app/core/services/nested-form-error-state-matcher.service';
import { OrderService } from 'src/app/core/services/order.service';
import { CustomValidators } from 'src/app/core/utils/custom-validators';
import { listenControlChanges } from 'src/app/core/utils/listen-control-changes';
import { paginate } from 'src/app/core/utils/paginate';

import { OrderItem } from '../../../../core/models/order-item';

const DEFAULT_PAGE_SIZE = 15;
const INITIAL_PAGE = 0;

/** User orders page. */
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent {
  /** Date range control. */
  public readonly dateRangeControl = this.formBuilder.group(
    {
      start: [null],
      end: [null],
    },
    { validators: CustomValidators.dateRangeControl() },
  );

  /** List of user orders. */
  public readonly orders$: Observable<OrderItem[] | null>;

  /** Search orders form control. */
  public readonly searchControl = this.formBuilder.control('');

  /** Whether we are getting page or not. */
  public readonly isGettingPage$ = new BehaviorSubject<boolean>(true);

  /** Number of orders. */
  public readonly numberOfOrders$ = new BehaviorSubject<number>(0);

  /** Current page number. */
  private readonly currentPageNumber$ = new BehaviorSubject<number>(INITIAL_PAGE);

  /** Whether we have the next page or not. */
  private readonly haveNextPage$ = new BehaviorSubject<boolean>(true);

  private readonly startSearchingOrders$ = new BehaviorSubject<string>('');

  public constructor(
    private readonly formBuilder: FormBuilder,
    public readonly customErrorStateMatcher: NestedFormErrorStateMatcher,
    private readonly orderService: OrderService,
  ) {
    this.orders$ = this.initOrdersStream();
  }

  /** Handle next page requested. */
  public handleNextPageRequested(): void {
    /** Fetch new page if we are not currently getting page and we have the next page. */
    if (!this.isGettingPage$.value && this.haveNextPage$.value) {
      this.currentPageNumber$.next(this.currentPageNumber$.value + 1);
    }
  }

  /** Handle search orders. */
  public handleSearchOrders(): void {
    this.startSearchingOrders$.next(this.searchControl.value);
  }

  private initOrdersStream(): Observable<OrderItem[] | null> {
    return combineLatest([
      this.startSearchingOrders$,
      listenControlChanges(this.dateRangeControl),
    ]).pipe(
      tap(() => this.currentPageNumber$.next(0)),
      switchMap((criteria) =>
        paginate<OrderItem, OrderPaginationOptions>(
          {
            page: this.currentPageNumber$.asObservable(),
            pageSize: of(DEFAULT_PAGE_SIZE),
            searchCriteria: of(criteria as readonly unknown[]),
          },
          (options) => this.getUserOrders(options),
        ).pipe(scan(this.accumulator, null)),
      ),
      share(),
    );
  }

  private accumulator(
    acc: OrderItem[] | null,
    value: Page<OrderItem> | null,
  ): OrderItem[] | null {
    if (!value) {
      if (acc) {
        return acc;
      }
      return value;
    }

    const mutableOrders = value.content as OrderItem[];

    if (!acc) {
      return mutableOrders;
    }

    acc.push(...mutableOrders);
    return acc;
  }

  private getUserOrders(options: OrderPaginationOptions): Observable<Page<OrderItem>> {
    this.isGettingPage$.next(true);
    return this.orderService.getOrders(options).pipe(
      tap((page) => this.haveNextPage$.next(!page.isLast)),
      tap((page) => this.numberOfOrders$.next(page.total)),
      finalize(() => this.isGettingPage$.next(false)),
    );
  }
}
