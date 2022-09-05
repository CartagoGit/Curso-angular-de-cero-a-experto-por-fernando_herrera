export interface AuthResponse {
  email?: string;
  error?: object;
  msg?: string;
  name?: string;
  ok: boolean;
  token?: string;
  uid?: string;
}

export interface User {
  email: string;
  name: string;
  uid: string;
}
