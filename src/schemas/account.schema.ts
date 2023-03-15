import { IsString, IsInt, Min, MaxLength, IsEmail, IsNumber } from 'class-validator';
import { isFloat32Array } from 'util/types';

export class AccountSchema {
  @IsString()
  @MaxLength(60)
  firstName: string;

  @IsString()
  @MaxLength(60)
  lastName: string;

  @IsInt()
  @Min(1)
  age: number;

  @IsNumber()
  @Min(0)
  balance: number;

  @IsString()
  @IsEmail()
  @MaxLength(255)
  email: string;
}
