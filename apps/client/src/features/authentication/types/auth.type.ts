export interface User {
  email: string;
  id: string;
  name: string;
}

export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  accessToken: string;
  error: string | null;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends SignInCredentials {
  name: string;
}
