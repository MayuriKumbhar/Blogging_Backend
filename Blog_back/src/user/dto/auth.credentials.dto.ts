import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDTO {
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  email: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(10)
  password: string;
}
