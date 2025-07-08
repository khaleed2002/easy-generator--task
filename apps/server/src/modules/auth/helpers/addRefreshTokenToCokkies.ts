import { ConfigService } from "@nestjs/config";
import { Response } from "express";
import ms from "ms";
export function addRefreshTokenToCokkies(
  refresh_token: string,
  res: Response,
  config: ConfigService
) {
  const refreshTokenExpiresIn = config.get<string>(
    "jwt.expiresIn"
  ) as ms.StringValue;
  res.cookie("refresh_token", refresh_token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: ms(refreshTokenExpiresIn),
  });
}
