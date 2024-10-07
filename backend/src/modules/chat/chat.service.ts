import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chat } from './chat.model';
import { CreateChatDto } from './dto/createChatDto';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat) private readonly chatModel: typeof Chat,
    private readonly userService: UserService,
  ) { }

  async create(dto: CreateChatDto) {
    const users: User[] = [
      await this.userService.getOne(dto.firstUser),
      await this.userService.getOne(dto.secondUser),
    ];

    const chat: Chat = await this.chatModel.create(dto);
    chat.users = users;
    await chat.$set('users', users);

    return chat;
  }

  async getOne(chatId: number) {
    return this.chatModel.findOne({
      include: { all: true },
      where: { id: chatId },
    });
  }
}
