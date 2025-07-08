import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto, SignUpDto } from "./dto";
import { Tokens } from "./types";
import { Request } from "express";
import { AuthGuard } from "@nestjs/passport";
@Controller("auth")
export class AuthController {
  private authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @Post("/sign-up")
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() dto: SignUpDto): Promise<Tokens> {
    return this.authService.signUp(dto);
  }

  @Post("/sign-in")
  @HttpCode(HttpStatus.OK)
  signIn(@Body() dto: SignInDto): Promise<Tokens> {
    return this.authService.signIn(dto);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("/logout")
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: Request) {
    const user = req.user;
    return this.authService.logout(user["sub"]);
  }

  @UseGuards(AuthGuard("jwt-refresh"))
  @Post("/refresh")
  @HttpCode(HttpStatus.OK)
  refreshTokens(@Req() req: Request) {
    const user = req.user;

    return this.authService.refreshTokens(user["sub"], user["refresh_token"]);
  }
}
