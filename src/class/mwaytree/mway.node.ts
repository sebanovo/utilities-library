import type { Data } from '../binarysearchtree/binarysearch.node';
// EL GRADO ES EL NUMERO MAXIMO DE HIJOS QUE TIENE CADA NODO
export const DEFAULT_GRADE = 2;

/**
 * Clase que representa el nodo de un arbol m-way.
 */
export default class MWayTreeNode<T> {
  private listData: Array<Data<T> | null>;
  private listChilds: Array<MWayTreeNode<T> | null>;
  private readonly degree: number;

  constructor(degree: number = DEFAULT_GRADE) {
    if (degree <= 1) {
      throw new Error('El grado debe ser mayor que 1');
    }
    this.degree = degree;
    this.listData = new Array(degree - 1).fill(null);
    this.listChilds = new Array(degree).fill(null);
  }

  getGrade() {
    return this.degree;
  }

  getData(position: number) {
    return this.listData[position];
  }

  setData(position: number, newData: Data<T> | null) {
    this.listData[position] = newData;
    return this;
  }

  getChild(position: number) {
    return this.listChilds[position];
  }

  setChild(positon: number, newNodo: MWayTreeNode<T> | null) {
    this.listChilds[positon] = newNodo;
    return this;
  }

  isLeaf() {
    for (let i = 0; i < this.listChilds.length; i++) {
      if (this.listChilds[i] !== null) {
        return false;
      }
    }
    return true;
  }

  getIndexOfData(key: number) {
    for (let i = 0; i < this.listData.length; i++) {
      if (this.listData[i]?.key === key) {
        return i;
      }
    }
    return -1;
  }

  getIndexOfChild(childNode: MWayTreeNode<T>) {
    for (let i = 0; i < this.listChilds.length; i++) {
      if (this.getChild(i) === childNode && childNode !== null) {
        return i;
      }
    }
    return -1;
  }

  // tiene todos los datos llenos
  isFullDataNode() {
    return this.countData() === this.listData.length;
  }

  // tiene todos sus hijos
  isFullChildrenNode() {
    return this.countChildren() === this.listChilds.length;
  }

  // Cuenta la cantidad de datos
  countData() {
    let c = 0;
    for (let i = 0; i < this.listData.length; i++) {
      if (this.listData[i] !== null) {
        c++;
      }
    }
    return c;
  }

  // Cuenta la cantidad de hijos
  countChildren() {
    let c = 0;
    for (let i = 0; i < this.listChilds.length; i++) {
      if (this.listChilds[i] !== null) {
        c++;
      }
    }
    return c;
  }

  // cuenta los hijos nulos
  countEmptyData() {
    return this.listData.length - this.countData();
  }

  // verifica si hay el nodo tiene espacio disponible para insertar
  hasDataSpaceForInsert() {
    return this.countEmptyData() > 0;
  }

  // cuenta los hijos nulos
  countEmptyChildren() {
    return this.listChilds.length - this.countChildren();
  }

  // verifica si es hijo vacio
  isEmptyChild(position: number): boolean {
    return this.listChilds[position] === null;
  }

  getDataArray() {
    return this.listData;
  }

  setDataArray(arrayData: (Data<T> | null)[]) {
    this.listData = arrayData;
    return this;
  }

  getChildrensArray() {
    return this.listChilds;
  }

  setChildrensArray(childrensArray: Array<MWayTreeNode<T> | null>) {
    this.listChilds = childrensArray;
    return this;
  }

  insertDataOrdered(data: Data<T>) {
    // Desplazar elementos hacia la derecha mientras sean mayores al nuevo dato
    let pos = this.countData();
    while (pos > 0 && this.getData(pos - 1)!.key > data.key) {
      this.setData(pos, this.getData(pos - 1));
      pos--;
    }
    this.setData(pos, data);
    return this;
  }

  displaceDatasToLeft(positionData: number) {
    // if only has 1 data delete
    for (let i = positionData; i < this.countData() - 1; i++) {
      this.setData(i, this.getData(i + 1));
    }
    this.setData(this.countData() - 1, null);
    return this;
  }

  displaceDatasToRight(positionData: number) {
    for (let i = this.countData() - 1; i >= positionData; i--) {
      this.setData(i + 1, this.getData(i));
    }
    this.setData(positionData, null);
    return this;
  }

  displaceChildsToLeft(positionChild: number) {
    for (let i = positionChild; i < this.countData(); i++) {
      this.setChild(i, this.getChild(i + 1));
    }
    this.setChild(this.countData(), null);
    return this;
  }

  displaceChildsToRight(positionChild: number) {
    for (let i = this.countData() - 1; i >= positionChild; i--) {
      this.setChild(i + 1, this.getChild(i));
    }
    return this;
  }

  findGreaterKeyIndex(keyToCompare: number) {
    for (let i = 0; i < this.countData(); i++) {
      const data = this.getData(i);
      if (keyToCompare < data!.key) {
        return i;
      }
    }
    return this.countData();
  }

  hasChildToAfter(initPosition: number): boolean {
    for (let i = initPosition + 1; i < this.listChilds.length; i++) {
      if (this.getChild(i) !== null) {
        return true;
      }
    }
    return false;
  }

  clear() {
    this.listData = new Array(this.degree - 1).fill(null);
    this.listChilds = new Array(this.degree).fill(null);
    return this;
  }
}
