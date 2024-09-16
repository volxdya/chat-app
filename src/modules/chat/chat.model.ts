import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../user/user.model';
import { UserChats } from './user-chats.model';

interface IChat {}

@Table({ tableName: 'chat' })
export class Chat extends Model<Chat, IChat> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @BelongsToMany(() => User, () => UserChats)
  users: User[];
}
