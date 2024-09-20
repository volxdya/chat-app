import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/CreateUserDto';
import { Chat } from '../chat/chat.model';

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
    return this.userModel.findOne(
      {
        where: { username },
        include: [Chat]
      }
    );
  }

  async getById(userId: number) {
    return this.userModel.findOne(
      {
        where: { id: userId },
        include: [Chat]
      }
    );
  }

  async me(userId: number) {
    return this.getById(userId);
  }
}
