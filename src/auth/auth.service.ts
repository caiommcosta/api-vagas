import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginResponseDto } from './dto/login-response.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UserTalentOs } from './dto/talent-os.dto';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateWithTalentOS(
    email: string,
    password: string,
  ): Promise<UserTalentOs> {
    const user = await this.userService.findOne(email);

    if (user && user.password === password) {
      const talentOS: UserTalentOs = {
        userId: '123e4567-e89b-12d3-a456-426614174000',
        name: email.includes('manager') ? 'Manager' : 'Recruiter',
        email: email,
        rawProjectId: email.includes('manager')
          ? 'proj-123e4567-e89b-12d3-a456-426614174002'
          : undefined,
      };

      return Promise.resolve(talentOS);
    }

    throw new UnauthorizedException('Email ou senha inválidos');
  }

  async loginManager(
    user: UserTalentOs,
    organizationId: string,
  ): Promise<LoginResponseDto> {
    if (!user.rawProjectId)
      throw new UnauthorizedException(
        'Este usuário não possui um projeto associado para atuar como MANAGER',
      );

    const userPayload: UserResponseDto = {
      userId: user.userId,
      email: user.email,
      name: user.name,
      role: 'manager',
      organizationId: organizationId,
      projectId: user.rawProjectId, // Obrigatório para Manager
    };

    return Promise.resolve(this.generateTokenResponse(userPayload));
  }

  async loginRecruiter(
    user: UserTalentOs,
    organizationId: string,
  ): Promise<LoginResponseDto> {
    const userPayload: UserResponseDto = {
      userId: user.userId,
      email: user.email,
      name: user.name,
      role: 'recruiter',
      organizationId: organizationId,
      // Recruiter NÃO tem projectId no payload final
    };

    return Promise.resolve(this.generateTokenResponse(userPayload));
  }

  private generateTokenResponse(user: UserResponseDto): LoginResponseDto {
    const payload = {
      userId: user.userId,
      email: user.email,
      role: user.role,
      organizationId: user.organizationId,
      ...(user.projectId && { projectId: user.projectId }), // Adiciona projectId condicionalmente
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: user,
    };
  }
}
