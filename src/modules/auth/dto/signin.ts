import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class SigninDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
