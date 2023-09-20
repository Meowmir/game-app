import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DbService } from './db.service';
import { CreateGameDTO } from './DTO/create-game.dto';
import {
  AddPlayerMessageDTO,
  GetGameMessageDTO,
  NewGameMessageDTO,
  PlaceTileMessageDTO,
} from './DTO/messages.dto';
import { generateBoard, pickWinner, toReadGame } from './game.utils';
import { ReadGameDTO } from './DTO/read-game.dto';
import { DEFAULT_PLACEABLE_TILES } from '../global.constants';

const MAX_PLAYERS = 2;
type GameWatcher = (game: ReadGameDTO) => void;

@Injectable()
export class GameService {
  constructor(private dbService: DbService) {}

  onEvent(message: any): Promise<ReadGameDTO> {
    console.log('Received data', message);

    switch (message.type) {
      case 'NEW_GAME':
        return this.newGame(new NewGameMessageDTO(message));
      case 'GET_GAME':
        return this.getGame(new GetGameMessageDTO(message));
      case 'ADD_PLAYER':
        return this.addPlayer(new AddPlayerMessageDTO(message));
      case 'PLACE_TILE':
        return this.placeTile(new PlaceTileMessageDTO(message));
      default:
        throw new BadRequestException('Invalid message type');
    }
  }

  private async newGame(message: NewGameMessageDTO): Promise<ReadGameDTO> {
    const { player } = message;

    const gameToStart = new CreateGameDTO({
      state: 'NOT_STARTED',
      gameId: uuidv4(),
      turn: Math.round(Math.random()),
      gameBoard: JSON.stringify(generateBoard(12, 12)),
      players: [player],
    });
    await this.dbService.create(gameToStart);

    return this.getGame(gameToStart);
  }

  private async getGame({
    gameId,
    sessionId,
  }: {
    gameId: string;
    sessionId?: string;
  }): Promise<ReadGameDTO> {
    return this.dbService.getGame(gameId).then((g) => toReadGame(g, sessionId));
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

    return this.getGame(message);
  }

  private async placeTile(message: PlaceTileMessageDTO): Promise<ReadGameDTO> {
    const theGame = await this.dbService.getGame(message.gameId);
    const { state, players, turn, gameBoard } = theGame;
    const { row, column, color, gameId, sessionId } = message;
    const colorToUpper = color.toUpperCase();
    const { placeableTiles = DEFAULT_PLACEABLE_TILES } = players[turn];

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
    if (!placeableTiles.includes(colorToUpper)) {
      throw new BadRequestException(
        'Color already placed. Pick another color.',
      );
    }

    // remove color from placeableTiles
    const updatedPlaceableTiles =
      placeableTiles.length > 0
        ? placeableTiles.filter((t) => t !== colorToUpper)
        : DEFAULT_PLACEABLE_TILES;

    const updatedPlayers = players.map((p, i) =>
      i === turn ? { ...p, placeableTiles: updatedPlaceableTiles } : p,
    );

    // place tile
    theGameBoardToArray
      .at(row)
      .splice(column, 1, { color: colorToUpper, sessionId });

    const updatedBoardGame = JSON.stringify(theGameBoardToArray);

    const winningId: string | undefined = pickWinner(theGameBoardToArray);
    const winner = theGame.players.find(
      (p) => winningId && p.sessionId === winningId,
    );

    const isFull = theGameBoardToArray.every((row: any) => row.every(Boolean));

    await this.dbService.updateGame(gameId, {
      winner,
      state: winner || isFull ? 'GAME_OVER' : theGame.state,
      gameBoard: updatedBoardGame,
      turn: theGame.turn === 0 ? 1 : 0,
      players: updatedPlayers,
    });

    return this.getGame(message);
  }

  public addWatcher(watcher: GameWatcher) {
    this.dbService.addWatcher(async (game) => {
      const theGame = await this.getGame(game);
      watcher(theGame);
    });
  }
}
