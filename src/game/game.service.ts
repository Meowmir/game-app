import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DbService } from './db.service';
import { Game } from './schemas/game.schema';
import { CreateGameDTO } from './DTO/create-game.dto';
import { CreateGameBoardDTO } from './DTO/create-game-board.dto';
import { AddPlayerMessageDTO } from './DTO/messages.dto';
import { generateBoard } from './game.utils';
import { Model } from 'mongoose';

@Injectable()
export class GameService {
  constructor(private dbService: DbService) {}

  onEvent(message: any): Promise<Game> {
    console.log('Received data', message);

    switch (message.type) {
      case 'NEW_GAME':
        return this.newGame();
      case 'GET_GAME':
        return this.getGame('649ab79b0dd571b3b2c4904a');
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
      gameBoard: new CreateGameBoardDTO({
        gameBoard: generateBoard(16, 16),
      }),
      players: [],
    });
    return this.dbService.create(gameToStart);
  }

  private async getGame(gameId: string): Promise<Game> {
    const foundGame = await this.dbService.getGame(gameId);
    if (!foundGame) {
      throw new BadRequestException(`Invalid ID ${gameId}`);
    }
    return foundGame;
  }

  private addPlayer(message: AddPlayerMessageDTO): Promise<Game> {
    // read game from DB
    // check if player can be added
    // check if player is unique
    // add player to game
    // save game
    // return saved game

    return Promise.resolve<any>(null);
  }
}