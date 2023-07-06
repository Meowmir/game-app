import { Game } from './schemas/game.schema';
import { ReadGameDTO, ReadPlayerDTO, ReadTileDTO } from './DTO/read-game.dto';
import { Player } from './schemas/player-schema';

export type Tile = { color: string; sessionId: string };

export function generateBoard(rows: number, cols: number): (Tile | null)[][] {
  return Array(rows)
    .fill(null)
    .map((_) => Array(cols).fill(null));
}

export function toReadGame(theGame: Game): ReadGameDTO {
  const playersById = new Map(
    theGame.players.map((p) => [p.sessionId, p.name]),
  );

  return new ReadGameDTO({
    state: theGame.state,
    gameId: theGame.gameId,
    turn: theGame.turn,
    players: theGame.players.map(
      (p) =>
        new ReadPlayerDTO({
          name: p.name,
        }),
    ),
    gameBoard: JSON.parse(theGame.gameBoard).map((row: any) =>
      row.map((tile: any) => {
        if (!tile) {
          return null;
        }
        return new ReadTileDTO({
          color: tile.color,
          playerName: playersById.get(tile.sessionId) || 'Unknown',
        });
      }),
    ),
  });
}

export function pickWinner(gameBoard: (Tile | null)[][]): string | undefined {
  //  now find any row containing 4 tiles in a row of the same color and sessionId
  const howManyInARow = 4;

  for (const row of gameBoard) {
    for (let rowI = 0; rowI <= row.length - howManyInARow; rowI++) {
      const currentTile = row[rowI];

      if (!currentTile) continue;

      const { color, sessionId } = currentTile;
      const nextTiles = row.slice(rowI + 1, rowI + howManyInARow);
      const isNextSame = nextTiles.every((next) => {
        return next?.color === color && next.sessionId === sessionId;
      });

      if (!isNextSame) continue;

      return sessionId;
    }
  }

  return undefined;
}

/// NEW FUNC CALLED PICK WINNER
// RECI GAMEBOARD
// OPTIONAL RETURN WINNING PLAYER OBJ
//
