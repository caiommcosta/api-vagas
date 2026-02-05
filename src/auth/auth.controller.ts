/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  BadRequestException,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth/login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('manager')
  @HttpCode(HttpStatus.CREATED)
  async loginManager(
    @Request() req: any,
    @Headers('x-organization-id') organizationId: string,
  ): Promise<LoginResponseDto> {
    this.validationHeader(organizationId);

    return this.authService.loginManager(req.user, organizationId);
  }

  @UseGuards(AuthGuard('local'))
  @Post('recruiter')
  @HttpCode(HttpStatus.CREATED)
  async loginRecruiter(
    @Request() req: any,
    @Headers('x-organization-id') organizationId: string,
  ): Promise<LoginResponseDto> {
    this.validationHeader(organizationId);

    return this.authService.loginRecruiter(req.user, organizationId);
  }

  private validationHeader(organizationId: string) {
    if (!organizationId || organizationId !== 'abc')
      throw new BadRequestException(
        'Header x-organization-id ausente ou validação falhou',
      );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req: Express.Request): any {
    return req.user;
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/logout')
  async logout(@Request() req) {
    return req.logout();
  }
}
