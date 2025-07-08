import { InternalAxiosRequestConfig } from "axios";

export interface CustomAxiosRequestConfigForAuth
  extends InternalAxiosRequestConfig {
  _retry?: boolean;
}
