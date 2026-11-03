import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import BTree from '../src/class/btree/b.tree';
import BTreeNode from '../src/class/btree/b.node';
import { data } from './helpers';

function treeWith(keys: number[], degree = 3): BTree<string> {
  const tree = new BTree<string>(degree);
  for (const key of keys) {
    tree.insert(data(key));
  }
  return tree;
}

function treeWithR(keys: number[], degree = 3): BTree<string> {
  const tree = new BTree<string>(degree);
  for (const key of keys) {
    tree.insertR(data(key));
  }
  return tree;
}

function keys(values: Array<{ key: number }>): number[] {
  return values.map((value) => value.key);
}

describe('BTreeNode', () => {
  it('behaves like an m-way tree node', () => {
    const node = new BTreeNode<string>(3);

    assert.equal(node.getGrade(), 3);
    assert.equal(node.countData(), 0);
    assert.equal(node.isLeaf(), true);
  });
});

describe('BTree', () => {
  it('throws when the degree is not greater than two', () => {
    assert.throws(() => new BTree(2), /grado/);
    assert.throws(() => new BTree(), /grado/);
  });

  it('starts empty', () => {
    const tree = new BTree<string>(3);

    assert.equal(tree.getDegree(), 3);
    assert.equal(tree.isEmpty(), true);
    assert.equal(tree.getRoot(), null);
    assert.equal(tree.findKey(1), null);
    assert.equal(tree.hasKey(1), false);
    assert.equal(tree.size(tree.getRoot()), 0);
    assert.equal(tree.height(tree.getRoot()), 0);
    assert.deepEqual(tree.inOrderR(), []);
    assert.equal(tree.toString(), 'El árbol está vacío');
  });

  it('inserts values and splits nodes', () => {
    const tree = treeWith([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    assert.equal(tree.getRoot()?.getData(0)?.key, 4);
    assert.equal(tree.cardinality(tree.getRoot()), 10);
    assert.equal(tree.size(tree.getRoot()), 8);
    assert.equal(tree.sizeR(tree.getRoot()), 8);
    assert.equal(tree.height(tree.getRoot()), 3);
    assert.equal(tree.heightR(tree.getRoot()), 3);
    assert.deepEqual(keys(tree.inOrderR()), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    assert.deepEqual(keys(tree.preOrder()), [4, 2, 1, 3, 6, 5, 8, 7, 9, 10]);
    assert.deepEqual(keys(tree.preOrderR()), [4, 2, 1, 3, 6, 5, 8, 7, 9, 10]);
    assert.deepEqual(keys(tree.levelOrder()), [4, 2, 6, 8, 1, 3, 5, 7, 9, 10]);
  });

  it('inserts recursively with the same result', () => {
    const tree = treeWithR([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    assert.equal(tree.getRoot()?.getData(0)?.key, 4);
    assert.equal(tree.size(tree.getRoot()), 8);
    assert.deepEqual(keys(tree.inOrderR()), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('updates duplicated keys', () => {
    const tree = treeWith([1, 2, 3, 4, 5]);
    tree.insert(data(3, 'updated'));

    assert.equal(tree.findKey(3), 'updated');
    assert.equal(tree.cardinality(tree.getRoot()), 5);
  });

  it('finds keys and nodes', () => {
    const tree = treeWith([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    assert.equal(tree.findKey(5), 'v5');
    assert.equal(tree.findKeyR(5), 'v5');
    assert.equal(tree.findKey(11), null);
    assert.equal(tree.hasKey(5), true);
    assert.equal(tree.hasKey(11), false);
    assert.equal(tree.getNode(tree.getRoot(), 5)?.getData(0)?.key, 5);
    assert.equal(tree.getNode(tree.getRoot(), 11), null);
  });

  it('finds the node and parents of a key', () => {
    const tree = treeWith([1, 2, 3, 4, 5, 6, 7]);
    const result = tree.findNodeAndParents(5);

    assert.notEqual(result.child, null);
    assert.equal(result.child?.getIndexOfData(5) !== -1, true);
  });

  it('deletes leaves, internal nodes and the root', () => {
    for (const key of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
      const tree = treeWith([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      tree.delete(key);

      assert.equal(tree.findKey(key), null);
      assert.deepEqual(
        keys(tree.inOrderR()),
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter((value) => value !== key)
      );
      assert.ok(tree.height(tree.getRoot()) <= 3);
    }
  });

  it('deletes from a bigger degree tree', () => {
    const tree = treeWith([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 4);
    tree.delete(4);

    assert.equal(tree.findKey(4), null);
    assert.deepEqual(keys(tree.inOrderR()), [1, 2, 3, 5, 6, 7, 8, 9, 10]);
  });

  it('throws when deleting a missing key', () => {
    const tree = treeWith([1, 2, 3]);
    assert.throws(() => tree.delete(99), /No existe/);
  });

  it('keeps a bigger degree tree balanced', () => {
    const tree = treeWith([1, 2, 3, 4, 5, 6, 7], 4);

    assert.deepEqual(keys(tree.inOrderR()), [1, 2, 3, 4, 5, 6, 7]);
    assert.equal(tree.height(tree.getRoot()), 2);
  });

  it('prints the tree', () => {
    const tree = treeWith([1, 2, 3, 4, 5]);
    assert.match(tree.toString(), /4/);
  });
});
