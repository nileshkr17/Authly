import { IsString, IsNotEmpty, IsJWT } from 'class-validator';

export class VerifyMagicLinkDto {
  @IsString()
  @IsNotEmpty()
  @IsJWT()
  token: string;
}
