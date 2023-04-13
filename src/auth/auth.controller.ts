import { BadRequestException, Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Request } from "express"

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body) {
    
    return await this.register(body)
  }

  @Post('login')
  async login(@Body() body) {
    const user = await this.authService.validateUser(body.username, body.password)

    if(!user){
      throw new BadRequestException("Invalid username/password")
    }

    return await this.authService.login(user)
  }

  @Get("me")
  @UseGuards(AuthGuard)
  async me(@Req() req: Request) {
    let auth_user = (req as any).user

    return this.authService.getUserProfile(auth_user)
  }
}
