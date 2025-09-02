import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreatePersonDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  status: boolean;
}
