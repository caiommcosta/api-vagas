export interface UserResponseDto {
  userId: string;
  email: string;
  name: string;
  role: 'manager' | 'recruiter';
  organizationId: string;
  projectId?: string; // opcional, existe apenas no Manager
}
