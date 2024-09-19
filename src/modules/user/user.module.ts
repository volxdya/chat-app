import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { Chat } from '../chat/chat.model';
import { UserChats } from '../chat/user-chats.model';
import { Message } from '../messages/messages.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Chat, UserChats, Message])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
