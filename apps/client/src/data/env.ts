import z from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().min(1000),
  API_URL: z.string().url(),
});
export class Configs {
  private static instance: Configs;
  private configs: z.infer<typeof envSchema>;

  private constructor() {
    this.configs = envSchema.parse({
      PORT: process.env.PORT,
      API_URL: process.env.API_URL,
    });
    Object.freeze(this.configs);
  }

  public static getInstance(): Configs {
    if (!Configs.instance) {
      Configs.instance = new Configs();
    }
    return Configs.instance;
  }

  public getConfigs(): z.infer<typeof envSchema> {
    return this.configs;
  }

  public get PORT(): number {
    return this.configs.PORT;
  }

  public get API_URL(): string {
    return this.configs.API_URL;
  }
}
