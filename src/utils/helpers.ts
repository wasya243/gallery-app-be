import { ProcessedJoiValidationError, RawJoiValidationError } from 'typings/index';

export function composeJoiValidationError(errorDetails: RawJoiValidationError[]): ProcessedJoiValidationError[] {
  return errorDetails.map((item: RawJoiValidationError) => Object.assign({}, { key: item.context.key, message: item.message }));
}
