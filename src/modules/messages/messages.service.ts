import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './messages.model';
import { CreateMessageDto } from './dto/createMessageDto';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message) private messagesModel: typeof Message) { }

  async create(dto: CreateMessageDto) {
    return this.messagesModel.create(dto);
  }

  async getAll() {
    return this.messagesModel.findAll({ include: { all: true } });
  }

  // Отдаем последние три созданных сообщения, запрос нужен для прогузки первых 3 сообщений, дальше по сокетам 
  async getLastMessages(chatId: number) {
    const messages: Message[] = await this.messagesModel.findAll(
      {
        limit: 2,
        order: ['createdAt'],
        offset: (await this.messagesModel.count()) - 3,
        where: { chatId }
      }
    );

    return messages;
  }
}
