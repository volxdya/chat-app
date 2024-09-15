import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/createUserDto';
import { User } from '../user/user.model';

@Injectable()
export class AuthService {
  // Инициализация зависимостей

  constructor(
    private readonly UserService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Функция, которая проверяет приходящий пароль и ХЭШ пароль
  private validatePassword(password: string, userPassword: string): boolean {
    return password === userPassword;
  }

  // Функция, которая проверяет пользователя
  private async validateUser(dto: CreateUserDto) {
    const user: User = await this.UserService.getOne(dto.username);

    if (user && (await this.validatePassword(dto.password, user.password))) {
      return user;
    }

    throw new UnauthorizedException({
      message: 'Некорректный email или пароль',
    });
  }

  // Функция, в которую мы попадаем, если все проверки были пройдены
  private async generateToken(user: User) {
    // payload - data which need return in auth

    const payload = {
      login: user.username,
      id: user.id,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async login(dto: CreateUserDto) {
    const user: User = await this.validateUser(dto);

    return this.generateToken(user);
  }

  async register(dto: CreateUserDto) {
    const user: User = await this.UserService.create(dto);

    return this.generateToken(user);
  }
}
