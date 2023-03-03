import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'refresh token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTGVoYSIsInN1YiI6IjViZTA0ZDFlLTNlYmItNGI1NC04OTE2LTVlMjlmZGNhYmMwNCIsImlhdCI6MTY3Nzc3ODkzMCwiZXhwIjoxNjc3ODY1MzMwfQ.PSVo_mDJPuea-XPS_I1rVjZ9Bcbf1dHHAk1r8kYYE7w',
  })
  refreshToken: string;
}
