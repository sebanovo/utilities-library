/**
 * Implementacion del NAry Tree
 * Arboles N-Arios
 * https://youtu.be/WW_4woIwkHA?si=INzttYMB_gABX6jH
 * https://youtu.be/rwn-fOU_6GY?si=DI4pEp1OPfoPD4Mx
 * https://youtu.be/iB535J6-_P0?si=mmTSrLOwUORn2Ziv
 * https://youtu.be/0PcagXxX9eQ?si=jJOz0IZR98cdRKDY
 * https://youtu.be/J5yLug8xdFk?si=JxHPwjlGs2iWEGan
 */
export default class NAryTreeNode<T> {
  private data: T;
  private listChilds: (NAryTreeNode<T> | null)[];

  constructor(data: T) {
    this.data = data;
    this.listChilds = [];
  }

  getGrade() {
    return this.listChilds.length;
  }

  getData() {
    return this.data;
  }

  setData(data: T) {
    this.data = data;
  }

  getChild(position: number) {
    return this.listChilds[position];
  }

  setChild(position: number, newNode: NAryTreeNode<T>) {
    this.listChilds[position] = newNode;
    return this;
  }

  appendChild(newNode: NAryTreeNode<T>) {
    this.listChilds.push(newNode);
    return this;
  }

  appendChilds(...newNodes: NAryTreeNode<T>[]): void {
    this.listChilds.push(...newNodes);
  }

  isLeaf() {
    return this.listChilds.length === 0;
  }

  getChildrensArray() {
    return this.listChilds;
  }

  setChildrensArray(childrensArray: Array<NAryTreeNode<T> | null>) {
    this.listChilds = childrensArray;
    return this;
  }

  deleteChild(data: T): boolean {
    const index = this.listChilds.findIndex((child) => child?.getData() === data);
    if (index !== -1) {
      this.listChilds.splice(index, 1);
      return true;
    }
    return false;
  }

  deleteByIndex(index: number) {
    if (index >= 0 && index < this.listChilds.length) {
      this.listChilds.splice(index, 1);
    }
  }

  hasChilds(): boolean {
    return this.listChilds.length > 0;
  }

  countChilds(): number {
    return this.listChilds.length;
  }
}
