import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Gender } from '../gender.enum';

export class SignupCredentialsDTO {
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(10)
  firstname: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(10)
  lastname: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  email: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(10)
  password: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(10)
  city: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(10)
  country: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(10)
  gender: Gender;
}
