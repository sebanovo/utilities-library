import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import Queue from '../src/class/queue';

describe('Queue', () => {
  it('starts empty', () => {
    const queue = new Queue<number>();
    assert.equal(queue.isEmpty(), true);
    assert.equal(queue.size(), 0);
    assert.equal(queue.peek(), undefined);
    assert.equal(queue.poll(), undefined);
  });

  it('adds items and returns true', () => {
    const queue = new Queue<string>();
    assert.equal(queue.add('a'), true);
    assert.equal(queue.add('b'), true);
    assert.equal(queue.size(), 2);
    assert.equal(queue.isEmpty(), false);
  });

  it('works as FIFO', () => {
    const queue = new Queue<number>();
    queue.add(1);
    queue.add(2);
    queue.add(3);

    assert.equal(queue.peek(), 1);
    assert.equal(queue.poll(), 1);
    assert.equal(queue.poll(), 2);
    assert.deepEqual(queue.getArray(), [3]);
  });

  it('returns a copy of the internal array', () => {
    const queue = new Queue<number>();
    queue.add(1);
    const array = queue.getArray();
    array.push(2);

    assert.deepEqual(queue.getArray(), [1]);
  });

  it('clears all items', () => {
    const queue = new Queue<number>();
    queue.add(1);
    queue.add(2);
    queue.clear();

    assert.equal(queue.isEmpty(), true);
    assert.deepEqual(queue.getArray(), []);
  });
});
