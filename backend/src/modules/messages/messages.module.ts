import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from './messages.model';
import { Chat } from '../chat/chat.model';
import { MessageGateway } from './message.gateway';
import { User } from '../user/user.model';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONFIG } from 'cfg/jwt.config';
import { Crypt } from 'utils/crypt';

@Module({
  imports: [
    SequelizeModule.forFeature([Message, Chat, User]),
    JwtModule.register(JWT_CONFIG)
  ],
  controllers: [MessagesController],
  providers: [MessagesService, MessageGateway, Crypt],
  exports: [Crypt]
})
export class MessagesModule { }
