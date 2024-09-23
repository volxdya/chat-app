import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/createMessageDto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get('get_all')
  getAll() {
    return this.messagesService.getAll();
  }
}
