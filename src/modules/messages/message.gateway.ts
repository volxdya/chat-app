import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/CreateMessageDto';
import { Message } from './messages.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';

@WebSocketGateway()
export class MessageGateway {
  constructor(private readonly messagesService: MessagesService) { }

  @UseGuards(AuthGuard)
  @SubscribeMessage('send_message')
  async handleEvent(@MessageBody() dto: CreateMessageDto): Promise<Message> {
    const message: Message = await this.messagesService.create(dto);
    return message;
  }
}
