import { IsEmail } from "class-validator";
import { IsRequiredString } from "./helpers";
export class SignInDto {
  @IsEmail(
    { allow_underscores: true },
    { message: "property `email` is not valid email." }
  )
  @IsRequiredString("email")
  email: string;

  @IsRequiredString("password")
  password: string;
}
