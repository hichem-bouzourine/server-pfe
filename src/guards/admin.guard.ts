import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

/**
 * Admin Guard to check whether the connected user is an admin or not
 * - called right after AuthGuard
 * @returns `true` if user is ADMIN, `false` else
 */
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.user) return false;
    if (request.user.type === 'ADMIN') return true;
  }
}
