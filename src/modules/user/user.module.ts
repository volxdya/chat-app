import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { Chat } from '../chat/chat.model';
import { UserChats } from '../chat/user-chats.model';
import { Message } from '../messages/messages.model';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONFIG } from 'cfg/jwt.config';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Chat, UserChats, Message]),
    JwtModule.register(JWT_CONFIG),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule { }
