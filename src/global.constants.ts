export const SERVER_FILE_ROOT = __dirname;
export const API_TOKEN_HEADER = 'x-api-token';

export const IS_PROD = process.env.NODE_ENV === 'production';
export const SERVER_PORT = IS_PROD ? 80 : 3001;
