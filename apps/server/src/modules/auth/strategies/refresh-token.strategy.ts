import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtPayload, JwtPayloadWithRt } from "../types";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh"
) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          // Extract from cookies first, fallback to Authorization header
          return (
            req?.cookies?.refresh_token ||
            ExtractJwt.fromAuthHeaderAsBearerToken()(req)
          );
        },
      ]),
      secretOrKey: config.get<string>("jwt.secret") || "",
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayload): JwtPayloadWithRt {
    const refresh_token = req.cookies?.refresh_token;

    if (!refresh_token) throw new ForbiddenException("Refresh token malformed");

    return {
      ...payload,
      refresh_token,
    };
  }
}
