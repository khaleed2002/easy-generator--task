import axios from "axios";
import { Configs } from "../data";

export const api = axios.create({
  baseURL: Configs.getInstance().API_URL,
  timeout: 10000,
});
