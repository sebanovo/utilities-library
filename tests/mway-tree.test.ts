import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import MWayTree from '../src/class/mwaytree/mway.tree';
import MWayTreeNode from '../src/class/mwaytree/mway.node';
import { data } from './helpers';

function treeWith(keys: number[], degree = 3): MWayTree<string> {
  const tree = new MWayTree<string>(degree);
  for (const key of keys) {
    tree.insert(data(key));
  }
  return tree;
}

function keys(values: Array<{ key: number }>): number[] {
  return values.map((value) => value.key);
}

function nodeData(node: MWayTreeNode<string> | null): Array<number | undefined> {
  return node!.getDataArray().map((value) => value?.key);
}

describe('MWayTreeNode', () => {
  it('creates a node with the default degree', () => {
    const node = new MWayTreeNode<string>();

    assert.equal(node.getGrade(), 2);
    assert.equal(node.countData(), 0);
    assert.equal(node.countChildren(), 0);
    assert.equal(node.isLeaf(), true);
    assert.equal(node.hasDataSpaceForInsert(), true);
  });

  it('throws when the degree is invalid', () => {
    assert.throws(() => new MWayTreeNode(1), /grado/);
  });

  it('stores data in order', () => {
    const node = new MWayTreeNode<string>(4);
    node.insertDataOrdered(data(3));
    node.insertDataOrdered(data(1));
    node.insertDataOrdered(data(2));

    assert.deepEqual(
      node.getDataArray().map((value) => value?.key),
      [1, 2, 3]
    );
    assert.equal(node.getIndexOfData(2), 1);
    assert.equal(node.getIndexOfData(9), -1);
    assert.equal(node.countData(), 3);
    assert.equal(node.isFullDataNode(), true);
  });

  it('throws when accessing data outside the limits', () => {
    const node = new MWayTreeNode<string>(3);

    assert.throws(() => node.getData(-1), /limite/);
    assert.throws(() => node.getData(2), /limite/);
  });

  it('manages children', () => {
    const node = new MWayTreeNode<string>(3);
    const first = new MWayTreeNode<string>(3);
    const second = new MWayTreeNode<string>(3);

    node.setChild(0, first);
    node.setChild(1, second);

    assert.equal(node.getChild(0), first);
    assert.equal(node.getChild(1), second);
    assert.equal(node.countChildren(), 2);
    assert.equal(node.countEmptyChildren(), 1);
    assert.equal(node.isFullChildrenNode(), false);
    assert.equal(node.isEmptyChild(2), true);
    assert.equal(node.isLeaf(), false);
    assert.equal(node.getIndexOfChild(second), 1);
    assert.equal(node.getIndexOfChild(new MWayTreeNode<string>(3)), -1);
  });

  it('throws when accessing a child outside the limits', () => {
    const node = new MWayTreeNode<string>(3);

    assert.throws(() => node.getChild(-1), /limite/);
    assert.throws(() => node.getChild(3), /limite/);
  });

  it('updates data and arrays', () => {
    const node = new MWayTreeNode<string>(3);
    node.setData(0, data(1, 'one'));
    node.setData(0, data(2, 'two'));

    assert.equal(node.getData(0)?.key, 2);

    const dataArray = [data(3), null];
    node.setDataArray(dataArray);
    assert.deepEqual(node.getDataArray(), dataArray);

    const children = [new MWayTreeNode<string>(3), null, null];
    node.setChildrensArray(children);
    assert.deepEqual(node.getChildrensArray(), children);
  });

  it('displaces data to the left', () => {
    const node = new MWayTreeNode<string>(4);
    node.setData(0, data(1));
    node.setData(1, data(2));
    node.setData(2, data(3));

    node.displaceDatasToLeft(0);

    assert.deepEqual(
      node.getDataArray().map((value) => value?.key),
      [2, 3, undefined]
    );
  });

  it('finds the first greater key index', () => {
    const node = new MWayTreeNode<string>(4);
    node.insertDataOrdered(data(1));
    node.insertDataOrdered(data(2));
    node.insertDataOrdered(data(3));

    assert.equal(node.findGreaterKeyIndex(0), 0);
    assert.equal(node.findGreaterKeyIndex(2), 2);
    assert.equal(node.findGreaterKeyIndex(4), 3);
  });

  it('checks for data and children before or after a position', () => {
    const node = new MWayTreeNode<string>(4);
    node.setData(0, data(1));
    node.setData(2, data(3));
    node.setChild(0, new MWayTreeNode<string>(4));
    node.setChild(2, new MWayTreeNode<string>(4));

    assert.equal(node.hasDataToAfter(0), true);
    assert.equal(node.hasDataToAfter(2), false);
    assert.equal(node.hasDataToBefore(2), true);
    assert.equal(node.hasDataToBefore(0), false);
    assert.equal(node.hasChildToAfter(0), true);
    assert.equal(node.hasChildToBefore(2), true);
  });

  it('clears the node', () => {
    const node = new MWayTreeNode<string>(3);
    node.setData(0, data(1));
    node.setChild(0, new MWayTreeNode<string>(3));
    node.clear();

    assert.equal(node.countData(), 0);
    assert.equal(node.countChildren(), 0);
    assert.equal(node.isLeaf(), true);
  });
});

describe('MWayTree', () => {
  it('starts empty', () => {
    const tree = new MWayTree<string>(3);

    assert.equal(tree.getDegree(), 3);
    assert.equal(tree.isEmpty(), true);
    assert.equal(tree.getRoot(), null);
    assert.equal(tree.cardinality(tree.getRoot()), 0);
    assert.equal(tree.size(tree.getRoot()), 0);
    assert.equal(tree.sizeR(tree.getRoot()), 0);
    assert.equal(tree.height(tree.getRoot()), 0);
    assert.equal(tree.heightR(tree.getRoot()), 0);
    assert.equal(tree.min(tree.getRoot()), null);
    assert.equal(tree.minR(tree.getRoot()), null);
    assert.equal(tree.max(tree.getRoot()), null);
    assert.equal(tree.maxR(tree.getRoot()), null);
    assert.equal(tree.findKey(1), null);
    assert.deepEqual(tree.levelOrder(), []);
    assert.deepEqual(tree.preOrder(), []);
    assert.deepEqual(tree.preOrderR(), []);
    assert.deepEqual(tree.postOrderR(), []);
    assert.deepEqual(tree.inOrderR(), []);
    assert.equal(tree.toString(), 'El árbol está vacío');
  });

  it('throws when the degree is invalid', () => {
    assert.throws(() => new MWayTree(1), /grado/);
  });

  it('inserts data', () => {
    const tree = treeWith([1, 2, 3, 4, 5, 6, 7]);

    assert.equal(tree.cardinality(tree.getRoot()), 7);
    assert.equal(tree.size(tree.getRoot()), 4);
    assert.equal(tree.sizeR(tree.getRoot()), 4);
    assert.equal(tree.height(tree.getRoot()), 4);
    assert.equal(tree.heightR(tree.getRoot()), 4);
    assert.deepEqual(nodeData(tree.getRoot()), [1, 2]);
  });

  it('throws when inserting a falsy key', () => {
    assert.throws(() => new MWayTree<string>(3).insert(data(0)), /key/);
    assert.throws(() => new MWayTree<string>(3).insertR(data(0)), /key/);
  });

  it('inserts recursively', () => {
    const tree = new MWayTree<string>(3);
    [1, 2, 3, 4, 5].forEach((key) => tree.insertR(data(key)));

    assert.deepEqual(keys(tree.inOrderR()), [1, 2, 3, 4, 5]);
  });

  it('finds nodes and keys', () => {
    const tree = treeWith([1, 2, 3, 4, 5, 6, 7]);

    assert.equal(tree.findKey(5), 'v5');
    assert.equal(tree.findKeyR(5), 'v5');
    assert.equal(tree.findKey(9), null);
    assert.equal(tree.hasKey(5), true);
    assert.equal(tree.hasKey(9), false);
    assert.equal(tree.getNode(tree.getRoot(), 3)?.getData(0)?.key, 3);
    assert.equal(tree.getNode(tree.getRoot(), 9), null);
    assert.equal(tree.getNodeR(tree.getRoot(), 3)?.getData(0)?.key, 3);
    assert.equal(tree.getNodeR(tree.getRoot(), 9), null);
  });

  it('finds minimum and maximum values', () => {
    const tree = treeWith([1, 2, 3, 4, 5, 6, 7]);

    assert.equal(tree.min(tree.getRoot())?.getData(0)?.key, 1);
    assert.equal(tree.minR(tree.getRoot())?.getData(0)?.key, 1);
    assert.equal(tree.max(tree.getRoot())?.getData(0)?.key, 7);
    assert.equal(tree.maxR(tree.getRoot())?.getData(0)?.key, 7);
  });

  it('traverses the tree', () => {
    const tree = treeWith([1, 2, 3, 4, 5, 6, 7]);

    assert.deepEqual(keys(tree.inOrderR()), [1, 2, 3, 4, 5, 6, 7]);
    assert.deepEqual(keys(tree.preOrder()), [1, 2, 3, 4, 5, 6, 7]);
    assert.deepEqual(keys(tree.preOrderR()), [1, 2, 3, 4, 5, 6, 7]);
    assert.deepEqual(keys(tree.levelOrder()), [1, 2, 3, 4, 5, 6, 7]);
    assert.deepEqual(keys(tree.levelOrderR()), [1, 2, 3, 4, 5, 6, 7]);
    assert.deepEqual(keys(tree.postOrderR()), [1, 3, 5, 7, 6, 4, 2]);
  });

  it('counts children, levels and full nodes', () => {
    const tree = treeWith([1, 2, 3, 4, 5, 6, 7]);

    assert.equal(tree.countLeftChildren(), 0);
    assert.equal(tree.countRightChildren(), 3);
    assert.deepEqual(
      [0, 1, 2, 3, 4].map((level) => tree.countNodesInLevel(level)),
      [1, 1, 1, 1, 0]
    );
    assert.deepEqual(
      [0, 1, 2, 3].map((level) => tree.isFullNodeinLevel(level)),
      [false, false, false, false]
    );
  });

  it('deletes values and keeps the tree valid', () => {
    for (const key of [1, 3, 5, 7]) {
      const tree = treeWith([1, 2, 3, 4, 5, 6, 7]);
      tree.delete(key);

      assert.equal(tree.findKey(key), null);
      assert.deepEqual(
        keys(tree.inOrderR()),
        [1, 2, 3, 4, 5, 6, 7].filter((value) => value !== key)
      );
    }
  });

  it('ignores deletion of a missing key', () => {
    const tree = treeWith([1, 2, 3, 4, 5]);
    tree.delete(99);

    assert.deepEqual(keys(tree.inOrderR()), [1, 2, 3, 4, 5]);
  });

  it('gets and sets the root', () => {
    const tree = new MWayTree<string>(3);
    const root = new MWayTreeNode<string>(3);
    root.setData(0, data(1));

    tree.setRoot(root);
    assert.equal(tree.getRoot(), root);
    assert.equal(tree.isEmpty(), false);

    tree.setRoot(null);
    assert.equal(tree.isEmpty(), true);
  });

  it('prints the tree', () => {
    const tree = treeWith([1, 2, 3]);
    assert.match(tree.toString(), /1/);
  });
});
