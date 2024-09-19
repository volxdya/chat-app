import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './messages.model';
import { CreateMessageDto } from './dto/CreateMessageDto';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message) private messagesModel: typeof Message) {}

  async create(dto: CreateMessageDto) {
    return this.messagesModel.create(dto);
  }

  async getAll() {
    return this.messagesModel.findAll({ include: { all: true } });
  }
}
