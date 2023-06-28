import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DbService } from './db.service';
import { Game } from './schemas/game.schema';
import { CreateGameDTO } from './DTO/create-game.dto';
import { AddPlayerMessageDTO, GetGameMessageDTO } from './DTO/messages.dto';
import { generateBoard } from './game.utils';
import { Player } from './schemas/player-schema';
import { CreatePlayerDTO } from './DTO/create-player.dto';

@Injectable()
export class GameService {
  constructor(private dbService: DbService) {}

  onEvent(message: any): Promise<Game> {
    console.log('Received data', message);

    switch (message.type) {
      case 'NEW_GAME':
        return this.newGame();
      case 'GET_GAME':
        return this.getGame(new GetGameMessageDTO(message));
      case 'ADD_PLAYER':
        return this.addPlayer(new AddPlayerMessageDTO(message));
      default:
        throw new BadRequestException('Invalid message type');
    }
  }

  private newGame(): Promise<Game> {
    const gameToStart = new CreateGameDTO({
      state: 'NEW_GAME',
      gameId: uuidv4(),
      turn: 0,
      gameBoard: JSON.stringify(generateBoard(12, 12)),
      players: [],
    });
    return this.dbService.create(gameToStart);
  }

  private async getGame({ gameId }: GetGameMessageDTO): Promise<Game> {
    const foundGame = await this.dbService.getGame(gameId);
    if (!foundGame) {
      throw new BadRequestException(`Invalid ID ${gameId}`);
    }
    return foundGame;
  }

  private async addPlayer(message: AddPlayerMessageDTO): Promise<Game> {
    // read game from DB

    // DESTRUCTURING
    // const { gameId , player: playerToAdd } = message
    const theGame = await this.dbService.getGame(message.gameId);
    if (!theGame) {
      throw new BadRequestException(`Invalid ID ${message.gameId}`);
    }

    // check if player can be added
    const players = theGame.players;
    if (players.length > 1) {
      throw new BadRequestException(
        `Game ${message.gameId} already has enough players.`,
      );
    }
    // add player to game
    const updatedPlayers = players.concat(message.player);

    // save game
    // return saved game
    return this.dbService.updateGame(message.gameId, {
      players: updatedPlayers,
    });
  }
}
