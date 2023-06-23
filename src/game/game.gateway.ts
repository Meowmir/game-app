import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import { GameService } from './game.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GameGateway {
  constructor(private gameService: GameService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('game')
  async onEvent(@MessageBody() data: number): Promise<WsResponse<string>> {
    return this.gameService
      .onEvent(data)
      .then((response) => ({ event: 'game', data: response }));
  }
}
