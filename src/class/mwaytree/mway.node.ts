import { type Data } from '../binarysearchtree/binarysearch.node';

export const DEFAULT_GRADE = 2;

/**
 * Clase que representa el nodo de un arbol m-way.
 */
export default class MWayNode<T> {
  private listData: Array<Data<T> | null>;
  private listChilds: Array<MWayNode<T> | null>;
  private readonly degree: number;

  constructor (degree: number = DEFAULT_GRADE) {
    this.degree = degree;
    if (this.degree < 2) {
      throw new Error('El grado debe ser mayor o igual importgraa 2');
    }

    this.listData = new Array(this.degree - 1).fill(null);
    this.listChilds = new Array(degree).fill(null);
  }

  getGrade () {
    return this.degree;
  }

  getData (position: number) {
    return this.listData[position];
  }

  setData (position: number, newData: Data<T> | null) {
    this.listData[position] = newData;
  }

  getChild (position: number) {
    return this.listChilds[position];
  }

  setChild (positon: number, newNodo: MWayNode<T> | null) {
    this.listChilds[positon] = newNodo;
  }

  isLeaf () {
    for (let i = 0; i < this.listChilds.length; i++) {
      if (this.listChilds[i] !== null) {
        return false;
      }
    }
    return true;
  }

  // tiene todos sus hijos
  isFullNode () {
    return this.countChildren() === this.listChilds.length;
  }

  // Cuenta la cantidad de hijos
  countChildren () {
    let c = 0;
    for (let i = 0; i < this.listChilds.length; i++) {
      if (this.listChilds[i] !== null) {
        c++;
      }
    }
    return c;
  }

  // cuenta los hijos nulos
  countEmptyData () {
    return this.listData.length - this.countData();
  }

  // Cuenta la cantidad de datos
  countData () {
    let c = 0;
    for (let i = 0; i < this.listData.length; i++) {
      if (this.listData[i] !== null) {
        c++;
      }
    }
    return c;
  }

  // cuenta los hijos nulos
  countEmptyChildren () {
    return this.listChilds.length - this.countChildren();
  }

  // verifica si es hijo vacio
  isEmptyChild (position: number): boolean {
    return this.listChilds[position] === null;
  }

  findKeyIndex (key: T): number {
    return this.listData.findIndex(
      (data) => data !== null && data.value === key
    );
  }

  getDataArray () {
    return this.listData;
  }

  setDataArray (arrayData: typeof this.listData) {
    this.listData = arrayData;
  }

  getChildrenArray () {
    return this.listChilds;
  }

  setChildrenArray (arrayChildren: Array<MWayNode<T> | null>) {
    this.listChilds = arrayChildren;
  }
}
