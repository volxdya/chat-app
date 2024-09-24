import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUserDto';
import { CheckUserGuard } from 'src/guards/check-user.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { AddFriendDto } from './dto/addFriendDto';

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

  @UseGuards(CheckUserGuard, AuthGuard)
  @Get('me/:userId')
  me(@Param('userId') userId: number) {
    return this.userService.me(userId);
  }

  @Get('get_all')
  getAll() {
    return this.userService.getAll();
  }

  @UseGuards(CheckUserGuard, AuthGuard)
  @Put('add_friend')
  addFriend(@Body() dto: AddFriendDto){
    return this.userService.addFriend(dto);
  }
}
