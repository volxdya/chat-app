import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from './messages.model';
import { Chat } from '../chat/chat.model';

@Module({
  imports: [SequelizeModule.forFeature([Message, Chat])],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
