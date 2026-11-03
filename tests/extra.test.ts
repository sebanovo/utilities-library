import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import Extra from '../src/class/extra/Extra';

describe('Extra', () => {
  it('returns an empty triangle for n = 0', () => {
    assert.deepEqual(Extra.pascalsTriangle(0), []);
  });

  it('returns the first row for n = 1', () => {
    assert.deepEqual(Extra.pascalsTriangle(1), [[1]]);
  });

  it('returns the first two rows for n = 2', () => {
    assert.deepEqual(Extra.pascalsTriangle(2), [[1], [1, 1]]);
  });

  it('builds Pascal triangle rows', () => {
    assert.deepEqual(Extra.pascalsTriangle(6), [
      [1],
      [1, 1],
      [1, 2, 1],
      [1, 3, 3, 1],
      [1, 4, 6, 4, 1],
      [1, 5, 10, 10, 5, 1],
    ]);
  });

  it('throws for negative sizes', () => {
    assert.throws(() => Extra.pascalsTriangle(-1), /menor a cero/);
  });
});
