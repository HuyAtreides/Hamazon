/** A domain data wrapper. Contains user credential field used by operations that requires user to re-authenticate.  */
export interface AuthWrapper<T> {
  /** The data used for business logic. */
  readonly payload: T;

  /** User credential which usually is user password. */
  readonly credential: string;
}
