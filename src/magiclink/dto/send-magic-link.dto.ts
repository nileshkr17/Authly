import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class SendMagicLinkDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @MaxLength(254, { message: 'Email address is too long' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string;
}
