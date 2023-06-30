import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { GameService } from './game.service';
import { Game } from './schemas/game.schema';
import { MessageDTO } from './DTO/messages.dto';
import { ReadGameDTO } from './DTO/read-game.dto';

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
  //CHANGE DATA: ANY TO DATA: SCHEMA OR OTHER TYPE DESCRIPTION
  async onMessage(
    @MessageBody() message: any,
  ): Promise<WsResponse<ReadGameDTO>> {
    return this.gameService
      .onEvent(new MessageDTO(message))
      .then((response) => ({ event: 'game', data: response }));
  }
}
