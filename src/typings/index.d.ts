export interface RawJoiValidationError {
  context: {
    key: string;
    label: string;
  };
  message: string;
  path: string[];
  type: string;
}

export interface ProcessedJoiValidationError {
  key: string;
  message: string;
}
