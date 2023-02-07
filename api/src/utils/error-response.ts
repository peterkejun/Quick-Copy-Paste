const errors = [
  'USER:EMAIL_EXISTS',
  'USER:INVALID_PASSWORD',
  'USER:INVALID_NAME',
  'SNIPPET:NOT_FOUND',
  'SNIPPET-TAG:NOT_FOUND',
] as const;

export type HTTP_ERROR_MSG = (typeof errors)[number];
