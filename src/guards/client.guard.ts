import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

/**
 * Check whether the connected user is a client or not
 * - called right after AuthGuard
 * @returns `true` if user is CLIENT, `false` else
 */
@Injectable()
export class ClientGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.user) return false;
    if (request.user.type === 'CLIENT') return true;
  }
}
