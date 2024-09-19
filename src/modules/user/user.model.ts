import {BelongsToMany, Column, DataType, HasMany, Model, Table} from 'sequelize-typescript';
import {UserChats} from "../chat/user-chats.model";
import {Chat} from "../chat/chat.model";
import { Message } from '../messages/messages.model';

interface IUser {
  username: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, IUser> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  username: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @BelongsToMany(() => Chat, () => UserChats)
  chats: Chat[];

  @HasMany(() => Message)
  messages: Message[]
}
