import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/createChatDto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('create')
  async create(@Body() dto: CreateChatDto) {
    return this.chatService.create(dto);
  }

  @Get('get_one/:id')
  getOne(@Param('id') id: number) {
    return this.chatService.getOne(id);
  }
}
