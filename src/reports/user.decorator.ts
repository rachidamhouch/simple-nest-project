import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

export const User = createParamDecorator((data: unknown, c: ExecutionContext) => {
    const req = c.switchToHttp().getRequest();
    return req.user;;
})