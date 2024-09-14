import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    async get() {
        return ['qwe', 'jack'];
    }
}
