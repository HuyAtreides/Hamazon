import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

/** Directive emits an event when user scroll to bottom. */
@Directive({
  selector: '[appInfiniteScroll]',
})
export class InfiniteScrollDirective {
  /** Event which emitted when user scroll to bottom. */
  @Output('appInfiniteScroll')
  public readonly nextPageRequested = new EventEmitter<void>();

  /**
   * Emit an event when user scroll to bottom.
   * @param element Element which the scroll event is attached to.
   */
  @HostListener('scroll', ['$event.currentTarget'])
  public handleScroll(element: HTMLElement): void {
    const { scrollTop, scrollHeight, clientHeight } = element;

    /** Emit an event if user scroll to bottom. */
    if (clientHeight + scrollTop >= scrollHeight) {
      this.nextPageRequested.emit();
    }
  }
}
