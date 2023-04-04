import { createParamDecorator, ExecutionContext } from '@nestjs/common';
/**
 * Param Decorator that requires the `AuthGuard('jwt)` in the route
 * @returns `user` object or any specified property in `data`
 */
export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (data) return request.user[data];
    return request.user;
  },
);
