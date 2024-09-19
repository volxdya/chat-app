import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/CreateMessageDto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('create')
  create(@Body() dto: CreateMessageDto) {
    return this.messagesService.create(dto);
  }

  @Get('get_all')
  getAll() {
    return this.messagesService.getAll();
  }
}
