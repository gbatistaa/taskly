export interface AccessTokenPayload {
  id: string;
  username: string;
  firstName: string;
  iat?: number;
  exp?: number;
}
