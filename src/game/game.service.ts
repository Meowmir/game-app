import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DbService } from './db.service';
import { CreateGameDTO } from './DTO/create-game.dto';
import {
  AddPlayerMessageDTO,
  GetGameMessageDTO,
  PlaceTileMessageDTO,
} from './DTO/messages.dto';
import { generateBoard, toReadGame } from './game.utils';
import { ReadGameDTO } from './DTO/read-game.dto';

const MAX_PLAYERS = 2;

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
      case 'RESET_GAME':
        return this.resetGame(message);
      default:
        throw new BadRequestException('Invalid message type');
    }
  }

  private async newGame(): Promise<ReadGameDTO> {
    const gameToStart = new CreateGameDTO({
      state: 'NOT_STARTED',
      gameId: uuidv4(),
      turn: Math.round(Math.random()),
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

    const [{ sessionId = '' } = {}] = theGame.players;
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
      state: updatedPlayers.length === MAX_PLAYERS ? 'STARTED' : theGame.state,
    });

    return this.getGame(message.gameId);
  }

  private async placeTile(message: PlaceTileMessageDTO): Promise<ReadGameDTO> {
    const theGame = await this.dbService.getGame(message.gameId);
    const { state, players, turn, gameBoard } = theGame;
    const { placeableTiles } = players[turn];
    const { row, column, color, gameId, sessionId } = message;

    if (state !== 'STARTED') {
      throw new BadRequestException('Not enough players.');
    }

    if (
      turn !== players.findIndex((player) => player.sessionId === sessionId)
    ) {
      throw new BadRequestException('Not your turn!');
    }

    const theGameBoardToArray = JSON.parse(gameBoard);

    if (row < 0 || column < 0) {
      throw new BadRequestException(
        `Row ${row}, column ${column} coordinates not valid.`,
      );
    }

    if (theGameBoardToArray[row][column]) {
      throw new BadRequestException(
        `Tile on row ${row}, column ${column} is not empty.`,
      );
    }

    // check if color exists in placeable array
    // throw error if not
    if (!placeableTiles.includes(color)) {
      throw new BadRequestException(
        'Color already placed. Pick another color.',
      );
    }

    // remove color from placeableTiles
    if (placeableTiles.includes(color)) {
      placeableTiles.splice(placeableTiles.indexOf(color), 1);
    }

    const updatedPlaceableTiles =
      placeableTiles.length > 0
        ? placeableTiles.filter((t) => t !== color)
        : ['RED', 'GREEN', 'BLUE', 'YELLOW'];

    const updatedPlayers = players.map((p, i) =>
      i === turn ? { ...p, placeableTiles: updatedPlaceableTiles } : p,
    );

    // place tile
    theGameBoardToArray.at(row).splice(column, 1, { color, sessionId });

    const updatedBoardGame = JSON.stringify(theGameBoardToArray);

    await this.dbService.updateGame(gameId, {
      gameBoard: updatedBoardGame,
      turn: theGame.turn === 0 ? 1 : 0,
      players: updatedPlayers,
    });

    return this.getGame(message.gameId);
  }

  private async resetGame(message: any) {
    if (message.gameId.state === 'GAME_OVER') {
      await this.dbService.updateGame(message.gameId, {
        gameBoard: JSON.stringify(generateBoard(12, 12)),
      });
    } else {
      throw new BadRequestException('Game is not over yet.');
    }
    return this.getGame(message.gameId);
  }
}
