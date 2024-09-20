import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, retry } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { getToken } from 'utils/getToken';

@Injectable()
export class CheckUserGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest();

        try {
            const user = this.jwtService.verify(getToken(request));

            if (request.params.userId == user.id) {
                return true;
            }

            throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
        }

        catch (err) {
            console.log(err)
            throw new HttpException('ITERNAL SERVER ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
