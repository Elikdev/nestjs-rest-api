import { BadRequestException, Body, Controller, Get, Post, Req, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Request } from "express"
import { TransformInterceptor } from "../shared/interceptors/transform.interceptors"
import { registerUser } from './Dto/registerUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(new TransformInterceptor("register request successful"))
  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() body: registerUser) {
    
    return await this.authService.registerUser(body)
  }

  @UseInterceptors(new TransformInterceptor("login request successful"))
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
