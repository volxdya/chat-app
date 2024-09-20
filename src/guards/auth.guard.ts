import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest();

        try {
            const header = request.headers.authorization;
            const bearer: string = header.split(' ')[0];
            const token: string = header.split(' ')[1];

            if (bearer != "Bearer" || !token) {
                throw new UnauthorizedException("Не авторизан");
            }

            return true;
        }

        catch (err) {
            throw new HttpException('ITERNAL SERVER ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
