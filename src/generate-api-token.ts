import * as jwt from 'jsonwebtoken';
import { apiTokenSecret } from './secrets.init';

const [, , host] = process.argv;

if (!host) {
  throw new Error(`Host must be provided`);
}

const token = jwt.sign({ host }, apiTokenSecret, { algorithm: 'HS256' });

console.log(`Your token for host ${host} is:`);
console.log(token);
