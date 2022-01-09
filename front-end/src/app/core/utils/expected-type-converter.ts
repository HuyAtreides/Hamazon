/** Convert a unknown type value to the expected type. */
export interface ExpectedTypeConverter<ExpectedType> {
  /** Check if the actual type of the value is ExpectedType. If true
   * Convert value type to ExpectedType and return and throw an error if false.
   * @param value Value to infer.
   * @throws AppError .*/
  convert(value: unknown): ExpectedType;
}
