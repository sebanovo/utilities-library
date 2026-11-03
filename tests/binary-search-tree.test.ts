import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import BinarySearchTree from '../src/class/binarysearchtree/binarysearch.tree';
import BinarySearchTreeNode from '../src/class/binarysearchtree/binarysearch.node';
import { data } from './helpers';

function treeWith(keys: number[]): BinarySearchTree<string> {
  const tree = new BinarySearchTree<string>();
  for (const key of keys) {
    tree.insert(data(key));
  }
  return tree;
}

function keys(values: Array<{ key: number }>): number[] {
  return values.map((value) => value.key);
}

describe('BinarySearchTreeNode', () => {
  it('stores data and manages children', () => {
    const node = new BinarySearchTreeNode(data(10, 'ten'));
    const left = new BinarySearchTreeNode(data(5, 'five'));
    const right = new BinarySearchTreeNode(data(15, 'fifteen'));

    assert.deepEqual(node.getData(), { key: 10, value: 'ten' });
    assert.equal(node.isLeaf(), true);
    assert.equal(node.hasTwoChildren(), false);

    node.setLeft(left);
    node.setRight(right);

    assert.equal(node.getLeft(), left);
    assert.equal(node.getRight(), right);
    assert.equal(node.isLeaf(), false);
    assert.equal(node.hasTwoChildren(), true);
  });

  it('updates its data', () => {
    const node = new BinarySearchTreeNode(data(10, 'ten'));
    node.setData(data(10, 'updated'));

    assert.equal(node.getData().value, 'updated');
  });
});

describe('BinarySearchTree', () => {
  it('starts empty', () => {
    const tree = new BinarySearchTree<string>();

    assert.equal(tree.isEmpty(), true);
    assert.equal(tree.getRoot(), null);
    assert.equal(tree.cardinality(tree.getRoot()), 0);
    assert.equal(tree.size(tree.getRoot()), 0);
    assert.equal(tree.height(tree.getRoot()), 0);
    assert.equal(tree.min(tree.getRoot()), null);
    assert.equal(tree.max(tree.getRoot()), null);
    assert.deepEqual(tree.inOrder(), []);
    assert.deepEqual(tree.preOrder(), []);
    assert.deepEqual(tree.postOrder(), []);
    assert.deepEqual(tree.levelOrder(), []);
    assert.equal(tree.toString(), 'El árbol está vacio');
  });

  it('inserts and updates nodes', () => {
    const tree = treeWith([50, 30, 70, 20, 40, 60, 80, 35]);

    assert.equal(tree.isEmpty(), false);
    assert.equal(tree.getRoot()?.getData().key, 50);
    assert.equal(tree.cardinality(tree.getRoot()), 8);
    assert.equal(tree.size(tree.getRoot()), 8);
    assert.equal(tree.height(tree.getRoot()), 4);
    assert.equal(tree.heightR(tree.getRoot()), 4);

    tree.insert(data(40, 'updated'));
    assert.equal(tree.findKey(40), 'updated');
    assert.equal(tree.size(tree.getRoot()), 8);
  });

  it('inserts recursively', () => {
    const tree = new BinarySearchTree<string>();
    tree.insertR(data(50)).insertR(data(30)).insertR(data(70));

    assert.deepEqual(keys(tree.inOrder()), [30, 50, 70]);
    assert.equal(tree.getRoot()?.getData().key, 50);
  });

  it('throws when inserting a falsy key', () => {
    assert.throws(() => new BinarySearchTree<string>().insert(data(0)), /key/);
    assert.throws(() => new BinarySearchTree<string>().insertR(data(0)), /key/);
  });

  it('finds nodes and keys', () => {
    const tree = treeWith([50, 30, 70, 20, 40, 60, 80]);

    assert.equal(tree.getNode(tree.getRoot(), 40)?.getData().key, 40);
    assert.equal(tree.getNode(tree.getRoot(), 90), null);
    assert.equal(tree.getNodeR(tree.getRoot(), 40)?.getData().key, 40);
    assert.equal(tree.getNodeR(tree.getRoot(), 90), null);

    assert.equal(tree.hasKey(70), true);
    assert.equal(tree.findKey(90), undefined);
    assert.equal(tree.findKey(30), 'v30');
    assert.equal(tree.findKeyR(30), 'v30');
  });

  it('finds minimum and maximum values', () => {
    const tree = treeWith([50, 30, 70, 20, 40, 60, 80]);

    assert.equal(tree.min(tree.getRoot())?.getData().key, 20);
    assert.equal(tree.minR(tree.getRoot())?.getData().key, 20);
    assert.equal(tree.max(tree.getRoot())?.getData().key, 80);
    assert.equal(tree.maxR(tree.getRoot())?.getData().key, 80);
  });

  it('traverses the tree in all orders', () => {
    const tree = treeWith([50, 30, 70, 20, 40, 60, 80, 35]);

    assert.deepEqual(keys(tree.inOrder()), [20, 30, 35, 40, 50, 60, 70, 80]);
    assert.deepEqual(keys(tree.inOrderR()), [20, 30, 35, 40, 50, 60, 70, 80]);
    assert.deepEqual(keys(tree.preOrder()), [50, 30, 20, 40, 35, 70, 60, 80]);
    assert.deepEqual(keys(tree.preOrderR()), [50, 30, 20, 40, 35, 70, 60, 80]);
    assert.deepEqual(keys(tree.postOrder()), []);
    assert.deepEqual(keys(tree.postOrderR()), [20, 35, 40, 30, 60, 80, 70, 50]);
    assert.deepEqual(keys(tree.levelOrder()), [50, 30, 70, 20, 40, 60, 80, 35]);
    assert.deepEqual(keys(tree.levelOrderR()), [50, 30, 70, 20, 40, 60, 80, 35]);
  });

  it('rebuilds from preorder and inorder traversals', () => {
    const original = treeWith([50, 30, 70, 20, 40, 60, 80]);
    const preOrder = original.preOrder();
    const inOrder = original.inOrder();

    const rebuilt = new BinarySearchTree<string>();
    rebuilt.rebuildPreOrderInOrder(preOrder, inOrder);

    assert.deepEqual(keys(rebuilt.inOrder()), keys(inOrder));
    assert.deepEqual(keys(rebuilt.preOrder()), keys(preOrder));
  });

  it('rebuilds from postorder and inorder traversals', () => {
    const original = treeWith([50, 30, 70, 20, 40, 60, 80]);
    const postOrder = original.postOrderR();
    const inOrder = original.inOrder();

    const rebuilt = new BinarySearchTree<string>();
    rebuilt.rebuildPostOrderInOrder(postOrder, inOrder);

    assert.deepEqual(keys(rebuilt.inOrder()), keys(inOrder));
    assert.deepEqual(keys(rebuilt.postOrderR()), keys(postOrder));
  });

  it('counts left and right children', () => {
    const tree = treeWith([50, 30, 70, 20, 40, 60, 80, 35]);

    assert.equal(tree.countLeftChildren(), 4);
    assert.equal(tree.countRightChildren(), 3);
  });

  it('counts nodes and children in a level', () => {
    const tree = treeWith([50, 30, 70, 20, 40, 60, 80, 35]);

    assert.equal(tree.countNodesInLevel(0), 1);
    assert.equal(tree.countNodesInLevel(1), 2);
    assert.equal(tree.countNodesInLevel(2), 4);
    assert.equal(tree.countNodesInLevel(3), 1);
    assert.equal(tree.countNodesInLevel(4), 0);

    assert.equal(tree.allNodesHaveTwoChildrenInLevel(0), true);
    assert.equal(tree.allNodesHaveTwoChildrenInLevel(1), true);
    assert.equal(tree.allNodesHaveTwoChildrenInLevel(2), false);
    assert.equal(tree.allNodesHaveTwoChildrenInLevel(3), false);
  });

  it('deletes a leaf', () => {
    const tree = treeWith([50, 30, 70, 20, 40, 60, 80]);
    tree.delete(20);

    assert.deepEqual(keys(tree.inOrder()), [30, 40, 50, 60, 70, 80]);
  });

  it('deletes a node with one child', () => {
    const tree = treeWith([50, 30, 70, 20]);
    tree.delete(30);

    assert.deepEqual(keys(tree.inOrder()), [20, 50, 70]);
  });

  it('deletes a node with two children', () => {
    const tree = treeWith([50, 30, 70, 20, 40, 60, 80]);
    tree.delete(30);

    assert.deepEqual(keys(tree.inOrder()), [20, 40, 50, 60, 70, 80]);
  });

  it('deletes the root', () => {
    const tree = treeWith([50, 30, 70, 20, 40, 60, 80]);
    tree.delete(50);

    assert.equal(tree.getRoot()?.getData().key, 60);
    assert.deepEqual(keys(tree.inOrder()), [20, 30, 40, 60, 70, 80]);
  });

  it('ignores deletion of a missing key', () => {
    const tree = treeWith([50, 30, 70]);
    tree.delete(99);

    assert.deepEqual(keys(tree.inOrder()), [30, 50, 70]);
  });

  it('gets and sets the root', () => {
    const tree = new BinarySearchTree<string>();
    const node = new BinarySearchTreeNode(data(10, 'ten'));

    tree.setRoot(node);
    assert.equal(tree.getRoot(), node);
    assert.equal(tree.isEmpty(), false);
  });

  it('prints the tree', () => {
    const tree = treeWith([50, 30, 70]);

    assert.match(tree.toString(), /50/);
  });
});
