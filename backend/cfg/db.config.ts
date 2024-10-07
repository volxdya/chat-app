import { SequelizeModuleOptions } from '@nestjs/sequelize';
import * as dotenv from 'dotenv';
import { User } from '../src/modules/user/user.model';
import { Chat } from '../src/modules/chat/chat.model';
import { UserChats } from '../src/modules/chat/user-chats.model';
import { Message } from '../src/modules/messages/messages.model';
import { UserFriends } from '../src/modules/user/user-friends.model';

dotenv.config();

export const DB_CONFIG: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  autoLoadModels: true,
  models: [User, Chat, UserChats, Message, UserFriends],
};
