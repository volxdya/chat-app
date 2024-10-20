import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/createMessageDto';

@WebSocketGateway()
export class MessageGateway {
  constructor(private readonly messagesService: MessagesService) { }

  @SubscribeMessage('send_message')
  async handleEvent(@MessageBody() dto: CreateMessageDto) {
    const message = await this.messagesService.create(dto);
    return message;
  }
}
