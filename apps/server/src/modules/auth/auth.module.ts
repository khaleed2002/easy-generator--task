import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthController } from "./auth.controller";
import { User, UserSchema } from "/schemas/user.schema";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AccessTokenStrategy, RefreshTokenStrategy } from "./strategies";
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
