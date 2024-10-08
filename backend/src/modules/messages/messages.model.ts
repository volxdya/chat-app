import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Chat } from '../chat/chat.model';
import { User } from '../user/user.model';

interface IMessage {
  text: string;
}

@Table({ tableName: 'messages' })
export class Message extends Model<Message, IMessage> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  text: string;

  @ForeignKey(() => Chat)
  @Column({ type: DataType.INTEGER })
  chatId: number;

  @BelongsTo(() => Chat)
  chat: Chat;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
