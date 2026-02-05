import { UserResponseDto } from './user-response.dto';

export interface LoginResponseDto {
  accessToken: string;
  user: UserResponseDto;
}
