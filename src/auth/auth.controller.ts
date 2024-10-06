import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { ResponseInterceptor } from '../common/interceptors/response.interceptor';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(ResponseInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService){}

  @Post('register')
  async register(@Body() registerDto: RegisterDto){
    return this.authService.registerUser(registerDto);
  }  

  @Get('users')
  async findAllUsers(){
    return this.authService.findAllUser();
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto){
    return this.authService.loginUser(loginDto);
  }
}
