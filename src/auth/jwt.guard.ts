import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from './jwt.guard';

@Controller('protected')
export class ProtectedController {
  @Get()
  @UseGuards(JwtGuard)  // Protège cette route avec le JwtGuard
  getProtectedResource() {
    return { message: 'This is a protected resource' };
  }
}
