import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { Chat } from '../chat/chat.model';
import { CreateUserDto } from './dto/createUserDto';
import { AddFriendDto } from './dto/addFriendDto';

@Injectable()
export class UserService {
  @InjectModel(User) private readonly userModel: typeof User;

  async create(dto: CreateUserDto) {
    return this.userModel.create(dto);
  }

  async getAll() {
    return this.userModel.findAll();
  }

  async getOne(username: string) {
    return this.userModel.findOne({
      where: { username },
      include: { all: true },
    });
  }

  async getById(userId: number) {
    return this.userModel.findOne({
      where: { id: userId },
      include: [Chat],
    });
  }

  async me(userId: number) {
    return this.getById(userId);
  }

  // пока что с багами, но это будет в фиксе
  async addFriend(dto: AddFriendDto) {
    const sender: User = await this.getById(dto.userId);
    const recipient: User = await this.getById(dto.recipientId);

    await sender.$add('friends', recipient);

    return [sender, recipient];
  }
}
