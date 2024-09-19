import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway()
export class MessageGateway {
  @SubscribeMessage('send_message')
  handleEvent(@MessageBody() data: string): string {
    console.log(data);
    return data;
  }
}
