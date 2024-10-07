import { Injectable } from "@nestjs/common";
import { randomBytes, scrypt, createCipheriv, createDecipheriv } from "crypto";
import { promisify } from "util";

@Injectable()
export class Crypt {
    async crypt(value: string) {
        const iv = randomBytes(16);
        const password = 'Password used to generate key';

        const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
        const cipher = createCipheriv('aes-256-ctr', key, iv);

        const textToEncrypt = value;
        const encryptedText = Buffer.concat([
            cipher.update(textToEncrypt),
            cipher.final(),
        ]);

        return encryptedText;
    }

    async decrypt(encryptedText: NodeJS.ArrayBufferView) {
        const iv = randomBytes(16);
        const password = 'Password used to generate key';

        const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
        const cipher = createCipheriv('aes-256-ctr', key, iv);

        const decipher = createDecipheriv('aes-256-ctr', key, iv);
        const decryptedText = Buffer.concat([
            decipher.update(encryptedText),
            decipher.final(),
        ]);

        return decryptedText;
    }
}