import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/createChatDto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Body() dto: CreateChatDto) {
    return this.chatService.create(dto);
  }

  @Get('get_one/:id')
  async getOne(@Param('id') id: number) {
    return this.chatService.getOne(id);
  }
}
