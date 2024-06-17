import { HttpStatus } from '@nestjs/common';

export type ErrorDomain = 'generic' | 'auth' | 'user';

export class BusinessException extends Error {
    public readonly timestamp: Date;
    public readonly path: string;

    constructor(
        public readonly domain: ErrorDomain,
        public readonly message: string,
        public readonly status: HttpStatus,
    ) {
        super(message);
        this.timestamp = new Date();
    }
}
