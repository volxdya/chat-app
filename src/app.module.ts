import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { DB_CONFIG } from '../cfg/db.config';
import { AuthModule } from './modules/auth/auth.module';
import { ChatModule } from './modules/chat/chat.module';
import { MessagesModule } from './modules/messages/messages.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONFIG } from 'cfg/jwt.config';
import { FriendsModule } from './modules/friends/friends.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot(DB_CONFIG),
    JwtModule.register(JWT_CONFIG),
    UserModule,
    AuthModule,
    ChatModule,
    MessagesModule,
    FriendsModule,
  ],
})
export class AppModule {}
