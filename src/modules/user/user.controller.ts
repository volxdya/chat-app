import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUserDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get('get_one/:username')
  getOne(@Param('username') username: string) {
    return this.userService.getOne(username);
  }

  @Get('get_all')
  getAll() {
    return this.userService.getAll();
  }
}
