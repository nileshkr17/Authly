import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { MagiclinkService } from './magiclink.service';
import { SendMagicLinkDto } from './dto/send-magic-link.dto';

@Controller('magiclink')
export class MagiclinkController {
  constructor(private readonly magiclinkService: MagiclinkService) {}

  @Post('send')
  async sendMagicLink(@Body() sendMagicLinkDto: SendMagicLinkDto) {
    return this.magiclinkService.sendMagicLink(sendMagicLinkDto.email);
  }

  @Get('verify')
  async verifyMagicLink(@Query('token') token: string) {
    return this.magiclinkService.verifyMagicLink(token);
  }
}
