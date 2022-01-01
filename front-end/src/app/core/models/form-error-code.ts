/**
 * Validation error code.
 */
export enum ValidationErrorCode {
  /**
   * Invalid email.
   */
  Email = 'email',

  /**
   * Required field.
   */
  Required = 'required',

  /**
   * Match of values error. When value of one control does not match to another.
   */
  Match = 'match',

  /**
   * Minimal length restriction.
   */
  MinLength = 'minlength',

  /**
   * Maximal length restriction.
   */
  MaxLength = 'maxlength',

  /**
   * Maximum value restriction.
   */
  Min = 'min',

  /**
   * Minimum value restriction.
   */
  Max = 'max',

  /**
   * Pattern restriction.
   */
  Pattern = 'pattern',

  /**
   * Invalid date range's start date.
   */
  InvalidStartDate = 'matStartDateInvalid',

  /**
   * Invalid date range's start date.
   */
  InvalidEndDate = 'matEndDateInvalid',

  /**
   * Invalid date range.
   */
  InvalidDateRange = 'matDatepickerParse',
}

/**
 * Match validation error data.
 */
export interface MatchErrorData {
  /**
   * Control name.
   */
  controlName: string;

  /**
   * Control title.
   */
  controlTitle: string;
}

/**
 * Length validation error data.
 */
export interface LengthErrorData {
  /**
   * Actual length.
   */
  actualLength: number;

  /**
   * Required length.
   */
  requiredLength: number;
}

/**
 * Pattern validation error data.
 */
export interface PatternErrorData {
  /**
   * Actual value.
   */
  actualValue: string;

  /**
   * Required pattern.
   */
  requiredPattern: string;
}

/**
 * Min value validation error data.
 */
export interface MinValueErrorData {
  /**
   * Actual value.
   */
  actual: number;

  /**
   * Min value.
   */
  min: number;
}

/**
 * Max value validation error data.
 */
export interface MaxValueErrorData {
  /**
   * Actual value.
   */
  actual: number;

  /**
   * Max value.
   */
  max: number;
}
