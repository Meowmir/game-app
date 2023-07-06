import { Game } from './schemas/game.schema';
import { ReadGameDTO, ReadPlayerDTO, ReadTileDTO } from './DTO/read-game.dto';

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

export function pickWinner(gameBoard: (Tile | null)[][]): string | null {
  return null;
}

/// NEW FUNC CALLED PICK WINNER
// RECI GAMEBOARD
// OPTIONAL RETURN WINNING PLAYER OBJ
//
