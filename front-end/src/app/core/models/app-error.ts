/** Application error. */
export class AppError extends Error {
  /**
   * Error message.
   */
  public readonly message: string;

  public constructor(message: string) {
    super(message);
    this.message = message;
  }
}
