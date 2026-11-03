import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import Stack from '../src/class/stack';

describe('Stack', () => {
  it('starts empty', () => {
    const stack = new Stack<number>();
    assert.equal(stack.isEmpty(), true);
    assert.equal(stack.size(), 0);
    assert.equal(stack.peek(), undefined);
    assert.equal(stack.pop(), undefined);
  });

  it('pushes items and returns the pushed item', () => {
    const stack = new Stack<string>();
    assert.equal(stack.push('a'), 'a');
    assert.equal(stack.push('b'), 'b');
    assert.equal(stack.size(), 2);
    assert.equal(stack.isEmpty(), false);
  });

  it('works as LIFO', () => {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    stack.push(3);

    assert.equal(stack.peek(), 3);
    assert.equal(stack.pop(), 3);
    assert.equal(stack.pop(), 2);
    assert.deepEqual(stack.getArray(), [1]);
  });

  it('returns a copy of the internal array', () => {
    const stack = new Stack<number>();
    stack.push(1);
    const array = stack.getArray();
    array.push(2);

    assert.deepEqual(stack.getArray(), [1]);
  });

  it('clears all items', () => {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    stack.clear();

    assert.equal(stack.isEmpty(), true);
    assert.deepEqual(stack.getArray(), []);
  });
});
