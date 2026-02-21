import BinarySearchTreeNode, { Data } from '../binarysearchtree/binarysearch.node';

export default class AVLTreeNode<T> extends BinarySearchTreeNode<T> {
  constructor({ key, value }: Data<T>) {
    super({ key, value });
  }
}
