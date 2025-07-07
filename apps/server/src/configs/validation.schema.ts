import { z } from "zod";

export const validationSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(3000),
  MONGODB_URI: z.string().min(1, "MongoDB URI is required"),
  JWT_SECRET: z.string().min(1, "JWT secret is required"),
  JWT_EXPIRES_IN: z.string().default("7d"),
});

export type EnvConfig = z.infer<typeof validationSchema>;
