import { IsEmail, Matches, MinLength } from "class-validator";
import { IsRequiredString } from "./helpers";
export class SignInDto {
  @IsEmail(
    { allow_underscores: true },
    { message: "property `email` is not valid email." }
  )
  @IsRequiredString("email")
  email: string;

  @Matches(/^(?=.*[A-Za-z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/, {
    message:
      "Password must contain at least one letter, one number, and one special character.",
  })
  @IsRequiredString("password")
  password: string;
}
