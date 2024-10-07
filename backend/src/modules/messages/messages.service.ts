import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './messages.model';
import { CreateMessageDto } from './dto/createMessageDto';
import { Crypt } from 'utils/crypt';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message) private messagesModel: typeof Message,
    private crypt: Crypt
  ) { }


  async create(dto: CreateMessageDto) {
    const message: Message = await this.messagesModel.create(dto);

    // Шифрование, пока не записывается в БД
    const encryptedText = await this.crypt.crypt(message.text);
    const decryptedText = await this.crypt.decrypt(encryptedText);

    return decryptedText;
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
