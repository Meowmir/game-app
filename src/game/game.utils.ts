import { CreateTileDto } from './DTO/create-game-board.dto';

export function generateBoard(
  rows: number,
  cols: number,
): (CreateTileDto | null)[][] {
  return Array(rows).map((_) => Array(cols).fill(null));
}
