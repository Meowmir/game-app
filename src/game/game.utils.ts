type Tile = {color: string, player: string}
export function generateBoard(
  rows: number,
  cols: number,
): (Tile | null)[][] {
  return Array(rows).fill(null).map((_) => Array(cols).fill(null));
}
