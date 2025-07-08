import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../../../schemas/user.schema";
import { Model, ObjectId } from "mongoose";
import mongoose from "mongoose";
import { SignInDto, SignUpDto } from "./dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Tokens } from "./types";
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private config: ConfigService
  ) {}

  async signUp(dto: SignUpDto): Promise<Tokens> {
    const hashedPassword = await this.hashData(dto.password);
    const newUser = await this.userModel.create({
      email: dto.email,
      name: dto.name,
      password: hashedPassword,
    });
    const tokens = await this.getTokens(newUser._id, newUser.email);
    await this.updateRefreshTokenHash(newUser._id, tokens.refresh_token);
    return tokens;
  }
  async signIn(dto: SignInDto): Promise<Tokens> {
    const user = await this.userModel.findOne(
      { email: dto.email },
      { password: true }
    );
    if (!user) throw new ForbiddenException("Invalid Credentials");

    const isPasswordMatches = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordMatches) throw new ForbiddenException("Invalid Credentials");
    const tokens = await this.getTokens(user._id, dto.email);

    await this.updateRefreshTokenHash(user._id, tokens.refresh_token);
    return tokens;
  }
  async logout(userId: mongoose.Types.ObjectId) {
    await this.userModel.updateOne(
      { _id: userId },
      { refresh_token_hash: null }
    );
  }
  async refreshTokens(
    userId: mongoose.Types.ObjectId,
    refresh_token: string
  ): Promise<Tokens> {
    const user = await this.userModel.findOne({
      _id: userId,
    });
    if (!user || !user.refresh_token_hash)
      throw new ForbiddenException("Access Denied");

    const isRefreshTokenMatches = await bcrypt.compare(
      refresh_token,
      user.refresh_token_hash
    );
    if (!isRefreshTokenMatches) throw new ForbiddenException("Access Denied");
    const tokens = await this.getTokens(user._id, user.email);
    await this.updateRefreshTokenHash(user._id, tokens.refresh_token);
    return tokens;
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getTokens(
    userId: mongoose.Types.ObjectId,
    email: string
  ): Promise<Tokens> {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          expiresIn: 60 * 15,
          secret: this.config.get<string>("jwt.secret"),
        }
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          expiresIn: this.config.get<string>("jwt.expiresIn"),
          secret: this.config.get<string>("jwt.secret"),
        }
      ),
    ]);
    return { access_token, refresh_token };
  }

  async updateRefreshTokenHash(
    userId: mongoose.Types.ObjectId,
    refresh_token: string
  ) {
    const refresh_token_hash = await this.hashData(refresh_token);
    await this.userModel.updateOne({ _id: userId }, { refresh_token_hash });
  }
}
