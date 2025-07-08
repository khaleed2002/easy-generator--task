import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto, SignUpDto } from "./dto";
import { Request, Response } from "express";
import { AuthGuard } from "@nestjs/passport";
import mongoose from "mongoose";
import { ConfigService } from "@nestjs/config";
import { addRefreshTokenToCokkies } from "./helpers";
@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private config: ConfigService
  ) {}

  @Post("/sign-up")
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() dto: SignUpDto, @Res() res: Response) {
    const isUserEmailExists = await this.authService.isUserEmailExists(
      dto.email
    );
    if (isUserEmailExists) {
      throw new ConflictException("User with this email already exists");
    }
    const { access_token, refresh_token } = await this.authService.signUp(dto);
    addRefreshTokenToCokkies(refresh_token, res, this.config);
    return res.json({ access_token });
  }

  @Post("/sign-in")
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() dto: SignInDto, @Res() res: Response) {
    const isUserEmailExists = await this.authService.isUserEmailExists(
      dto.email
    );
    if (!isUserEmailExists) {
      throw new UnauthorizedException("Invalid Credentials");
    }
    const { access_token, refresh_token } = await this.authService.signIn(dto);
    addRefreshTokenToCokkies(refresh_token, res, this.config);
    return res.json({ access_token });
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("/logout")
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request, @Res() res: Response) {
    const user = req.user as { sub: mongoose.Types.ObjectId };
    res.clearCookie("refresh_token");
    await this.authService.logout(user["sub"]);
    return res.json();
  }

  @UseGuards(AuthGuard("jwt-refresh"))
  @Post("/refresh")
  @HttpCode(HttpStatus.OK)
  async refreshTokens(@Req() req: Request, @Res() res: Response) {
    const user = req.user as {
      sub: mongoose.Types.ObjectId;
      refresh_token: string;
    };

    const { access_token, refresh_token: newRefreshToken } =
      await this.authService.refreshTokens(user["sub"], user["refresh_token"]);
    addRefreshTokenToCokkies(newRefreshToken, res, this.config);

    return res.json({ access_token });
  }
}
