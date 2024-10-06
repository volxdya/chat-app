import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './messages.model';
import { CreateMessageDto } from './dto/createMessageDto';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';


@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message) private messagesModel: typeof Message) { }


  // TODO: Перенести эти два метода в отдельный класс и инжектить его
  private async crypt(value: string) {
    const iv = randomBytes(16);
    const password = 'Password used to generate key';

    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);

    const textToEncrypt = value;
    const encryptedText = Buffer.concat([
      cipher.update(textToEncrypt),
      cipher.final(),
    ]);

    return encryptedText;
  }

  private async descrypt(encryptedText: NodeJS.ArrayBufferView) {
    const iv = randomBytes(16);
    const password = 'Password used to generate key';

    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);

    const decipher = createDecipheriv('aes-256-ctr', key, iv);
    const decryptedText = Buffer.concat([
      decipher.update(encryptedText),
      decipher.final(),
    ]);

    return decryptedText;
  }

  async create(dto: CreateMessageDto) {
    const message: Message = await this.messagesModel.create(dto);

    // Шифрование, пока не записывается в БД
    const encryptedText = await this.crypt(message.text);
    const decryptedText = await this.descrypt(encryptedText);

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
