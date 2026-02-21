import BinarySearchTree from '../binarysearchtree/binarysearch.tree';
import { type Data } from '../binarysearchtree/binarysearch.node';
import AVLTreeNode from './avl.node';

/**
 * Clase que representa un arbol m-way tree y proporciona métodos para manipularlo.
 * https://youtu.be/6sm25BHVirg?si=xIoM3jo-GoGL28l9
 * https://youtu.be/R0h1InmDxi8?si=hozGjcpERGWCIrGn
 * https://youtu.be/yumXtZIWzhY?si=umsjH7pCjQZREwxf
 */
export default class AVLTree<T> extends BinarySearchTree<T> {
  private readonly MAXIMUN_DIFFERENCE = 1;
  constructor() {
    super();
  }

  private singleRightRotation(node: AVLTreeNode<T>): AVLTreeNode<T> {
    const left = node.getLeft()!;
    node.setLeft(left.getRight());
    left.setRight(node);
    return left;
  }

  private singleLeftRotation(node: AVLTreeNode<T>): AVLTreeNode<T> {
    const right = node.getRight()!;
    node.setRight(right.getLeft());
    right.setLeft(node);
    return right;
  }

  private doubleRightRotation(node: AVLTreeNode<T>): AVLTreeNode<T> {
    node.setLeft(this.singleLeftRotation(node.getLeft()!));
    return this.singleRightRotation(node);
  }

  private doubleLeftRotation(node: AVLTreeNode<T>): AVLTreeNode<T> {
    node.setRight(this.singleRightRotation(node.getRight()!));
    return this.singleLeftRotation(node);
  }

  // balancea el arbol
  private swing(node: AVLTreeNode<T>): AVLTreeNode<T> {
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

    const fn = (node: AVLTreeNode<T> | null): AVLTreeNode<T> => {
      if (node === null) {
        return new AVLTreeNode<T>(data);
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
      this.root = new AVLTreeNode<T>(data);
      return this;
    }
    const fn = (node: AVLTreeNode<T> | null) => {
      if (node === null) {
        return new AVLTreeNode<T>(data);
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
    const fn = (node: AVLTreeNode<T> | null, key: number): AVLTreeNode<T> | null => {
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
