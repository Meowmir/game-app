import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { API_TOKEN_HEADER, IS_PROD } from './global.constants';
import { apiTokenSecret } from './secrets.init';

@Injectable()
export class AppGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { auth, headers } = request.handshake || request;
    
    return IS_PROD
      ? this.verifyApiToken(
          headers.referer,
          auth[API_TOKEN_HEADER] ||
            auth[API_TOKEN_HEADER.toUpperCase()] ||
            headers[API_TOKEN_HEADER] ||
            headers[API_TOKEN_HEADER.toUpperCase()],
        )
      : true;
  }

  private verifyApiToken(incomingOrigin: string, token?: string) {
    try {
      const payload: any = jwt.verify(token || '', apiTokenSecret);
    
      return new URL(incomingOrigin).host === payload.host;
    } catch (e) {
      return false;
    }
  }
}
