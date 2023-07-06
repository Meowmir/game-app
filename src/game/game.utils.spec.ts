import * as assert from 'assert';
import { pickWinner, Tile } from './game.utils';
import * as fs from 'fs';
import * as path from 'path';
import { SERVER_FILE_ROOT } from '../global.constants';

function loadTestData(name: string): (Tile | null)[][] {
  const data = fs.readFileSync(
    path.join(SERVER_FILE_ROOT, `../fixtures/game-boards/${name}.json`),
    'utf-8',
  );
  return JSON.parse(data);
}

describe('pickWinner', () => {
  describe('correctly picks no winner', () => {
    it('should have no winner', () => {
      const gameBoard = loadTestData('no-winner');
      assert.strictEqual(pickWinner(gameBoard), undefined);
    });
  });

  describe('correctly picks a winner', () => {
    it('should have 4 tiles of same color in a row', () => {
      const gameBoard = loadTestData('4-in-a-row');
      assert.strictEqual(pickWinner(gameBoard), '1');
    });

    it('should have 4 tiles of the same color in a column', () => {
      const gameBoard = loadTestData('4-in-a-column');
      assert.strictEqual(pickWinner(gameBoard), 'A');
    });
    /*
    it('should have 4 tiles of the same color diagonally', () => {
      const gameBoard = loadTestData('4-in-a-row-diagonally');
      assert.strictEqual(pickWinner(gameBoard), 'B');
    });*/
  });

  describe('No false positives', () => {
    it('Does not declare a winner for too few horizontal tiles', () => {
      const gameBoard = loadTestData('4-in-a-row-incomplete');
      assert.strictEqual(pickWinner(gameBoard), undefined);
    });

    it('Does not declare a winner for too few vertical tiles', () => {
      const gameBoard = loadTestData('4-in-a-col-incomplete');
      assert.strictEqual(pickWinner(gameBoard), undefined);
    });
  });
});
