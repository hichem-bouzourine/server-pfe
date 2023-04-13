import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

/**
 * Check whether the connected user is an Artisan or not
 * - called right after AuthGuard
 * @returns `true` if user is Artisan, `false` else
 */
@Injectable()
export class ArtisanGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.user) return false;
    if (request.user.type === 'ARTISAN') return true;
  }
}
