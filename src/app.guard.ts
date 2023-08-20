import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { API_TOKEN_HEADER } from './global.constants';
import { apiTokenSecret } from './secrets.init';

@Injectable()
export class AppGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { headers } = request.handshake || request;

    return this.verifyApiToken(headers.host, headers[API_TOKEN_HEADER]);
  }

  private verifyApiToken(incomingHost: string, token?: string) {
    try {
      const payload: any = jwt.verify(token || '', apiTokenSecret);

      return incomingHost === payload.host;
    } catch (e) {
      return false;
    }
  }
}
