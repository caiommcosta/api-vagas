import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserTalentOs } from '../dto/talent-os.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, password: string): Promise<UserTalentOs> {
    const user = await this.authService.validateWithTalentOS(email, password);
    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }
    return user;
  }
}
