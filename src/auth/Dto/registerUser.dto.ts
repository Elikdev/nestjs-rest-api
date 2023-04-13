import { IsString, IsOptional, IsNumber, IsNotEmpty, IsAlphanumeric, MinLength } from 'class-validator';

export class registerUser {
  @IsString()
  @IsNotEmpty()
  readonly fName: string;

  @IsString()
  @IsNotEmpty()
  readonly lName: string;

  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}
