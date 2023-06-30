import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DbService } from './db.service';
import { Game } from './schemas/game.schema';
import { CreateGameDTO } from './DTO/create-game.dto';
import {
  AddPlayerMessageDTO,
  GetGameMessageDTO,
  PlaceTileMessageDTO,
} from './DTO/messages.dto';
import { generateBoard, toReadGame } from './game.utils';
import { ReadGameDTO, ReadPlayerDTO, ReadTileDTO } from './DTO/read-game.dto';

@Injectable()
export class GameService {
  constructor(private dbService: DbService) {}

  onEvent(message: any): Promise<ReadGameDTO> {
    console.log('Received data', message);

    switch (message.type) {
      case 'NEW_GAME':
        return this.newGame();
      case 'GET_GAME':
        return this.getGame(new GetGameMessageDTO(message).gameId);
      case 'ADD_PLAYER':
        return this.addPlayer(new AddPlayerMessageDTO(message));
      case 'PLACE_TILE':
        return this.placeTile(new PlaceTileMessageDTO(message));
      default:
        throw new BadRequestException('Invalid message type');
    }
  }

  private async newGame(): Promise<ReadGameDTO> {
    const gameToStart = new CreateGameDTO({
      state: 'NEW_GAME',
      gameId: uuidv4(),
      turn: 0,
      gameBoard: JSON.stringify(generateBoard(12, 12)),
      players: [],
    });
    await this.dbService.create(gameToStart);

    return this.getGame(gameToStart.gameId);
  }

  private async getGame(gameId: string): Promise<ReadGameDTO> {
    return this.dbService.getGame(gameId).then(toReadGame);
  }

  private async addPlayer(message: AddPlayerMessageDTO): Promise<ReadGameDTO> {
    const theGame = await this.dbService.getGame(message.gameId);

    const [{ sessionId }] = theGame.players;
    const {
      player: { sessionId: newSessionId },
      gameId,
    } = message;

    if (newSessionId === sessionId) {
      throw new BadRequestException(`Player already exist.`);
    }

    if (theGame.players.length > 1) {
      throw new BadRequestException(
        `Game ${gameId} already has enough players.`,
      );
    }

    const updatedPlayers = theGame.players.concat(message.player);

    await this.dbService.updateGame(gameId, {
      players: updatedPlayers,
    });

    return this.getGame(message.gameId);
  }

  private async placeTile(message: PlaceTileMessageDTO): Promise<ReadGameDTO> {
    const theGame = await this.dbService.getGame(message.gameId);

    return this.getGame(message.gameId);
  }
}
