import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from './user.model';

@Table({ tableName: 'user_friends' })
export class UserFriends extends Model<UserFriends> {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @BelongsTo(() => User, 'userId')
  user: User;

  @BelongsTo(() => User, 'friendId')
  friend: User;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  isConfirmed: boolean;
}