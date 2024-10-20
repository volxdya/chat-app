import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { getToken } from 'utils/getToken';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest();

        try {
            getToken(request);
            return true;
        }

        catch (err) {
            throw new HttpException('ITERNAL SERVER ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
