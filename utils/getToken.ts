import { UnauthorizedException } from "@nestjs/common";
import { Request } from "express";

export function getToken(req: Request): string {
    const header: string = req.headers.authorization;
    const bearer: string = header.split(' ')[0];
    const token: string = header.split(' ')[1];

    if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'No token provided.' });
    }

    return token;
}