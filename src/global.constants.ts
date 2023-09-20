import { join } from 'path';
import * as path from 'path';

export const SERVER_FILE_ROOT = __dirname;
export const API_TOKEN_HEADER = 'x-api-token';

export const IS_PROD = process.env.NODE_ENV === 'production';
export const SERVER_PORT = IS_PROD ? 80 : 3001;

export const CLIENT_ROOT_DIR = path.join(
  __dirname,
  '../../color-fours-game/build',
);

export const DEFAULT_PLACEABLE_TILES = ['BLUE', 'GREEN', 'ORANGE', 'PINK'];
