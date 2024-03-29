import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OnModuleInit, UseGuards } from '@nestjs/common';

import { GameService } from './game.service';
import { MessageDTO } from './DTO/messages.dto';
import { GameErrorDTO, ReadGameDTO } from './DTO/read-game.dto';
import { AppGuard } from '../app.guard';

@UseGuards(AppGuard)
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GameGateway implements OnModuleInit {
  constructor(private gameService: GameService) {}

  @WebSocketServer()
  server: Server;

  onModuleInit(): any {
    this.gameService.addWatcher((game) => {
      this.server.emit(`game/${game.gameId}`, game);
    });
  }

  @SubscribeMessage('game')
  //CHANGE DATA: ANY TO DATA: SCHEMA OR OTHER TYPE DESCRIPTION
  async onMessage(
    @MessageBody() message: any,
  ): Promise<ReadGameDTO | GameErrorDTO> {
    return this.gameService
      .onEvent(new MessageDTO(message))
      .catch((err) => new GameErrorDTO({ error: err.message }));
  }
}
