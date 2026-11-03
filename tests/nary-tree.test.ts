import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import NAryTree from '../src/class/narytree/nary.tree';
import NAryTreeNode from '../src/class/narytree/nary.node';

function sampleTree(): NAryTree<string> {
  const tree = new NAryTree<string>();
  tree.setRoot('R');
  tree.insert('R', 'B');
  tree.insert('R', 'C');
  tree.insert('B', 'E');
  tree.insert('B', 'F');
  tree.insert('C', 'G');
  return tree;
}

describe('NAryTreeNode', () => {
  it('stores data and manages children', () => {
    const node = new NAryTreeNode('R');

    assert.equal(node.getData(), 'R');
    assert.equal(node.getGrade(), 0);
    assert.equal(node.isLeaf(), true);
    assert.equal(node.hasChilds(), false);

    node.appendChild(new NAryTreeNode('A'));
    node.appendChild(new NAryTreeNode('B'));

    assert.equal(node.getGrade(), 2);
    assert.equal(node.countChidren(), 2);
    assert.equal(node.isLeaf(), false);
    assert.equal(node.hasChilds(), true);
    assert.equal(node.getChild(0).getData(), 'A');
  });

  it('appends several children at once', () => {
    const node = new NAryTreeNode('R');
    node.appendChilds(new NAryTreeNode('A'), new NAryTreeNode('B'));

    assert.equal(node.countChidren(), 2);
  });

  it('replaces and updates data', () => {
    const node = new NAryTreeNode('R');
    node.setData('S');
    node.setChild(0, new NAryTreeNode('A'));

    assert.equal(node.getData(), 'S');
    assert.equal(node.getChild(0).getData(), 'A');
  });

  it('deletes children by value and index', () => {
    const node = new NAryTreeNode('R');
    node.appendChilds(new NAryTreeNode('A'), new NAryTreeNode('B'), new NAryTreeNode('C'));

    assert.equal(node.deleteChild('B'), true);
    assert.equal(node.deleteChild('Z'), false);
    node.deleteByIndex(0);

    assert.deepEqual(
      node.getChildrensArray().map((child) => child.getData()),
      ['C']
    );
  });

  it('returns and replaces the children array', () => {
    const node = new NAryTreeNode('R');
    node.appendChild(new NAryTreeNode('A'));

    const children = [new NAryTreeNode('X')];
    node.setChildrensArray(children);

    assert.deepEqual(node.getChildrensArray(), children);
  });
});

describe('NAryTree', () => {
  it('starts empty', () => {
    const tree = new NAryTree<string>();

    assert.equal(tree.isEmpty(), true);
    assert.equal(tree.getRoot(), null);
    assert.equal(tree.cardinality(tree.getRoot()), 0);
    assert.equal(tree.size(tree.getRoot()), 0);
    assert.equal(tree.height(tree.getRoot()), 0);
    assert.equal(tree.min(tree.getRoot()), null);
    assert.equal(tree.max(tree.getRoot()), null);
    assert.deepEqual(tree.preOrder(), []);
    assert.deepEqual(tree.postOrder(), []);
    assert.equal(tree.toString(), 'El árbol está vacío');
  });

  it('sets the root', () => {
    const tree = new NAryTree<string>();
    tree.setRoot('R');

    assert.equal(tree.isEmpty(), false);
    assert.equal(tree.getRoot()?.getData(), 'R');
  });

  it('inserts children', () => {
    const tree = sampleTree();

    assert.equal(tree.size(tree.getRoot()), 6);
    assert.equal(tree.sizeR(tree.getRoot()), 6);
    assert.equal(tree.cardinality(tree.getRoot()), 6);
    assert.equal(tree.cardinalityR(tree.getRoot()), 6);
    assert.equal(tree.height(tree.getRoot()), 3);
    assert.equal(tree.heightR(tree.getRoot()), 3);
  });

  it('inserts recursively', () => {
    const tree = new NAryTree<string>();
    tree.setRoot('R');
    tree.insertR('R', 'A');
    tree.insertR('A', 'B');

    assert.deepEqual(tree.preOrder(), ['R', 'A', 'B']);
  });

  it('ignores inserts when the tree or parent is missing', () => {
    const empty = new NAryTree<string>();
    empty.insert('X', 'Y');
    assert.equal(empty.isEmpty(), true);

    const tree = sampleTree();
    tree.insert('Z', 'Y');
    assert.equal(tree.size(tree.getRoot()), 6);
  });

  it('finds nodes', () => {
    const tree = sampleTree();

    assert.equal(tree.getNode(tree.getRoot(), 'F')?.getData(), 'F');
    assert.equal(tree.getNode(tree.getRoot(), 'Z'), null);
    assert.equal(tree.getNodeR(tree.getRoot(), 'F')?.getData(), 'F');
    assert.equal(tree.getNodeR(tree.getRoot(), 'Z'), null);
  });

  it('finds minimum and maximum values', () => {
    const tree = sampleTree();

    assert.equal(tree.min(tree.getRoot())?.getData(), 'B');
    assert.equal(tree.max(tree.getRoot())?.getData(), 'R');
    assert.equal(tree.minR(tree.getRoot())?.getData(), 'B');
    assert.equal(tree.maxR(tree.getRoot())?.getData(), 'R');
  });

  it('traverses in preorder and postorder', () => {
    const tree = sampleTree();

    assert.deepEqual(tree.preOrder(), ['R', 'B', 'E', 'F', 'C', 'G']);
    assert.deepEqual(tree.preOrderR(), ['R', 'B', 'E', 'F', 'C', 'G']);
    assert.deepEqual(tree.postOrder(), ['E', 'F', 'B', 'G', 'C', 'R']);
    assert.deepEqual(tree.postOrderR(), ['E', 'F', 'B', 'G', 'C', 'R']);
  });

  it('deletes a node and its subtree', () => {
    const tree = sampleTree();
    tree.deleteNodeAndSubTree('B');

    assert.equal(tree.getNode(tree.getRoot(), 'B'), null);
    assert.equal(tree.getNode(tree.getRoot(), 'E'), null);
    assert.equal(tree.size(tree.getRoot()), 3);
  });

  it('deletes a node and relocates its children', () => {
    const tree = sampleTree();
    tree.deleteNodeWithRelocation('B');

    assert.equal(tree.getNode(tree.getRoot(), 'B'), null);
    assert.equal(tree.getNode(tree.getRoot(), 'E')?.getData(), 'E');
    assert.equal(tree.getNode(tree.getRoot(), 'F')?.getData(), 'F');
    assert.equal(tree.size(tree.getRoot()), 5);
  });

  it('deletes the root', () => {
    const relocated = sampleTree();
    relocated.deleteNodeWithRelocation('R');
    assert.equal(relocated.getRoot()?.getData(), 'B');
    assert.equal(relocated.size(relocated.getRoot()), 3);

    const removed = sampleTree();
    removed.deleteNodeAndSubTree('R');
    assert.equal(removed.isEmpty(), true);
  });

  it('deletes all matches with their subtrees', () => {
    const tree = new NAryTree<string>();
    tree.setRoot('R');
    tree.insert('R', 'X');
    tree.insert('R', 'X');
    tree.insert('X', 'Y');

    tree.deleteAllMatchAndSubtree('X');

    assert.equal(tree.size(tree.getRoot()), 1);
    assert.equal(tree.getNode(tree.getRoot(), 'X'), null);
  });

  it('deletes all matches relocating their children', () => {
    const tree = new NAryTree<string>();
    tree.setRoot('R');
    tree.insert('R', 'X');
    tree.insert('R', 'X');
    tree.insert('X', 'A');
    tree.insert('X', 'B');

    tree.deleteAllMatchWithRelocation('X');

    assert.equal(tree.size(tree.getRoot()), 3);
    assert.equal(tree.getNode(tree.getRoot(), 'A')?.getData(), 'A');
    assert.equal(tree.getNode(tree.getRoot(), 'B')?.getData(), 'B');
  });

  it('deletes all leaves', () => {
    const tree = sampleTree();
    tree.deleteLeaves();

    assert.equal(tree.size(tree.getRoot()), 3);
    assert.equal(tree.getNode(tree.getRoot(), 'B')?.getData(), 'B');
    assert.equal(tree.getNode(tree.getRoot(), 'C')?.getData(), 'C');
    assert.equal(tree.getNode(tree.getRoot(), 'E'), null);
  });

  it('prints the tree', () => {
    const tree = sampleTree();
    assert.match(tree.toString(), /R/);
  });
});
