import { Game } from './schemas/game.schema';
import { ReadGameDTO, ReadPlayerDTO, ReadTileDTO } from './DTO/read-game.dto';
import { Player } from './schemas/player-schema';

export type Tile = { color: string; sessionId: string };

export function generateBoard(rows: number, cols: number): (Tile | null)[][] {
  return Array(rows)
    .fill(null)
    .map((_) => Array(cols).fill(null));
}

export function toReadGame(theGame: Game, sessionId?: string): ReadGameDTO {
  const playersById = new Map(
    theGame.players.map((p) => [p.sessionId, p.name]),
  );
  const winningId = pickWinner(JSON.parse(theGame.gameBoard));

  return new ReadGameDTO({
    winner: winningId ? (theGame.turn === 0 ? 'P2' : 'P1') : undefined,
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
          isP1:
            theGame.players.findIndex(
              (player) => player.sessionId === tile.sessionId,
            ) === 0,
        });
      }),
    ),
    isP1:
      sessionId && theGame.players[0]?.sessionId === sessionId
        ? true
        : undefined,
  });
}

export function pickWinner(gameBoard: (Tile | null)[][]): string | undefined {
  //  now find any row containing 4 tiles in a row of the same color and sessionId
  const howManyInARow = 4;

  // Check for horizontal winner.
  for (const row of gameBoard) {
    for (let colI = 0; colI <= row.length - howManyInARow; colI++) {
      const currentTile = row[colI];

      if (!currentTile) continue;

      const { color, sessionId } = currentTile;
      const nextTiles = row.slice(colI + 1, colI + howManyInARow);
      const isNextSame = nextTiles.every((next) => {
        return next?.color === color && next.sessionId === sessionId;
      });

      if (!isNextSame) continue;

      return sessionId;
    }
  }

  // Check for vertical winner.
  for (let rowI = 0; rowI <= gameBoard.length - howManyInARow; rowI++) {
    const currentRow = gameBoard[rowI];
    for (let colI = 0; colI < currentRow.length; colI++) {
      const currentTile = currentRow[colI];

      if (!currentTile) continue;

      const { color, sessionId } = currentTile;
      const nextTiles = gameBoard
        // Next rows
        .slice(rowI + 1, rowI + howManyInARow)
        //
        .map((row) => {
          return row[colI];
        });

      // Checking if all tiles in the new array has the same color and sessionId.
      const isNextSame = nextTiles.every((next) => {
        return next?.color === color && next.sessionId === sessionId;
      });

      if (!isNextSame) continue;

      return sessionId;
    }
  }
  // Check for diagonal right down winner.
  for (let rowI = 0; rowI <= gameBoard.length - howManyInARow; rowI++) {
    const currentRow = gameBoard[rowI];
    for (let colI = 0; colI <= currentRow.length - howManyInARow; colI++) {
      const currentTile = currentRow[colI];

      if (!currentTile) continue;

      const { color, sessionId } = currentTile;
      const nextTiles = gameBoard
        .slice(rowI + 1, rowI + howManyInARow)
        .map((row, nextRowsI) => {
          return row[colI + nextRowsI + 1];
        });

      // Checking if all tiles in the new array has the same color and sessionId.
      const isNextSame = nextTiles.every((next) => {
        return next?.color === color && next.sessionId === sessionId;
      });

      if (!isNextSame) continue;

      return sessionId;
    }
  }

  // Check for diagonal left down winner.
  for (let rowI = 0; rowI <= gameBoard.length - howManyInARow; rowI++) {
    const currentRow = gameBoard[rowI];
    for (let colI = howManyInARow - 1; colI < currentRow.length; colI++) {
      const currentTile = currentRow[colI];

      if (!currentTile) continue;

      const { color, sessionId } = currentTile;
      const nextTiles = gameBoard
        .slice(rowI + 1, rowI + howManyInARow)
        .map((row, nextRowsI) => {
          return row[colI - nextRowsI - 1];
        });

      // Checking if all tiles in the new array has the same color and sessionId.
      const isNextSame = nextTiles.every((next) => {
        return next?.color === color && next.sessionId === sessionId;
      });

      if (!isNextSame) continue;

      return sessionId;
    }
  }

  return undefined;
}
