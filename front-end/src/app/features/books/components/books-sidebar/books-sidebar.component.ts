import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSelectionListChange } from '@angular/material/list';
import { combineLatest } from 'rxjs';
import { BookOrderField } from 'src/app/core/enums/book-order-field';
import { Genre } from 'src/app/core/enums/genre';
import { OrderDirection } from 'src/app/core/enums/order-direction';
import { BookSearchFormValues } from 'src/app/core/models/book-pagination-options';
import { NestedFormErrorStateMatcher } from 'src/app/core/services/nested-form-error-state-matcher.service';
import { Async } from 'src/app/core/utils/combine-latest-object';
import { CompareFunctions } from 'src/app/core/utils/compare-functions';
import { CustomValidators } from 'src/app/core/utils/custom-validators';
import { enumToArray } from 'src/app/core/utils/enum-to-array';
import { listenControlChanges } from 'src/app/core/utils/listen-control-changes';
import { DateRange } from 'src/app/core/utils/types/date-range';

/** Allows users to specific books searching options (i.e. Search by books name, search by genres, etc). */
@Component({
  selector: 'app-books-sidebar',
  templateUrl: './books-sidebar.component.html',
  styleUrls: ['./books-sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksSidebarComponent implements OnInit {
  /** Emit new value whenever form control value changes. */
  @Output()
  public readonly initFormValuesStream = new EventEmitter<Async<BookSearchFormValues>>();

  /** Book genres. */
  public readonly genres: readonly Genre[] = enumToArray(Genre);

  /** Field used for ordering. */
  public readonly orderFields: readonly BookOrderField[] = enumToArray(BookOrderField);

  /** Order directions. */
  public readonly orderDirections: readonly OrderDirection[] =
    enumToArray(OrderDirection);

  /** Date range control. */
  public readonly dateRangeControl = this.formBuilder.group(
    {
      start: [null],
      end: [null],
    },
    { validators: CustomValidators.dateRangeControl() },
  );

  /** Order field control. */
  public readonly orderFieldControl = this.formBuilder.control(BookOrderField.Title);

  /** Order direction control. */
  public readonly orderDirectionControl = this.formBuilder.control(OrderDirection.Asc);

  /** Text control. */
  public readonly textControl = this.formBuilder.control('');

  /** Genre control. */
  public readonly genreControl = this.formBuilder.control(null);

  /** Compare function. */
  public readonly compareFunc = CompareFunctions.compareString;

  public constructor(
    private readonly formBuilder: FormBuilder,
    public readonly customErrorStateMatcher: NestedFormErrorStateMatcher,
  ) {}

  /** @inheritdoc */
  public ngOnInit(): void {
    this.observeControlValueChanges();
  }

  /** Convert genre enum to readable string.
   * @param genre Enum value to convert.
   */
  public getReadableGenre(genre: Genre): string {
    return Genre.toReadable(genre);
  }

  /** Convert order field enum to readable string.
   * @param field Enum value to convert.
   */
  public getReadableOrderField(field: BookOrderField): string {
    return BookOrderField.toReadable(field);
  }

  /** Convert order direction enum to readable string.
   * @param direction Enum value to convert.
   */
  public getReadableDirection(direction: OrderDirection): string {
    return OrderDirection.toReadable(direction);
  }

  /** Handle genre selection change.
   * @param selectionGenreListChange Reference to the options that have been changed.
   */
  public handleGenreSelectionChange(
    selectionGenreListChange: MatSelectionListChange,
  ): void {
    const selectedGenre = selectionGenreListChange.options[0].value;
    this.genreControl.setValue(selectedGenre);
  }

  /** Observe form control value changes. */
  private observeControlValueChanges(): void {
    const textChanges$ = listenControlChanges<string>(this.textControl);
    const genreChanges$ = listenControlChanges<Genre>(this.genreControl);
    const dateRangeChanges$ = listenControlChanges<DateRange>(
      this.dateRangeControl,
      CompareFunctions.compareDateRange,
    );
    const orderFieldChanges$ = listenControlChanges<BookOrderField>(
      this.orderFieldControl,
    );
    const orderDirectionChanges$ = listenControlChanges<OrderDirection>(
      this.orderDirectionControl,
    );

    this.initFormValuesStream.next({
      searchCriteria: combineLatest([textChanges$, dateRangeChanges$, genreChanges$]),
      orderField: orderFieldChanges$,
      orderDirection: orderDirectionChanges$,
    });
  }
}
