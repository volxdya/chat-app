import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Chat } from './chat.model';
import { User } from '../user/user.model';
import { UserChats } from './user-chats.model';
import { UserModule } from '../user/user.module';
import { Message } from '../messages/messages.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Chat, User, UserChats, Message]),
    UserModule,
  ],
  providers: [ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
