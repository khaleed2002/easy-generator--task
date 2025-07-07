import { validationSchema } from "./validation.schema";

export default () => {
  const config = validationSchema.parse(process.env);
  return {
    port: config.PORT,
    nodeEnv: config.NODE_ENV,
    database: {
      uri: config.MONGODB_URI,
    },
    jwt: {
      secret: config.JWT_SECRET,
      expiresIn: config.JWT_EXPIRES_IN,
    },
  };
};
