import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { OrderItem } from 'src/app/core/models/order-item';

/** Component displays a list of orders. */
@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersListComponent {
  /** List of orders. */
  @Input()
  public orders!: readonly OrderItem[] | null;

  /** Whether we are getting page or not. */
  @Input()
  public isGettingPage!: boolean | null;

  /** Next page request event. */
  @Output()
  public nextPageRequested = new EventEmitter<void>();

  /** Request next page. */
  public requestNextPage(): void {
    this.nextPageRequested.emit();
  }
}
