import * as fs from 'fs';
import * as path from 'path';

interface Secrets {
  dbUri: string;
  dbName: string;
  dbUser: string;
  dbPass: string;
}

/**
 * Load secrets from properties file
 * @return {Secrets}    All secrets, keyed by everything up to the first "=", but preserving all "=" after
 */
function loadSecrets(): Secrets {
  const properties = fs.readFileSync(
    path.join(__dirname, '../secrets.properties'),
    'utf8',
  );

  return properties
    .split('\n')
    .filter(Boolean)
    .map((l) => l.split('='))
    .map(([key, ...rest]) => [key, rest.join('=')])
    .reduce((agg, [key, val]) => ({ ...agg, [key]: val }), {}) as Secrets;
}

export const { dbUri, dbName, dbPass, dbUser } = loadSecrets();
