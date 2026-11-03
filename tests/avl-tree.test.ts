import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import AVLTree from '../src/class/avltree/avl.tree';
import AVLTreeNode from '../src/class/avltree/avl.node';
import { data } from './helpers';

function treeWith(keys: number[]): AVLTree<string> {
  const tree = new AVLTree<string>();
  for (const key of keys) {
    tree.insert(data(key));
  }
  return tree;
}

function treeWithR(keys: number[]): AVLTree<string> {
  const tree = new AVLTree<string>();
  for (const key of keys) {
    tree.insertR(data(key));
  }
  return tree;
}

function keys(values: Array<{ key: number }>): number[] {
  return values.map((value) => value.key);
}

describe('AVLTreeNode', () => {
  it('behaves like a binary search tree node', () => {
    const node = new AVLTreeNode(data(10, 'ten'));

    assert.deepEqual(node.getData(), { key: 10, value: 'ten' });
    assert.equal(node.isLeaf(), true);
    assert.equal(node.getLeft(), null);
    assert.equal(node.getRight(), null);
  });
});

describe('AVLTree', () => {
  it('starts empty', () => {
    const tree = new AVLTree<string>();

    assert.equal(tree.isEmpty(), true);
    assert.equal(tree.getRoot(), null);
    assert.deepEqual(tree.inOrder(), []);
  });

  it('performs a left rotation', () => {
    const tree = treeWith([10, 20, 30]);

    assert.equal(tree.getRoot()?.getData().key, 20);
    assert.equal(tree.getRoot()?.getLeft()?.getData().key, 10);
    assert.equal(tree.getRoot()?.getRight()?.getData().key, 30);
    assert.deepEqual(keys(tree.inOrder()), [10, 20, 30]);
  });

  it('performs a right rotation', () => {
    const tree = treeWith([30, 20, 10]);

    assert.equal(tree.getRoot()?.getData().key, 20);
    assert.deepEqual(keys(tree.inOrder()), [10, 20, 30]);
  });

  it('performs double rotations', () => {
    const rightLeft = treeWith([10, 30, 20]);
    assert.equal(rightLeft.getRoot()?.getData().key, 20);
    assert.deepEqual(keys(rightLeft.inOrder()), [10, 20, 30]);

    const leftRight = treeWith([30, 10, 20]);
    assert.equal(leftRight.getRoot()?.getData().key, 20);
    assert.deepEqual(keys(leftRight.inOrder()), [10, 20, 30]);
  });

  it('performs rotations when inserting recursively', () => {
    const tree = treeWithR([10, 20, 30]);

    assert.equal(tree.getRoot()?.getData().key, 20);
    assert.deepEqual(keys(tree.inOrder()), [10, 20, 30]);
  });

  it('keeps the tree balanced after inserting sorted values', () => {
    const tree = treeWith([1, 2, 3, 4, 5, 6, 7]);

    assert.deepEqual(keys(tree.inOrder()), [1, 2, 3, 4, 5, 6, 7]);
    assert.equal(tree.height(tree.getRoot()), 3);
    assert.equal(tree.getRoot()?.getData().key, 4);
  });

  it('updates duplicated keys without growing', () => {
    const tree = treeWith([10, 20, 30]);

    tree.insert(data(20, 'updated'));
    assert.equal(tree.findKey(20), 'updated');
    assert.equal(tree.size(tree.getRoot()), 3);

    tree.insertR(data(20, 'updated again'));
    assert.equal(tree.findKey(20), 'updated again');
    assert.equal(tree.size(tree.getRoot()), 3);
  });

  it('throws when inserting a falsy key', () => {
    assert.throws(() => new AVLTree<string>().insert(data(0)), /key/);
    assert.throws(() => new AVLTree<string>().insertR(data(0)), /key/);
  });

  it('deletes leaves and keeps balance', () => {
    const tree = treeWith([1, 2, 3, 4, 5, 6, 7]);
    tree.delete(7);

    assert.deepEqual(keys(tree.inOrder()), [1, 2, 3, 4, 5, 6]);
    assert.equal(tree.height(tree.getRoot()), 3);
  });

  it('deletes internal nodes and keeps balance', () => {
    const tree = treeWith([1, 2, 3, 4, 5, 6, 7]);
    tree.delete(4);

    assert.deepEqual(keys(tree.inOrder()), [1, 2, 3, 5, 6, 7]);
    assert.equal(tree.height(tree.getRoot()), 3);
  });

  it('deletes the root and keeps balance', () => {
    const tree = treeWith([10, 20, 30, 40, 50]);
    tree.delete(30);

    assert.deepEqual(keys(tree.inOrder()), [10, 20, 40, 50]);
    assert.equal(tree.height(tree.getRoot()), 3);
  });

  it('ignores deletion of a missing key', () => {
    const tree = treeWith([10, 20, 30]);
    tree.delete(99);

    assert.deepEqual(keys(tree.inOrder()), [10, 20, 30]);
  });

  it('finds minimum and maximum values', () => {
    const tree = treeWith([10, 20, 30, 40, 50]);

    assert.equal(tree.min(tree.getRoot())?.getData().key, 10);
    assert.equal(tree.max(tree.getRoot())?.getData().key, 50);
  });
});
