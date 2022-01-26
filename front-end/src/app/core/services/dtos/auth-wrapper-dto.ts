/** Auth wrapper DTO. */
export interface AuthWrapperDto<T> {
  /** The data used for business logic. */
  readonly payload: T;

  /** User credential which usually is user password. */
  readonly credential: string;
}
