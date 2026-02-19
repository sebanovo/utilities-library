import BinarySearchTree from '../binarysearchtree/binarysearch.tree';
import BinaryTreeNode, { type Data } from '../binarysearchtree/binarysearch.node';

/**
 * Clase que representa un arbol m-way tree y proporciona métodos para manipularlo.
 */
export default class AVLTree<T> extends BinarySearchTree<T> {
  private readonly MAXIMUN_DIFFERENCE = 1;
  constructor() {
    super();
  }

  private singleRightRotation(node: BinaryTreeNode<T>): BinaryTreeNode<T> {
    const left = node.getLeft()!;
    node.setLeft(left.getRight());
    left.setRight(node);
    return left;
  }

  private singleLeftRotation(node: BinaryTreeNode<T>): BinaryTreeNode<T> {
    const right = node.getRight()!;
    node.setRight(right.getLeft());
    right.setLeft(node);
    return right;
  }

  private doubleRightRotation(node: BinaryTreeNode<T>): BinaryTreeNode<T> {
    node.setLeft(this.singleLeftRotation(node.getLeft()!));
    return this.singleRightRotation(node);
  }

  private doubleLeftRotation(node: BinaryTreeNode<T>): BinaryTreeNode<T> {
    node.setRight(this.singleRightRotation(node.getRight()!));
    return this.singleLeftRotation(node);
  }

  // balancea el arbol
  private swing(node: BinaryTreeNode<T>): BinaryTreeNode<T> {
    const leftCurrentHeight = super.height(node.getLeft());
    const rightCurrentHeight = super.height(node.getRight());
    const sub = leftCurrentHeight - rightCurrentHeight;
    if (sub > this.MAXIMUN_DIFFERENCE) {
      const leftNode = node.getLeft()!;
      const leftHeight = super.height(leftNode.getLeft());
      const rightHeight = super.height(leftNode.getRight());

      return rightHeight > leftHeight
        ? this.doubleRightRotation(node)
        : this.singleRightRotation(node);
    } else if (sub < -this.MAXIMUN_DIFFERENCE) {
      const rightNode = node.getRight()!;
      const leftHeight = super.height(rightNode.getLeft());
      const rightHeight = super.height(rightNode.getRight());

      return rightHeight < leftHeight
        ? this.doubleLeftRotation(node)
        : this.singleLeftRotation(node);
    } // else { no hacer nada }
    return node;
  }

  override insert(data: Data<T>) {
    if (!data.key) throw new Error('La key no puede ser nulo');

    const fn = (node: BinaryTreeNode<T> | null): BinaryTreeNode<T> => {
      if (node === null) {
        return new BinaryTreeNode<T>(data);
      } else if (data.key < node.getData().key) {
        node.setLeft(fn(node.getLeft()));
        return this.swing(node);
      } else if (data.key > node.getData().key) {
        node.setRight(fn(node.getRight()));
        return this.swing(node);
      } else {
        node.getData().value = data.value;
        return node;
      }
    };
    this.root = fn(this.root);
    return this;
  }

  override insertR(data: Data<T>): this {
    if (!data.key) throw new Error('La key no puede ser nulo');
    if (this.root === null) {
      this.root = new BinaryTreeNode<T>(data);
      return this;
    }
    const fn = (node: BinaryTreeNode<T> | null) => {
      if (node === null) {
        return new BinaryTreeNode<T>(data);
      } else {
        if (data.key < node.getData().key) {
          node.setLeft(fn(node.getLeft()));
        } else if (data.key > node.getData().key) {
          node.setRight(fn(node.getRight()));
        } else {
          node.setData(data);
        }
        return this.swing(node);
      }
    };

    this.root = fn(this.root);
    return this;
  }

  override delete(keyToDelete: number): this {
    const fn = (node: BinaryTreeNode<T> | null, key: number): BinaryTreeNode<T> | null => {
      if (node === null) {
        return null;
      } else if (key < node.getData().key) {
        node.setLeft(fn(node.getLeft(), key));
        return this.swing(node);
      } else if (key > node.getData().key) {
        node.setRight(fn(node.getRight(), key));
        return this.swing(node);
      } else {
        // case 1
        if (node.isLeaf()) return null;
        // case 2
        if (node.getLeft() === null) return node.getRight();
        if (node.getRight() === null) return node.getLeft();
        // case 3
        const successor = super.min(node.getRight());
        // const predecessor = this.max(node!.getLeft());
        node.setData(successor!.getData());
        node.setRight(fn(node.getRight(), successor!.getData().key));
        // node.setLeft(fn(node.getLeft(), predecessor!.getData().key));
        return this.swing(node);
      }
    };
    this.root = fn(this.root, keyToDelete);
    return this;
  }
}
