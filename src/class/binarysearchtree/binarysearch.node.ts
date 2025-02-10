export interface Data<T> {
  key: number
  value: T
}

export default class BinaryTreeNode<T> {
  private right: BinaryTreeNode<T> | null = null;
  private left: BinaryTreeNode<T> | null = null;
  private data: Data<T>;

  constructor ({ key, value }: Data<T>) {
    this.data = { key, value };
  }

  getRight () {
    return this.right;
  }

  setRight (node: BinaryTreeNode<T> | null) {
    this.right = node;
  }

  getLeft () {
    return this.left;
  }

  setLeft (node: BinaryTreeNode<T> | null) {
    this.left = node;
  }

  getData () {
    return this.data;
  }

  setData (newData: Data<T>) {
    this.data = newData;
  }

  isLeaf (): boolean {
    return this.left === null && this.right === null;
  }

  hasTwoChildren (): boolean {
    return this.left !== null && this.right !== null;
  }
}
