export interface AccessTokenPayload {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  iat?: number;
  exp?: number;
}
