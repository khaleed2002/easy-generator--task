import { AxiosResponse } from "axios";
import { SignInCredentials, SignUpCredentials } from "../types";
import { api } from "../../../lib";

interface AuthResponse {
  access_token: string;
}

class AuthService {
  constructor() {}

  async signIn(credentials: SignInCredentials): Promise<AuthResponse> {
    try {
      const response: AxiosResponse<AuthResponse> = await api.post(
        "/auth/sign-in",
        {
          email: credentials.email,
          password: credentials.password,
        },
        { withCredentials: true }
      );

      const { access_token } = response.data;
      return { access_token };
    } catch (error: any) {
      throw error;
    }
  }

  async signUp(credentials: SignUpCredentials): Promise<AuthResponse> {
    try {
      const response: AxiosResponse<AuthResponse> = await api.post(
        "/auth/sign-up",
        {
          email: credentials.email,
          password: credentials.password,
          name: credentials.name,
        },
        { withCredentials: true }
      );

      const { access_token } = response.data;
      return { access_token };
    } catch (error: any) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
    } catch (error) {
      throw error;
    }
  }

  async refreshToken(): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await api.post(
      "/auth/refresh",
      {},
      { withCredentials: true }
    );
    console.log(response);

    const { access_token } = response.data;
    return { access_token };
  }
}

export const authService = new AuthService();
