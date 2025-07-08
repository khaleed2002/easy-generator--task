import { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { authService } from "../../features/authentication/services/auth.services";
import { api } from "../../lib";
import { InternalAxiosRequestConfig } from "axios";
import { CustomAxiosRequestConfigForAuth } from "./types";
import {
  SignInCredentials,
  SignUpCredentials,
} from "../../features/authentication/types";
import { redirect } from "react-router-dom";

type AuthProviderProps = {
  children: ReactNode;
};
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [access_token, setAccessToken] = useState<string | null>("");

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const { access_token } = await authService.refreshToken();
        setAccessToken(access_token);
      } catch (error) {
        setAccessToken(null);
      }
    };
    fetchAccessToken();
  }, []);
  useEffect(() => {
    if (access_token) setIsAuthenticated(true);
    else setIsAuthenticated(false);
  }, [access_token]);

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use(
      (config: InternalAxiosRequestConfig<any>) => {
        const customConfig = config as CustomAxiosRequestConfigForAuth;
        customConfig.headers.Authorization =
          !customConfig._retry && access_token
            ? `Bearer ${access_token}`
            : customConfig.headers.Authorization;
        return customConfig;
      }
    );
    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [access_token]);

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response.status === 403 &&
          error.response.data.message === "Unauthorized"
        ) {
          try {
            const { access_token } = await authService.refreshToken();
            setAccessToken(access_token);
            originalRequest.headers.Authorization = `Bearer ${access_token}`;
            originalRequest._retry = true;
            return api(originalRequest);
          } catch (error) {
            setAccessToken(null);
          }
        }
        return Promise.reject(error);
      }
    );
    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, [access_token]);

  const signUp = async (credentials: SignUpCredentials) => {
    try {
      const { access_token } = await authService.signUp(credentials);
      setAccessToken(access_token);
    } catch (error) {
      setAccessToken(null);
      throw error;
    }
  };
  const signIn = async (credentials: SignInCredentials) => {
    try {
      const { access_token } = await authService.signIn(credentials);
      setAccessToken(access_token);
    } catch (error) {
      setAccessToken(null);
      throw error;
    }
  };
  const logout = async () => {
    try {
      await authService.logout();
      redirect("/sign-in");
      setAccessToken(null);
    } catch (error) {
      throw error;
    }
  };
  return (
    <AuthContext.Provider
      value={{ access_token, isAuthenticated, signIn, signUp, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
