export interface SignUpDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ValidatedUserId {
  uid: number;
}
