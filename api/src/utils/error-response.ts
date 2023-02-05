const errors = [
  'USER:EMAIL_EXISTS',
  'USER:INVALID_PASSWORD',
  'USER:INVALID_NAME',
] as const;

export type HTTP_ERROR_MSG = (typeof errors)[number];
