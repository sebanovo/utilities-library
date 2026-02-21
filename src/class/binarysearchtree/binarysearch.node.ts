export interface Data<T> {
  key: number;
  value: T;
}

/**
 * Clase que representa el nodo de un arbol binario.
 */
export default class BinarySearchTreeNode<T> {
  private right: BinarySearchTreeNode<T> | null = null;
  private left: BinarySearchTreeNode<T> | null = null;
  private data: Data<T>;

  constructor({ key, value }: Data<T>) {
    this.data = { key, value };
  }

  getRight() {
    return this.right;
  }

  setRight(node: BinarySearchTreeNode<T> | null) {
    this.right = node;
  }

  getLeft() {
    return this.left;
  }

  setLeft(node: BinarySearchTreeNode<T> | null) {
    this.left = node;
  }

  getData() {
    return this.data;
  }

  setData(newData: Data<T>) {
    this.data = newData;
  }

  isLeaf(): boolean {
    return this.left === null && this.right === null;
  }

  hasTwoChildren(): boolean {
    return this.left !== null && this.right !== null;
  }
}
