import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  Query, 
  Ip, 
  Headers,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { MagiclinkService } from './magiclink.service';
import { SendMagicLinkDto } from './dto/send-magic-link.dto';
import { VerifyMagicLinkDto } from './dto/verify-magic-link.dto';

@Controller('magiclink')
export class MagiclinkController {
  constructor(private readonly magiclinkService: MagiclinkService) {}

  @Post('send')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async sendMagicLink(
    @Body() sendMagicLinkDto: SendMagicLinkDto,
    @Ip() ipAddress: string,
    @Headers('user-agent') userAgent: string,
  ) {
    return this.magiclinkService.sendMagicLink(
      sendMagicLinkDto.email,
      ipAddress,
      userAgent,
    );
  }

  @Get('verify')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async verifyMagicLink(
    @Query() verifyMagicLinkDto: VerifyMagicLinkDto,
    @Ip() ipAddress: string,
    @Headers('user-agent') userAgent: string,
  ) {
    return this.magiclinkService.verifyMagicLink(
      verifyMagicLinkDto.token,
      ipAddress,
      userAgent,
    );
  }
}
